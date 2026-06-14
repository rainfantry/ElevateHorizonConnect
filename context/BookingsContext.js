import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Shared bookings state - RegisterScreen writes, BookingsScreen reads/deletes
const BookingsContext = React.createContext(null);

const STORAGE_KEY = '@ehc_bookings';

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = React.useState([]);

  // Load saved bookings on startup
  React.useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          setBookings(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Could not load bookings', e);
      }
    })();
  }, []);

  // Save to storage whenever bookings change
  React.useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)).catch((e) =>
      console.warn('Could not save bookings', e)
    );
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, removeBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = React.useContext(BookingsContext);
  if (!ctx) {
    throw new Error('useBookings() must be used inside <BookingsProvider>.');
  }
  return ctx;
}
