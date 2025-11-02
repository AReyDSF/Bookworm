import {Book} from "@/model/Book";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {useRouter} from "expo-router";

export default function BookCard({book}: { book: Book }) {
    const router = useRouter();

    return (
        <Pressable style={{width: '100%'}} onPress={() => {
            router.push(`/book/${book.id}`);
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

                        <Text style={styles.description}>
                            {book.author}
                            {book.author && book.year ? ', ' : ''}
                            {book.year ?? ''}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        maxWidth: 640,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        marginVertical: 8,
        alignSelf: 'center',
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