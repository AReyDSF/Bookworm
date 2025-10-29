import {Pressable, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export function StarRating({rating, setRating}: { rating: number, setRating: (value: number) => void }) {
    return (
        <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => setRating(star)}>
                    <Ionicons
                        name={star <= rating ? "star" : "star-outline"}
                        size={32}
                        color={star <= rating ? "#f5c518" : "#ccc"}
                    />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    starRow: {
        flexDirection: 'row',
        gap: 8,
        marginVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
