import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, Snackbar, useTheme } from 'react-native-paper';
import { useBookings } from '../context/BookingsContext';

export default function RegisterScreen({ route, navigation }) {
  const event = route.params?.item ?? { title: 'this event' };
  const { addBooking } = useBookings();
  const theme = useTheme();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tickets, setTickets] = React.useState('1');
  const [submitted, setSubmitted] = React.useState(false);
  const [snackVisible, setSnackVisible] = React.useState(false);

  // Validation - each returns error string, empty = valid
  const nameError = name.trim().length < 2 ? 'Enter your full name (2+ characters).' : '';
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? ''
    : 'Enter a valid email address.';
  const ticketsNum = parseInt(tickets, 10);
  const ticketsError =
    Number.isInteger(ticketsNum) && ticketsNum >= 1 && ticketsNum <= 10
      ? ''
      : 'Tickets must be a whole number from 1 to 10.';

  const formValid = !nameError && !emailError && !ticketsError;

  const handleRegister = () => {
    setSubmitted(true);
    if (!formValid) return;

    addBooking({
      id: Date.now().toString(),
      eventTitle: event.title,
      name: name.trim(),
      email: email.trim(),
      tickets: ticketsNum,
    });
    setSnackVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Title title="Register" subtitle={event.title} />
        <Card.Content>
          <TextInput
            label="Full name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            error={submitted && !!nameError}
            style={styles.input}
            accessibilityLabel="Full name input"
            accessibilityHint="Enter your full name"
          />
          <HelperText type="error" visible={submitted && !!nameError}>
            {nameError}
          </HelperText>

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={submitted && !!emailError}
            style={styles.input}
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address"
          />
          <HelperText type="error" visible={submitted && !!emailError}>
            {emailError}
          </HelperText>

          <TextInput
            label="Number of tickets"
            mode="outlined"
            value={tickets}
            onChangeText={setTickets}
            keyboardType="number-pad"
            error={submitted && !!ticketsError}
            style={styles.input}
            accessibilityLabel="Number of tickets input"
            accessibilityHint="Enter number of tickets from 1 to 10"
          />
          <HelperText type="error" visible={submitted && !!ticketsError}>
            {ticketsError}
          </HelperText>

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            accessibilityLabel="Confirm registration button"
            accessibilityRole="button"
          >
            Confirm registration
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => {
          setSnackVisible(false);
          navigation.goBack();
        }}
        duration={2000}
        action={{ label: 'Done', onPress: () => navigation.goBack() }}
      >
        {`Registered ${ticketsNum} ticket(s) for ${event.title}.`}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 15 },
  card: { elevation: 3 },
  input: { marginTop: 4 },
  button: { marginTop: 12, backgroundColor: '#ed019a' },
});
