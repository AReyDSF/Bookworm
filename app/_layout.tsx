import {Stack} from "expo-router";

export default function RootLayout() {
    return <Stack>
        <Stack.Screen name="index" options={{title: "Bookworm"}}/>
        <Stack.Screen name="addBookModal" options={{presentation: 'modal', title: 'Add a book'}}/>
    </Stack>;
}
