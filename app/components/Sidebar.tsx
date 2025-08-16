'use client';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { Book } from '@/data/books';

interface SidebarProps {
    books: Book[];
    selectedBookId: number | null;
    onBookSelect: (id: number) => void;
    isExpanded: boolean;
    toggleSidebar: () => void;
}

export const Sidebar = ({ books, selectedBookId, onBookSelect, isExpanded, toggleSidebar }: SidebarProps) => (
    <div className={`
      bg-putih-bg shadow-lg 
        transition-all duration-200 ease-in-out
        flex flex-col border-2 mt-4
        ${isExpanded ? 'w-72' : 'w-16'}
    `}>
        {/* Kontainer atas */}
        <div className="flex-1 overflow-y-auto">
            <div className={`flex items-center ${isExpanded ? 'justify-between p-4' : 'justify-center p-2'}`}>
                {isExpanded && <h2 className="text-xl font-semibold">Book List</h2>}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    {isExpanded ? <BsLayoutSidebarInset size={20} /> : <BsLayoutSidebarInsetReverse size={20} />}
                </button>
            </div>

            {/* Daftar buku */}
            <div className={isExpanded ? 'block' : 'hidden'}>
                <ul className="space-y-0">
                    {books.map(book => (
                        <li key={book.id} className="mx-0">
                            <button
                                onClick={() => onBookSelect(book.id)}
                                className={`
                                    w-full text-left p-4 transition-colors
                                    ${selectedBookId === book.id
                                        ? 'bg-biru-muda-1 text-black'
                                        : 'hover:bg-gray-100'}
                                    border-b border-gray-200 last:border-b-0
                                `}
                            >
                                <span className="text-sm font-normal text-black block">{book.title}</span>
                                {book.subtitle && (
                                    <span className="text-xs text-gray-600 block mt-1">{book.subtitle}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Kontainer bawah: Ikon Settings */}
        <div className={`p-2 ${isExpanded ? 'px-3' : 'px-3'}`}>
            <button className={`flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors w-full ${isExpanded ? 'gap-2 justify-start' : 'justify-center'}`}>
                <AiOutlineSetting size={20} />
                {isExpanded && <span>Settings</span>}
            </button>
        </div>
    </div>
);