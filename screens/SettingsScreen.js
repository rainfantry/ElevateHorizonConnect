import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Divider, List, useTheme } from 'react-native-paper';
import { useAppTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const { isDark, toggleTheme } = useAppTheme();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        Settings
      </Text>

      <List.Item
        title="Notifications"
        titleStyle={{ color: theme.colors.onBackground }}
        description={notificationsOn ? 'On' : 'Off'}
        descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        right={() => (
          <Switch value={notificationsOn} onValueChange={setNotificationsOn} />
        )}
      />

      <Divider />

      <List.Item
        title="Dark Mode"
        titleStyle={{ color: theme.colors.onBackground }}
        description={isDark ? 'On' : 'Off'}
        descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        right={() => (
          <Switch value={isDark} onValueChange={toggleTheme} />
        )}
      />

      <Divider />

      <Text variant="bodyLarge" style={[styles.body, { color: theme.colors.onSurfaceVariant }]}>
        Your dark-mode choice is saved and remembered next time you open the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: { marginBottom: 12, fontWeight: 'bold' },
  body: { marginTop: 16 },
});
