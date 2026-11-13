import { colors, radius, shadows, spacing, typography } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowUpRight, Bell, CalendarDays, ChevronRight, Clock3, MapPin, Sparkles, Ticket, Video } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";


function SectionTitle({ title, action }: { title: string; action?: string }) {
    return <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>;
}

export default function HomeScreen() {
    const router = useRouter();
    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.kicker}>CONGRESO VETERINARIO FELINO</Text>
                    <Text style={styles.greeting}>Hola, asistente</Text>
                </View>

                <Pressable style={styles.bell}>
                    <Bell size={20} color={colors.text}/>
                    <View style={styles.dot}/>
                </Pressable>
            </View>

            <View style={styles.heroCard}>
                <View style={styles.heroTop}>
                    <View style={styles.livePill}>
                        <Sparkles size={13} color={colors.gold}/>
                        <Text style={styles.livePillText}>PRÓXIMAMENTE</Text>
                    </View>
                </View>

                <Text style={styles.heroTitle}>Ciencia felina, mirada al futuro.</Text>
                <Text style={styles.heroBody}>Una experiencia académica diseñada para compartir conocimiento clínico y conectar a la comunidad veterinaria.</Text>
                <View style={styles.heroMeta}>
                    <View style={styles.meta}>
                        <CalendarDays size={16} color={colors.gold}/>
                        <Text style={styles.metaText}>25-26 Febrero 2027</Text>
                    </View>

                    <View style={styles.meta}>
                        <MapPin size={16} color={colors.gold}/>
                        <Text style={styles.metaText}>
                            Hotel Trinitarias Suites
                        </Text>
                    </View>
                </View>
            </View>

            <SectionTitle title="Tu próxima conferencia" action="Ver agenda"/>
            <Pressable style={styles.sessionCard} onPress={() => router.push('/(tabs)/agenda')}>
                <View style={styles.timeBlock}>
                    <Text style={styles.time}>—</Text>
                    <Text style={styles.timeLabel}>SIN FECHA</Text>
                </View>

                <View style={styles.sessionInfo}>
                    <Text style={styles.sessionTitle}>La agenda se publicará próximamente</Text>
                    <Text style={styles.sessionDesc}>Te avisaremos cuando se confirmen las primeras conferencias.</Text>
                    <View style={styles.sessionFooter}>
                        <Clock3 size={14} color={colors.textSecondary}/>
                        <Text style={styles.sessionMeta}>Programa en preparación</Text>
                        <ChevronRight size={17} color={colors.gold}/>
                    </View>
                </View>
            </Pressable>

            <SectionTitle title="Accesos rápidos"/>
            <View style={styles.quickGrid}>
                <QuickAction icon={ <CalendarDays size={21} color={colors.terracottaLight}/> } label="Mi agenda" onPress={() => router.push('/(tabs)/agenda')}/>
                <QuickAction icon={ <Video size={21} color={colors.terracottaLight}/> } label="Transmisiones" onPress={() => router.push('/(tabs)/live')}/>
                <QuickAction icon={ <Ticket size={21} color={colors.terracottaLight}/> } label="Inscripción"/>
                <QuickAction icon={ <Sparkles size={21} color={colors.terracottaLight}/> } label="Certificados"/>
            </View>

            <View style={styles.sponsorSection}>
                <Text style={styles.sponsorEyebrow}>ALIANZAS QUE INSPIRAN</Text>
                <Text style={styles.sponsorTitle}>Patrocinadores</Text>
                <Text style={styles.sponsorBody}>Espacio reservado para las marcas que apoyan la educación veterinaria.</Text>
                <View style={styles.sponsorPlaceholder}>
                    <Text style={styles.sponsorPlaceholderText}>LOGOTIPO DISPONIBLE</Text>
                    <ArrowUpRight size={17} color={colors.sponsorTertiary}/>
                </View>
            </View>
        </ScrollView>
    );
}

function QuickAction({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress?: () => void }) {
    return(
        <Pressable style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]} onPress={onPress}>
            <View style={styles.quickIcon}>{icon}</View>
            <Text style={styles.quickLabel}>{label}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingBottom: 110 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    kicker: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
    greeting: { color: colors.text, fontSize: 26, fontWeight: '700', marginTop: 6 },
    bell: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
    dot: { position: 'absolute', top: 11, right: 12, width: 6, height: 6, backgroundColor: colors.terracotta, borderRadius: 3 },
    heroCard: { backgroundColor: colors.cacao, borderRadius: radius.lg, padding: spacing.lg, overflow: 'hidden', ...shadows.card },
    heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    livePill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(232,193,99,0.12)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: radius.pill },
    livePillText: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    edition: { color: '#B9896D', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    heroTitle: { color: colors.cream, fontSize: 28, lineHeight: 33, fontWeight: '700', marginTop: spacing.xl, maxWidth: 290 },
    heroBody: { color: '#C8AFA0', fontSize: 14, lineHeight: 21, marginTop: spacing.sm, maxWidth: 330 },
    heroMeta: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
    meta: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1 },
    metaText: { color: colors.cream, fontSize: 11, flex: 1 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.sm },
    sectionTitle: { color: colors.text, fontSize: typography.section, fontWeight: '700' },
    sectionAction: { color: colors.terracottaLight, fontSize: 12, fontWeight: '800' },
    sessionCard: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, flexDirection: 'row', gap: spacing.md },
    timeBlock: { width: 64, borderRightWidth: 1, borderRightColor: colors.border, justifyContent: 'center' },
    time: { color: colors.gold, fontSize: 24, fontWeight: '700' },
    timeLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1, marginTop: 4 },
    sessionInfo: { flex: 1 },
    sessionTitle: { color: colors.text, fontSize: 15, lineHeight: 20, fontWeight: '700' },
    sessionDesc: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
    sessionFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
    sessionMeta: { color: colors.textSecondary, fontSize: 11, flex: 1 },
    quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    quickAction: { width: '48%', minHeight: 92, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, justifyContent: 'space-between' },
    quickIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.peachSoft, alignItems: 'center', justifyContent: 'center' },
    quickLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
    sponsorSection: { backgroundColor: colors.sponsorBackground, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.xl },
    sponsorEyebrow: { color: colors.sponsorTertiary, fontSize: 10, letterSpacing: 1.3, fontWeight: '800' },
    sponsorTitle: { color: colors.sponsorText, fontSize: 22, fontWeight: '700', marginTop: 6 },
    sponsorBody: { color: colors.sponsorSecondary, fontSize: 13, lineHeight: 19, marginTop: 6 },
    sponsorPlaceholder: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.sponsorBorder, borderRadius: radius.sm, padding: spacing.md, marginTop: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sponsorPlaceholderText: { color: colors.sponsorTertiary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    disclaimer: { color: '#806F63', textAlign: 'center', fontSize: 10, lineHeight: 16, marginTop: spacing.lg },
    pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});