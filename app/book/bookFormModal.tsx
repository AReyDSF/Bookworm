import {useLocalSearchParams, useRouter} from 'expo-router';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {StarRating} from "@/component/StarRating";
import CustomCheckbox from "@/component/CustomCheckbox";
import {addBook, getBook, updateBook} from "@/service/BookService";
import {Book} from "@/model/Book";
import {HeartToggle} from "@/component/HeartToggle";

export default function BookFormModal({book: initialBook}: { book?: Book }) {
    const router = useRouter();

    const {id} = useLocalSearchParams<{ id?: string }>();
    const [bookId, setBookId] = useState<number | undefined>(initialBook?.id);

    const [name, setName] = useState(initialBook?.name ?? '');
    const [author, setAuthor] = useState(initialBook?.author ?? '');
    const [editor, setEditor] = useState(initialBook?.editor ?? '');
    const [year, setYear] = useState(initialBook?.year?.toString() ?? '');
    const [read, setRead] = useState(initialBook?.read ?? false);
    const [favorite, setFavorite] = useState(initialBook?.favorite ?? false);
    const [rating, setRating] = useState(initialBook?.rating ?? 0);
    const [cover, setCover] = useState(initialBook?.cover ?? '');
    const [theme, setTheme] = useState(initialBook?.theme ?? '');

    useEffect(() => {
        if (initialBook) return;
        if (!id) return;
        const numeric = Number(id);
        if (Number.isNaN(numeric)) return;
        getBook(numeric).then((data) => {
            if (!data) return;
            setBookId(data.id);
            setName(data.name ?? '');
            setAuthor(data.author ?? '');
            setEditor(data.editor ?? '');
            setYear(data.year?.toString() ?? '');
            setRead(data.read ?? false);
            setFavorite(data.favorite ?? false);
            setRating(data.rating ?? 0);
            setCover(data.cover ?? '');
            setTheme(data.theme ?? '');
        });
    }, [id, initialBook]);

    function handleSubmit() {
        const updatedBook = {
            name,
            author,
            editor,
            year: Number(year),
            read,
            favorite,
            cover,
            theme,
            rating: read ? rating : 0,
        };

        if (bookId) {
            updateBook({...updatedBook, id: bookId})
                .then(() => router.back())
                .catch((error) => {
                    console.error("Failed to update book:", error);
                });
        } else {
            addBook(updatedBook)
                .then(() => router.back())
                .catch((error) => {
                    console.error("Failed to add book:", error);
                });
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.formFields} value={name} placeholder="Enter name" onChangeText={setName}/>
            <TextInput style={styles.formFields} value={author} placeholder="Enter author" onChangeText={setAuthor}/>
            <TextInput style={styles.formFields} value={editor} placeholder="Enter editor" onChangeText={setEditor}/>
            <TextInput style={styles.formFields} value={year} placeholder="Enter year" onChangeText={setYear}
                       inputMode="numeric"/>
            <TextInput style={styles.formFields} value={cover} placeholder="Enter cover url" onChangeText={setCover}/>
            <TextInput style={styles.formFields} value={theme} placeholder="Enter theme" onChangeText={setTheme}/>
            <View style={styles.checkboxRow}>
                <CustomCheckbox label="Read" value={read} onValueChange={setRead}/>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                    <HeartToggle favorite={favorite} setFavorite={setFavorite}/>
                </View>
            </View>
            {read && <StarRating rating={rating} setRating={setRating}/>}
            <View style={styles.link}>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={handleSubmit}
                    accessibilityRole="button"
                    accessibilityLabel={bookId ? 'Update book' : 'Add book'}
                >
                    <Text style={styles.addBtnText}>{bookId ? 'Update Book' : 'Add Book'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        width: '100%',
        gap: 24,
    },
    formFields: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
    },
    addBtn: {
        alignSelf: 'center',
        backgroundColor: '#0078d4',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
