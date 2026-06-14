import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen   from "./screens/DetailsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BookingsScreen from "./screens/BookingsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { BookingsProvider } from "./context/BookingsContext";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home tab has its own stack for the detail/register flow
function HomeStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#2a4d4c'},
      headerTintColor: '#ffffff',
    }}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
    </Stack.Navigator>
  );
}

// Sits below ThemeProvider so it can read the theme and feed it to Paper + Navigation
function ThemedApp() {
  const { paperTheme, navTheme } = useAppTheme();
  return (
    <PaperProvider theme={paperTheme}>
      <BookingsProvider>
        <NavigationContainer theme={navTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Bookings') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#ed019a',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home"
            component={HomeStack}
            options={{headerShown: false}}
            />
            <Tab.Screen name="Bookings" component={BookingsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </BookingsProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
