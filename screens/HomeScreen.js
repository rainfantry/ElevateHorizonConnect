import React from 'react';
import { ScrollView, View, StyleSheet, RefreshControl} from 'react-native';
import { Text, Button, Card, ActivityIndicator, useTheme } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
const theme = useTheme();

const [events, setEvents] = React.useState([]);
const [loading, setLoading] = React.useState(true);
const [refreshing, setRefreshing] = React.useState(false);
const [error, setError] = React.useState('');

const EVENTS_URL = 'https://tafeshaun.github.io/elevate-data/events.json';

const loadEvents = async () => {
    try{
        setLoading(true);
        setError('');
        const response = await fetch(EVENTS_URL);
        if(!response.ok){
            throw new Error('Network response failed.')
        }
        const text = await response.text();
        const cleaned = text.replace(/^\uFEFF/, ''); // Strip UTF-8 BOM from response
        const data = JSON.parse(cleaned);
        setEvents(data);
    }
    catch (e){
        setError('Could not load any events. Check your connection and try again.');
        console.error(e);
    }
    finally {
        setLoading(false);
    }
}

const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadEvents().finally(() => setRefreshing(false));
}, []);

React.useEffect(() => {
    loadEvents();
}, []);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

        <Text variant='headlineMedium' style={[styles.title, { color: theme.colors.onBackground }]}>
            Upcoming Events
        </Text>

        {!!error && (
            <View style={{ marginVertical: 12 }}>
                <Text style={{color: '#ff0000'}}>{error}</Text>
                <Button mode="contained" onPress={loadEvents} style={{ marginTop: 8 }}>
                    Retry
                </Button>
            </View>
        )}

        {loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

        {events.map(event => (
        <Card
            key={String(event.id)}
            style={styles.card}
            onPress={() => navigation.navigate("Details", { item: event })}
        >
            <Card.Title title={event.title} subtitle={event.date}/>
                <Card.Content>
                    <Text variant="bodyMedium">{event.description}</Text>
                </Card.Content>
        </Card>
        ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    title: {
        marginBottom:12,
        fontWeight: 'bold',
        color: '#595959',
    },
    subtitle: {
        textAlign: 'center', 
        marginBottom:24, 
        color: '#be5403'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#ed019a',
    },
    card: {
        marginBottom: 12,
        elevation: 3,
    },
});