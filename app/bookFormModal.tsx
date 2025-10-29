import {Link, useRouter} from 'expo-router';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {StarRating} from "@/component/StarRating";
import CustomCheckbox from "@/component/CustomCheckbox";
import {addBook, updateBook} from "@/service/BookService";
import {Book} from "@/model/Book";

export default function BookFormModal({book}: { book?: Book }) {
    const router = useRouter();

    const [name, setName] = useState(book?.name ?? '');
    const [author, setAuthor] = useState(book?.author ?? '');
    const [editor, setEditor] = useState(book?.editor ?? '');
    const [year, setYear] = useState(book?.year?.toString() ?? '');
    const [read, setRead] = useState(book?.read ?? false);
    const [favorite, setFavorite] = useState(book?.favorite ?? false);
    const [rating, setRating] = useState(book?.rating ?? 0);
    const [cover, setCover] = useState(book?.cover ?? '');
    const [theme, setTheme] = useState(book?.theme ?? '');

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

        if (book?.id) {
            updateBook({...updatedBook, id: book.id})
                .then(() => {
                    router.back();
                })
                .catch((error) => {
                    console.error("Failed to update book:", error);
                });
        } else {
            addBook(updatedBook)
                .then(() => {
                    router.back();
                })
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
            <TextInput style={styles.formFields} value={editor} placeholder="Enter editor" onChangeText={setEditor}/>
            <View style={styles.checkboxRow}>
                <CustomCheckbox label="Read" value={read} onValueChange={setRead}/>
                <CustomCheckbox label="Favorite" value={favorite} onValueChange={setFavorite}/>
            </View>
            {read && <StarRating rating={rating} setRating={setRating}/>}
            <View style={styles.link}><Button title={book ? "Update Book" : "Add Book"} onPress={handleSubmit}/>
            </View>
            <Link href="/" dismissTo style={styles.link}>
                <Text>Cancel</Text>
            </Link>
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
    }
});
