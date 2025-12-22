
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
                { title: 'Understanding Futures Contracts', content: 'Learn what a futures contract is, the concept of leverage, and the difference between hedging and speculating.', duration: '45m', completed: false },
                { title: 'Market Participants', content: 'Discover the roles of hedgers, speculators, and different types of traders in the futures market ecosystem.', duration: '30m', completed: false }
            ]
        },
        {
            title: 'Basic Terminology',
            lessons: [
                { title: 'Long, Short, Margin, and P&L', content: 'Master the fundamental language of trading, including positions, margin requirements, and calculating profit and loss.', duration: '1h', completed: false }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "In your own words, explain the primary difference between a futures contract and buying a stock. What is the key risk associated with futures that is not as prevalent in stock ownership?" },
        { questionText: "Describe a simple scenario where a corn farmer might use a futures contract to hedge against price drops. What would they do?" }
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
                { title: 'Commodities, Financials, and More', content: 'A deep dive into the various futures markets, including energy, metals, agriculture, and equity indices.', duration: '45m', completed: false },
                { title: 'Understanding Contract Specifications', content: 'Learn how to read a contract specification sheet to understand tick size, contract value, and trading hours.', duration: '1h', completed: false }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Choose two different futures markets (e.g., Crude Oil and E-mini S&P 500). What are the key factors that influence their price movements?" },
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
          { title: 'Candlestick Patterns', content: 'Learn to interpret the story behind candlestick charts and recognize key bullish and bearish patterns.', duration: '1h', completed: false },
          { title: 'Support & Resistance', content: 'Understand how to identify and draw significant price levels that act as barriers for price action.', duration: '1h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the difference between a support level and a resistance level? How can a trader use these levels in their strategy?" }
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
          { title: 'Position Sizing', content: 'Learn how to calculate the appropriate size for your trades based on your account size and risk tolerance.', duration: '45m', completed: false },
          { title: 'Stop-Loss Orders', content: 'Understand the importance of stop-loss orders and different strategies for placing them effectively.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "A trader has a $10,000 account and is willing to risk 1% per trade. If their stop-loss for a trade on the E-mini S&P 500 is 10 points ($500 risk per contract), how many contracts can they trade?" }
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
    modules: [{title: 'Strategy Expansion', lessons: [{ title: 'Scalping, Swinging, and Spreading', content: 'Learn the mechanics and mindset required for short-term scalping, multi-day swing trading, and market-neutral spread trading.', duration: '1.5h', completed: false }] }],
    finalAssessment: [
        { questionText: "Compare and contrast scalping and swing trading. What type of market conditions are best suited for each strategy?" }
    ]
  },
   {
    id: 'futures-i-02',
    title: 'Quantitative Analysis',
    description: 'Apply statistical methods to analyze market data and identify opportunities.',
    longDescription: 'Introduce a quantitative edge to your trading. This course covers statistical concepts like correlation, regression, and backtesting to scientifically validate your trading ideas.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '15h',
    instructor: 'Dr. Anya Sharma',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-02/600/400',
    modules: [{title: 'Trading by Numbers', lessons: [{ title: 'Statistical Foundations', content: 'Learn how to apply concepts like standard deviation, correlation, and regression to market data to find a statistical edge.', duration: '2h', completed: false }] }],
    finalAssessment: [
      { questionText: "You notice a strong positive correlation between Gold and Silver futures. How could you potentially use this information to create a pairs trading strategy? What are the risks?" }
    ]
  },
  // Futures Trading - Advanced
  {
    id: 'futures-a-01',
    title: 'High-Frequency Trading',
    description: 'An exploration of the strategies and technologies used in high-frequency trading (HFT).',
    longDescription: 'Enter the world of microseconds. This course provides a high-level overview of HFT, discussing the infrastructure, strategies, and regulatory landscape of this competitive field.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '20h',
    instructor: 'David Lee',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-01/600/400',
    modules: [{title: 'The Speed Game', lessons: [{ title: 'HFT Strategies and Infrastructure', content: 'An overview of market making, arbitrage, and momentum ignition strategies used in HFT, plus the required co-location and hardware.', duration: '2.5h', completed: false }] }],
    finalAssessment: [
      { questionText: "Why is co-location (placing servers in the same data center as the exchange) critical for most High-Frequency Trading strategies?" }
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
    modules: [{title: 'The Web3 Landscape', lessons: [{ title: 'Exploring the Ecosystem', content: 'Discover the key components of the Web3 world, including blockchains, smart contracts, dApps, and wallets.', duration: '30m', completed: false }] }],
    finalAssessment: [
      { questionText: "Explain the concept of 'decentralization' in the context of Web3. How does it differ from the traditional Web2 model (e.g., Facebook, Google)?" }
    ]
  },
  {
    id: 'web3-b-02',
    title: 'Solidity Fundamentals',
    description: 'Learn the foundational syntax and concepts of Solidity, the language of Ethereum.',
    longDescription: 'This course is your first step into smart contract development. You will learn variables, data types, functions, and control structures in Solidity, and write your first simple smart contracts.',
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
          { title: 'Variables and Data Types', content: 'Learn about uint, string, address, and other core data types in Solidity.', duration: '1h', completed: false },
          { title: 'Functions and Visibility', content: 'Understand public, private, internal, and external function visibility and how to write basic functions.', duration: '1h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the purpose of the `msg.sender` global variable in Solidity? Provide a simple example of how it might be used for an ownership check in a function." }
    ]
  },
  {
    id: 'web3-i-01',
    title: 'Advanced Web3 Security',
    description: 'Deep dive into smart contract security, audits, and formal verification.',
    longDescription: 'Go beyond the basics to understand the nuances of smart contract security. This course covers advanced topics like formal verification, in-depth auditing techniques, and the latest attack vectors to keep your DApps secure.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '10h',
    instructor: 'Dr. Anya Sharma',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-01/600/400',
    modules: [{title: 'Smart Contract Security', lessons: [{ title: 'Auditing and Verification', content: 'Learn industry best practices for auditing smart contracts, including common vulnerabilities like re-entrancy and integer overflows, and how to use tools for formal verification.', duration: '2h', completed: false }] }],
    finalAssessment: [
      { questionText: "What is a 're-entrancy' attack in a smart contract, and what is the most common pattern used to prevent it?" }
    ]
  },
   {
    id: 'web3-a-01',
    title: 'Web3 Security',
    description: 'Learn to secure decentralized applications and smart contracts.',
    longDescription: 'An essential course for any Web3 developer. Learn to identify common vulnerabilities like re-entrancy, integer overflows, and front-running. You will learn best practices for writing secure Solidity code and the tools used by auditors.',
    category: 'Web3',
    level: 'Advanced',
    duration: '18h',
    instructor: 'Dr. Anya Sharma',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-01/600/400',
    modules: [{title: 'Secure Development Lifecycle', lessons: [{ title: 'Smart Contract Auditing', content: 'Learn the process of auditing a smart contract, from setting up the environment to delivering a report.', duration: '3h', completed: false }] }],
    finalAssessment: [
      { questionText: 'What is a "re-entrancy" attack in the context of smart contracts, and how can it be mitigated?' }
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
          { title: 'The Problem of Double-Spending', content: 'Learn about the fundamental problem that Bitcoin solved and how the blockchain enables trustless digital transactions.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is a 'blockchain' and what are its three core components? Explain briefly what each component does." }
    ]
  },
  {
    id: 'crypto-b-02',
    title: 'Crypto Wallets & Security',
    description: 'Learn how to securely store, send, and receive cryptocurrencies.',
    longDescription: 'Not your keys, not your crypto. This course provides a practical guide to crypto security, covering the differences between hardware wallets, software wallets, and exchange wallets, and best practices for keeping your assets safe.',
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
          { title: 'Custodial vs. Non-Custodial', content: 'Understand the critical difference between holding your own keys and trusting a third party with your crypto.', duration: '45m', completed: false },
          { title: 'Seed Phrases and Recovery', content: 'Learn what a seed phrase is, why it\'s so important, and the best practices for storing it securely.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Explain the difference between a hardware wallet and a software wallet. What are the primary advantages of using a hardware wallet?" }
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
          { title: 'HTML Document Structure', content: 'Learn about tags, elements, and the basic boilerplate of an HTML file.', duration: '1h', completed: false },
          { title: 'CSS Selectors and Properties', content: 'Discover how to target HTML elements with CSS and apply basic styling like colors, fonts, and spacing.', duration: '1.5h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the CSS Box Model? Describe its four main components." }
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
          { title: 'Variables and Control Flow', content: 'Learn about let, const, var, and how to control the flow of your program with if/else statements and loops.', duration: '2h', completed: false },
          { title: 'DOM Manipulation', content: 'Discover how to use JavaScript to interact with and change the content and style of your HTML.', duration: '2h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is the difference between `==` and `===` in JavaScript? Why is it generally recommended to use `===`?" }
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
          { title: 'Components and JSX', content: 'Learn how to build reusable UI components using React\'s JSX syntax.', duration: '2h', completed: false },
          { title: 'State and Lifecycle', content: 'Master the `useState` and `useEffect` hooks to manage component state and side effects.', duration: '3h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Explain the concept of 'state' in React. Why is it important, and how does the `useState` hook help manage it?" }
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
          { title: 'What is Machine Learning?', content: 'A conceptual overview of how machines learn from data, and the difference between supervised, unsupervised, and reinforcement learning.', duration: '45m', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "Briefly explain the difference between Supervised and Unsupervised learning. Give one example of a problem that would be solved by each." }
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
        title: 'Python and NumPy',
        lessons: [
          { title: 'Python Basics', content: 'Learn variables, data types, loops, functions, and control flow in Python.', duration: '3h', completed: false },
          { title: 'Working with NumPy Arrays', content: 'Understand the power of NumPy for efficient numerical computation and array manipulation.', duration: '2h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is a NumPy array, and how is it different from a standard Python list? What are the main advantages of using NumPy?" }
    ]
  },
  {
    id: 'ai-i-01',
    title: 'Deep Learning and Neural Networks',
    description: 'Dive into the architecture and application of neural networks.',
    longDescription: 'This course opens up the black box of deep learning. You will learn about the structure of a neural network, including layers, neurons, and activation functions, and build your first image classification model.',
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
          { title: 'Anatomy of a Neural Network', content: 'Learn about layers, neurons, weights, biases, and activation functions.', duration: '3h', completed: false },
          { title: 'Training a Model', content: 'Understand the concepts of backpropagation, gradient descent, and loss functions.', duration: '4h', completed: false },
        ]
      }
    ],
    finalAssessment: [
      { questionText: "What is 'backpropagation' and what is its role in training a neural network?" }
    ]
  },
  {
    id: 'ai-a-01',
    title: 'Ethics and Policy in AI',
    description: 'A deep dive into the ethical and policy challenges posed by advanced AI.',
    longDescription: 'This course explores the complex ethical and policy questions surrounding advanced AI, from job displacement to the alignment of superintelligent systems. It\'s for those who want to think deeply about the future of AI and its impact on humanity.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '20h',
    instructor: 'Jane Foster',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-01/600/400',
    modules: [{title: 'The Future of AI', lessons: [{ title: 'AI Alignment', content: 'Explore the technical and philosophical challenges of ensuring that advanced AI systems pursue goals that are aligned with human values.', duration: '2.5h', completed: false }] }],
    finalAssessment: [
        { questionText: "Discuss the 'alignment problem' in AI. Why is it considered a significant challenge, and what is one proposed approach to addressing it?" }
    ]
  }
];

    