import { colors, radius, shadows, spacing, typography } from "@/constants/theme";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, CalendarDays, LockKeyhole } from 'lucide-react-native';
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

export default function WelcomeScreen() {

    const router = useRouter();
    const {session, loading} = useAuth();

    useEffect(() => {
    if (!loading && session) router.replace('/(tabs)');
  }, [loading, router, session]);

    if (loading || session) {
    return <View style={styles.loading}><ActivityIndicator color={colors.gold} size="large" /><Text style={styles.loadingText}>Preparando tu experiencia</Text></View>;
    }

    return(
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsHorizontalScrollIndicator={false}>
          <View style={styles.topRow}>
              <Image source={require('@/assets/images/logo-ivec.jpeg')} style={styles.logo}/>
          </View>
          <View style={styles.hero}>
              <Image source={require('../../assets/images/hero_image.avif')} style={styles.heroImage}/>
              <LinearGradient colors={['transparent', 'rgba(18,18,18,0.18)', colors.background]} style={styles.heroShade}/>
              <View style={styles.heroCopy}>
                  <Text style={styles.eyebrow}>MEDICINA FELINA · EXPERIENCIA ACADÉMICA</Text>
                  <Text style={styles.title}>Congreso{`\n`}<Text style={styles.titleAccent}>Veterinario Felino</Text></Text>
                  <Text style={styles.description}>Un punto de encuentro para quienes elevan el estándar de la salud y el bienestar felino.</Text>
              </View>
          </View>

          <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                  <CalendarDays size={18} color={colors.gold}/>
                  <Text style={styles.infoText}>25-26 febrero 2027</Text>
              </View>
              <View style={styles.infoItem}>
                  <LockKeyhole size={18} color={colors.gold}/>
                  <Text style={styles.infoText}>Contenido para asistentes</Text>
              </View>
          </View>

          <View style={styles.actions}>
              <Pressable style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => router.push('/login')}>
                  <Text style={styles.primaryText}>Iniciar sesión</Text>
                  <ArrowRight size={19} color={colors.textOnButton}/>
              </Pressable>

              <Pressable style={({pressed}) => [styles.secondaryButton, pressed && styles.pressed]} onPress={() => router.push('/register')}>
                  <Text style={styles.secondaryText}>Crear cuenta de asistente</Text>
              </Pressable>
          </View>

          <Text style={styles.disclaimer}>Crea tu cuenta para guardar sesiones, acceder a tu perfil y recibir el contenido del congreso.</Text>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  loadingText: { color: colors.textSecondary, fontSize: 13 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  logo: { width: 52, height: 52, borderRadius: 26 },
  badge: { borderWidth: 1, borderColor: colors.goldDeep, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
  badgeText: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  hero: { height: 470, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface, ...shadows.card },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroShade: { ...StyleSheet.absoluteFill },
  heroCopy: { flex: 1, justifyContent: 'flex-end', padding: spacing.lg },
  eyebrow: { color: colors.gold, fontSize: typography.label, fontWeight: '700', letterSpacing: 1.3, marginBottom: spacing.sm },
  title: { color: colors.text, fontSize: typography.display, lineHeight: 38, fontWeight: '700', letterSpacing: -1 },
  titleAccent: { color: colors.congressOrange },
  description: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 23, marginTop: spacing.md, maxWidth: 300 },
  infoRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  infoItem: { flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center' },
  infoText: { color: colors.textSecondary, fontSize: 12, flex: 1 },
  actions: { gap: spacing.sm, marginTop: spacing.xl },
  primaryButton: { height: 56, backgroundColor: colors.terracotta, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  primaryText: { color: colors.textOnButton, fontSize: typography.body, fontWeight: '800' },
  secondaryButton: { height: 56, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  secondaryText: { color: colors.text, fontSize: typography.body, fontWeight: '700' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  disclaimer: { color: '#806F63', textAlign: 'center', fontSize: 11, lineHeight: 17, marginTop: spacing.lg },
});
