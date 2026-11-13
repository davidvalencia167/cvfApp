import { colors, radius, spacing, typography } from "@/constants/theme";
import { Clapperboard, Filter, PlayCircle, Search } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


export default function RecordingsScreen() {
    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.kicker}>BIBLIOTECA ACADÉMICA</Text>
                    <Text style={styles.title}>Grabaciones</Text>
                </View>

                <Pressable style={styles.iconButton}>
                    <Filter size={19} color={colors.text}/>
                </Pressable>
            </View>

            <View style={styles.search}>
                <Search size={18} color={colors.textSecondary}/>
                <TextInput placeholder="Buscar una grabación" placeholderTextColor="#806F63" style={styles.input}/>
            </View>

            <View style={styles.empty}>
                <View style={styles.emptyIcon}>
                    <Clapperboard size={25} color={colors.gold}/>
                </View>
                <Text style={styles.emptyTitle}>Tu biblioteca está lista</Text>
                <Text style={styles.emptyText}>Las grabaciones de las conferencias estarán disponibles para asistentes autorizados después del evento.</Text>
                <View style={styles.locked}>
                    <PlayCircle size={15} color={colors.terracottaLight}/>
                    <Text style={styles.lockedText}>Contenido protegido</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Contenido de demostración</Text>
            <View style={styles.demoCard}>
                <View style={styles.thumbnail}>
                    <PlayCircle size={28} color={colors.gold}/>
                    <Text style={styles.thumbnailText}>PRÓXIMAMENTE</Text>
                </View>

                <Text style={styles.demoTitle}>Casos clínicos felinos</Text>
                <Text style={styles.demoMeta}>Ponente y duración por confirmar</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingBottom: 110 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    kicker: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
    title: { color: colors.text, fontSize: 30, fontWeight: '700', marginTop: 5 },
    iconButton: { width: 44, height: 44, backgroundColor: colors.surface, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
    search: { height: 50, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: 10 },
    input: { flex: 1, color: colors.text, fontSize: 13 },
    empty: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
    emptyIcon: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.peachSoft, alignItems: 'center', justifyContent: 'center' },
    emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.md },
    emptyText: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
    locked: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: spacing.lg },
    lockedText: { color: colors.terracottaLight, fontSize: 11, fontWeight: '800' },
    sectionTitle: { color: colors.text, fontSize: typography.section, fontWeight: '700', marginTop: spacing.xl, marginBottom: spacing.sm },
    demoCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
    thumbnail: { height: 150, backgroundColor: colors.cacao, alignItems: 'center', justifyContent: 'center', gap: 8 },
    thumbnailText: { color: '#B9896D', fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
    demoTitle: { color: colors.text, fontSize: 15, fontWeight: '700', margin: spacing.md, marginBottom: 4 },
    demoMeta: { color: colors.textSecondary, fontSize: 12, marginHorizontal: spacing.md, marginBottom: spacing.md },
});