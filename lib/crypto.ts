import CryptoJS from 'crypto-js';

// RSA adalah untuk pertukaran kunci, sementara SHA adalah untuk hashing.
// Kita akan menggunakan SHA untuk simulasi alamat dompet karena visualnya mirip.
export function generateWalletKey(): string {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hash = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex);
    // Menambahkan '0x' di depan untuk mensimulasikan format alamat Ethereum
    return `0x${hash}`;
}

// Fungsi untuk menghasilkan pseudonim acak
export function generatePseudonym(): string {
    const adjectives = ["Anonim", "Rahasia", "Bijak", "Tenang", "Agung", "Cerdas"];
    const nouns = ["Harimau", "Naga", "Singa", "Elang", "Ksatria", "Penyair"];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdj}-${randomNoun}-${randomNumber}`;
}