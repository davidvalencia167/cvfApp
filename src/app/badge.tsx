import { colors, radius, spacing } from "@/constants/theme";
import { BadgeResult, getBadge } from "@/lib/attendeeApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AlertCircle, ArrowLeft, Mail, Printer } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";


export default function BadgeScreen() {
    const router = useRouter();
    const { token, emailSent } = useLocalSearchParams<{ token?: string; emailSent?: string }>();
    const [badge, setBadge] = useState<BadgeResult | null>(null);
    const [error, setError] = useState<string | null>(() =>
        token ? null : 'No encontramos tu credencial. Revisa el enlace e intenta de nuevo.'
    );

    useEffect(() => {
        if (!token) {
        return;
        }
        let active = true;
        getBadge(token)
        .then((result) => { if (active) setBadge(result); })
        .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : 'No pudimos cargar tu credencial.'); });
        return () => { active = false; };
    }, [token]);


    const handlePrint = () => {
        if (Platform.OS === 'web') window.print();
    };

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <Pressable style={styles.back} onPress={() => router.replace('/')}>
                <ArrowLeft size={22} color={colors.text}/>
            </Pressable>

            <Text style={styles.kicker}>CREDENCIAL DE ACCESO</Text>
            <Text style={styles.title}>Tu inscripción está lista</Text>

            {
                emailSent === '0' && (
                    <View style={styles.notice}>
                        <AlertCircle size={17} color={colors.terracottaLight}/>
                        <Text style={styles.noticeText}>No pudimos enviar el correo. Guarda o imprime este código QR.</Text>
                    </View>
                )
            }

            {
                emailSent === '1' && (
                    <View style={styles.notice}>
                        <Mail size={17} color={colors.success}/>
                        <Text style={[styles.noticeText, { color: colors.success }]}>Enviamos tu código QR a tu correo.</Text>
                    </View>
                )
            }

            {error && <Text style={styles.error}>{error}</Text>}

            {
                badge && (
                    <View style={styles.card}>
                        <Image source={{ uri: badge.qr_png }} style={styles.qr} accessibilityLabel="Código QR de inscripción"/>
                        <Text style={styles.name}>{badge.full_name}</Text>
                        <Text style={styles.caption}>Presenta este código en el registro y en cada sala.</Text>
                    </View>
                )
            }

            {
                badge && Platform.OS === 'web' && (
                    <Pressable style={({ pressed }) => [styles.printButton, pressed && styles.pressed]} onPress={handlePrint}>
                        <Printer size={18} color={colors.textOnButton}/>
                        <Text style={styles.printText}>Imprimir credencial</Text>
                    </Pressable>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, maxWidth: 520, width: '100%', alignSelf: 'center' },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.surface },
  kicker: { color: colors.gold, fontSize: 11, letterSpacing: 1.5, fontWeight: '800', marginTop: spacing.xl },
  title: { color: colors.text, fontSize: 26, fontWeight: '700', marginTop: spacing.sm },
  notice: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.sm, marginTop: spacing.lg },
  noticeText: { flex: 1, color: colors.terracottaLight, fontSize: 13, lineHeight: 18 },
  error: { color: colors.terracottaLight, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, lineHeight: 18, marginTop: spacing.lg },
  card: { backgroundColor: colors.cream, borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
  qr: { width: 240, height: 240 },
  name: { color: '#1A1A1A', fontSize: 20, fontWeight: '700', marginTop: spacing.lg, textAlign: 'center' },
  caption: { color: '#5A5550', fontSize: 13, marginTop: spacing.xs, textAlign: 'center' },
  printButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 56, borderRadius: radius.md, backgroundColor: colors.terracotta, marginTop: spacing.xl },
  printText: { color: colors.textOnButton, fontSize: 15, fontWeight: '800' },
  pressed: { opacity: 0.78 },
});
