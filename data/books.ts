import BOOKS_DATA from './books.json';

// Define interface untuk data buku
export interface Book {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    content: string;
}

// Menggunakan data dari file JSON
export const BOOKS: Book[] = BOOKS_DATA;