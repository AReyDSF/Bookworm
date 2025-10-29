import {Pressable, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function CustomCheckbox({label, value, onValueChange}: {
    label: string,
    value: boolean,
    onValueChange: (val: boolean) => void
}) {
    return (
        <Pressable style={styles.checkboxRow} onPress={() => onValueChange(!value)}>
            <Ionicons
                name={value ? "checkbox" : "square-outline"}
                size={24}
                color={value ? "#007aff" : "#ccc"}
            />
            <Text style={styles.checkboxLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
});
