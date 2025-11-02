import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Book} from "@/model/Book";
import {useCallback, useState} from "react";
import BookCard from "@/component/BookCard";
import getBooks from "@/service/BookService";
import {useFocusEffect, useRouter} from "expo-router";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);

    useFocusEffect(
        useCallback(() => {
            getBooks().then(setBooks);
        }, [])
    );

    return (
        <ScrollView
            style={styles.mainContainer}
            contentContainerStyle={styles.contentContainer} // center everything
        >
            <Text style={styles.header}>Read books like you&#39;re eating candy.</Text>

            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => router.push("/book/bookFormModal")}
            >
                <Text style={styles.addBtnText}>Add a book</Text>
            </TouchableOpacity>

            <View style={styles.cardContainer}>
                {books.map((book) => (
                    <BookCard book={book} key={book.id}/>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16,
    },
    contentContainer: {
        alignItems: "center",
        paddingBottom: 40,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    addBtn: {
        alignSelf: "center",
        backgroundColor: "#0078d4",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20,
    },
    addBtnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    cardContainer: {
        width: "100%",
        paddingHorizontal: 16,
        gap: 20,
        alignItems: "center",
    },
});
