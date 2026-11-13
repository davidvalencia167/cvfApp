import { colors, radius, spacing } from "@/constants/theme"
import { Radio, ShieldCheck, Video } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"



export default function LiveScreen() {
    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.kicker}>TRANSMISIÓN</Text>
                    <Text style={styles.title}>En vivo</Text>
                </View>

                <View style={styles.status}>
                    <View style={styles.statusDot}/>
                    <Text style={styles.statusText}>INACTIVO</Text>
                </View>
            </View>

            <View style={styles.player}>
                <Video size={42} color={colors.gold}/>
                <Text style={styles.playerTitle}>La transmisión aún no comienza</Text>
                <Text style={styles.playerText}>Cuando exista una sesión en vivo, el reproductor aparecerá aquí con acceso protegido para asistentes autorizados.</Text>
            </View>

            <View style={styles.accessCard}>
                <ShieldCheck size={22} color={colors.gold}/>
                <View style={styles.accessCopy}>
                    <Text style={styles.accessTitle}>Acceso protegido</Text>
                    <Text style={styles.accessText}>Los enlaces privados nunca se muestran directamente en la aplicación.</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Próxima transmisión</Text>
            <View style={styles.empty}>
                <Radio size={24} color={colors.textSecondary}/>
                <Text style={styles.emptyTitle}>Sin sesiones programadas</Text>
                <Text style={styles.emptyText}>La información se mostrará cuando la organización publique el programa.</Text>
            </View>

            <Pressable style={styles.disabledButton}>
                <Text style={styles.disabledText}>
                    Esperando programación
                </Text>
            </Pressable>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: { flex:1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingBottom: 110 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    kicker: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
    title: { color: colors.text, fontSize: 30, fontWeight: '700', marginTop: 5 },
    status: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 8 },
    statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.textSecondary },
    statusText: { color: colors.textSecondary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    player: { height: 260, borderRadius: radius.lg, backgroundColor: colors.sand, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    playerTitle: { color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: spacing.md },
    playerText: { color: colors.textSecondary, lineHeight: 20, fontSize: 13, textAlign: 'center', marginTop: spacing.sm },
    accessCard: { backgroundColor: colors.peachSoft, borderRadius: radius.md, padding: spacing.md, flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    accessCopy: { flex: 1 },
    accessTitle: { color: colors.cream, fontSize: 14, fontWeight: '700' },
    accessText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 4 },
    sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '700', marginTop: spacing.xl, marginBottom: spacing.sm },
    empty: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xl, alignItems: 'center' },
    emptyTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: spacing.sm },
    emptyText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6 },
    disabledButton: { marginTop: spacing.md, borderRadius: radius.md, height: 52, backgroundColor: colors.cacao, alignItems: 'center', justifyContent: 'center' },
    disabledText: { color: '#B9896D', fontSize: 13, fontWeight: '700' },
});