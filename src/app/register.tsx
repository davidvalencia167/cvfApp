import { colors, radius, spacing, typography } from "@/constants/theme";
import { registerAttendee } from "@/lib/attendeeApi";
import { useAuth } from "@/providers/AuthProvider";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, Check, LockKeyhole, Mail, UserRound } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();
    const [fullName, setFullName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const handleRegister = async () => { if (!fullName.trim() || !email.trim() || !password || !confirmation) { setMessage('Completa todos los campos para continuar.'); return; } if (password.length < 6) { setMessage('La contraseña debe tener al menos 6 caracteres.'); return; } if (password !== confirmation) { setMessage('Las contraseñas no coinciden.'); return; } if (!accepted) { setMessage('Acepta los términos y la política de privacidad para continuar.'); return; } setSubmitting(true); setMessage(null); try { const result = await registerAttendee(fullName.trim(), email.trim().toLowerCase()); register(fullName.trim(), email.trim().toLowerCase(), password); router.replace({ pathname: '/badge', params: { token: result.qr_token, emailSent: result.email_sent ? '1' : '0' } }); } catch (err) { setMessage(err instanceof Error ? err.message : 'No pudimos completar tu inscripción.'); setSubmitting(false); } };

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Pressable style={styles.back} onPress={() => router.back()}>
                <ArrowLeft size={22} color={colors.text}/>
            </Pressable>

            <View style={styles.form}>
                <Text style={styles.eyebrow}>
                    NUEVO ASISTENTE
                </Text>
                <Text style={styles.title}>
                    Crea tu cuenta
                </Text>
                <Text style={styles.subtitle}>
                    Guarda tu agenda, consulta tus accesos y recibe novedades del congreso.
                </Text>
                {message && <Text style={styles.message}>{message}</Text>}
                <View style={styles.field}>
                    <UserRound size={18} color={colors.textSecondary}/>
                    <TextInput value={fullName} onChangeText={setFullName} placeholder="Nombre completo" placeholderTextColor="#806F63" style={styles.input}/>
                </View>

                <View style={styles.field}>
                    <Mail size={18} color={colors.textSecondary}/>
                    <TextInput value={email} onChangeText={setEmail} placeholder="Correo electrónico" placeholderTextColor="#806F63" autoCapitalize="none" keyboardType="email-address" style={styles.input}/>
                </View>

                <View style={styles.field}>
                    <LockKeyhole size={18} color={colors.textSecondary}/>
                    <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" placeholderTextColor="#806F63" secureTextEntry style={styles.input}/>
                </View>

                <View style={styles.field}>
                    <LockKeyhole size={18} color={colors.textSecondary}/>
                    <TextInput value={confirmation} onChangeText={setConfirmation} placeholder="Confirmar contraseña" placeholderTextColor="#806F63" secureTextEntry style={styles.input}/>
                </View>

                <Pressable style={styles.terms} onPress={() => setAccepted(!accepted)}>
                    <View style={[styles.checkbox, accepted && styles.checkboxActive]}>{accepted && <Check size={14} color={colors.textOnButton}/>}</View>
                    <Text style={styles.termsText}>Acepto los términos y la política de privacidad.</Text>
                </Pressable>

                <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed, submitting && styles.disabled]} onPress={handleRegister} disabled={submitting}>
                    <Text style={styles.buttonText}>{submitting ? 'Creando cuenta…' : 'Crear cuenta'}</Text>
                </Pressable>

                <Text style={styles.footer}>
                    ¿Ya tienes cuenta?
                    <Link href="/login" style={styles.link}>Iniciar sesión</Link>
                </Text>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    screen: {flex: 1, backgroundColor: colors.background},
    content: {padding: spacing.lg, paddingBottom: spacing.xxl},
    back: {width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.surface},
    form: {maxWidth: 520, width: '100%', alignSelf: 'center', paddingTop: spacing.xxl},
    eyebrow: {color: colors.gold, fontSize: typography.label, fontWeight: '800', letterSpacing: 1.5, marginBottom: spacing.sm},
    title: {color: colors.text, fontSize: typography.title, fontWeight: '700'},
    subtitle: {color: colors.textSecondary, fontSize: typography.body, lineHeight: 23, marginTop: 10, marginBottom: spacing.xl},
    message: {color: colors.terracottaLight, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, lineHeight: 18, marginBottom: spacing.md},
    field: {height: 56, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: 10, marginBottom: spacing.sm},
    input: {flex: 1, color: colors.text, fontSize: typography.body},
    terms: {flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: spacing.lg},
    checkbox: {width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: colors.goldDeep, alignItems: 'center', justifyContent: 'center'},
    checkboxActive: {backgroundColor: colors.gold},
    termsText: {flex: 1, color: colors.textSecondary, fontSize: 13, lineHeight: 19},
    button: {height: 56, borderRadius: radius.md, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center'},
    buttonText: {color: colors.textOnButton, fontSize: typography.body, fontWeight: '800'},
    pressed: {opacity: 0.78},
    disabled: {opacity: 0.6},
    footer: {color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl, fontSize: 13},
    link: {color: colors.terracottaLight, fontWeight: '800'}
})