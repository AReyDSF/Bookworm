import {Animated, Button, StyleSheet, Text, View} from "react-native";
import {Book} from "@/model/Book";
import {useCallback, useState} from "react";
import BookCard from "@/component/BookCard";
import getBooks from "@/service/BookService";
import {useFocusEffect, useRouter} from "expo-router";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);

    useFocusEffect(useCallback(() => {
        getBooks().then(setBooks);
    }, []));

    return (
        <ScrollView style={styles.mainContainer}>
            <Text style={styles.header}>Read books like you&#39;re eating candy.</Text>
            <Button title="Add book" onPress={() => router.push("/book/bookFormModal")}/>

            <View style={styles.cardContainer}>
                {books.map((book) => (<BookCard {...book} key={book.id}/>))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16
    },
    cardContainer: {
        marginTop: 30,
        padding: 16,
        gap: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
});