import { colors, radius, spacing } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { AlertCircle, Award, ChevronRight, CreditCard, FileText, LogOut, ScanLine, Settings, UserRound } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";



const items: { label: string; description: string; icon: typeof CreditCard; route?: '/scan' }[] = [{ label: 'Mi inscripción', description: 'Consulta tu estado de acceso', icon: CreditCard }, { label: 'Mis certificados', description: 'Disponibles después del evento', icon: Award }, { label: 'Historial de pagos', description: 'Sin movimientos registrados', icon: FileText }, { label: 'Configuración', description: 'Preferencias de tu cuenta', icon: Settings }, { label: 'Control de accesos', description: '  ', icon: ScanLine, route: '/scan' }];

export default function ProfileScreen() {   

    const router = useRouter();
    const { session, profile, signOut } = useAuth();
    const name = profile?.fullName ?? 'Asistente del congreso';
    const email = profile?.email ?? session?.user.email ?? '';

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <Text style={styles.kicker}>CUENTA DEL ASISTENTE</Text>
            <Text style={styles.title}>Mi perfil</Text>
            {!session && <View style={styles.error}><AlertCircle size={17} color={colors.terracottaLight}/>
                <Text style={styles.errorText}>Inicia sesión para ver tu perfil personal.</Text></View>
            }
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <UserRound size={27} color={colors.gold}/>
                </View>

                <View style={styles.profileCopy}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                    <View style={styles.status}>
                        <View style={styles.statusDot}/>
                        <Text style={styles.statusText}>{session ? 'CUENTA ACTIVA' : 'SIN SESIÓN'}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Tu experiencia</Text>
            <View style={styles.menu}>
                {
                    items.map(({label, description, icon: Icon, route}) => 
                        <Pressable key={label} style={({pressed}) => [styles.menuItem, pressed && styles.pressed]} onPress={route ? () => router.push(route) : undefined}>
                            <View style={styles.menuIcon}>
                                <Icon size={20} color={colors.terracottaLight}/>
                            </View>

                            <View style={styles.menuCopy}>
                                <Text style={styles.menuLabel}>{label}</Text>
                                <Text style={styles.menuDescription}>{description}</Text>
                            </View>

                            <ChevronRight size={18} color={colors.textSecondary}/>
                        </Pressable>
                    )}
            </View>

            <View style={styles.help}>
                <Text style={styles.helpTitle}>Tu agenda personal</Text>
                <Text style={styles.helpText}>Guarda conferencias desde Agenda y las encontrarás asociadas a tu cuenta.</Text>
            </View>

            {session && <Pressable style={styles.logout} onPress={() => {signOut(); router.replace
                ('/');
            }}>
                <LogOut size={17} color={colors.terracottaLight}/>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>
        }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingBottom: 110 },
    kicker: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
    title: { color: colors.text, fontSize: 30, fontWeight: '700', marginTop: 5 },
    error: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, marginTop: spacing.md },
    errorText: { color: colors.terracottaLight, flex: 1, fontSize: 12 },
    profileCard: { backgroundColor: colors.cacao, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.peachSoft, borderWidth: 1, borderColor: colors.goldDeep, alignItems: 'center', justifyContent: 'center' },
    profileCopy: { flex: 1 },
    name: { color: colors.cream, fontSize: 17, fontWeight: '700' },
    email: { color: '#C8AFA0', fontSize: 12, marginTop: 4 },
    status: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
    statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success },
    statusText: { color: colors.success, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
    sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '700', marginTop: spacing.xl, marginBottom: spacing.sm },
    menu: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
    menuIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.peachSoft, alignItems: 'center', justifyContent: 'center' },
    menuCopy: { flex: 1 },
    menuLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
    menuDescription: { color: colors.textSecondary, fontSize: 11, marginTop: 3 },
    help: { backgroundColor: colors.muted, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.xl },
    helpTitle: { color: colors.cream, fontSize: 14, fontWeight: '700' },
    helpText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 4 },
    logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: spacing.lg },
    logoutText: { color: colors.terracottaLight, fontSize: 13, fontWeight: '800' },
    pressed: { opacity: 0.7 }
});