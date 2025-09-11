
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
        lessons: [{ title: 'Understanding Futures Contracts', content: 'Learn what a futures contract is, the concept of leverage, and the difference between hedging and speculating.', duration: '45m', completed: false }],
        quiz: []
      }
    ],
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
    modules: [
      {
        title: 'Market Landscape',
        lessons: [{ title: 'Commodities, Financials, and More', content: 'A deep dive into the various futures markets.', duration: '45m', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-03',
    title: 'Basic Futures Trading Strategies',
    description: 'Learn foundational strategies to start your trading journey with confidence.',
    longDescription: 'Discover simple yet effective trading strategies for beginners, including trend-following and support/resistance trading. Learn how to identify potential entry and exit points.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Michael Adebayo',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-03/600/400',
    modules: [
      {
        title: 'Starter Strategies',
        lessons: [{ title: 'Trend Following and Range Trading', content: 'Learn two of the most fundamental approaches to trading the markets.', duration: '1h', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-04',
    title: 'Technical Analysis for Futures',
    description: 'Learn to read price charts and use indicators to make informed trading decisions.',
    longDescription: 'An introduction to technical analysis tailored for the futures market. Learn to interpret chart patterns, use moving averages, RSI, and other key indicators to forecast price movements.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '7h',
    instructor: 'Emily Carter',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-04/600/400',
    modules: [
      {
        title: 'Chart Reading 101',
        lessons: [{ title: 'Candlesticks, Trends, and Indicators', content: 'Master the basics of reading charts.', duration: '1h', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-05',
    title: 'Fundamental Analysis in Futures',
    description: 'Understand how economic news and reports can impact futures market prices.',
    longDescription: 'Learn how to analyze supply, demand, and macroeconomic factors to predict long-term trends in the futures markets. This course covers key reports and news events that move markets.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Emily Carter',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-05/600/400',
    modules: [
      {
        title: 'Beyond the Charts',
        lessons: [{ title: 'Supply, Demand, and Economic Indicators', content: 'Understand the real-world factors that drive price.', duration: '50m', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-06',
    title: 'Risk Management Essentials',
    description: 'Learn the most critical skill: how to manage risk and protect your trading capital.',
    longDescription: 'This course teaches you the most important aspect of trading: survival. Learn about stop-losses, position sizing, and risk/reward ratios to ensure you can trade for the long term.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h',
    instructor: 'Dr. Aisha Bello',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-06/600/400',
    modules: [
      {
        title: 'Protecting Your Capital',
        lessons: [{ title: 'Stop-Losses and Position Sizing', content: 'Learn the two fundamental pillars of risk management.', duration: '45m', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-07',
    title: 'Trading Psychology',
    description: 'Master the mental game of trading by understanding fear, greed, and discipline.',
    longDescription: 'Trading success is 80% psychology. This course helps you understand and overcome common psychological pitfalls that can derail a trading career. Learn to build discipline and a winning mindset.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-07/600/400',
    modules: [
      {
        title: 'The Inner Game',
        lessons: [{ title: 'Conquering Fear and Greed', content: 'Learn to manage the emotions that lead to poor decisions.', duration: '45m', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-08',
    title: 'Futures Trading Platforms',
    description: 'A practical guide to choosing and using futures trading software.',
    longDescription: 'Navigate the world of trading platforms. This course provides an overview of popular trading software, their features, and how to set them up for efficient trading.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-08/600/400',
    modules: [
      {
        title: 'Tools of the Trade',
        lessons: [{ title: 'Choosing and Navigating a Platform', content: 'Learn what to look for in a trading platform.', duration: '40m', completed: false }],
        quiz: []
      }
    ],
    finalAssessment: []
  },
  {
    id: 'futures-b-09',
    title: 'Simulated Trading Practice',
    description: 'Apply your knowledge in a risk-free environment using a trading simulator.',
    longDescription: 'Before you risk real money, practice makes perfect. This course guides you through setting up and using a trading simulator to test your strategies and build confidence.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '8h',
    instructor: 'Michael Adebayo',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-09/600/400',
    modules: [
      {
        title: 'Practice Arena',
        lessons: [{ title: 'Trading Without Risk', content: 'Learn how to use a simulator to hone your skills.', duration: '1h', completed: false }],
        quiz: []
      }
    ],
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
    modules: [
      {
        title: 'Your Trading Blueprint',
        lessons: [{ title: 'Components of a Solid Plan', content: 'Learn what every successful trading plan must contain.', duration: '45m', completed: false }],
        quiz: []
      }
    ],
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
    modules: [{title: 'Strategy Expansion', lessons: [{ title: 'Scalping, Swinging, and Spreading', content: 'Learn new ways to approach the market.', duration: '1.5h', completed: false }], quiz: []}],
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
    modules: [{title: 'Trading by Numbers', lessons: [{ title: 'Statistical Foundations', content: 'Learn how to use data to your advantage.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-i-03',
    title: 'Algorithmic Trading Introduction',
    description: 'Learn the basics of automating your trading strategies with code.',
    longDescription: 'Let the machines do the work. This course provides an introduction to algorithmic trading, covering the logic, design, and implementation of simple automated trading systems.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '18h',
    instructor: 'David Lee',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-03/600/400',
    modules: [{title: 'Automating Your Edge', lessons: [{ title: 'From Strategy to Algorithm', content: 'Learn the process of translating a trading idea into executable code.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-i-04',
    title: 'Options on Futures',
    description: 'Discover the flexibility and strategic advantages of trading options on futures contracts.',
    longDescription: 'Unlock a new dimension of trading. This course explains what options on futures are and how they can be used for income generation, hedging, and creating complex, risk-defined strategies.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '14h',
    instructor: 'Tunde Adekunle',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-04/600/400',
    modules: [{title: 'Strategic Flexibility', lessons: [{ title: 'Calls, Puts, and Spreads', content: 'Learn the building blocks of options trading.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-i-05',
    title: 'Market Microstructure',
    description: 'Understand the mechanics of order books, liquidity, and trade execution.',
    longDescription: "Dive deep into the 'how' of market movements. This course explores the order book, the role of market makers, and how trade execution dynamics can provide a short-term trading edge.",
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '10h',
    instructor: 'Dr. Aisha Bello',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-05/600/400',
    modules: [{title: 'Inside the Market', lessons: [{ title: 'The Order Book and Liquidity', content: 'Learn to read and interpret the flow of orders.', duration: '1.5h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-i-06',
    title: 'Hedging Techniques',
    description: 'Learn how businesses and producers use futures to hedge against price risk.',
    longDescription: 'Understand the original purpose of futures markets. This course covers practical hedging strategies used by corporations and agricultural producers to lock in prices and manage risk.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '9h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-06/600/400',
    modules: [{title: 'Risk Mitigation', lessons: [{ title: 'Locking In Prices', content: 'Learn the mechanics of creating a hedge.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-i-07',
    title: 'Portfolio Management with Futures',
    description: 'Learn to use futures contracts to manage risk and enhance returns in a larger portfolio.',
    longDescription: 'Integrate futures into a broader investment strategy. This course teaches how to use index futures to hedge stock portfolios and how to use other contracts for asset allocation.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '11h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-i-07/600/400',
    modules: [{title: 'Holistic Management', lessons: [{ title: 'Hedging and Asset Allocation', content: 'Learn to use futures as powerful portfolio tools.', duration: '1.5h', completed: false }], quiz: []}],
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
    modules: [{title: 'The Speed Game', lessons: [{ title: 'HFT Strategies and Infrastructure', content: 'An overview of the fastest game in the markets.', duration: '2.5h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-02',
    title: 'Machine Learning for Trading',
    description: 'Apply advanced machine learning models to predict market movements.',
    longDescription: 'Build predictive models using advanced ML techniques. This course covers everything from feature engineering to using models like LSTMs and Gradient Boosting for forecasting.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '30h',
    instructor: 'Dr. Anya Sharma',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-02/600/400',
    modules: [{title: 'Predictive Modeling', lessons: [{ title: 'From Data to Prediction', content: 'Learn the workflow of building an ML-based trading model.', duration: '3h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-03',
    title: 'Market Making in Futures',
    description: 'Learn the theory and practice of market making and providing liquidity.',
    longDescription: 'Understand the role of a market maker. This course covers the strategies, risk management techniques, and inventory models used by firms that provide liquidity to the futures markets.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '22h',
    instructor: 'Dr. Aisha Bello',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-03/600/400',
    modules: [{title: 'Providing Liquidity', lessons: [{ title: 'The Market Maker\'s Role', content: 'Learn the fundamentals of quoting and managing inventory.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-04',
    title: 'Exotic Futures Products',
    description: 'Explore niche and complex futures products like volatility and weather futures.',
    longDescription: 'Go beyond traditional contracts. This course explores the world of exotic futures, including products based on volatility (like VIX futures) and even weather derivatives.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '16h',
    instructor: 'Tunde Adekunle',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-04/600/400',
    modules: [{title: 'Niche Markets', lessons: [{ title: 'Trading Volatility and Weather', content: 'Learn about these unique and complex markets.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-05',
    title: 'Global Futures Trading',
    description: 'Understand the nuances of trading across different international futures exchanges.',
    longDescription: 'The world is your market. This course covers the operational and strategic details of trading on major global exchanges like Eurex and SGX, including time zone considerations and regulations.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '18h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-05/600/400',
    modules: [{title: 'Trading the World', lessons: [{ title: 'International Exchanges and Nuances', content: 'Learn to navigate the global market landscape.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-06',
    title: 'Systemic Risk Analysis',
    description: 'Analyze how risks can propagate through the interconnected financial system.',
    longDescription: 'Take a macro view of risk. This course explores the concept of systemic risk, how it can lead to financial crises, and the role of regulation in mitigating it.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '15h',
    instructor: 'Dr. Aisha Bello',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-06/600/400',
    modules: [{title: 'Macro-Level Risk', lessons: [{ title: 'Understanding Financial Contagion', content: 'Learn how failures can cascade through the system.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-07',
    title: 'Advanced Legal and Regulatory Issues',
    description: 'A deep dive into the complex legal and compliance landscape for futures traders.',
    longDescription: 'For professionals who need to know. This course covers advanced regulatory topics, including compliance, reporting requirements, and the legal structure of the derivatives industry.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '12h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-07/600/400',
    modules: [{title: 'Compliance and Law', lessons: [{ title: 'Navigating the Rules', content: 'A detailed look at the regulatory environment.', duration: '2h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'futures-a-08',
    title: 'Futures Trading Research',
    description: 'Learn how to conduct original research to develop novel trading strategies.',
    longDescription: 'Develop your own unique trading edge. This course teaches the process of academic-level research, from forming a hypothesis to gathering data and rigorously testing a new strategy.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '25h',
    instructor: 'Dr. Anya Sharma',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-a-08/600/400',
    modules: [{title: 'Developing an Edge', lessons: [{ title: 'The Research Process', content: 'Learn to think and work like a quantitative researcher.', duration: '3h', completed: false }], quiz: []}],
    finalAssessment: []
  },

  // --- Web3 ---
  // Beginner
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
    modules: [{title: 'The Web3 Landscape', lessons: [{ title: 'Exploring the Ecosystem', content: 'Discover the key components of the Web3 world.', duration: '30m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-02',
    title: 'Blockchain Fundamentals',
    description: 'Understand how blockchain technology works, including blocks, chains, and consensus.',
    longDescription: "Demystify blockchain technology. This course breaks down complex concepts like cryptographic hashing, block creation, and consensus mechanisms into easy-to-understand lessons.",
    category: 'Web3',
    level: 'Beginner',
    duration: '7h',
    instructor: 'Chinedu Okafor',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-02/600/400',
    modules: [{title: 'The Blockchain Structure', lessons: [{ title: 'Blocks, Chains, and Hashing', content: 'Learn how blocks are linked to form an immutable chain.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-03',
    title: 'Cryptocurrencies 101',
    description: 'Learn the basics of cryptocurrencies like Bitcoin and Ethereum.',
    longDescription: 'This course covers the fundamentals of digital currencies, explaining their purpose, how they are created, and their role in the Web3 ecosystem.',
    category: 'Web3',
    level: 'Beginner',
    duration: '5h',
    instructor: 'Chinedu Okafor',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-03/600/400',
    modules: [{title: 'Digital Money', lessons: [{ title: 'What is Cryptocurrency?', content: 'An introduction to decentralized digital currencies.', duration: '45m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-04',
    title: 'Smart Contracts Basics',
    description: 'Learn what smart contracts are and their role in automating processes.',
    longDescription: 'Smart contracts are the backbone of Web3. This course explains what they are (self-executing contracts) and how they enable trustless automation on the blockchain.',
    category: 'Web3',
    level: 'Beginner',
    duration: '5h',
    instructor: 'David Lee',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-04/600/400',
    modules: [{title: 'Code is Law', lessons: [{ title: 'Understanding Smart Contracts', content: 'Learn the core concept of self-executing code on a blockchain.', duration: '40m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-05',
    title: 'Decentralized Applications (DApps)',
    description: 'Learn the architecture of dApps and how they differ from traditional web apps.',
    longDescription: 'This course explains the fundamental architecture of a dApp, from its frontend to its smart contract backend, and the key differences from traditional web applications.',
    category: 'Web3',
    level: 'Beginner',
    duration: '5h',
    instructor: 'David Lee',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-05/600/400',
    modules: [{title: 'The DApp Stack', lessons: [{ title: 'Frontend Meets Smart Contract', content: 'Understand the key components of a dApp.', duration: '45m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-06',
    title: 'Web3 Wallets',
    description: 'A practical guide to setting up and using Web3 wallets like MetaMask.',
    longDescription: 'Your wallet is your gateway to Web3. This course provides a step-by-step guide to setting up a wallet, managing your assets securely, and connecting to dApps.',
    category: 'Web3',
    level: 'Beginner',
    duration: '3h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-06/600/400',
    modules: [{title: 'Your Web3 Passport', lessons: [{ title: 'Setting Up Your First Wallet', content: 'A hands-on guide to wallet creation and security.', duration: '40m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-07',
    title: 'NFTs Explained',
    description: 'Learn what Non-Fungible Tokens (NFTs) are, their use cases, and how they work.',
    longDescription: 'Go beyond the hype and understand the technology of NFTs. This course explains non-fungibility, how NFTs represent ownership, and their use cases in art, gaming, and more.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Emily Carter',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-07/600/400',
    modules: [{title: 'Unique Digital Assets', lessons: [{ title: 'Understanding Non-Fungibility', content: 'Learn the difference between fungible and non-fungible tokens.', duration: '30m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-08',
    title: 'Web3 Security',
    description: 'Learn the basics of staying safe in the Web3 world, from avoiding scams to protecting assets.',
    longDescription: 'The decentralized web has unique security challenges. This course teaches you how to identify common scams, protect your private keys, and interact with dApps safely.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Dr. Aisha Bello',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-08/600/400',
    modules: [{title: 'Stay Safe', lessons: [{ title: 'Common Scams and Best Practices', content: 'Learn to protect yourself in the decentralized world.', duration: '45m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-09',
    title: 'Ethereum for Beginners',
    description: 'A focused introduction to the Ethereum blockchain, its features, and ecosystem.',
    longDescription: 'Learn about the world\'s leading smart contract platform. This course covers the history of Ethereum, the role of Ether (ETH), gas fees, and the vast ecosystem built on top of it.',
    category: 'Web3',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Fatima Aliyu',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-09/600/400',
    modules: [{title: 'The World Computer', lessons: [{ title: 'Understanding Ethereum', content: 'A deep dive into the Ethereum platform.', duration: '50m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'web3-b-10',
    title: 'Web3 Development Tools',
    description: 'An overview of the essential tools for Web3 developers, like Hardhat and Ethers.js.',
    longDescription: 'Get familiar with the modern Web3 developer stack. This course introduces you to essential tools for building, testing, and deploying smart contracts and dApps.',
    category: 'Web3',
    level: 'Beginner',
    duration: '6h',
    instructor: 'David Lee',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-10/600/400',
    modules: [{title: 'The Developer\'s Toolkit', lessons: [{ title: 'Hardhat, Ethers.js, and More', content: 'An overview of the tools that power Web3 development.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  // --- Crypto ---
  // Beginner
  {
    id: 'crypto-b-01',
    title: 'Introduction to Cryptocurrency',
    description: 'A comprehensive guide to the world of crypto, from Bitcoin to altcoins.',
    longDescription: 'This is the perfect starting point for your crypto journey. This course covers the history of digital money, what makes cryptocurrency unique, and the key concepts you need to know.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '5h',
    instructor: 'Chinedu Okafor',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-01/600/400',
    modules: [{title: 'The New Money', lessons: [{ title: 'What Is Cryptocurrency?', content: 'Learn the fundamentals of decentralized digital currency.', duration: '45m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'crypto-b-02',
    title: 'Blockchain Technology',
    description: 'Understand the foundational technology that powers all cryptocurrencies.',
    longDescription: 'Learn how blockchain works. This course explains concepts like decentralization, blocks, cryptographic hashing, and consensus mechanisms in simple, easy-to-understand terms.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Chinedu Okafor',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-02/600/400',
    modules: [{title: 'The Distributed Ledger', lessons: [{ title: 'How a Blockchain Works', content: 'A deep dive into the technology behind crypto.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'crypto-b-03',
    title: 'Buying and Selling Crypto',
    description: 'A practical, step-by-step guide to buying and selling cryptocurrencies safely.',
    longDescription: 'Ready to make your first purchase? This course walks you through choosing an exchange, creating an account, and executing your first buy and sell orders securely.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '3h',
    instructor: 'Jane Foster',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-03/600/400',
    modules: [{title: 'Your First Transaction', lessons: [{ title: 'Using a Crypto Exchange', content: 'A step-by-step guide to buying crypto.', duration: '40m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  // --- Tech Skills ---
  // Beginner
  {
    id: 'tech-b-01',
    title: 'Introduction to Programming',
    description: 'A gentle introduction to the world of programming for absolute beginners.',
    longDescription: 'Ever wondered how software is made? This course is your first step. It demystifies coding by explaining the core concepts in simple terms, using Python as a starting point.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '8h',
    instructor: 'Nasir Ibrahim Imam',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-01/600/400',
    modules: [{title: 'The World of Code', lessons: [{ title: 'What is Programming?', content: 'Learn the fundamental concepts of giving instructions to a computer.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'tech-b-02',
    title: 'Web Development Fundamentals',
    description: 'Learn the essential trio of web development: HTML, CSS, and JavaScript.',
    longDescription: 'This course covers the three fundamental technologies that build the web. You will learn how to structure pages with HTML, style them with CSS, and add interactivity with JavaScript.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '10h',
    instructor: 'Emily Carter',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-02/600/400',
    modules: [{title: 'Building the Web', lessons: [{ title: 'HTML, CSS, and JavaScript', content: 'Learn the three core languages of the web.', duration: '1.5h', completed: false }], quiz: []}],
    finalAssessment: []
  },
  // --- AI & Machine Learning ---
  // Beginner
  {
    id: 'ai-b-01',
    title: 'Introduction to AI',
    description: 'A non-technical introduction to the concepts and impact of Artificial Intelligence.',
    longDescription: 'This course is for anyone curious about AI, no technical background required. We\'ll explore what AI is, the different types, and how it is already impacting our daily lives.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '4h',
    instructor: 'Dr. Anya Sharma',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-01/600/400',
    modules: [{title: 'The AI Revolution', lessons: [{ title: 'Defining Intelligence', content: 'Explore the different types of AI and the quest to create intelligent machines.', duration: '40m', completed: false }], quiz: []}],
    finalAssessment: []
  },
  {
    id: 'ai-b-02',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the core concepts of machine learning, from supervised to unsupervised learning.',
    longDescription: 'This course is the ideal starting point for machine learning. It covers supervised, unsupervised, and reinforcement learning, explaining how machines can learn from data to make predictions.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '6h',
    instructor: 'Dr. Anya Sharma',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-02/600/400',
    modules: [{title: 'Teaching Machines', lessons: [{ title: 'Supervised vs. Unsupervised Learning', content: 'Understand the key difference between learning with labeled and unlabeled data.', duration: '1h', completed: false }], quiz: []}],
    finalAssessment: []
  },
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
        imageUrl: 'https://picsum.photos/seed/tech-008/600/400',
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
        imageUrl: 'https://picsum.photos/seed/tech-009/600/400',
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
        imageUrl: "https://picsum.photos/seed/futures-011/600/400",
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
        imageUrl: "https://picsum.photos/seed/web3-014/600/400",
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
        imageUrl: "https://picsum.photos/seed/crypto-001/600/400",
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
        imageUrl: "https://picsum.photos/seed/ai-009/600/400",
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
