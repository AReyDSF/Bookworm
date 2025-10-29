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