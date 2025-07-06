import type { Course } from './types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Futures Trading',
    description: 'Learn the fundamentals of futures markets and trading strategies.',
    longDescription: 'This comprehensive course covers everything from the history of futures trading to modern-day strategies. You will learn about market analysis, risk management, and how to develop your own trading plan. Suitable for complete beginners.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 65,
    modules: [
        { title: 'Module 1: The Basics', lessons: [{title: 'What are Futures?', duration: '15min'}, {title: 'Market Players', duration: '20min'}] },
        { title: 'Module 2: Technical Analysis', lessons: [{title: 'Chart Patterns', duration: '45min'}, {title: 'Indicators', duration: '60min'}] },
    ]
  },
  {
    id: '2',
    title: 'Advanced Web3 Development',
    description: 'Build complex decentralized applications on the blockchain.',
    longDescription: 'Dive deep into the world of Web3. This course explores advanced smart contract development, decentralized storage solutions, and building scalable dApps. A solid understanding of blockchain basics is required.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 20,
    modules: [
        { title: 'Module 1: Advanced Smart Contracts', lessons: [{title: 'Upgradable Contracts', duration: '60min'}, {title: 'Security Audits', duration: '90min'}] },
        { title: 'Module 2: Decentralized Storage', lessons: [{title: 'IPFS Deep Dive', duration: '45min'}] },
    ]
  },
  {
    id: '3',
    title: 'Crypto Trading for Intermediates',
    description: 'Master technical analysis and risk management for crypto assets.',
    longDescription: 'Take your cryptocurrency trading to the next level. This course focuses on advanced charting techniques, understanding market cycles, and implementing robust risk management strategies to navigate the volatile crypto markets.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 0,
    modules: [
        { title: 'Module 1: Market Psychology', lessons: [{title: 'Fear & Greed Index', duration: '30min'}] },
        { title: 'Module 2: DeFi Trading', lessons: [{title: 'Yield Farming', duration: '75min'}] },
    ]
  },
  {
    id: '4',
    title: 'Foundations of AI & Machine Learning',
    description: 'Understand the core concepts of AI and build your first models.',
    longDescription: 'Begin your journey into Artificial Intelligence. This course provides a gentle introduction to machine learning concepts, popular algorithms, and the Python libraries you need to start building and training your own predictive models.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 95,
    modules: [
        { title: 'Module 1: Introduction', lessons: [{title: 'What is ML?', duration: '25min'}] },
        { title: 'Module 2: First Models', lessons: [{title: 'Linear Regression', duration: '60min'}] },
    ]
  },
    {
    id: '5',
    title: 'Full-Stack Web Development',
    description: 'Master the MERN stack and build complete web applications.',
    longDescription: 'Become a full-stack developer by mastering the MERN (MongoDB, Express, React, Node.js) stack. This project-based course will guide you through building and deploying a real-world web application from scratch.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 10,
    modules: [
        { title: 'Module 1: Backend with Node/Express', lessons: [{title: 'API Design', duration: '60min'}] },
        { title: 'Module 2: Frontend with React', lessons: [{title: 'State Management', duration: '90min'}] },
    ]
  },
  {
    id: '6',
    title: 'Advanced Solidity',
    description: 'Deep dive into smart contract development with Solidity.',
    longDescription: 'For developers who want to specialize in blockchain, this course offers an in-depth exploration of Solidity. Topics include gas optimization, security patterns, and complex data structures on the Ethereum blockchain.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 0,
    modules: [
        { title: 'Module 1: Gas Optimization', lessons: [{title: 'Advanced Techniques', duration: '75min'}] },
        { title: 'Module 2: Security', lessons: [{title: 'Common Vulnerabilities', duration: '90min'}] },
    ]
  },
  {
    id: '7',
    title: 'Introduction to Cryptocurrency',
    description: 'Learn the basics of blockchain, Bitcoin, and Ethereum.',
    longDescription: 'This course is the perfect starting point for anyone new to crypto. We cover the history of money, what makes blockchain revolutionary, and how to safely buy, sell, and store digital assets.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 100,
    modules: [
        { title: 'Module 1: The Basics', lessons: [{title: 'What is Blockchain?', duration: '20min'}, {title: 'Understanding Bitcoin', duration: '25min'}] },
        { title: 'Module 2: Getting Started', lessons: [{title: 'Setting up a Wallet', duration: '30min'}, {title: 'Making a Transaction', duration: '15min'}] },
    ]
  },
  {
    id: '8',
    title: 'Intermediate Futures Strategies',
    description: 'Explore advanced strategies like spreading and hedging.',
    longDescription: 'Go beyond the basics of futures trading. In this course, you will learn sophisticated strategies including calendar spreads, intercommodity spreads, and how to use futures to hedge a portfolio.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 30,
    modules: [
        { title: 'Module 1: Spreads', lessons: [{title: 'Calendar Spreads', duration: '45min'}] },
        { title: 'Module 2: Hedging', lessons: [{title: 'Portfolio Hedging', duration: '60min'}] },
    ]
  },
  {
    id: '9',
    title: 'Intermediate AI: Neural Networks',
    description: 'Dive into deep learning and build your own neural networks.',
    longDescription: 'This course builds on the fundamentals of machine learning, focusing on deep learning. You will learn the theory behind neural networks and get hands-on experience building and training them with TensorFlow and Keras.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 50,
    modules: [
        { title: 'Module 1: Deep Learning Theory', lessons: [{title: 'What are Neural Networks?', duration: '45min'}] },
        { title: 'Module 2: Building with TensorFlow', lessons: [{title: 'Image Classification', duration: '90min'}] },
    ]
  },
  {
    id: '10',
    title: 'Introduction to Python',
    description: 'Learn the most popular language for data science and web development.',
    longDescription: 'Start your coding journey with Python. This beginner-friendly course covers all the fundamental concepts, including variables, data types, loops, and functions. No prior programming experience is required.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: 80,
    modules: [
        { title: 'Module 1: The Basics', lessons: [{title: 'Variables and Data Types', duration: '45min'}] },
        { title: 'Module 2: Control Flow', lessons: [{title: 'Loops and Conditionals', duration: '60min'}] },
    ]
  }
];
