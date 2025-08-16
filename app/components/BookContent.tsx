'use client';
import { Book } from '@/data/books';

interface BookContentProps {
    book: Book | null;
}

export const BookContent = ({ book }: BookContentProps) => {
    // Memproses konten buku menjadi array paragraf
    const paragraphs = book?.content.split('\n\n') || [];

    return (
        <div className="p-10 h-full overflow-y-auto border-2">
            {book ? (
                <>
                    <h2 className="text-3xl font-bold">{book.title}</h2>
                    <p className="mt-2 text-gray-500">Oleh: {book.author}</p>
                    {/* Menggunakan map untuk merender setiap paragraf */}
                    <div className="mt-6 text-gray-700 leading-relaxed text-justify">
                        {paragraphs.map((para, index) => (
                            <p key={index} className="mb-4">
                                {para}
                            </p>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center text-lg mt-10">Pilih buku dari sidebar untuk memulai.</p>
            )}
        </div>
    );
};