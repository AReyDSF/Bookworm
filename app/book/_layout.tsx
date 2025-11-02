import React from 'react';
import {Stack} from 'expo-router';

export default function BookLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{title: 'Book Details'}}/>
            <Stack.Screen name="bookFormModal" options={{presentation: 'modal', title: 'Add/Edit Book',}}/>
        </Stack>
    );
}