'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { maskWalletKey } from '@/lib/utils';
import { generateWalletKey, generatePseudonym } from '@/lib/crypto'; // Import fungsi baru
import { AiOutlineCheckCircle } from 'react-icons/ai';

const LoginPage = () => {
    const router = useRouter();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleConnectWallet = () => {
        // Simulasi koneksi wallet dengan SHA yang sesungguhnya
        const walletKey = generateWalletKey();
        const pseudonym = generatePseudonym(); // Generate pseudonim juga
        localStorage.setItem('walletKey', walletKey);
        localStorage.setItem('pseudonym', pseudonym); // Simpan pseudonim

        const maskedKey = maskWalletKey(walletKey);

        // --- SIMULASI: Tambahkan console.log di sini ---
        console.log("SIMULASI WALLET: Kunci dompet SHA-256 berhasil dibuat.");
        console.log(`Kunci Dompet: ${walletKey}`);
        console.log(`Pseudonim Pengguna: ${pseudonym}`);

        setToast({
            message: `Login Sukses! Key: ${maskedKey}`,
            type: 'success',
        });

        setTimeout(() => {
            router.push('/main');
        }, 2000);
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-ungu-primary to-biru-muda-2 relative">
            {toast && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-green-600 transition-all duration-300 animate-fade-in-down">
                    <AiOutlineCheckCircle size={20} />
                    <span>{toast.message}</span>
                </div>
            )}

            <div className="bg-putih-bg p-12 rounded-2xl shadow-custom text-center">
                <h1 className="text-4xl font-bold">Dialectica</h1>
                <p className="mt-2 text-lg text-black">Sign With Ethereum or Solana</p>
                <button
                    onClick={handleConnectWallet}
                    className="mt-8 bg-ungu-primary text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-ungu-primary/80 transition-colors"
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    );
};

export default LoginPage;