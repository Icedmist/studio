
import type { Course } from '@/lib/types';

export const courses: Omit<Course, 'progress'>[] = [
  // --- Futures Trading ---
  // Beginner
  {
    id: 'futures-b-01',
    title: 'Introduction to Futures Trading',
    description: 'The essential starting point for anyone new to futures trading.',
    longDescription: "This course is the A-to-Z guide for absolute beginners. We cover what futures contracts are, why they exist, who trades them, and the basic terminology you need to know before you even think about placing a trade. This is your foundation for success.",
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h',
    instructor: 'Michael Adebayo',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-01/600/400',
    modules: [
        {
            title: 'Core Concepts',
            lessons: [
                { title: 'Understanding Futures Contracts', content: 'A futures contract is a legal agreement to buy or sell a particular commodity asset or security at a predetermined price at a specified time in the future. We will explore the concept of leverage, and the critical difference between hedging (risk management) and speculating (profit seeking).', duration: '45m', completed: false },
                { title: 'Market Participants', content: 'The futures market is a diverse ecosystem. In this lesson, we discover the roles of commercial players (hedgers like farmers and airlines) and non-commercial traders (speculators) and how their interactions create liquidity and price discovery.', duration: '30m', completed: false }
            ]
        },
        {
            title: 'Basic Terminology',
            lessons: [
                { title: 'Long, Short, Margin, and P&L', content: 'To speak the language of trading, you must master the fundamentals. This lesson covers going "long" (buying) vs. "short" (selling), initial and maintenance margin requirements, and the formulas for calculating your profit and loss (P&L).', duration: '1h', completed: false }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "In your own words, explain the primary difference between a futures contract and buying a stock. What is the key risk associated with futures that is not as prevalent in stock ownership?" },
        { questionText: "Describe a simple scenario where a corn farmer might use a futures contract to hedge against price drops. What specific action would the farmer take in the futures market?" }
    ]
  },
  {
    id: 'futures-b-02',
    title: 'Futures Markets Overview',
    description: 'Get a comprehensive overview of the different types of futures markets available.',
    longDescription: 'Explore the vast landscape of futures markets, from commodities like oil and gold to financial instruments like stock indices and currencies. This course helps you understand the characteristics of each market.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-02/600/400',
    modules: [
        {
            title: 'Market Landscape',
            lessons: [
                { title: 'Commodities, Financials, and More', content: 'A deep dive into the various futures markets, including energy (Crude Oil, Natural Gas), metals (Gold, Silver, Copper), agriculture (Corn, Soybeans, Wheat), and equity indices (E-mini S&P 500, NASDAQ 100).', duration: '45m', completed: false },
                { title: 'Understanding Contract Specifications', content: 'Every futures contract is standardized. Learn how to read a contract specification sheet to understand its symbol, tick size, tick value, contract value, and trading hours. This is crucial for risk management.', duration: '1h', completed: false }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Choose two different futures markets (e.g., Crude Oil and E-mini S&P 500). What are the key economic factors that influence their respective price movements?" },
    ]
  },
    {
    id: 'futures-b-03',
    title: 'Technical Analysis for Beginners',
    description: 'Learn the basics of chart reading, trend identification, and key indicators.',
    longDescription: 'This course demystifies technical analysis. You will learn to read price charts, identify trends, understand support and resistance levels, and use basic indicators like Moving Averages and RSI to make informed trading decisions.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Michael Adebayo',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-03/600/400',
    modules: [
      {
        title: 'Chart Essentials',
        lessons: [
          { title: 'Candlestick Patterns', content: 'Candlesticks tell a story about market sentiment. Learn to interpret the meaning behind candlestick charts and recognize key bullish (e.g., Hammer, Engulfing) and bearish (e.g., Shooting Star, Harami) patterns.', duration: '1h', completed: false },
          { title: 'Support & Resistance', content: 'Support and resistance are key price levels where buying or selling pressure is expected to be strong. Understand how to identify these zones and use them to set entry points and stop-losses.', duration: '1h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the difference between a support level and a resistance level? How does a former resistance level often become a new support level after a breakout?" }
    ]
  },
  {
    id: 'futures-b-04',
    title: 'Risk Management Fundamentals',
    description: 'Master the most critical skill for any trader: protecting your capital.',
    longDescription: 'Trading is not just about making profits; it\'s about managing losses. This course covers the essentials of risk management, including setting stop-losses, position sizing, and understanding risk-to-reward ratios.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-04/600/400',
    modules: [
      {
        title: 'Capital Protection',
        lessons: [
          { title: 'Position Sizing', content: 'Never risk more than you can afford to lose. Learn the 1% rule and how to calculate the appropriate size for your trades based on your account size and risk tolerance to ensure longevity in the market.', duration: '45m', completed: false },
          { title: 'Stop-Loss Orders', content: 'A stop-loss order is your automated exit plan when a trade goes against you. Understand the importance of stop-losses and different strategies for placing them effectively, such as using volatility or key technical levels.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "A trader has a $10,000 account and is willing to risk 1% per trade. If their stop-loss for a trade on the E-mini S&P 500 is 10 points ($500 risk per contract), how many contracts can they trade? Show your calculation." }
    ]
  },
  // Futures Trading - Intermediate
  {
    id: 'futures-i-01',
    title: 'Advanced Trading Strategies',
    description: 'Explore more complex strategies like scalping, swing trading, and pairs trading.',
    longDescription: 'Go beyond the basics with advanced strategies. This course covers techniques for different timeframes and market conditions, providing a more versatile trading toolkit.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '12h',
    instructor: 'Michael Adebayo',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-01/600/400',
    modules: [{title: 'Strategy Expansion', lessons: [{ title: 'Scalping, Swinging, and Spreading', content: 'Learn the mechanics, mindset, and risk management required for very short-term scalping, multi-day swing trading, and market-neutral calendar or inter-market spread trading.', duration: '1.5h', completed: false }] }],
    finalAssessment: [
        { questionText: "Compare and contrast scalping and swing trading in terms of time commitment, psychological pressure, and typical risk-reward ratios. What type of market conditions are best suited for each strategy?" }
    ]
  },
   {
    id: 'futures-i-02',
    title: 'Quantitative Analysis & Backtesting',
    description: 'Apply statistical methods to analyze market data and validate trading ideas.',
    longDescription: 'Introduce a quantitative edge to your trading. This course covers statistical concepts like correlation, regression, and the step-by-step process of backtesting a trading strategy to scientifically validate your ideas and avoid common biases.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '15h',
    instructor: 'Dr. Anya Sharma',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-02/600/400',
    modules: [{title: 'Trading by Numbers', lessons: [{ title: 'Statistical Foundations & Backtesting', content: 'Learn how to apply concepts like standard deviation and correlation to market data. We will walk through building a simple backtesting engine in Python to test a moving average crossover strategy.', duration: '2h', completed: false }] }],
    finalAssessment: [
      { questionText: "You notice a strong positive correlation between Gold and Silver futures. How could you potentially use this information to create a pairs trading strategy? What are the main risks of such a strategy?" }
    ]
  },
  // Futures Trading - Advanced
  {
    id: 'futures-a-01',
    title: 'Algorithmic Trading & Automation',
    description: 'An exploration of the strategies and technologies used in automated trading systems.',
    longDescription: 'Move from discretionary trading to systematic execution. This course provides a high-level overview of algorithmic trading, discussing system design, execution logic, and the infrastructure needed to run automated strategies.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '20h',
    instructor: 'David Lee',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-01/600/400',
    modules: [{title: 'The Automation Game', lessons: [{ title: 'System Design and Execution', content: 'An overview of designing a trading algorithm, from signal generation to order management. We will discuss the pros and cons of event-driven vs. vectorized backtesting.', duration: '2.5h', completed: false }] }],
    finalAssessment: [
      { questionText: "What is 'slippage' in the context of algorithmic trading, and why is it a critical factor to consider when moving from a backtest to live trading?" }
    ]
  },

  // --- Web3 ---
  {
    id: 'web3-b-01',
    title: 'Introduction to Web3',
    description: 'A high-level overview of the Web3 ecosystem, its key players, and its potential.',
    longDescription: "Get a bird's-eye view of the entire Web3 landscape. We explore major platforms like Ethereum and Solana, discuss different use cases from DeFi to NFTs, and look at the future potential of a decentralized internet.",
    category: 'Web3',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Fatima Aliyu',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-01/600/400',
    modules: [{title: 'The Web3 Landscape', lessons: [{ title: 'Exploring the Ecosystem', content: 'Discover the key components of the Web3 world, including blockchains, smart contracts, decentralized applications (dApps), and wallets. We will differentiate Web3 from Web2 and discuss the core philosophy of user ownership.', duration: '30m', completed: false }] }],
    finalAssessment: [
      { questionText: "Explain the concept of 'decentralization' in the context of Web3. How does it differ from the traditional Web2 model (e.g., Facebook, Google), and what is one major advantage and one major disadvantage of this approach?" }
    ]
  },
  {
    id: 'web3-b-02',
    title: 'Solidity Fundamentals',
    description: 'Learn the foundational syntax and concepts of Solidity, the language of Ethereum.',
    longDescription: 'This course is your first step into smart contract development. You will learn variables, data types, functions, and control structures in Solidity, and write your first simple smart contracts in a Remix environment.',
    category: 'Web3',
    level: 'Beginner',
    duration: '8h',
    instructor: 'Fatima Aliyu',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-02/600/400',
    modules: [
      {
        title: 'Writing Your First Contract',
        lessons: [
          { title: 'Variables and Data Types', content: 'Learn about value types like uint, int, bool, and address, as well as reference types like arrays, structs, and mappings in Solidity.', duration: '1h', completed: false },
          { title: 'Functions and Visibility', content: 'Understand the difference between public, private, internal, and external function visibility. Learn about view and pure functions, and how to write basic functions that modify state.', duration: '1h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the purpose of the `msg.sender` global variable in Solidity? Provide a simple code example of a function that uses it for an ownership check." }
    ]
  },
  {
    id: 'web3-i-01',
    title: 'Building a Full-Stack DApp',
    description: 'Learn to connect a React frontend to a smart contract on the blockchain.',
    longDescription: 'This course bridges the gap between smart contracts and user interfaces. You will learn how to use libraries like Ethers.js or Web3.js to interact with your Solidity contracts from a modern React frontend, creating a fully functional decentralized application.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '20h',
    instructor: 'David Lee',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-02/600/400',
    modules: [{title: 'Connecting to the Blockchain', lessons: [{ title: 'Frontend Tooling with Ethers.js', content: 'Learn how to set up a React project to connect to the Ethereum blockchain, fetch data from smart contracts, and send transactions to update its state.', duration: '2.5h', completed: false }] }],
    finalAssessment: [
      { questionText: "When building a DApp frontend, what is the role of a 'provider' (like MetaMask's injected provider)? Why is it necessary for interacting with the blockchain?" }
    ]
  },
   {
    id: 'web3-a-01',
    title: 'Web3 Security Best Practices',
    description: 'Learn to secure decentralized applications and smart contracts against common attacks.',
    longDescription: 'An essential course for any Web3 developer. Learn to identify and prevent common vulnerabilities like re-entrancy, integer overflows, and front-running. You will learn best practices for writing secure Solidity code using patterns like Checks-Effects-Interactions and the tools used by professional auditors.',
    category: 'Web3',
    level: 'Advanced',
    duration: '18h',
    instructor: 'Dr. Anya Sharma',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-01/600/400',
    modules: [{title: 'Secure Development Lifecycle', lessons: [{ title: 'Auditing and Common Pitfalls', content: 'Learn the process of auditing a smart contract, from setting up the environment with tools like Slither to identifying and reporting vulnerabilities.', duration: '3h', completed: false }] }],
    finalAssessment: [
      { questionText: 'What is a "re-entrancy" attack in the context of smart contracts, and how can the Checks-Effects-Interactions pattern help mitigate it?' }
    ]
  },
  // --- Crypto ---
  {
    id: 'crypto-b-01',
    title: 'Introduction to Cryptocurrency',
    description: 'Understand what cryptocurrency is, its history, and the technology behind it.',
    longDescription: 'This course starts at the very beginning, with the birth of Bitcoin. We will explore the core concepts of blockchain technology, decentralization, and cryptography that make cryptocurrencies possible.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '3h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-01/600/400',
    modules: [
      {
        title: 'The Bitcoin Whitepaper',
        lessons: [
          { title: 'The Problem of Double-Spending', content: 'A conceptual breakdown of the fundamental problem of digital scarcity that Bitcoin solved, and how a distributed ledger (the blockchain) enables trustless peer-to-peer transactions.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is a 'blockchain' and what are its three core components? Explain briefly what each component does to contribute to the security and immutability of the ledger." }
    ]
  },
  {
    id: 'crypto-b-02',
    title: 'Crypto Wallets & Security',
    description: 'Learn how to securely store, send, and receive cryptocurrencies.',
    longDescription: '"Not your keys, not your crypto." This course provides a practical guide to crypto security, covering the differences between hardware wallets, software wallets, and exchange accounts, plus best practices for keeping your assets safe from scams and theft.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-02/600/400',
    modules: [
      {
        title: 'Wallet Management',
        lessons: [
          { title: 'Custodial vs. Non-Custodial', content: 'Understand the critical difference between holding your own private keys (non-custodial) and trusting a third party like an exchange with your crypto (custodial).', duration: '45m', completed: false },
          { title: 'Seed Phrases and Recovery', content: 'A seed phrase is the master key to all your crypto. Learn what it is, why it\'s so important, and the best practices for storing it securely offline to prevent loss or theft.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Explain the difference between a hardware wallet (e.g., Ledger, Trezor) and a software wallet (e.g., MetaMask, Trust Wallet). What are the primary security advantages of using a hardware wallet?" }
    ]
  },
  // --- Tech Skills ---
  {
    id: 'tech-b-01',
    title: 'HTML & CSS Fundamentals',
    description: 'Build the structural and stylistic foundation of any webpage.',
    longDescription: 'Every website starts with HTML for structure and CSS for style. This course provides a thorough grounding in both, teaching you how to create well-structured, beautiful, and responsive web pages from scratch.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '10h',
    instructor: 'Fatima Aliyu',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-01/600/400',
    modules: [
      {
        title: 'Building Your First Page',
        lessons: [
          { title: 'HTML Document Structure', content: 'Learn about tags, elements, attributes, and the basic boilerplate of an HTML file. Understand semantic HTML5 tags like <header>, <main>, and <footer>.', duration: '1h', completed: false },
          { title: 'CSS Selectors and Properties', content: 'Discover how to target HTML elements with CSS selectors (class, ID, tag) and apply essential styling like colors, fonts, margins, and padding.', duration: '1.5h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the CSS Box Model? Describe its four main components from the inside out and how they affect the layout of an element." }
    ]
  },
  {
    id: 'tech-b-02',
    title: 'JavaScript for Beginners',
    description: 'Learn the fundamentals of the most popular programming language on the web.',
    longDescription: 'This course takes you from zero to hero in JavaScript. You will learn the basics of programming—variables, data types, functions, and loops—and how to use JavaScript to make interactive and dynamic web pages.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '15h',
    instructor: 'David Lee',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-02/600/400',
    modules: [
      {
        title: 'Programming Essentials',
        lessons: [
          { title: 'Variables and Control Flow', content: 'Learn about `let`, `const`, and `var`, and how to control the flow of your program with if/else statements, switch cases, and for/while loops.', duration: '2h', completed: false },
          { title: 'DOM Manipulation', content: 'The Document Object Model (DOM) is the bridge between HTML and JavaScript. Discover how to use JavaScript to select, create, and change the content and style of your HTML elements.', duration: '2h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the difference between `==` and `===` in JavaScript? Why is it generally recommended to use `===` for comparisons?" }
    ]
  },
  {
    id: 'tech-i-01',
    title: 'React & Next.js',
    description: 'Build modern, fast, and scalable web applications with React and Next.js.',
    longDescription: 'Dive into the world of modern web development. This course covers the fundamentals of React, including components, state, and props, and then leverages the power of the Next.js framework for server-side rendering, routing, and more.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '25h',
    instructor: 'David Lee',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-01/600/400',
    modules: [
      {
        title: 'React Core Concepts',
        lessons: [
          { title: 'Components and JSX', content: 'Learn React\'s component-based architecture and how to write UI with JSX, a syntax extension for JavaScript.', duration: '2h', completed: false },
          { title: 'State and Lifecycle with Hooks', content: 'Master the `useState` and `useEffect` hooks to manage component state and side effects like API calls.', duration: '3h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Explain the concept of 'state' in React. Why is it important, and how does the `useState` hook help manage it in a functional component?" }
    ]
  },
  // --- AI & Machine Learning ---
  {
    id: 'ai-b-01',
    title: 'Introduction to AI and Machine Learning',
    description: 'Get a clear, non-technical overview of the world of AI and its possibilities.',
    longDescription: 'This course is for absolute beginners who want to understand the buzz around AI. We will demystify terms like Machine Learning, Deep Learning, and Neural Networks, exploring real-world applications and ethical considerations.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '3h',
    instructor: 'Dr. Anya Sharma',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-01/600/400',
    modules: [
      {
        title: 'The AI Revolution',
        lessons: [
          { title: 'What is Machine Learning?', content: 'A conceptual overview of how machines learn from data without being explicitly programmed. We explore the three main types: supervised, unsupervised, and reinforcement learning.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Briefly explain the difference between Supervised and Unsupervised learning. Give one real-world example of a problem that would be solved by each type." }
    ]
  },
  {
    id: 'ai-b-02',
    title: 'Python for Data Science',
    description: 'Learn the foundational Python skills necessary for AI and Machine Learning.',
    longDescription: 'This course teaches you the Python programming language from the ground up, with a focus on the libraries essential for data science, such as NumPy, Pandas, and Matplotlib. No prior programming experience is required.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '20h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-02/600/400',
    modules: [
      {
        title: 'Data Manipulation',
        lessons: [
          { title: 'Python Basics', content: 'Learn variables, data types, loops, functions, and control flow in Python.', duration: '3h', completed: false },
          { title: 'Working with Pandas DataFrames', content: 'Learn to load, clean, filter, and analyze datasets using the powerful Pandas library, a cornerstone of data science in Python.', duration: '3h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is a Pandas DataFrame and how is it different from a standard Python dictionary or list? What are two common operations you might perform on a DataFrame?" }
    ]
  },
  {
    id: 'ai-i-01',
    title: 'Deep Learning and Neural Networks',
    description: 'Dive into the architecture and application of neural networks.',
    longDescription: 'This course opens up the black box of deep learning. You will learn about the structure of a neural network, including layers, neurons, and activation functions, and build your first image classification model using TensorFlow or PyTorch.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '30h',
    instructor: 'Dr. Anya Sharma',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-01/600/400',
    modules: [
      {
        title: 'Building Blocks of AI',
        lessons: [
          { title: 'Anatomy of a Neural Network', content: 'Learn about dense layers, neurons, weights, biases, and common activation functions like ReLU and Sigmoid.', duration: '3h', completed: false },
          { title: 'Training a Model with Gradient Descent', content: 'Understand the core concepts of training: how loss functions measure error and how optimizers like gradient descent adjust weights through backpropagation.', duration: '4h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is 'backpropagation' and what is its fundamental role in training a neural network? Why is it computationally efficient?" }
    ]
  },
  {
    id: 'ai-a-01',
    title: 'Ethics and Governance in AI',
    description: 'A deep dive into the ethical and policy challenges posed by advanced AI.',
    longDescription: 'This course explores the complex ethical and policy questions surrounding advanced AI, from algorithmic bias and job displacement to the alignment problem of superintelligent systems. It is for those who want to think deeply about the future of AI and its impact on humanity.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '20h',
    instructor: 'Jane Foster',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-01/600/400',
    modules: [{title: 'The Future of AI Governance', lessons: [{ title: 'The AI Alignment Problem', content: 'Explore the technical and philosophical challenges of ensuring that advanced AI systems pursue goals that are truly aligned with human values and well-being.', duration: '2.5h', completed: false }] }],
    finalAssessment: [
        { questionText: "Discuss the 'alignment problem' in AI. Why is it considered a significant long-term challenge, and what is one proposed approach (e.g., value learning, corrigibility) to addressing it?" }
    ]
  }
];
