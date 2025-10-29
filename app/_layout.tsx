import {Stack} from "expo-router";

export default function RootLayout() {
    return <Stack>
        <Stack.Screen name="index" options={{title: "Bookworm"}}/>
        <Stack.Screen name="bookFormModal" options={{presentation: 'modal', title: 'Add a book'}}/>
        <Stack.Screen name="bookDetails" options={{title: "Book details"}}/>
    </Stack>;
}
