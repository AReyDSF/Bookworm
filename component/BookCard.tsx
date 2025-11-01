import {Book} from "@/model/Book";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {useRouter} from "expo-router";

export default function BookCard(book: Book) {
    const router = useRouter();
    return (
        <Pressable onPress={() => {
            router.push({
                pathname: `/book/[id]`,
                params: {id: book.id},
            });
        }}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={book.cover ? {uri: book.cover} : require('@/assets/images/unavailable.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.title}>{book.name}</Text>
                        <Text style={styles.description}>{book.author}</Text>
                        <Text style={styles.timestamp}>Publication year: {book.year}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        maxWidth: 540,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
    },
    imageWrapper: {
        width: '35%',
    },
    image: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    body: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#444',
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
});