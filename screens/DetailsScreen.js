import {View, StyleSheet} from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";

export default function DetailsScreen({ route, navigation }){
    const { item } = route.params;
    const theme = useTheme();

    return(
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Card style={styles.card}>
                <Card.Title title={item.title} subtitle="Detail View"/>
                <Card.Content>
                    <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.onSurface }]}>
                        {item.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.meta}>
                        ID: {item.id}
                    </Text>
                </Card.Content>
            </Card>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Register", { item })}
                style={styles.registerButton}
                accessibilityLabel={`Register for ${item.title}`}
                accessibilityRole="button"
            >
                Register for this event
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.button}
                accessibilityLabel="Go back"
                accessibilityRole="button"
            >
                Go Back
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 16 },
  card:        { marginBottom: 16, elevation: 3 },
  description: { marginBottom: 8 },
  meta:        { color: "#999" },
  registerButton: { marginTop: 8, backgroundColor: "#ed019a" },
  button:      { marginTop: 8},
});
