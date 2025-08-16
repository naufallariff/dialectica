import Replicate from 'replicate';

// Pastikan REPLICATE_API_TOKEN ada di file .env.local
if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
}

export const replicateClient = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});