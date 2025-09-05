import type { Course } from '@/lib/types';

export const courses: Omit<Course, 'progress'>[] = [
    // Web3 - Beginner
    {
        id: 'web3-001',
        title: "Web3 Fundamentals",
        description: "Grasp the core concepts of the decentralized web, from blockchain to dApps.",
        longDescription: "This course is the perfect starting point for your Web3 journey. It explains the philosophy behind decentralization, the role of blockchain technology, and how decentralized applications (dApps) are set to revolutionize the internet as we know it.",
        category: "Web3",
        level: "Beginner",
        duration: "6h",
        instructor: "Fatima Aliyu",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Decentralized Web",
            lessons: [{ title: "What is Web3?", content: "Learn about the evolution from Web1 to Web3 and the core principles of decentralization, trustlessness, and user ownership.", duration: "45m", completed: false }],
            quiz: [{ questionText: "What is a core principle of Web3?", options: ["Centralized control", "User data ownership", "Corporate governance"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What does dApp stand for?", options: ["Digital Application", "Decentralized Application", "Data Application"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-002',
        title: "Blockchain Basics",
        description: "Understand how blockchain technology works, including blocks, chains, and consensus.",
        longDescription: "Demystify blockchain technology. This course breaks down complex concepts like cryptographic hashing, block creation, and consensus mechanisms (like Proof of Work and Proof of Stake) into easy-to-understand lessons. You'll understand the magic behind the technology that powers cryptocurrencies and more.",
        category: "Web3",
        level: "Beginner",
        duration: "7h",
        instructor: "Chinedu Okafor",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Structure of a Blockchain",
            lessons: [{ title: "Blocks, Chains, and Hashing", content: "Learn how individual blocks are created and linked together using cryptographic hashes to form an immutable chain.", duration: "1h", completed: false }],
            quiz: [{ questionText: "What makes a blockchain immutable?", options: ["Central servers", "Cryptographic links between blocks", "User passwords"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Proof of Work is an example of a:", options: ["Consensus mechanism", "Type of cryptocurrency", "Programming language"], correctAnswerIndex: 0 }]
    },
    {
        id: 'web3-003',
        title: "Introduction to Web3",
        description: "A high-level overview of the Web3 ecosystem, its key players, and its potential.",
        longDescription: "Get a bird's-eye view of the entire Web3 landscape. We explore major platforms like Ethereum and Solana, discuss different use cases from DeFi to NFTs, and look at the future potential of a decentralized internet.",
        category: "Web3",
        level: "Beginner",
        duration: "4h",
        instructor: "Fatima Aliyu",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Web3 Landscape",
            lessons: [{ title: "Exploring the Ecosystem", content: "Discover the key components of the Web3 world, including blockchains, wallets, dApps, and DAOs.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Ethereum is an example of a:", options: ["Web browser", "Blockchain platform", "Social media app"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Which of the following is a use case for Web3?", options: ["Sending emails", "Decentralized Finance (DeFi)", "Editing photos"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-004',
        title: "Smart Contract Fundamentals",
        description: "Learn what smart contracts are, how they work, and their role in automation.",
        longDescription: "Smart contracts are the backbone of Web3. This course explains what they are (self-executing contracts with the terms of the agreement directly written into code), how they run on a blockchain, and their potential to automate processes in finance, governance, and more.",
        category: "Web3",
        level: "Beginner",
        duration: "5h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Understanding Smart Contracts",
            lessons: [{ title: "What is a Smart Contract?", content: "Learn the core concept of self-executing code on a blockchain and how it enables trustless interactions.", duration: "40m", completed: false }],
            quiz: [{ questionText: "Smart contracts are:", options: ["Legal documents", "Self-executing code on a blockchain", "A type of cryptocurrency"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is the primary benefit of smart contracts?", options: ["They are fast", "They are trustless and automated", "They are easy to write"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-005',
        title: "Introduction to DeFi",
        description: "Discover the world of Decentralized Finance and its key components like lending and borrowing.",
        longDescription: "Explore the revolutionary world of Decentralized Finance (DeFi). This course covers the core concepts of building a financial system on the blockchain, free from traditional intermediaries. You'll learn about decentralized exchanges, lending protocols, and yield farming.",
        category: "Web3",
        level: "Beginner",
        duration: "6h",
        instructor: "Michael Adebayo",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is DeFi?",
            lessons: [{ title: "Finance on the Blockchain", content: "Learn how DeFi aims to recreate traditional financial systems with open-source, permissionless protocols.", duration: "45m", completed: false }],
            quiz: [{ questionText: "DeFi stands for:", options: ["Digital Finance", "Decentralized Finance", "Distributed Finance"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a Decentralized Exchange (DEX)?", options: ["A traditional stock market", "A platform for peer-to-peer trading without an intermediary", "A bank"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-006',
        title: "Web3 for Beginners",
        description: "A friendly and practical guide to getting started with the decentralized web.",
        longDescription: "This course is designed for non-developers who want to understand and use the decentralized web. We walk you through setting up a wallet, interacting with dApps, and understanding the core ideas behind user-owned data and digital assets.",
        category: "Web3",
        level: "Beginner",
        duration: "4h",
        instructor: "Jane Foster",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Your First Steps in Web3",
            lessons: [{ title: "Setting up a Crypto Wallet", content: "Learn what a crypto wallet is, the difference between hot and cold wallets, and how to securely set one up.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A crypto wallet is used to:", options: ["Store physical cash", "Manage your digital assets and interact with dApps", "Browse the internet"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a dApp?", options: ["A decentralized application", "A downloadable application", "A data-heavy application"], correctAnswerIndex: 0 }]
    },
    {
        id: 'web3-007',
        title: "Introduction to NFTs",
        description: "Learn what Non-Fungible Tokens (NFTs) are, their use cases, and how they work.",
        longDescription: "Go beyond the hype and understand the technology of Non-Fungible Tokens. This course explains what 'non-fungible' means, how NFTs represent ownership on a blockchain, and explores their use cases in art, gaming, and digital identity.",
        category: "Web3",
        level: "Beginner",
        duration: "4h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is an NFT?",
            lessons: [{ title: "Understanding Non-Fungibility", content: "Learn the difference between fungible tokens (like currency) and non-fungible tokens (unique assets).", duration: "30m", completed: false }],
            quiz: [{ questionText: "NFT stands for:", options: ["New Financial Technology", "Non-Fungible Token", "Networked File Transfer"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "An NFT represents:", options: ["A share in a company", "Unique ownership of a digital or physical asset", "A type of cryptocurrency"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-008',
        title: "Web3 Marketing",
        description: "Discover new strategies for marketing in the decentralized ecosystem.",
        longDescription: "Marketing is different in Web3. This course explores community-centric marketing strategies, how to engage with users through tokens and NFTs, and the importance of transparency and grassroots growth over traditional advertising.",
        category: "Web3",
        level: "Beginner",
        duration: "5h",
        instructor: "Michael Chen",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Community is King",
            lessons: [{ title: "Building a Web3 Community", content: "Learn why building a strong, engaged community is the most important marketing activity for a Web3 project.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A key aspect of Web3 marketing is:", options: ["Traditional advertising", "Community building", "Email marketing"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a 'token drop' often used for?", options: ["Paying salaries", "Rewarding early community members", "Securing the network"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-009',
        title: "Blockchain and Web3",
        description: "A course connecting the dots between blockchain technology and the Web3 vision.",
        longDescription: "This course synthesizes your knowledge by explicitly connecting the technical features of blockchain (decentralization, immutability) to the broader vision of Web3 (user ownership, open protocols). It helps you see the big picture of how the technology enables the movement.",
        category: "Web3",
        level: "Beginner",
        duration: "5h",
        instructor: "Fatima Aliyu",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Connecting Technology to Vision",
            lessons: [{ title: "How Blockchain Powers Web3", content: "This lesson explicitly links concepts like decentralization and consensus to the Web3 goals of building a user-owned internet.", duration: "45m", completed: false }],
            quiz: [{ questionText: "Immutability on a blockchain leads to what feature in Web3?", options: ["Faster speeds", "Censorship resistance", "Lower costs"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Web3 aims to be a more _____ internet.", options: ["Corporate-controlled", "User-owned", "Regulated"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-010',
        title: "Web3 and Metaverse",
        description: "Explore the intersection of Web3 technologies and the emerging Metaverse.",
        longDescription: "The Metaverse promises to be a persistent, interconnected set of virtual spaces. This course explores how Web3 technologies like NFTs for digital assets and DAOs for governance are crucial building blocks for an open and user-owned Metaverse, as opposed to a closed, corporate-controlled one.",
        category: "Web3",
        level: "Beginner",
        duration: "6h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Building the Open Metaverse",
            lessons: [{ title: "The Role of NFTs in Virtual Worlds", content: "Learn how NFTs can represent ownership of virtual land, avatars, and items, creating a true creator economy.", duration: "50m", completed: false }],
            quiz: [{ questionText: "In the Metaverse, NFTs can be used to represent:", options: ["Chat messages", "Ownership of virtual items", "User passwords"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A DAO could be used in the Metaverse to:", options: ["Render graphics", "Govern a virtual world", "Increase internet speed"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-011',
        title: "Decentralized Applications (dApps)",
        description: "Learn the architecture of dApps and how they differ from traditional web apps.",
        longDescription: "This course explains the fundamental architecture of a decentralized application. You'll learn how a dApp's frontend interacts with a smart contract on the blockchain, which serves as its backend, and understand the key differences compared to a traditional client-server web application.",
        category: "Web3",
        level: "Beginner",
        duration: "5h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The dApp Stack",
            lessons: [{ title: "Frontend Meets Smart Contract", content: "Understand the key components of a dApp: a frontend for user interaction and a smart contract for backend logic on the blockchain.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A dApp's backend is typically a:", options: ["Centralized server", "Smart contract", "Mobile device"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a major advantage of dApps?", options: ["They are always faster", "They are censorship-resistant", "They are controlled by one company"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-012',
        title: "Web3 Identity and Authentication",
        description: "Discover how identity works in a decentralized world using wallets and digital signatures.",
        longDescription: "Explore the concept of Self-Sovereign Identity (SSI) in Web3. This course explains how your crypto wallet acts as your identity, allowing you to authenticate with dApps and prove ownership of assets without relying on a traditional username and password from a central provider.",
        category: "Web3",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Aisha Bello",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Self-Sovereign Identity",
            lessons: [{ title: "Authenticating with Your Wallet", content: "Learn how dApps use cryptographic signatures from your wallet to verify your identity without needing a password.", duration: "45m", completed: false }],
            quiz: [{ questionText: "In Web3, your primary identity is often your:", options: ["Email address", "Crypto wallet address", "Social media profile"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a major benefit of Web3 identity?", options: ["It's controlled by a single company", "It gives the user control over their own data", "It's easier to remember than a password"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-013',
        title: "Web3 Community Building",
        description: "Learn the art and science of building and managing a thriving Web3 community.",
        longDescription: "A strong community is the lifeblood of any Web3 project. This course covers the essentials of community building, from choosing the right platform (like Discord or Telegram) to fostering engagement, establishing a positive culture, and using tools to manage a growing user base.",
        category: "Web3",
        level: "Beginner",
        duration: "6h",
        instructor: "Jane Foster",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Community Flywheel",
            lessons: [{ title: "From Early Adopters to Evangelists", content: "Learn the strategies for attracting your first community members and empowering them to become advocates for your project.", duration: "50m", completed: false }],
            quiz: [{ questionText: "A popular platform for Web3 communities is:", options: ["Facebook", "Discord", "LinkedIn"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a key to a successful Web3 community?", options: ["Heavy advertising", "Active engagement and a sense of ownership", "Strict rules"], correctAnswerIndex: 1 }]
    },
    
    // Futures Trading - Beginner
    {
        id: 'futures-001',
        title: "Futures Trading 101",
        description: "The essential starting point for anyone new to futures trading.",
        longDescription: "This course is the A-to-Z guide for absolute beginners. We cover what futures contracts are, why they exist, who trades them, and the basic terminology you need to know before you even think about placing a trade. This is your foundation for success.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "5h",
        instructor: "Michael Adebayo",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Core Concepts",
            lessons: [{ title: "Understanding Futures Contracts", content: "Learn what a futures contract is, the concept of leverage, and the difference between hedging and speculating.", duration: "45m", completed: false }],
            quiz: [{ questionText: "Leverage in futures trading can:", options: ["Only increase profits", "Amplify both gains and losses", "Eliminate risk"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A 'speculator' in the futures market aims to:", options: ["Reduce risk on a physical commodity", "Profit from price movements", "Provide liquidity"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-002',
        title: "Introduction to Futures Trading",
        description: "A practical introduction to the futures market and trading platforms.",
        longDescription: "This course moves from theory to practice. We'll guide you through the process of choosing a broker, understanding a trading platform's interface, and reading futures contract specifications. You'll learn the practical steps needed to get started.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "6h",
        instructor: "Nasir Ibrahim Imam",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Getting Set Up",
            lessons: [{ title: "Choosing a Broker and Platform", content: "Learn the key factors to consider when selecting a futures broker, including commissions, platform features, and customer support.", duration: "45m", completed: false }],
            quiz: [{ questionText: "The 'tick size' of a futures contract refers to its:", options: ["Physical size", "Minimum price fluctuation", "Expiration date"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a 'margin' in futures trading?", options: ["The profit on a trade", "A good faith deposit to open a position", "The broker's commission"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-003',
        title: "Futures Trading Strategies",
        description: "Learn basic but effective strategies for trading futures.",
        longDescription: "Discover foundational trading strategies that you can start using right away. This course covers trend-following, range trading, and breakout strategies. We'll show you how to identify the market conditions suitable for each and the entry and exit rules.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "7h",
        instructor: "Michael Adebayo",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Trend Following",
            lessons: [{ title: "Trading with the Trend", content: "Learn the classic trading wisdom 'the trend is your friend' and how to use moving averages to identify and trade with the market's primary direction.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Trend-following strategies work best in:", options: ["Sideways markets", "Trending markets", "Volatile markets"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A 'breakout' strategy involves trading:", options: ["Inside a trading range", "When the price moves outside a defined range", "Only at the market open"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-004',
        title: "Futures Market Analysis",
        description: "A beginner's guide to both technical and fundamental market analysis.",
        longDescription: "Learn the two major schools of thought in market analysis. This course introduces you to technical analysis (studying price charts) and fundamental analysis (studying economic factors). You'll understand how to use both to form a complete view of the market.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "6h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Two Schools of Thought",
            lessons: [{ title: "Technical vs. Fundamental Analysis", content: "Understand the core differences between analyzing price action and analyzing underlying economic factors.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A technical analyst primarily studies:", options: ["Economic reports", "Price charts", "Company earnings"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "An interest rate decision is an example of:", options: ["Technical data", "Fundamental data", "Price action"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-005',
        title: "Risk Management in Futures Trading",
        description: "Learn the most important skill for any trader: how to manage risk and protect your capital.",
        longDescription: "Trading is all about managing risk. This crucial course teaches you the essentials of risk management, including how to set stop-loss orders, determine the correct position size, and understand the risk-to-reward ratio of your trades. This is the key to long-term survival in the markets.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Aisha Bello",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Protecting Your Capital",
            lessons: [{ title: "The Stop-Loss Order", content: "Learn what a stop-loss order is and why it's the most important tool for limiting potential losses on any single trade.", duration: "40m", completed: false }],
            quiz: [{ questionText: "A stop-loss order is designed to:", options: ["Guarantee a profit", "Limit your potential loss", "Enter a trade"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The risk-to-reward ratio compares:", options: ["The amount you risk to the amount you expect to gain", "Your total capital to your risk", "Your wins vs. your losses"], correctAnswerIndex: 0 }]
    },
    {
        id: 'futures-006',
        title: "Futures Trading for Beginners",
        description: "A comprehensive course covering all the essentials for new futures traders.",
        longDescription: "This is a complete package for the new trader. It combines the fundamentals of futures, market analysis, risk management, and basic strategies into one course, giving you a well-rounded foundation to confidently start your trading journey.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "10h",
        instructor: "Nasir Ibrahim Imam",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Complete Foundation",
            lessons: [{ title: "From Concept to First Trade", content: "This module provides a summary of all essential knowledge, from understanding contracts to managing risk, preparing you for the market.", duration: "1h", completed: false }],
            quiz: [{ questionText: "What is the most important aspect of trading?", options: ["High profits", "Risk management", "Complex strategies"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A good first step for a beginner trader is to:", options: ["Risk a lot of money", "Learn and practice with a solid plan", "Ignore market news"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-007',
        title: "Technical Analysis for Futures Trading",
        description: "An introduction to reading charts and using technical indicators for trading decisions.",
        longDescription: "Learn to read the language of the market: price charts. This course introduces you to the core concepts of technical analysis, including support and resistance, trendlines, and common chart patterns. You'll learn how to interpret what the chart is telling you.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "7h",
        instructor: "Michael Adebayo",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Reading the Charts",
            lessons: [{ title: "Support and Resistance", content: "Learn to identify key price levels where the market has previously reversed, providing potential trading opportunities.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Support is a price level where:", options: ["Selling pressure is expected to be strong", "Buying pressure is expected to be strong", "The price never goes"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A trendline is drawn to:", options: ["Connect key highs or lows to visualize a trend", "Predict the exact future price", "Calculate profit"], correctAnswerIndex: 0 }]
    },
    {
        id: 'futures-008',
        title: "Futures Trading with Chart Patterns",
        description: "Learn to identify and trade common chart patterns like triangles, flags, and double tops.",
        longDescription: "Price charts often form recognizable patterns that can indicate future price movements. This course teaches you how to spot, interpret, and trade some of the most common and reliable chart patterns, such as triangles, flags, and double tops/bottoms.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "6h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Reversal Patterns",
            lessons: [{ title: "Double Tops and Bottoms", content: "Learn to identify these powerful reversal patterns that can signal the end of a trend.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A double top pattern looks like the letter:", options: ["W", "M", "S"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Chart patterns are a form of:", options: ["Fundamental analysis", "Technical analysis", "Economic forecasting"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-009',
        title: "Futures Trading Psychology",
        description: "Master the mental game of trading by understanding fear, greed, and discipline.",
        longDescription: "Trading is 90% psychology. This course explores the common psychological pitfalls that cause traders to lose money, such as fear, greed, and hope. You'll learn practical techniques to develop discipline, patience, and a resilient trading mindset.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "5h",
        instructor: "Jane Foster",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Trader's Mind",
            lessons: [{ title: "Conquering Fear and Greed", content: "Understand how the emotions of fear and greed can sabotage your trading decisions and learn strategies to control them.", duration: "40m", completed: false }],
            quiz: [{ questionText: "The two primary emotions to control in trading are:", options: ["Joy and sadness", "Fear and greed", "Excitement and boredom"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A trading plan is important because it:", options: ["Guarantees profits", "Helps remove emotion from decisions", "Is required by brokers"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-010',
        title: "Futures Trading with Indicators",
        description: "An introduction to using popular indicators like Moving Averages and RSI.",
        longDescription: "Technical indicators can help clarify price action and provide trade signals. This course introduces you to some of the most popular indicators, including Moving Averages for trend identification and the Relative Strength Index (RSI) for measuring momentum.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "6h",
        instructor: "Tunde Adekunle",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Trend Indicators",
            lessons: [{ title: "Moving Averages", content: "Learn how to use moving averages to identify the direction and strength of a market trend.", duration: "45m", completed: false }],
            quiz: [{ questionText: "A Moving Average is a type of:", options: ["Momentum indicator", "Trend indicator", "Volatility indicator"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The RSI indicator is used to identify:", options: ["The market trend", "Overbought and oversold conditions", "Support and resistance levels"], correctAnswerIndex: 1 }]
    },

    // Tech Skills - Beginner
    {
        id: 'tech-001',
        title: "Introduction to Coding",
        description: "A gentle introduction to the world of programming for absolute beginners.",
        longDescription: "Ever wondered how software is made? This course is your first step. It demystifies coding by explaining the core concepts in simple terms. You'll learn what a programming language is, write your first lines of code, and understand the logic that makes software work.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "5h",
        instructor: "Nasir Ibrahim Imam",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The World of Code",
            lessons: [{ title: "What is Programming?", content: "Learn the fundamental concepts of giving instructions to a computer and how programming powers the digital world.", duration: "30m", completed: false }],
            quiz: [{ questionText: "A programming language is a way to:", options: ["Talk to other people", "Instruct a computer", "Design images"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A 'variable' in programming is used to:", options: ["Store information", "End the program", "Draw on the screen"], correctAnswerIndex: 0 }]
    },
    {
        id: 'tech-002',
        title: "Web Development Basics",
        description: "Learn the essential trio of web development: HTML, CSS, and JavaScript.",
        longDescription: "This course covers the three fundamental technologies that build the web. You will learn how to structure pages with HTML, style them with CSS for a great look, and add interactivity with JavaScript to make them come alive.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "8h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Structuring the Web",
            lessons: [{ title: "Introduction to HTML", content: "Learn the basic tags and structure of an HTML document, the skeleton of every webpage.", duration: "1h", completed: false }],
            quiz: [{ questionText: "HTML stands for:", options: ["HyperText Markup Language", "High-Tech Media Language", "Hyper-Transferable Markup Language"], correctAnswerIndex: 0 }]
        }],
        finalAssessment: [{ questionText: "Which language is used to add interactivity to a website?", options: ["HTML", "CSS", "JavaScript"], correctAnswerIndex: 2 }]
    },
    {
        id: 'tech-003',
        title: "Cybersecurity Fundamentals",
        description: "Understand common cyber threats and learn how to protect yourself and your data.",
        longDescription: "In today's digital world, cybersecurity is more important than ever. This course introduces you to the basics of digital security, covering topics like malware, phishing, strong passwords, and safe browsing habits to help you protect your personal information.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "6h",
        instructor: "Dr. Aisha Bello",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Threat Landscape",
            lessons: [{ title: "Understanding Malware and Phishing", content: "Learn to identify common types of malicious software and deceptive techniques used to steal information.", duration: "45m", completed: false }],
            quiz: [{ questionText: "Phishing is an attempt to:", options: ["Steal sensitive information", "Install a virus", "Fix your computer"], correctAnswerIndex: 0 }]
        }],
        finalAssessment: [{ questionText: "What is a key feature of a strong password?", options: ["It's easy to remember", "It's a common word", "It includes a mix of character types"], correctAnswerIndex: 2 }]
    },
    {
        id: 'tech-004',
        title: "Artificial Intelligence (AI) Basics",
        description: "A non-technical introduction to the concepts and impact of Artificial Intelligence.",
        longDescription: "This course is for anyone curious about AI, no technical background required. We'll explore what AI is, the difference between AI and machine learning, and look at the amazing ways AI is already impacting our daily lives, from recommendation engines to voice assistants.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "4h",
        instructor: "Dr. Anya Sharma",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is AI?",
            lessons: [{ title: "Defining Intelligence", content: "Explore the different types of AI and the general goal of creating machines that can reason and learn.", duration: "30m", completed: false }],
            quiz: [{ questionText: "An example of AI in daily life is:", options: ["A calculator", "A voice assistant like Siri", "A light switch"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Machine learning is a subset of:", options: ["Artificial Intelligence", "Data Science", "Web Development"], correctAnswerIndex: 0 }]
    },
    {
        id: 'tech-005',
        title: "Networking Fundamentals",
        description: "Learn the basic concepts of computer networks, from IP addresses to routers.",
        longDescription: "Understand how the internet works. This course covers the fundamentals of computer networking, including IP addresses, DNS, routers, and switches. You'll learn how data travels across the globe in seconds to connect you to websites and services.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "6h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: How the Internet Works",
            lessons: [{ title: "IP Addresses and DNS", content: "Learn how IP addresses act like mailing addresses for devices and how the Domain Name System (DNS) acts like the internet's phonebook.", duration: "45m", completed: false }],
            quiz: [{ questionText: "What does DNS stand for?", options: ["Digital Network System", "Domain Name System", "Data Naming Service"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A router's main job is to:", options: ["Store files", "Direct traffic between networks", "Provide electricity"], correctAnswerIndex: 1 }]
    },
    {
        id: 'tech-006',
        title: "Database Management",
        description: "An introduction to databases and the SQL language for querying data.",
        longDescription: "Learn how data is stored, organized, and retrieved. This course introduces you to the concept of relational databases and teaches you the basics of SQL (Structured Query Language) to select, insert, update, and delete data from a database.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "7h",
        instructor: "Tunde Adekunle",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is a Database?",
            lessons: [{ title: "Relational Databases and Tables", content: "Understand how relational databases use tables, rows, and columns to store data in a structured way.", duration: "45m", completed: false }],
            quiz: [{ questionText: "SQL is a language for:", options: ["Styling websites", "Managing data in a database", "Building mobile apps"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The 'SELECT' statement in SQL is used to:", options: ["Add new data", "Retrieve data", "Delete data"], correctAnswerIndex: 1 }]
    },
    {
        id: 'tech-007',
        title: "Digital Marketing Essentials",
        description: "Learn the fundamentals of digital marketing, from SEO to social media.",
        longDescription: "This course covers the key pillars of digital marketing. You'll get an introduction to Search Engine Optimization (SEO), social media marketing, content marketing, and email marketing, and understand how they work together to build an online presence.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "5h",
        instructor: "Michael Chen",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Digital Landscape",
            lessons: [{ title: "Introduction to SEO", content: "Learn what Search Engine Optimization is and why it's important for getting a website discovered on search engines like Google.", duration: "40m", completed: false }],
            quiz: [{ questionText: "SEO stands for:", options: ["Social Engagement Optimization", "Search Engine Optimization", "Secure External Operations"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Which of these is a key part of digital marketing?", options: ["Social Media Marketing", "Print advertising", "Radio commercials"], correctAnswerIndex: 0 }]
    },

    // AI & ML - Beginner
    {
        id: 'ai-001',
        title: "Introduction to Machine Learning",
        description: "Learn the core concepts of machine learning and how it's used today.",
        longDescription: "This course is the ideal starting point for anyone interested in machine learning. It covers the fundamental concepts of supervised, unsupervised, and reinforcement learning, explaining how machines can learn from data to make predictions and decisions.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Anya Sharma",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is Machine Learning?",
            lessons: [{ title: "Supervised vs. Unsupervised Learning", content: "Understand the key difference between learning with labeled data (supervised) and finding patterns in unlabeled data (unsupervised).", duration: "45m", completed: false }],
            quiz: [{ questionText: "Predicting a house price from its features is:", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning"], correctAnswerIndex: 0 }]
        }],
        finalAssessment: [{ questionText: "Grouping similar customers together is:", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-002',
        title: "AI for Everyone",
        description: "A non-technical guide to understanding AI and its impact on society and business.",
        longDescription: "AI is transforming every industry. This non-technical course is designed for business leaders, professionals, and anyone curious about AI's impact. You'll learn what AI can realistically do, how to spot opportunities for AI in your work, and understand the ethical considerations.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "4h",
        instructor: "Jane Foster",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Understanding AI's Impact",
            lessons: [{ title: "AI in Business and Society", content: "Explore real-world case studies of how AI is being used to drive value and the societal conversations surrounding its use.", duration: "40m", completed: false }],
            quiz: [{ questionText: "This course is primarily for:", options: ["Expert AI engineers", "Anyone, including non-technical people", "Only data scientists"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A key consideration when implementing AI is:", options: ["The color of the logo", "Ethical implications and bias", "The programming language"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-003',
        title: "Machine Learning with Python",
        description: "Get started with practical machine learning by using the Python programming language.",
        longDescription: "This hands-on course teaches you how to implement basic machine learning algorithms using Python. You'll learn to use essential libraries like Pandas for data handling and Scikit-learn to build your first predictive models.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "10h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The ML Toolkit",
            lessons: [{ title: "Introduction to Pandas and Scikit-learn", content: "Learn how to load data with Pandas and train a simple model with Scikit-learn in just a few lines of code.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Which library is the standard for machine learning in Python?", options: ["TensorFlow", "PyTorch", "Scikit-learn"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "A Pandas DataFrame is used for:", options: ["Storing and manipulating tabular data", "Building neural networks", "Creating charts"], correctAnswerIndex: 0 }]
    },
    {
        id: 'ai-004',
        title: "Deep Learning Basics",
        description: "A simple introduction to the concept of neural networks and deep learning.",
        longDescription: "Deep learning powers some of the most exciting AI applications today. This course provides a high-level, intuitive explanation of neural networks, the building blocks of deep learning. You'll understand what they are and how they 'learn' without getting bogged down in heavy mathematics.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Anya Sharma",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Neural Network",
            lessons: [{ title: "What is a Neuron?", content: "Learn the basic concept of a neuron as a computational unit that processes inputs and produces an output, inspired by the human brain.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Deep learning models are also known as:", options: ["Simple algorithms", "Neural networks", "Decision trees"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A key feature of deep learning models is their ability to:", options: ["Learn from a huge amount of data", "Run on any computer", "Never make mistakes"], correctAnswerIndex: 0 }]
    },
    {
        id: 'ai-005',
        title: "AI and ML for Beginners",
        description: "A comprehensive introductory course covering the essentials of AI and Machine Learning.",
        longDescription: "This course is a one-stop-shop for anyone new to the field. It combines the core concepts of AI, the different types of machine learning, and a gentle introduction to the tools and practices used by data scientists, providing a complete foundational understanding.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "8h",
        instructor: "Tunde Adekunle",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Big Picture",
            lessons: [{ title: "From AI Concepts to ML in Practice", content: "This module connects the high-level ideas of AI to the practical application of machine learning algorithms.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Machine learning is a subfield of:", options: ["Data analysis", "Artificial Intelligence", "Computer science"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The primary goal of a supervised learning model is to:", options: ["Find hidden groups in data", "Make predictions based on labeled examples", "Learn through trial and error"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-006',
        title: "AI and ML with TensorFlow",
        description: "A beginner's guide to using Google's powerful TensorFlow framework for machine learning.",
        longDescription: "Get started with one of the world's most popular machine learning frameworks. This course introduces the basics of TensorFlow, guiding you through the process of building and training a simple neural network for a classification task.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "9h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Your First TensorFlow Model",
            lessons: [{ title: "Building a Sequential Model", content: "Learn how to stack layers to create a simple neural network using TensorFlow's Keras API.", duration: "1h", completed: false }],
            quiz: [{ questionText: "TensorFlow is developed and maintained by:", options: ["Facebook", "Google", "Microsoft"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The Keras API in TensorFlow is used for:", options: ["Loading data", "Building and training models easily", "Visualizing results"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-007',
        title: "Machine Learning with Scikit-learn",
        description: "Learn the go-to Python library for classical machine learning algorithms.",
        longDescription: "Scikit-learn is an essential tool for any data scientist. This course focuses on the practical application of Scikit-learn to build models for tasks like regression, classification, and clustering. You'll learn its simple, consistent API and how to evaluate your models.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "8h",
        instructor: "Tunde Adekunle",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Scikit-learn API",
            lessons: [{ title: "Fit, Predict, Transform", content: "Learn the core API design of Scikit-learn, centered around the `.fit()` and `.predict()` methods.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Scikit-learn is primarily used for:", options: ["Deep learning", "Classical machine learning algorithms", "Data visualization"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "To train a model in Scikit-learn, you use the ____ method.", options: [".train()", ".fit()", ".learn()"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-008',
        title: "AI Ethics and Bias",
        description: "An essential introduction to the ethical considerations and challenges of building AI.",
        longDescription: "With great power comes great responsibility. This crucial course introduces the topic of AI ethics, focusing on how unintended bias in data and algorithms can lead to unfair outcomes. You'll learn to think critically about the societal impact of the AI systems you build.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "4h",
        instructor: "Jane Foster",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Fairness in AI",
            lessons: [{ title: "Understanding and Identifying Bias", content: "Learn about the different types of bias that can creep into machine learning models and the real-world consequences.", duration: "30m", completed: false }],
            quiz: [{ questionText: "AI bias often comes from:", options: ["The computer's hardware", "The data used to train the model", "The programming language"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Why is AI ethics important?", options: ["It's a popular topic", "To ensure AI systems are fair, safe, and beneficial", "To make models more complex"], correctAnswerIndex: 1 }]
    },

    // Existing Courses to Retain
    {
        id: 'tech-008',
        title: "Advanced CSS and UI/UX Design",
        description: "Master modern CSS techniques like Flexbox, Grid, and animations to create beautiful, responsive interfaces.",
        longDescription: "Go beyond the basics of CSS. This course covers advanced layout techniques, responsive design principles, CSS animations, and best practices for creating intuitive and visually appealing user interfaces. You'll learn how to think like a designer and build professional-grade frontends.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "10h",
        instructor: "Emily Carter",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [
            {
                title: "Mastering Flexbox & Grid",
                lessons: [{ title: "Deep Dive into Modern Layouts", content: "Flexbox is designed for one-dimensional layouts, and Grid is for two-dimensional layouts. Understanding when to use each is key to efficient and clean CSS. We'll cover properties like `justify-content`, `align-items`, `grid-template-columns`, and more.", duration: "2h", completed: false }],
                quiz: [{ questionText: "Which CSS property is used for 1D layouts?", options: ["Grid", "Flexbox", "Float"], correctAnswerIndex: 1 }]
            }
        ],
        finalAssessment: [{ questionText: "What is the primary purpose of media queries?", options: ["To query APIs", "For responsive design", "To animate elements"], correctAnswerIndex: 1 }]
    },
    {
        id: 'tech-009',
        title: "Full-Stack Web Development with Next.js",
        description: "Build and deploy production-ready, full-stack web applications using the power of Next.js and React.",
        longDescription: "Become a full-stack developer with this comprehensive course on Next.js. You'll learn about server-side rendering, static site generation, API routes, data fetching strategies, and connecting to a database. We'll build a complete project from scratch and deploy it to the web.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "25h",
        instructor: "David Lee",
        price: 0,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [
            {
                title: "Next.js Fundamentals",
                lessons: [{ title: "App Router and Server Components", content: "The Next.js App Router paradigm shifts focus to Server Components by default, which reduces the amount of JavaScript sent to the client and improves performance. We will explore how to fetch data directly in components and create a seamless user experience.", duration: "3h", completed: false }],
                quiz: [{ questionText: "The App Router uses which React feature heavily?", options: ["Class Components", "Server Components", "Mixins"], correctAnswerIndex: 1 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a key benefit of Server-Side Rendering (SSR)?", options: ["Faster database queries", "Improved SEO and initial load time", "Easier CSS styling"], correctAnswerIndex: 1 }]
    },
    {
        id: 'futures-011',
        title: "Advanced Chart Patterns & Strategies",
        description: "Identify high-probability trade setups by mastering advanced technical analysis and chart patterns.",
        longDescription: "Take your technical analysis to the next level. This course dives deep into complex chart patterns like Head and Shoulders, Flags, and Pennants. You'll learn to combine these patterns with indicators like MACD and RSI to develop robust trading strategies.",
        category: "Futures Trading",
        level: "Intermediate",
        duration: "15h",
        instructor: "Michael Adebayo",
        price: 0,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Complex Chart Patterns",
                lessons: [{ title: "Head and Shoulders, Flags, and Triangles", content: "The Head and Shoulders pattern is a reliable trend reversal indicator. It consists of three peaks, with the central peak (the head) being the highest. This pattern signals that an upward trend is nearing its end.", duration: "2h", completed: false }],
                quiz: [{ questionText: "A 'Head and Shoulders' pattern is typically a:", options: ["Continuation pattern", "Reversal pattern", "Sideways pattern"], correctAnswerIndex: 1 }]
            }
        ],
        finalAssessment: [{ questionText: "What does the RSI indicator measure?", options: ["Market volume", "Overbought/oversold conditions", "Market volatility"], correctAnswerIndex: 1 }]
    },
    {
        id: 'web3-014',
        title: "Building Smart Contracts with Solidity",
        description: "Learn the Solidity programming language from scratch and start building your own smart contracts on Ethereum.",
        longDescription: "This course is a practical guide to Solidity, the most popular language for Ethereum smart contracts. You'll learn about data types, functions, contract inheritance, and security best practices. We'll write, test, and deploy several smart contracts together.",
        category: "Web3",
        level: "Intermediate",
        duration: "18h",
        instructor: "Fatima Aliyu",
        price: 0,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Solidity Basics",
                lessons: [{ title: "Variables, Functions, and Modifiers", content: "Solidity is a statically-typed language designed for implementing smart contracts. Key concepts include state variables that are permanently stored in contract storage, functions that can modify these variables, and modifiers that can change the behavior of functions.", duration: "2h", completed: false }],
                quiz: [{ questionText: "What is the primary language for Ethereum smart contracts?", options: ["JavaScript", "Python", "Solidity"], correctAnswerIndex: 2 }]
            }
        ],
        finalAssessment: [{ questionText: "What does 'gas' refer to on the Ethereum network?", options: ["The fuel for the network", "A type of token", "The cost of executing a transaction"], correctAnswerIndex: 2 }]
    },
    {
        id: 'crypto-001',
        title: "Cryptocurrency Essentials: Bitcoin & Beyond",
        description: "A complete introduction to cryptocurrencies, from understanding Bitcoin to exploring different altcoins.",
        longDescription: "New to crypto? This course is for you. We'll cover the history of Bitcoin, how transactions work, what wallets are, and how to securely buy and store cryptocurrencies. We'll also explore the landscape of altcoins and different crypto categories.",
        category: "Crypto",
        level: "Beginner",
        duration: "5h",
        instructor: "Chinedu Okafor",
        price: 0,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Bitcoin Fundamentals",
                lessons: [{ title: "How Bitcoin Works", content: "Bitcoin is a decentralized digital currency that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.", duration: "1h", completed: false }],
                quiz: [{ questionText: "Who is the pseudonymous creator of Bitcoin?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Charles Hoskinson"], correctAnswerIndex: 1 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a 'private key' used for in crypto?", options: ["To receive funds", "To sign transactions and access your funds", "To view your public address"], correctAnswerIndex: 1 }]
    },
    {
        id: 'ai-009',
        title: "Deep Learning and Neural Networks",
        description: "An advanced course on deep learning architectures, including CNNs for images and RNNs for sequences.",
        longDescription: "Master the art of deep learning. This course covers the theory and practice behind neural networks, including Convolutional Neural Networks (CNNs) for image recognition and Recurrent Neural Networks (RNNs) for text and time-series data. You'll build and train complex models using TensorFlow or PyTorch.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "30h",
        instructor: "Dr. Anya Sharma",
        price: 0,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Convolutional Neural Networks (CNNs)",
                lessons: [{ title: "Image Recognition with CNNs", content: "CNNs are a class of artificial neural networks, most commonly applied to analyze visual imagery. They are particularly good at identifying patterns in images, which makes them powerful for tasks like object detection and image classification.", duration: "3h", completed: false }],
                quiz: [{ questionText: "CNNs are particularly effective for which type of data?", options: ["Tabular data", "Text data", "Image data"], correctAnswerIndex: 2 }]
            }
        ],
        finalAssessment: [{ questionText: "What is 'backpropagation'?", options: ["A data preprocessing technique", "The algorithm for training neural networks", "A type of network layer"], correctAnswerIndex: 1 }]
    }
];
