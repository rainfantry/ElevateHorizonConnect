import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button, Divider, useTheme } from 'react-native-paper';
import { useBookings } from '../context/BookingsContext';

export default function BookingsScreen() {
  const { bookings, removeBooking } = useBookings();
  const theme = useTheme();

  if (bookings.length === 0) {
    return (
      <View style={[styles.emptyWrap, { backgroundColor: theme.colors.background }]}>
        <Text variant="titleMedium" style={[styles.emptyTitle, { color: theme.colors.onBackground }]}>
          No bookings yet
        </Text>
        <Text style={[styles.emptyBody, { color: theme.colors.onSurfaceVariant }]}>
          Head to an event and tap "Register for this event". Your tickets show up
          here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text variant="titleLarge" style={[styles.heading, { color: theme.colors.onBackground }]}>
        You have {bookings.length} booking{bookings.length === 1 ? '' : 's'}
      </Text>

      {bookings.map((b) => (
        <Card key={b.id} style={styles.card}>
          <Card.Title title={b.eventTitle} subtitle={`${b.tickets} ticket(s)`} />
          <Card.Content>
            <Text style={styles.line}>Name: {b.name}</Text>
            <Text style={styles.line}>Email: {b.email}</Text>
          </Card.Content>
          <Divider style={styles.divider} />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => removeBooking(b.id)}
              style={styles.deleteButton}
              accessibilityLabel={`Delete booking for ${b.eventTitle}`}
              accessibilityRole="button"
            >
              Delete
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 15 },
  heading: { marginBottom: 12, color: '#2a4d4c', fontWeight: 'bold' },
  card: { marginBottom: 12, elevation: 3 },
  line: { marginTop: 2 },
  divider: { marginTop: 8 },
  deleteButton: { backgroundColor: '#d10e0e' },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyTitle: { fontWeight: 'bold', color: '#2a4d4c', marginBottom: 8 },
  emptyBody: { textAlign: 'center', color: '#3a3a3a' },
});
