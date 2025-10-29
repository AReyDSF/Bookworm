import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NewBook} from '@/model/Book';
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {getBook} from "@/service/BookService";

export default function BookDetails() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [book, setBook] = useState<NewBook>();

    useEffect(() => {
        getBook(Number(id)).then((data) => setBook(data))
    }, [id])

    if (!book) {
        return (
            <View style={styles.container}>
                <Text>Loading book details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}><Image
                source={book.cover ? {uri: book.cover} : require("@/assets/images/unavailable.png")}
                style={styles.cover} resizeMode="contain" alt="Book cover"
            />
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{book.name}</Text>
                <Text style={styles.label}>Author: <Text style={styles.value}>{book.author}</Text></Text>
                <Text style={styles.label}>Editor: <Text style={styles.value}>{book.editor}</Text></Text>
                <Text style={styles.label}>Year: <Text style={styles.value}>{book.year}</Text></Text>
                <Text style={styles.label}>Theme: <Text style={styles.value}>{book.theme}</Text></Text>
                <Text style={styles.label}>Read: <Text style={styles.value}>{book.read ? 'Yes' : 'No'}</Text></Text>
                <Text style={styles.label}>Favorite: <Text
                    style={styles.value}>{book.favorite ? 'Yes' : 'No'}</Text></Text>
                {book.read && (
                    <Text style={styles.label}>Rating: <Text style={styles.value}>{book.rating}/5</Text></Text>
                )}

                <View style={styles.actions}>
                    <Button title="Edit" onPress={() => {/* navigate to edit */
                    }}/>
                    <Button title="Delete" color="red" onPress={() => {/* confirm delete */
                    }}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        gap: 24,
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
    },
    cover: {
        flexShrink: 1,
        flexBasis: '30%',
        maxWidth: 250,
        aspectRatio: 2 / 3,
        borderRadius: 8,
    },
    imageWrapper: {
        flexBasis: '30%',
        maxWidth: 250,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    details: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 6,
    },
    value: {
        fontWeight: '400',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
        marginTop: 24,
    },
});
