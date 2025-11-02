import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export function HeartToggle({favorite, setFavorite, readonly = false, size = 24,}: {
    favorite: boolean;
    setFavorite?: (v: boolean) => void;
    readonly?: boolean;
    size?: number;
}) {
    const iconName = favorite ? 'heart' : 'heart-outline';
    const color = favorite ? '#e0245e' : '#ccc';

    if (readonly) {
        return <Ionicons name={iconName} size={size} color={color}
                         accessibilityLabel={favorite ? 'favorite' : 'not favorite'}/>;
    }

    return (
        <Pressable
            onPress={() => setFavorite?.(!favorite)}
            accessibilityRole="button"
            accessibilityLabel={favorite ? 'Remove favorite' : 'Add favorite'}
            style={styles.pressable}
        >
            <Ionicons name={iconName} size={size} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
