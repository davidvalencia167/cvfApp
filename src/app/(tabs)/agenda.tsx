
import { AgendaEntry, AgendaRoom, congressAgenda } from "@/constants/congress";
import { colors, radius, spacing } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native";


const WIDE_LAYOUT_MIN_WIDTH = 900;

export default function AgendaScreen() {
    
    const { width } = useWindowDimensions();
    const { session, savedIds, toggleSaved } = useAuth();
    const [dayIndex, setDayIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const day = congressAgenda[dayIndex];
    const isWide = width >= WIDE_LAYOUT_MIN_WIDTH;

    const handleToggle = (sessionId: string) => {
        if (!session) { setError('Inicia sesión para guardar sesiones en tu agenda personal.'); return; }
        setError(null);
        toggleSaved(sessionId);
    };

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.kicker}>PROGRAMA ACADÉMICO</Text>
            <Text style={styles.title}>Agenda</Text>

            <View style={styles.daySwitcher}>
                {
                    congressAgenda.map((item, index) => {
                        const active = index === dayIndex;
                        return(
                            <Pressable key={item.id} style={[styles.dayButton, active && styles.dayButtonActive]} onPress={() => setDayIndex(index)}>
                                <Text style={[styles.dayText, active && styles.dayTextActive]}>{item.label}</Text>
                            </Pressable>
                        );
                    })}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={[styles.rooms, isWide && styles.roomsWide]}>
                {
                    day.rooms.map((room) => (
                        <RoomColumn
                            key={`${day.id}-${room.name}`}
                            dayId={day.id}
                            room={room}
                            savedIds={savedIds}
                            onToggle={handleToggle}
                            style={isWide ? styles.roomColumnWide : undefined}
                        />
                    ))}
            </View>

        </ScrollView>
    );
}

function RoomColumn({ dayId, room, savedIds, onToggle, style }: {
    dayId: string;
    room: AgendaRoom;
    savedIds: string[];
    onToggle: (sessionId: string) => void;
    style?: StyleProp<ViewStyle>;
}) {
    return(
        <View style={[styles.room, style]}>
            <View style={styles.roomHeader}>
                <View style={styles.roomBadge}>
                    <Text style={styles.roomBadgeText}>{room.name.toUpperCase()}</Text>
                </View>

                <View style={styles.roomLine}/>
            </View>

            {
                room.entries.map((entry) => {
                    const sessionId = `${dayId}-${room.name}-${entry.start}`;
                    return(
                        <AgendaEntryCard
                            key={sessionId}
                            entry={entry}
                            saved={savedIds.includes(sessionId)}
                            onToggle={() => onToggle(sessionId)}
                        />
                    );
                })}
        </View>
    );
}

function AgendaEntryCard({ entry, saved, onToggle }: { entry: AgendaEntry; saved: boolean; onToggle: () => void }) {
  const isBreak = Boolean(entry.tag);

  return (
    <View style={[styles.entry, isBreak && styles.entryBreak]}>
      <Text style={styles.time}>{entry.start} - {entry.end}</Text>
      <View style={styles.entryCopy}>
        <Text style={[styles.entryTitle, isBreak && styles.entryTitleBreak]}>{entry.title}</Text>
        {entry.speaker && <Text style={styles.speaker}>{entry.speaker}</Text>}
      </View>
      {entry.tag && <View style={styles.tag}><Text style={styles.tagText}>{entry.tag}</Text></View>}
      {!isBreak && (
        <Pressable
          style={[styles.saveButton, saved && styles.saveButtonActive]}
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Quitar de mi agenda' : 'Guardar en mi agenda'}
        >
          {saved ? <Check size={16} color={colors.textOnButton} /> : <Text style={styles.saveText}>+</Text>}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 110 },
  kicker: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', marginTop: 5, marginBottom: spacing.lg },
  daySwitcher: { flexDirection: 'row', alignSelf: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, padding: 4, marginBottom: spacing.lg },
  dayButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill },
  dayButtonActive: { backgroundColor: colors.terracotta },
  dayText: { color: colors.textSecondary, fontSize: 13, fontWeight: '700' },
  dayTextActive: { color: colors.textOnButton },
  error: { color: colors.terracottaLight, backgroundColor: colors.peachSoft, borderRadius: radius.sm, padding: spacing.sm, lineHeight: 18, marginBottom: spacing.md },
  rooms: { gap: spacing.xl },
  roomsWide: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.lg },
  room: { gap: spacing.sm },
  roomColumnWide: { flex: 1 },
  roomHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs },
  roomBadge: { backgroundColor: colors.congressOrange, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
  roomBadgeText: { color: colors.textOnButton, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  roomLine: { flex: 1, height: 1, backgroundColor: colors.border },
  entry: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  entryBreak: { backgroundColor: 'transparent' },
  time: { color: colors.terracottaLight, fontSize: 12, fontWeight: '800', width: 104 },
  entryCopy: { flex: 1 },
  entryTitle: { color: colors.text, fontSize: 13, fontWeight: '700', lineHeight: 18 },
  entryTitleBreak: { color: colors.textSecondary },
  speaker: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  tag: { backgroundColor: colors.muted, borderWidth: 1, borderColor: colors.cacao, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  tagText: { color: colors.terracottaLight, fontSize: 10, fontWeight: '700' },
  saveButton: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.goldDeep, alignItems: 'center', justifyContent: 'center' },
  saveButtonActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  saveText: { color: colors.gold, fontSize: 19, lineHeight: 22 },
});
