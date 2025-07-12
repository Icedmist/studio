
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';

const coursesToSeed: NewCourse[] = [
    // Tech Skills
    {
        title: "Introduction to Programming",
        description: "Learn core concepts and write your first lines of code. Perfect for absolute beginners.",
        longDescription: "This course is designed for total beginners. It breaks down the core concepts of programming like variables, data types, and control structures, using simple analogies and hands-on practice. By the end, you'll be able to write simple code in Python or JavaScript and build small but powerful projects.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "6h",
        instructor: "Nasir Ibrahim Imam",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [
            {
                title: "Module 1: What is Programming?",
                lessons: [{
                    title: "Definitions, Analogies, and Why It Matters",
                    content: "Programming is how humans tell computers what to do. Computers follow instructions—and programming is how we write those instructions in a way they understand. We use it to build websites, automate tasks, and solve real-world problems. The first programmer was Ada Lovelace in the 1800s, and today, code written by just one or two people can power apps used by millions.",
                    duration: "30m",
                    completed: false
                }],
                quiz: [
                    { questionText: "Programming is the process of:", options: ["Cooking", "Giving instructions to a computer", "Writing stories"], correctAnswerIndex: 1 },
                ]
            },
        ],
        finalAssessment: [
            { questionText: "What is programming?", options: ["The process of giving instructions to a computer.", "The process of designing websites.", "The process of creating hardware."], correctAnswerIndex: 0 },
        ]
    },
    {
        title: "Advanced CSS and UI/UX Design",
        description: "Master modern CSS techniques like Flexbox, Grid, and animations to create beautiful, responsive interfaces.",
        longDescription: "Go beyond the basics of CSS. This course covers advanced layout techniques, responsive design principles, CSS animations, and best practices for creating intuitive and visually appealing user interfaces. You'll learn how to think like a designer and build professional-grade frontends.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "10h",
        instructor: "Emily Carter",
        price: 5000,
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
        title: "Full-Stack Web Development with Next.js",
        description: "Build and deploy production-ready, full-stack web applications using the power of Next.js and React.",
        longDescription: "Become a full-stack developer with this comprehensive course on Next.js. You'll learn about server-side rendering, static site generation, API routes, data fetching strategies, and connecting to a database. We'll build a complete project from scratch and deploy it to the web.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "25h",
        instructor: "David Lee",
        price: 7000,
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
    // Futures Trading
    {
        title: "Futures Trading: Beginner's Guide",
        description: "Understand the fundamentals of futures trading, from market analysis to risk management.",
        longDescription: "Dive into the world of futures trading. This course covers the basics of futures contracts, technical analysis using charts and indicators, fundamental analysis of market trends, and crucial risk management strategies to protect your capital. Ideal for newcomers to the financial markets.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "8h",
        instructor: "Michael Adebayo",
        price: 2500,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Introduction to Futures",
                lessons: [{ title: "What Are Futures Contracts?", content: "A futures contract is a legal agreement to buy or sell a particular commodity or financial instrument at a predetermined price at a specified time in the future. These contracts are standardized for quality and quantity to facilitate trading on a futures exchange.", duration: "45m", completed: false }],
                quiz: [{ questionText: "What is a futures contract?", options: ["An agreement to buy/sell at a future date", "A stock option", "A type of bond"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is the primary risk in futures trading?", options: ["Leverage", "Market closure", "Broker fees"], correctAnswerIndex: 0 }]
    },
    {
        title: "Advanced Chart Patterns & Strategies",
        description: "Identify high-probability trade setups by mastering advanced technical analysis and chart patterns.",
        longDescription: "Take your technical analysis to the next level. This course dives deep into complex chart patterns like Head and Shoulders, Flags, and Pennants. You'll learn to combine these patterns with indicators like MACD and RSI to develop robust trading strategies.",
        category: "Futures Trading",
        level: "Intermediate",
        duration: "15h",
        instructor: "Michael Adebayo",
        price: 5000,
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
    // Web3
    {
        title: "Web3 & Blockchain Fundamentals",
        description: "Explore the decentralized web, understand blockchain technology, and discover the world of dApps.",
        longDescription: "This course demystifies Web3 and blockchain. You will learn how blockchains work, the role of cryptocurrencies like Ethereum, what smart contracts are, and how decentralized applications (dApps) are changing the internet. No prior blockchain experience is needed.",
        category: "Web3",
        level: "Beginner",
        duration: "7h",
        instructor: "Fatima Aliyu",
        price: 2500,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Understanding Blockchain",
                lessons: [{ title: "What is a Blockchain?", content: "A blockchain is a decentralized, distributed, and oftentimes public, digital ledger consisting of records called blocks that is used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.", duration: "1h", completed: false }],
                quiz: [{ questionText: "A blockchain is a...", options: ["Distributed ledger", "Centralized database", "Type of server"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a dApp?", options: ["A decentralized application", "A database application", "A design application"], correctAnswerIndex: 0 }]
    },
    {
        title: "Building Smart Contracts with Solidity",
        description: "Learn the Solidity programming language from scratch and start building your own smart contracts on Ethereum.",
        longDescription: "This course is a practical guide to Solidity, the most popular language for Ethereum smart contracts. You'll learn about data types, functions, contract inheritance, and security best practices. We'll write, test, and deploy several smart contracts together.",
        category: "Web3",
        level: "Intermediate",
        duration: "18h",
        instructor: "Fatima Aliyu",
        price: 5000,
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
    // Crypto
    {
        title: "Cryptocurrency Essentials: Bitcoin & Beyond",
        description: "A complete introduction to cryptocurrencies, from understanding Bitcoin to exploring different altcoins.",
        longDescription: "New to crypto? This course is for you. We'll cover the history of Bitcoin, how transactions work, what wallets are, and how to securely buy and store cryptocurrencies. We'll also explore the landscape of altcoins and different crypto categories.",
        category: "Crypto",
        level: "Beginner",
        duration: "5h",
        instructor: "Chinedu Okafor",
        price: 2500,
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
     // AI & Machine Learning
    {
        title: "AI & Machine Learning Basics",
        description: "Get a foundational understanding of AI and how to build practical machine learning models.",
        longDescription: "This course introduces the core concepts of AI and Machine Learning. You will learn about different types of ML (supervised, unsupervised), popular algorithms, and how to work with data to train your first models using Python. It's the perfect starting point for your AI journey.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "12h",
        instructor: "Dr. Anya Sharma",
        price: 5000,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "What is Machine Learning?",
                lessons: [{ title: "Core Concepts of ML", content: "Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy. Supervised learning uses labeled datasets, while unsupervised learning finds patterns in unlabeled data.", duration: "1h", completed: false }],
                quiz: [{ questionText: "Supervised learning uses...", options: ["Labeled data", "Unlabeled data", "No data"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a neural network?", options: ["A model inspired by the brain", "A type of database", "A security protocol"], correctAnswerIndex: 0 }]
    },
    {
        title: "Deep Learning and Neural Networks",
        description: "An advanced course on deep learning architectures, including CNNs for images and RNNs for sequences.",
        longDescription: "Master the art of deep learning. This course covers the theory and practice behind neural networks, including Convolutional Neural Networks (CNNs) for image recognition and Recurrent Neural Networks (RNNs) for text and time-series data. You'll build and train complex models using TensorFlow or PyTorch.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "30h",
        instructor: "Dr. Anya Sharma",
        price: 7000,
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

export async function seedInitialCourses() {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);

    if (!snapshot.empty) {
        console.log('Courses collection is not empty. Skipping seed.');
        return;
    }

    console.log('Courses collection is empty. Seeding initial courses...');
    const batch = writeBatch(db);
    coursesToSeed.forEach(courseData => {
        const newCourseDoc = doc(coursesCollection);
        try {
            const validatedData = NewCourseSchema.parse(courseData);
            batch.set(newCourseDoc, validatedData);
        } catch (error) {
            console.error("Course validation failed for:", courseData.title, error);
        }
    });
    await batch.commit();
    console.log(`Successfully seeded ${coursesToSeed.length} courses.`);
}
