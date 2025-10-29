import {Book} from "@/model/Book";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Image} from "expo-image";

export default function BookCard(book: Book) {
    return (
        <Pressable onPress={() => {
            // router.navigate({
            //     pathname: '/profile_page',
            //     params: {id: perso.id}
            // })
        }}>
            <View style={styles.card}>
                <Image/>
                {<Image style={styles.image} source={{uri: book.cover}} alt="Missing image"/>}
                <View style={styles.txtInCard}>
                    <Text>Title: {book.name}</Text>
                    <Text>Author: {book.author}</Text>
                    <Text>Editor: {book.editor}</Text>
                    <Text>Publication year: {book.year}</Text>
                </View>
                <Ionicons name="close-circle-outline" color="red"/>
            </View>
        </Pressable>


    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
        gap: 12,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    txtInCard: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    iconContainer: {
        flexDirection: "row",
        gap: 8,
    },
});