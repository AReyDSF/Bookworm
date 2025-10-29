import {Book, NewBook} from "@/model/Book";

export default async function getBooks() {
    const response = await fetch("http://localhost:3000/books", {method: "GET"})
        .then(results => results.json());

    return response.map((
        {id, name, author, editor, year, read, favorite, rating, cover, theme}:
        {
            id: number,
            name: string,
            author: string,
            editor: string,
            year: number,
            read: boolean,
            favorite: boolean,
            rating: number,
            cover: string,
            theme: string
        }) =>
        ({id, name, author, editor, year, read, favorite, rating, cover, theme})
    );
}

export async function getBook(id: number) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {method: "GET"})
        .then(results => results.json());
    return {
        id: response.id,
        name: response.name,
        author: response.author,
        editor: response.editor,
        year: response.year,
        read: response.read,
        favorite: response.favorite,
        rating: response.rating,
        cover: response.cover,
        theme: response.theme
    };
}

export async function addBook(book: NewBook) {
    fetch("http://localhost:3000/books/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: book.name,
            author: book.author,
            editor: book.editor,
            year: Number(book.year),
            read: book.read,
            favorite: book.favorite,
            cover: book.cover,
            theme: book.theme,
            rating: book.read ? book.rating : 0,
        })
    })
        .then(res => res.json())
        .then(console.log)
}

export async function updateBook(book: Book) {
    const response = await fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: book.name,
            author: book.author,
            editor: book.editor,
            year: Number(book.year),
            read: book.read,
            favorite: book.favorite,
            cover: book.cover,
            theme: book.theme,
            rating: book.read ? book.rating : 0,
        }),
    });

    const updated = await response.json();
    console.log(updated);
}