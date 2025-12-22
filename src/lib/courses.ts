
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
    modules: [{ title: 'Core Concepts', lessons: [{ title: 'Understanding Futures Contracts', content: 'Learn what a futures contract is, the concept of leverage, and the difference between hedging and speculating.', duration: '45m', completed: false }] }],
    finalAssessment: []
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
    modules: [{ title: 'Market Landscape', lessons: [{ title: 'Commodities, Financials, and More', content: 'A deep dive into the various futures markets.', duration: '45m', completed: false }] }],
    finalAssessment: []
  },
  {
    id: 'futures-b-10',
    title: 'Building a Trading Plan',
    description: 'Create a structured, personalized trading plan to guide your decisions.',
    longDescription: 'Fail to plan, plan to fail. This course walks you through the essential components of a trading plan, including your strategy, risk parameters, and goals, to create a document that will guide you.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-10/600/400',
    modules: [{ title: 'Your Trading Blueprint', lessons: [{ title: 'Components of a Solid Plan', content: 'Learn what every successful trading plan must contain.', duration: '45m', completed: false }] }],
    finalAssessment: []
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
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-01/600/400',
    modules: [{title: 'Strategy Expansion', lessons: [{ title: 'Scalping, Swinging, and Spreading', content: 'Learn new ways to approach the market.', duration: '1.5h', completed: false }] }],
    finalAssessment: []
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
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-02/600/400',
    modules: [{title: 'Trading by Numbers', lessons: [{ title: 'Statistical Foundations', content: 'Learn how to use data to your advantage.', duration: '2h', completed: false }] }],
    finalAssessment: []
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
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-01/600/400',
    modules: [{title: 'The Speed Game', lessons: [{ title: 'HFT Strategies and Infrastructure', content: 'An overview of the fastest game in the markets.', duration: '2.5h', completed: false }] }],
    finalAssessment: []
  },
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
    modules: [{title: 'The Web3 Landscape', lessons: [{ title: 'Exploring the Ecosystem', content: 'Discover the key components of the Web3 world.', duration: '30m', completed: false }] }],
    finalAssessment: []
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
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-i-01/600/400',
    modules: [{title: 'Smart Contract Security', lessons: [{ title: 'Auditing and Verification', content: 'Learn how to perform security audits and use formal verification tools.', duration: '2h', completed: false }] }],
    finalAssessment: []
  },
  {
    id: 'ai-a-08',
    title: 'Ethics and Policy in AI',
    description: 'A deep dive into the ethical and policy challenges posed by advanced AI.',
    longDescription: 'This course explores the complex ethical and policy questions surrounding advanced AI, from job displacement to the alignment of superintelligent systems. It\'s for those who want to think deeply about the future of AI and its impact on humanity.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '20h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-a-08/600/400',
    modules: [{title: 'The Future of AI', lessons: [{ title: 'AI Alignment', content: 'Explore the challenge of aligning AI with human values.', duration: '2.5h', completed: false }] }],
    finalAssessment: []
  }
];
