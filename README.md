# Dialectica – AI Book Chat with Web3 + PQC

> A Socratic-style AI-powered interactive reading experience, prioritizing privacy and quantum-resistant security.

## Table of Contents
- [Background](#background)
- [Objectives](#objectives)
- [Requirements & Indicators](#requirements--indicators)
- [Technical Architecture](#technical-architecture)
- [Setup Instructions](#setup-instructions)
- [Security Considerations](#security-considerations)
- [Roadmap](#roadmap)
- [License & Contribution](#license--contribution)

## Background
Dialectica addresses the limitations of current reading applications, which are largely passive and lack critical dialogue. Our project aims to create a space where users can engage in reflective analysis and debate with an AI companion while reading. Recognizing the growing concerns over privacy in edtech platforms and the impending threat of quantum computers to current encryption methods, Dialectica integrates post-quantum cryptography (PQC) and ensures user anonymity through pseudonymization.

## Objectives
- **Interactive Digital Library**: Develop a platform where users can read, select text portions, and converse with an AI about the content.
- **Reflective Learning**: Facilitate a Socratic-style dialogue between users and AI to promote deeper understanding and critical thinking.
- **Privacy Protection**: Implement pseudonymization, eliminating the storage of real personal data, and use SHA-based simulated Web3 login for user authentication.
- **Quantum-Resistant Security**: Utilize post-quantum cryptography (Kyber/NTRU) with liboqs/oqs-wasm to secure client-server communication.
- **Decentralized MVP**: Deliver a client-only application, avoiding dependency on a central database.

## Requirements & Indicators
- Users must be able to read books, highlight sections, and engage in AI-driven discussions.
- User accounts will be pseudonymized, ensuring no real personal information is stored.
- Simulated Web3 login using SHA hashing will replace real wallet connections for this MVP.
- Client-server communication will employ post-quantum cryptography for enhanced security.
- Comprehensive documentation will be provided for project reproducibility.

## Technical Architecture
- **Frontend**: Built with React, Next.js 14, and styled using TailwindCSS.
- **AI Service**: Leverages IBM Granite through the Replicate API for sophisticated conversational capabilities.
- **Web3 Authentication (Simulated)**: Uses SHA-based hashing for login, avoiding real-time wallet interactions.
- **Security**: Post-Quantum Cryptography (Kyber/NTRU) is implemented using liboqs/oqs-wasm for quantum-resistant encryption.
- **Pseudonymization**: UUIDs combined with crypto-js for maintaining user account identities anonymously.
- **State Management**: Zustand is employed for managing application state efficiently.
- **Database**: The application operates entirely on the client-side, with no reliance on a central database.
- **User Interface Layout**: 
  - **Left Panel**: Lists available books.
  - **Center Panel**: Displays the book content.
  - **Right Panel**: Houses the AI chatbot discussion interface.

## Setup Instructions
1. **Clone the Repository**: `git clone https://github.com/yourusername/dialectica.git`
2. **Install Dependencies**: `cd dialectica && npm install`
3. **Configure Replicate API Key**: Set your Replicate API key in `.env.local` for IBM Granite access.
4. **Run Development Server**: `npm run dev`
5. **Access the Application**: Open your browser and navigate to `http://localhost:3000`

## Security Considerations
- **Quantum-Resistant Encryption**: PQC ensures that even with the advent of quantum computing, data remains secure.
- **User Privacy**: Pseudonymization protects user identities, storing no real personal data.
- **No Centralized Data Storage**: The absence of a central database minimizes the risk of large-scale data breaches.
- **Simulated Web3 Login**: For this MVP, Web3 integration is simulated using SHA hashing, not actual wallet connections.

## Roadmap
- **Expand Book Dataset**: Increase the variety and volume of books available for reading.
- **Enhance AI Conversation Flow**: Improve the naturalness and depth of AI-driven discussions.
- **Integrate Real Wallet**: Transition from simulated to real Web3 login functionalities.
- **Production Deployment**: Migrate the application to a production environment for broader accessibility.
- **Community Engagement**: Encourage and facilitate community contributions and feedback.

## License & Contribution
Dialectica is released under the MIT License. If you're interested in contributing or investing in further development, please contact: **naufalarif09@gmail.com**.

**Acknowledgement**: We extend our gratitude to **Hacktiv8** for the training on code generation with the IBM Granite model via IBM Skillbuild.
```

This README.md provides a comprehensive overview of the Dialectica project, detailing its motivation, objectives, technical architecture, setup instructions, security considerations, roadmap, and contribution details, all formatted in a professional and developer-friendly Markdown style.