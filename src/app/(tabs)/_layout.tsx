import { colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import { CalendarDays, Clapperboard, Home, Radio, UserRound } from "lucide-react-native";


export default function TabsLayout() {
    return(
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.terracotta,
            tabBarInactiveTintColor: "#806F63",
            tabBarStyle: { backgroundColor: "#16110E", borderTopColor: colors.border, height: 72, paddingTop: 8 },
            tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginBottom: 6 },
        }}>
            <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color, size }) => <Home color={color} size={size} />}}/>
            <Tabs.Screen name="agenda" options={{ title: 'Agenda', tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }}/>
            <Tabs.Screen name="live" options={{ title: 'En vivo', tabBarIcon: ({ color, size }) => <Radio color={color} size={size}/>}}/>
            <Tabs.Screen name="recordings" options={{ title: 'Grabaciones', tabBarIcon: ({ color, size }) => <Clapperboard color={color} size={size}/>}}/>
            <Tabs.Screen name="profile" options={{ title: 'Pefil', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size}/> }}/>
        </Tabs>
    );
}