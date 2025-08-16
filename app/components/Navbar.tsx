'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { maskWalletKey } from '@/lib/utils';
import { BiLogOut } from 'react-icons/bi';

interface NavbarProps {
    walletKey: string;
}

export const Navbar = ({ walletKey }: NavbarProps) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const maskedKey = maskWalletKey(walletKey);

    const handleLogout = () => {
        localStorage.removeItem('walletKey');
        // TODO: Tampilkan toast notif logout
        router.push('/login');
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-ungu-primary text-white shadow-lg">
            <h1 className="text-2xl font-bold">Dialectica</h1>
            <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 p-2 rounded-lg bg-putih-bg hover:bg-gray-100 transition-colors text-black">
                    <span className='text-xs font-mono'>{maskedKey}</span>
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                        <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                            <BiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};