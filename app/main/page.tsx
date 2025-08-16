// app/main/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BOOKS } from '@/data/books';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { BookContent } from '../components/BookContent';
import { AIChatRoom } from '../components/AIChatRoom';

const MainPage = () => {
    const router = useRouter();
    const [walletKey, setWalletKey] = useState('');
    const [pseudonym, setPseudonym] = useState(''); // State baru untuk pseudonim
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(BOOKS[1].id);

    useEffect(() => {
        const key = localStorage.getItem('walletKey');
        const alias = localStorage.getItem('pseudonym'); // Ambil pseudonim
        if (!key) {
            router.push('/login');
        } else {
            setWalletKey(key);
            setPseudonym(alias || 'Guest'); // Set pseudonim
        }
    }, [router]);

    const selectedBook = BOOKS.find(book => book.id === selectedBookId) || null;

    if (!walletKey) {
        return null;
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            <Navbar walletKey={walletKey} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    books={BOOKS}
                    selectedBookId={selectedBookId}
                    onBookSelect={setSelectedBookId}
                    isExpanded={isSidebarExpanded}
                    toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
                />
                <div className={`flex-1 pl-4 pt-4 transition-all duration-300 overflow-hidden ${isSidebarExpanded ? 'md:ml-0' : 'md:ml-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        <div className="md:col-span-2 bg-putih-bg rounded-sm shadow-md overflow-hidden">
                            <BookContent book={selectedBook} />
                        </div>
                        <div className="md:col-span-1 bg-putih-bg rounded-sm shadow-md overflow-hidden">
                            {/* Teruskan pseudonim ke AIChatRoom */}
                            <AIChatRoom pseudonym={pseudonym} book={selectedBook} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;