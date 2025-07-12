
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';

const coursesToSeed: NewCourse[] = [
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
            {
                title: "Module 2: Basic Programming Concepts",
                lessons: [{
                    title: "Variables, Data Types, and Control Structures",
                    content: "Variables are like boxes where you store information (e.g., name = \"Tobi\"). Data comes in different types: Strings (text), Integers (whole numbers), Floats (decimals), and Booleans (True/False). Control structures like 'if statements' make decisions, while 'loops' repeat actions. Functions are reusable chunks of code.",
                    duration: "1h",
                    completed: false
                }],
                quiz: [
                    { questionText: "A variable stores:", options: ["A joke", "Data", "A mouse"], correctAnswerIndex: 1 },
                ]
            }
        ],
        finalAssessment: [
            { questionText: "What is programming?", options: ["The process of giving instructions to a computer.", "The process of designing websites.", "The process of creating hardware."], correctAnswerIndex: 0 },
        ]
    },
    {
        title: "Futures Trading: Beginner's Guide",
        description: "Understand the fundamentals of futures trading, from market analysis to risk management.",
        longDescription: "Dive into the world of futures trading. This course covers the basics of futures contracts, technical analysis using charts and indicators, fundamental analysis of market trends, and crucial risk management strategies to protect your capital. Ideal for newcomers to the financial markets.",
        category: "Futures Trading",
        level: "Beginner",
        duration: "8h",
        instructor: "Jane Doe",
        price: 2500,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Module 1: Introduction to Futures",
                lessons: [
                    { title: "What Are Futures Contracts?", content: "Detailed content on futures contracts.", duration: "45m", completed: false },
                    { title: "Market Participants", content: "Detailed content on who trades futures.", duration: "30m", completed: false },
                ],
                quiz: [{ questionText: "What is a futures contract?", options: ["An agreement to buy/sell at a future date", "A stock option", "A type of bond"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is the primary risk in futures trading?", options: ["Leverage", "Market closure", "Broker fees"], correctAnswerIndex: 0 }]
    },
    {
        title: "Web3 & Blockchain Fundamentals",
        description: "Explore the decentralized web, understand blockchain technology, and discover the world of dApps.",
        longDescription: "This course demystifies Web3 and blockchain. You will learn how blockchains work, the role of cryptocurrencies like Ethereum, what smart contracts are, and how decentralized applications (dApps) are changing the internet. No prior blockchain experience is needed.",
        category: "Web3",
        level: "Beginner",
        duration: "7h",
        instructor: "John Smith",
        price: 2500,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Module 1: Understanding Blockchain",
                lessons: [
                    { title: "What is a Blockchain?", content: "Content about blockchain technology.", duration: "1h", completed: false },
                    { title: "How Smart Contracts Work", content: "Content about smart contracts.", duration: "45m", completed: false }
                ],
                quiz: [{ questionText: "A blockchain is a...", options: ["Distributed ledger", "Centralized database", "Type of server"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a dApp?", options: ["A decentralized application", "A database application", "A design application"], correctAnswerIndex: 0 }]
    },
    {
        title: "AI & Machine Learning Basics",
        description: "Get a foundational understanding of AI and how to build practical machine learning models.",
        longDescription: "This course introduces the core concepts of AI and Machine Learning. You will learn about different types of ML (supervised, unsupervised), popular algorithms, and how to work with data to train your first models using Python. It's the perfect starting point for your AI journey.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "12h",
        instructor: "Alex Ray",
        price: 5000,
        imageUrl: "https://placehold.co/600x400.png",
        modules: [
            {
                title: "Module 1: What is Machine Learning?",
                lessons: [
                    { title: "Core Concepts of ML", content: "Content about machine learning concepts.", duration: "1h", completed: false },
                ],
                quiz: [{ questionText: "Supervised learning uses...", options: ["Labeled data", "Unlabeled data", "No data"], correctAnswerIndex: 0 }]
            }
        ],
        finalAssessment: [{ questionText: "What is a neural network?", options: ["A model inspired by the brain", "A type of database", "A security protocol"], correctAnswerIndex: 0 }]
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
        const validatedData = NewCourseSchema.parse(courseData);
        batch.set(newCourseDoc, validatedData);
    });
    await batch.commit();
    console.log(`Successfully seeded ${coursesToSeed.length} courses.`);
}
