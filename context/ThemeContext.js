import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import {
  DefaultTheme as NavLight,
  DarkTheme as NavDark,
} from '@react-navigation/native';

// Dark mode toggle - persisted so it survives app restart
const STORAGE_KEY = '@ehc_dark_mode';

const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = React.useState(false);

  // Load saved preference on startup
  React.useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) setIsDark(saved === 'true');
      } catch (e) {
        console.warn('Could not load theme preference', e);
      }
    })();
  }, []);

  // Flip dark mode and save it
  const toggleTheme = React.useCallback(async () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, String(next)).catch((e) =>
        console.warn('Could not save theme preference', e)
      );
      return next;
    });
  }, []);

  // Feed matching themes to both Paper and Navigation
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDark ? NavDark : NavLight;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, paperTheme, navTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme() must be used inside <ThemeProvider>.');
  }
  return ctx;
}
