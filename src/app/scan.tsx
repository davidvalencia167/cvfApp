import { QrScanner } from "@/components/QrScanner";
import { colors, radius, spacing } from "@/constants/theme";
import { captureLead, checkInAttendee, RoomName } from "@/lib/attendeeApi";
import { useRouter } from "expo-router"
import { AlertCircle, ArrowLeft, CheckCircle2, Printer } from "lucide-react-native";
import { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View, Text } from "react-native";


type ScanMode = RoomName | 'Empresa';
type ScanOutcome = { tone: 'success' | 'warning' | 'error'; title: string; detail: string; token?: string };

const MODES: ScanMode[] = ['Registro', 'Sala 1', 'Sala 2', 'Empresa'];
const COOLDOWN_MS = 2500;

export default function ScanScreen() {
    const router = useRouter();
    const [ mode, setMode ] = useState<ScanMode | null>(null);
    const [ companyDraft, setCompanyDraft ] = useState('');
    const [companyName, setCompanyName] = useState<string | null>(null);
    const [outcome, setOutcome] = useState<ScanOutcome | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const busyRef = useRef(false);


    const chooseMode = (next: ScanMode) =>  {
        setOutcome(null);
        setCameraError(null);
        setCompanyName(null);
        setMode(next);
    };

    const handleCompanyStart = () => {
        const name = companyDraft.trim();
        if (!name) {
            setCameraError('Escribe el nombre de la empresa para comenzar.')
            return;
        }
        setCameraError(null);
        setCompanyName(name);
    };

    const handleScan = async (token: string) => {
        if (busyRef.current || !mode) return;
        busyRef.current = true;
        setOutcome(null);

        try {
        if (mode === 'Empresa') {
            if (!companyName) return;
            const result = await captureLead(token, companyName);
            setOutcome(result.status === 'captured'
            ? { tone: 'success', title: result.full_name, detail: `Contacto guardado para ${result.company_name}.`, token }
            : { tone: 'warning', title: result.full_name, detail: `Ya estaba guardado para ${result.company_name}.`, token });
        } else {
            const result = await checkInAttendee(token, mode);
            setOutcome(result.status === 'checked_in'
            ? { tone: 'success', title: result.full_name, detail: `Ingreso registrado en ${result.room}.`, token }
            : { tone: 'warning', title: result.full_name, detail: `Ya tenía ingreso registrado en ${result.room}.`, token });
        }
        } catch (err) {
        setOutcome({ tone: 'error', title: 'No se pudo registrar', detail: err instanceof Error ? err.message : 'Intenta de nuevo.' });
        } finally {
        setTimeout(() => { busyRef.current = false; }, COOLDOWN_MS);
        }
    };

    const isCompanyPending = mode === 'Empresa' && !companyName;

    return(
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (mode ? setMode(null) : router.back())}>
          <ArrowLeft size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>CONTROL DE ACCESOS</Text>
          <Text style={styles.title}>{mode ? mode : 'Elige el punto de escaneo'}</Text>
        </View>
      </View>

      {!mode && (
        <View style={styles.modes}>
          {MODES.map((item) => (
            <Pressable key={item} style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]} onPress={() => chooseMode(item)}>
              <Text style={styles.modeText}>{item === 'Empresa' ? 'Empresa (captar contacto)' : item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {mode === 'Empresa' && isCompanyPending && (
        <View style={styles.companyForm}>
          <TextInput
            value={companyDraft}
            onChangeText={setCompanyDraft}
            placeholder="Nombre de la empresa"
            placeholderTextColor="#806F63"
            style={styles.input}
          />
          <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={handleCompanyStart}>
            <Text style={styles.primaryText}>Comenzar a escanear</Text>
          </Pressable>
        </View>
      )}

      {mode && !isCompanyPending && (
        <>
          {mode === 'Empresa' && <Text style={styles.hint}>Captando contactos para {companyName}</Text>}
          <QrScanner onScan={handleScan} onError={setCameraError} />
        </>
      )}

      {cameraError && <Text style={styles.error}>{cameraError}</Text>}

      {outcome && (
        <View style={[styles.outcome, outcome.tone === 'success' && styles.outcomeSuccess, outcome.tone === 'warning' && styles.outcomeWarning, outcome.tone === 'error' && styles.outcomeError]}>
          {outcome.tone === 'error'
            ? <AlertCircle size={22} color={colors.terracottaLight} />
            : <CheckCircle2 size={22} color={outcome.tone === 'success' ? colors.success : colors.gold} />}
          <View style={styles.outcomeCopy}>
            <Text style={styles.outcomeTitle}>{outcome.title}</Text>
            <Text style={styles.outcomeDetail}>{outcome.detail}</Text>
          </View>
          {mode === 'Registro' && outcome.token && (
            <Pressable style={styles.printChip} onPress={() => router.push({ pathname: '/badge', params: { token: outcome.token } })}>
              <Printer size={16} color={colors.textOnButton} />
              <Text style={styles.printChipText}>Credencial</Text>
            </Pressable>
          )}
        </View>
      )}
    </ScrollView>
    );

}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, maxWidth: 560, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.surface },
  headerCopy: { flex: 1 },
  kicker: { color: colors.gold, fontSize: 11, letterSpacing: 1.5, fontWeight: '800' },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 4 },
  modes: { gap: spacing.sm },
  modeButton: { height: 60, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, justifyContent: 'center', paddingHorizontal: spacing.lg },
  modeText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  companyForm: { gap: spacing.md },
  input: { height: 56, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: spacing.md, fontSize: 15 },
  primaryButton: { height: 56, borderRadius: radius.md, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: colors.textOnButton, fontSize: 15, fontWeight: '800' },
  hint: { color: colors.gold, fontSize: 13, fontWeight: '700', marginBottom: spacing.sm },
  error: { color: colors.terracottaLight, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, lineHeight: 18, marginTop: spacing.md },
  outcome: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderRadius: radius.md, borderWidth: 1, padding: spacing.md, marginTop: spacing.lg, backgroundColor: colors.surface },
  outcomeSuccess: { borderColor: colors.success },
  outcomeWarning: { borderColor: colors.goldDeep },
  outcomeError: { borderColor: colors.terracotta, backgroundColor: colors.peachSoft },
  outcomeCopy: { flex: 1 },
  outcomeTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  outcomeDetail: { color: colors.textSecondary, fontSize: 13, marginTop: 3, lineHeight: 18 },
  printChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.terracotta, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  printChipText: { color: colors.textOnButton, fontSize: 12, fontWeight: '800' },
  pressed: { opacity: 0.78 },
});