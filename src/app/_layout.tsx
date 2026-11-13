import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { AuthProvider } from "@/providers/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
    useFrameworkReady();

    return(
        <AuthProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="login"/>
                <Stack.Screen name="register"/>
                <Stack.Screen name="(tabs)"/>
                <Stack.Screen name="scan"/>
                <Stack.Screen name="badge"/>
            </Stack>
        </AuthProvider>
    )
}
