'use client';
import { useState, useRef, useEffect } from 'react';
import { MdSend } from "react-icons/md";
import { BsChevronDown } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import { Book } from '@/data/books';

const secureAESKey = "SECURE_AES_KEY_FROM_PQC_EXCHANGE";
const encryptMessage = (message: string) => `ENCRYPTED(${message})`;
const decryptMessage = (message: string) => message.replace('ENCRYPTED(', '').replace(')', '');

interface AIChatRoomProps {
    pseudonym: string;
    book: Book | null;
}

export const AIChatRoom = ({ pseudonym, book }: AIChatRoomProps) => {
    const models = [
        'ibm-granite/granite-3.3-8b-instruct',
        'gemini-1.5-flash'
    ] as const;

    const [model, setModel] = useState<typeof models[number]>(models[0]);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Efek untuk mereset chat saat buku berubah
    useEffect(() => {
        // Reset riwayat chat ketika buku berubah
        setMessages([]);
    }, [book]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        setIsLoading(true);
        const userMessage = input;
        const currentMessageIndex = messages.length;

        const newMessages = [...messages, { text: userMessage, isAI: false }];
        setMessages([...newMessages, { text: '', isAI: true }]);
        setInput('');

        const encryptedUserMessage = encryptMessage(userMessage);
        console.log("SIMULASI ENKRIPSI: Pesan pengguna dienkripsi sebelum dikirim.");
        console.log(`   - Pesan Asli: "${userMessage}"`);
        console.log(`   - Pesan Terenkripsi (konsep): "${encryptedUserMessage}"`);

        // Tambahkan pesan pengguna ke riwayat untuk dikirim ke API
        const chatHistory = newMessages.map(msg => ({
            role: msg.isAI ? 'assistant' : 'user',
            text: msg.text
        }));


        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
                    prompt: userMessage,
                    bookContent: book?.content, // Kirim konten buku
                    chatHistory: chatHistory // Kirim riwayat percakapan
                }),
            });

            if (!response.ok || !response.body) {
                throw new Error(response.statusText);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let responseText = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                responseText += chunk;

                const decryptedChunk = decryptMessage(chunk);

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[currentMessageIndex + 1].text = responseText;
                    return updatedMessages;
                });
            }

            // Tambahkan respons AI ke riwayat chat
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[currentMessageIndex + 1].text = responseText;
                updatedMessages[currentMessageIndex + 1].isAI = true;
                return updatedMessages;
            });

            console.log("SIMULASI DEKRIPSI: Respons AI diterima dan didekripsi.");
            console.log(`   - Respons Asli: "${responseText}"`);

        } catch (error) {
            console.error("Failed to generate AI response:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[currentMessageIndex + 1].text = "Maaf, terjadi kesalahan saat menghubungi AI.";
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-putih-bg rounded-sm border-2 border-gray-200">
            <div className="p-4 border-b-2 shadow-sm bg-biru-muda-1 relative cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef}>
                <div className="flex items-center justify-between">
                    <div className="text-md font-medium text-black">
                        {model}
                    </div>
                    <BsChevronDown className={`transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
                </div>
                {showDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-sm shadow-md z-10 mt-1">
                        {models.map((m) => (
                            <div
                                key={m}
                                className={`p-2 text-sm hover:bg-gray-100 cursor-pointer ${model === m ? 'bg-gray-100 font-medium' : ''}`}
                                onClick={() => {
                                    setModel(m);
                                    setShowDropdown(false);
                                }}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}>
                        {msg.isAI ? (
                            <div className="text-sm text-black whitespace-pre-line">
                                {msg.text}
                            </div>
                        ) : (
                            <div className="text-sm bg-white border-2 text-black p-5 rounded-lg max-w-[80%] whitespace-pre-line">
                                {msg.text}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-2 border-2 m-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 bg-white border-1-biru-muda-1 rounded-sm px-4 py-2">
                    <button className="text-gray-900 hover:text-black">
                        <FaPlus size={18} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent p-1 focus:outline-none text-sm border-none"
                        placeholder="Ask for discussions..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading} className="text-gray-800 hover:text-gray-900 disabled:opacity-50">
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <MdSend size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};