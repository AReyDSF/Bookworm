import {Link, useRouter} from 'expo-router';
import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {StarRating} from "@/component/StarRating";
import CustomCheckbox from "@/component/CustomCheckbox";

export default function AddBookModal() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');
    const [year, setYear] = useState('');
    const [read, setRead] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [rating, setRating] = useState(0);
    const [cover, setCover] = useState('');
    const [theme, setTheme] = useState('');

    function addBook() {
        fetch("http://localhost:3000/books/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                author: author,
                editor: editor,
                year: Number(year),
                read: read,
                favorite: favorite,
                cover: cover,
                theme: theme,
                rating: rating,
            })
        })
            .then(res => res.json())
            .then(console.log)

        //router.back();
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.formFields} value={name} placeholder="Enter name" onChangeText={setName}/>
            <TextInput style={styles.formFields} value={author} placeholder="Enter author" onChangeText={setAuthor}/>
            <TextInput style={styles.formFields} value={editor} placeholder="Enter editor" onChangeText={setEditor}/>
            <TextInput style={styles.formFields} value={year} placeholder="Enter year" onChangeText={setYear}
                       inputMode="numeric"/>
            <Switch value={read} onValueChange={setRead}/>
            <Switch value={favorite} onValueChange={setFavorite}/>
            <StarRating rating={rating} setRating={setRating}/>
            <View style={styles.checkboxRow}>
                <CustomCheckbox label="Read" value={read} onValueChange={setRead}/>
                <CustomCheckbox label="Favorite" value={favorite} onValueChange={setFavorite}/>

            </View>

            <View style={styles.link}><Button title="Add book" onPress={addBook}/></View>
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
        justifyContent: 'space-between',
        marginVertical: 8,
        width: '100%',
    },
    formFields: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
    }
});
