import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'ungu-primary': '#C5BAFF',
                'biru-muda-1': '#C4D9FF',
                'biru-muda-2': '#E8F9FF',
                'putih-bg': '#FBFBFB',
            },
            boxShadow: {
                'custom': '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    plugins: [],
};
export default config;