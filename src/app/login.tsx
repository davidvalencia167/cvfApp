import { colors, radius, spacing, typography } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { View, Pressable, StyleSheet, Text, TextInput } from "react-native";



export default function LoginScreen() {

    const router = useRouter();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);


    const handleLogin = () => {
        if (!email.trim() || !password) { setError('Escribe tu correo y contraseña para continuar.'); return; }
        setSubmitting(true); setError(null);
        const signInError = signIn(email.trim().toLowerCase(), password);
        if (signInError) { setError(signInError); setSubmitting(false); return; }
        router.replace('/(tabs)');
  };

    return(
        <View style={styles.screen}>
            <Pressable style={styles.back} onPress={() => router.back()}>
                <ArrowLeft size={22} color={colors.text}/>
            </Pressable>
            <View style={styles.content}>
                <View style={styles.icon}>
                    <LockKeyhole size={24} color={colors.gold}/>
                </View>

                <Text style={styles.eyebrow}>ÁREA DE ASISTENTES</Text>
                <Text style={styles.title}>Bienvenido de nuevo</Text>
                <Text style={styles.subtitle}>Accede a tu agenda personalizada, transmisiones y certificados.</Text>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.field}>
                    <Mail size={18} color={colors.textSecondary}/>
                    <TextInput value={email} onChangeText={setEmail} placeholder="Correo electrónico" placeholderTextColor="#806F63" autoCapitalize="none" keyboardType="email-address" style={styles.input}/>
                </View>

                <View style={styles.field}>
                    <LockKeyhole size={18} color={colors.textSecondary}/>
                    <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" placeholderTextColor="#806F63" secureTextEntry={!showPassword} style={styles.input}/>
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} color={colors.textSecondary}/> : <Eye size={18} color={colors.textSecondary}/>}
                    </Pressable>
                </View>
                
                <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed, submitting && styles.disabled]} onPress={handleLogin} disabled={submitting}>
                    <Text style={styles.buttonText}>
                        {submitting ? 'Comprobando...' : 'Iniciar sesión'}
                    </Text>
                </Pressable>
                <Text style={styles.footer}>
                    ¿Aún no tienes cuenta?
                    <Link href="/register" style={styles.link}>
                        Crear cuenta
                    </Link>
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {flex: 1,  backgroundColor: colors.background, padding: spacing.lg},
    back: {width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.surface},
    content: {flex: 1, justifyContent: 'center', maxWidth: 520, width: '100%', alignSelf: 'center', paddingBottom: spacing.xxl},
    icon: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.peachSoft, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg},
    eyebrow: {color: colors.gold, fontSize: typography.label, fontWeight: '800', letterSpacing: 1.5, marginBottom: spacing.sm},
    title: {color: colors.text, fontSize: typography.title, fontWeight: '700'},
    subtitle: {color: colors.textSecondary, fontSize: typography.body, lineHeight: 23, marginTop: 10, marginBottom: spacing.xl},
    error: {color: colors.terracottaLight, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, lineHeight: 18, marginBottom: spacing.md},
    field: {height: 56, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: 10, marginBottom: spacing.sm},
    input: {flex: 1, color: colors.text, fontSize: typography.body},
    button: { height: 56, borderRadius: radius.md, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg },
    buttonText: { color: colors.textOnButton, fontSize: typography.body, fontWeight: '800' },
    pressed: { opacity: 0.78 },
    disabled: { opacity: 0.6 },
    footer: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl, fontSize: 13 },
    link: { color: colors.terracottaLight, fontWeight: '800' }
    
});