import React from 'react';
import {Stack} from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: 'Bookworm'}}/>
            <Stack.Screen name="book" options={{headerShown: false}}/>
        </Stack>
    );
}