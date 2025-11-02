import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Book} from '@/model/Book';
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {deleteBook, getBook} from "@/service/BookService";
import {StarRating} from "@/component/StarRating";
import {HeartToggle} from "@/component/HeartToggle";

export default function Id() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [book, setBook] = useState<Book>();
    const isFocused = useIsFocused();
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;
        getBook(Number(id)).then((data) => setBook(data));
    }, [id, isFocused]);

    const {width: windowWidth} = useWindowDimensions();
    const isNarrow = windowWidth < 640;

    async function handleDelete() {
        if (!book?.id || deleting) return;

        const doDelete = async () => {
            try {
                setDeleting(true);
                const msg = await deleteBook(book.id);
                router.replace(`/?msg=${encodeURIComponent(msg ?? 'Book deleted')}`);
            } catch (err) {
                console.error(err);
                Alert.alert('Delete failed', 'Could not delete the book. Please try again.');
                setDeleting(false);
            }
        };

        if (Platform.OS === 'web') {
            if (window.confirm(`Delete ${book.name}?`)) await doDelete();
        } else {
            Alert.alert('Confirm', `Delete ${book.name}?`, [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', style: 'destructive', onPress: doDelete},
            ]);
        }
    }

    if (!book) {
        return (
            <View style={styles.container}>
                <Text>Loading book details...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            <View style={styles.card}>
                <View style={[styles.row, isNarrow && styles.rowColumn]}>
                    <View style={[styles.imageCol, isNarrow && styles.imageColNarrow]}>
                        <Image
                            source={book.cover ? {uri: book.cover} : require('@/assets/images/unavailable.png')}
                            style={styles.cover}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={[styles.bodyCol, isNarrow && styles.bodyColNarrow]}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>{book.name}</Text>
                            <HeartToggle favorite={book.favorite}/>
                        </View>
                        <Text style={styles.subtitle}>By {book.author ?? 'Unknown author'}</Text>

                        <Text style={styles.paragraph}>{book.theme}</Text>

                        <Text style={styles.meta}>Editor: <Text
                            style={styles.metaValue}>{book.editor ?? '-'}</Text></Text>
                        <Text style={styles.meta}>Year: <Text style={styles.metaValue}>{book.year ?? '-'}</Text></Text>

                        <Text style={styles.meta}>Read: <Text style={styles.metaValue}>{book.read ? 'Yes' : 'No'}</Text></Text>
                        {book.read && <StarRating rating={book.rating} readonly/>}

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => router.push(`/book/bookFormModal?id=${id}`)}
                                accessibilityRole="button"
                                accessibilityLabel="Edit book"
                            >
                                <Text style={styles.actionBtnText}>Edit</Text>
                            </TouchableOpacity>

                            <View style={{width: 12}}/>

                            <TouchableOpacity
                                style={[styles.actionBtn, deleting && styles.actionBtnDisabled, styles.deleteBtn]}
                                onPress={handleDelete}
                                disabled={deleting}
                                accessibilityRole="button"
                                accessibilityLabel={deleting ? 'Deleting' : 'Delete book'}
                            >
                                <Text style={[styles.actionBtnText, styles.deleteBtnText]}>
                                    {deleting ? 'Deleting…' : 'Delete'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 1100,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    imageCol: {
        width: 320,
        aspectRatio: 2 / 3,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cover: {
        width: '100%',
        height: '100%',
    },
    bodyCol: {
        flex: 1,
        width: '100%',
        padding: 18,
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {fontSize: 14, color: '#333', marginBottom: 12},
    paragraph: {fontSize: 16, color: '#444', marginBottom: 12},
    meta: {fontSize: 14, color: '#666', marginBottom: 6},
    metaValue: {color: '#000', fontWeight: '600'},
    actions: {flexDirection: 'row', marginTop: 12, alignItems: 'center'},
    small: {marginTop: 14, fontSize: 12, color: '#888'},

    container: {
        padding: 16,
    },
    rowColumn: {
        flexDirection: 'column',
    },
    imageColNarrow: {
        width: '100%',
        aspectRatio: 2 / 3,
    },
    bodyColNarrow: {
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    actionBtn: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#0078d4',
        borderRadius: 8,
    },
    actionBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    deleteBtn: {
        backgroundColor: 'transparent', // base is neutral; color styled in text
    },
    deleteBtnText: {
        color: '#d32f2f',
    },
    actionBtnDisabled: {
        opacity: 0.6,
    },

});
