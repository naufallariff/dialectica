export const    maskWalletKey = (key: string): string => {
    if (key.length < 10) return key;
    return `${key.substring(0, 4)}...${key.substring(key.length - 2)}`;
};