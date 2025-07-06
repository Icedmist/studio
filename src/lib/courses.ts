import type { Course } from './types';

export const courses: Course[] = [
  // Category: Futures Trading
  // Beginner
  {
    id: 'ft-b-1',
    title: 'Introduction to Futures Trading',
    description: 'Learn the fundamentals of futures markets and trading strategies.',
    longDescription: 'A foundational course covering the basics of futures trading, from what futures are to how they are traded on various exchanges. Perfect for absolute beginners who want to build a solid understanding of market mechanics and risk.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Concepts of Futures Markets', 
            lessons: [
                {title: 'A Deep Dive into the Definition and Mechanics of Futures Contracts', duration: '1h 45min'}, 
                {title: 'Identifying Key Market Participants and Their Roles', duration: '2h 15min'}
            ] 
        },
        { 
            title: 'Module 2: Executing Your First Futures Trade', 
            lessons: [
                {title: 'A Step-by-Step Guide to Opening a Trading Account', duration: '1h 30min'}, 
                {title: 'Mastering Order Types and Trade Execution', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '8h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ft-b-2',
    title: 'Futures Markets Overview',
    description: 'Explore the different types of futures markets available.',
    longDescription: 'This course provides a comprehensive overview of the various futures markets, including commodities, indices, and currencies, helping you find the right market for your trading style and goals.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Exploring Different Market Types', 
            lessons: [
                {title: 'In-Depth Analysis of Commodity Futures (Energy, Metals, Agriculture)', duration: '2h 30min'}, 
                {title: 'Understanding Financial Futures (Indices, Currencies, Interest Rates)', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Navigating Major Global Exchanges', 
            lessons: [
                {title: 'Trading on CME Group: Products and Specifications', duration: '2h 0min'}, 
                {title: 'An Introduction to the Intercontinental Exchange (ICE)', duration: '2h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ft-b-3',
    title: 'Basic Futures Trading Strategies',
    description: 'Learn simple yet effective strategies for trading futures.',
    longDescription: 'Discover foundational trading strategies that you can apply immediately. This course covers trend-following, range trading, and breakout strategies with practical, real-world examples and chart analysis.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Foundational Strategy Concepts', 
            lessons: [
                {title: 'Mastering Long and Short Positions in Various Market Conditions', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Implementing Basic Strategies', 
            lessons: [
                {title: 'The Art of Trend Following: Identifying and Riding Market Trends', duration: '3h 0min'}, 
                {title: 'Executing Breakout Trades: Identifying Key Levels and Entry Points', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '8h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'ft-b-4',
    title: 'Technical Analysis for Futures',
    description: 'Understand how to read charts and use indicators for trading.',
    longDescription: 'Learn the art of technical analysis to predict market movements. This course covers chart patterns, support and resistance, moving averages, volume analysis, and other key indicators.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Foundations of Charting', 
            lessons: [
                {title: 'Interpreting Candlestick Charts and Common Patterns', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Applying Key Technical Indicators', 
            lessons: [
                {title: 'Utilizing Moving Averages for Trend Identification', duration: '2h 15min'}, 
                {title: 'Understanding Momentum with the Relative Strength Index (RSI)', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '7h 15m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ft-b-5',
    title: 'Fundamental Analysis in Futures',
    description: 'Learn how economic data and news impact futures prices.',
    longDescription: 'Go beyond the charts to understand the real-world factors that drive market prices. This course explores supply and demand dynamics, economic reports, and geopolitical events.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Concepts of Fundamental Analysis', 
            lessons: [
                {title: 'Analyzing Supply and Demand in Commodity Markets', duration: '2h 15min'}
            ] 
        },
        { 
            title: 'Module 2: Key Data Sources and Reports', 
            lessons: [
                {title: 'Using Economic Calendars to Anticipate Market Movements', duration: '2h 0min'}, 
                {title: 'Interpreting Government and Industry Reports (e.g., WASDE, EIA)', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 45m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ft-b-6',
    title: 'Risk Management Essentials',
    description: 'Discover how to protect your capital while trading futures.',
    longDescription: 'The most critical skill for any trader. This course teaches you how to manage risk effectively using stop-loss orders, proper position sizing, and understanding the dangers of leverage.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Principles of Trading Risk', 
            lessons: [
                {title: 'Calculating and Understanding Risk vs. Reward Ratios', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Practical Risk Management Tools', 
            lessons: [
                {title: 'Effective Placement of Stop-Loss and Take-Profit Orders', duration: '2h 30min'}, 
                {title: 'Mastering Position Sizing to Control Exposure', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '7h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ft-b-7',
    title: 'Trading Psychology',
    description: 'Master the mental game of trading to avoid common pitfalls.',
    longDescription: 'Learn to control emotions like fear and greed that can sabotage your trading performance. This course covers discipline, patience, and developing a resilient, winning mindset.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding Your Emotional Triggers', 
            lessons: [
                {title: 'Conquering the Impulses of Fear, Greed, and FOMO', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Strategies for Building Mental Discipline', 
            lessons: [
                {title: 'The Importance of Sticking to Your Trading Plan No Matter What', duration: '2h 45min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 15m',
    instructor: 'John Smith'
  },
  {
    id: 'ft-b-8',
    title: 'Futures Trading Platforms',
    description: 'Get a step-by-step guide to using popular trading software.',
    longDescription: 'This practical course walks you through setting up and using top trading platforms like NinjaTrader and TradingView, so you can analyze charts and execute trades with confidence.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Platform Installation and Setup', 
            lessons: [
                {title: 'Complete Walkthrough of Installation and Initial Configuration', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Core Platform Features', 
            lessons: [
                {title: 'Advanced Charting Tools and Customization', duration: '2h 30min'}, 
                {title: 'Efficient Order Entry and Management Techniques', duration: '2h 15min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 45m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ft-b-9',
    title: 'Simulated Trading Practice',
    description: 'Apply your knowledge in a risk-free environment.',
    longDescription: 'Put your learning into practice without risking real money. This course guides you through the process of paper trading, helping you build confidence and refine your strategy before going live.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Setting up Your Demo Environment', 
            lessons: [
                {title: 'Choosing and Configuring a High-Quality Trading Simulator', duration: '1h 45min'}
            ] 
        },
        { 
            title: 'Module 2: Structured Practice Sessions', 
            lessons: [
                {title: 'Executing and Analyzing a High Volume of Mock Trades', duration: '4h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 45m',
    instructor: 'David Lee'
  },
  {
    id: 'ft-b-10',
    title: 'Building a Trading Plan',
    description: 'Create a personalized and structured plan for your trading.',
    longDescription: 'Formalize your strategy into a comprehensive, written trading plan. This course covers defining your goals, rules for entry and exit, risk parameters, and how to review your performance.',
    category: 'Futures Trading',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Essential Components of a Trading Plan', 
            lessons: [
                {title: 'Defining Your Trading Edge and Strategy Rules', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Plan Execution and Performance Review', 
            lessons: [
                {title: 'The Power of Journaling and Reviewing Every Trade', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 0m',
    instructor: 'Chen Wang'
  },
  // Intermediate
  {
    id: 'ft-i-1',
    title: 'Advanced Trading Strategies',
    description: 'Explore sophisticated strategies like spreading and hedging.',
    longDescription: 'Go beyond the basics with advanced strategies like calendar spreads, intercommodity spreads, and various hedging techniques used by professional traders to manage risk and exploit market inefficiencies.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Spreads Trading', 
            lessons: [
                {title: 'Constructing and Managing Calendar Spreads', duration: '4h 0min'}, 
                {title: 'Finding Opportunities in Inter-commodity Spreads', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Hedging Techniques', 
            lessons: [
                {title: 'Hedging an Entire Investment Portfolio with Index Futures', duration: '5h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '13h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ft-i-2',
    title: 'Quantitative Analysis',
    description: 'Apply mathematical models to identify trading opportunities.',
    longDescription: 'Learn to use quantitative methods to analyze market data. This course introduces statistical arbitrage, robust backtesting methodologies, and model validation techniques.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Statistical Concepts in Trading', 
            lessons: [
                {title: 'Identifying and Trading Mean Reversion Strategies', duration: '4h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Rigorous Strategy Backtesting', 
            lessons: [
                {title: 'A Comprehensive Guide to Backtesting and Avoiding Common Pitfalls', duration: '5h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '9h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ft-i-3',
    title: 'Algorithmic Trading Introduction',
    description: 'Learn the basics of automating your trading strategies.',
    longDescription: 'Step into the world of automated trading. This course covers the fundamentals of designing, building, and testing simple trading algorithms using Python and popular trading APIs.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Algorithmic Trading Concepts', 
            lessons: [
                {title: 'The Lifecycle of an Automated Trading Strategy', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Building Your First Trading Bot', 
            lessons: [
                {title: 'Automating a Simple Strategy in Python from Scratch', duration: '7h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '10h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'ft-i-4',
    title: 'Options on Futures',
    description: 'Understand how to trade options contracts on futures markets.',
    longDescription: 'Add a powerful tool to your trading arsenal. This course explores options terminology, core strategies like calls and puts, understanding the Greeks, and how to manage risk effectively.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Options Fundamentals for Futures Traders', 
            lessons: [
                {title: 'Mastering Calls, Puts, and Key Terminology (The Greeks)', duration: '3h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Implementing Basic Options Strategies', 
            lessons: [
                {title: 'Generating Income with Covered Calls on Futures Positions', duration: '4h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '7h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ft-i-5',
    title: 'Market Microstructure',
    description: 'Analyze the mechanics of order flow and market making.',
    longDescription: 'Gain a deeper understanding of how markets truly work. This course examines order books, liquidity, the impact of high-frequency trading, and how to read order flow.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Reading the Tape and Order Flow', 
            lessons: [
                {title: 'Advanced Analysis of the Depth of Market (DOM) and Order Book', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Understanding Liquidity and Slippage', 
            lessons: [
                {title: 'Analyzing the Market Impact of Large Trades', duration: '4h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '8h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'ft-i-6',
    title: 'Hedging Techniques',
    description: 'Learn advanced methods for managing price risk.',
    longDescription: 'A practical course for producers, consumers, and portfolio managers. Learn how to use futures to lock in prices and protect against adverse market movements using advanced techniques.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Hedging Principles', 
            lessons: [
                {title: 'Calculating Hedge Ratios for Short and Long Hedges', duration: '3h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Complex Hedging Strategies', 
            lessons: [
                {title: 'Implementing Cross-Hedging When a Direct Hedge is Unavailable', duration: '4h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '8h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ft-i-7',
    title: 'Portfolio Management with Futures',
    description: 'Incorporate futures into a diversified investment portfolio.',
    longDescription: 'Learn how institutional investors use futures to enhance returns, manage risk, and gain efficient exposure to different asset classes within a larger, diversified portfolio.',
    category: 'Futures Trading',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Strategic Asset Allocation with Futures', 
            lessons: [
                {title: 'Using Futures for Tactical and Strategic Diversification', duration: '4h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Portfolio Risk Management', 
            lessons: [
                {title: 'Implementing Portfolio Overlay and Hedging Strategies', duration: '5h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '9h 30m',
    instructor: 'Fatima Ahmed'
  },
  // Advanced
  {
    id: 'ft-a-1',
    title: 'High-Frequency Trading',
    description: 'Explore the technology and strategies behind HFT.',
    longDescription: 'An in-depth look at high-frequency trading, covering the necessary infrastructure, co-location, low-latency strategies, and the hardware behind HFT.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Infrastructure of High-Frequency Trading', 
            lessons: [
                {title: 'Optimizing Hardware, Software, and Connectivity for Low Latency', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Core HFT Strategies', 
            lessons: [
                {title: 'Implementing Latency Arbitrage and Statistical Arbitrage Models', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '13h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ft-a-2',
    title: 'Machine Learning for Trading',
    description: 'Apply AI and machine learning models to financial markets.',
    longDescription: 'This cutting-edge course teaches you how to build and deploy machine learning models to forecast prices, identify alpha, and automate trading decisions in the futures markets.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Building Predictive Models', 
            lessons: [
                {title: 'Advanced Feature Engineering for Financial Time Series Data', duration: '6h 30min'}
            ] 
        },
        { 
            title: 'Module 2: From ML Signal to Live Execution', 
            lessons: [
                {title: 'Integrating Machine Learning Models into an Execution System', duration: '8h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ft-a-3',
    title: 'Market Making in Futures',
    description: 'Learn the theory and practice of being a market maker.',
    longDescription: 'Understand the business of market making, including inventory management, sophisticated quoting strategies, and risk control for providing liquidity to the market.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Market Making Models', 
            lessons: [
                {title: 'Implementing the Avellaneda-Stoikov Model for Optimal Quoting', duration: '7h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Risk Management for Market Makers', 
            lessons: [
                {title: 'Managing Inventory Risk and Hedging Exposures', duration: '6h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '13h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ft-a-4',
    title: 'Exotic Futures Products',
    description: 'Explore and trade complex and non-standard futures.',
    longDescription: 'Dive into less common futures products like weather derivatives, electricity futures, and volatility futures (VIX), including their unique risks and opportunities.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Trading Weather Derivatives', 
            lessons: [
                {title: 'Understanding and Trading Heating and Cooling Degree Days (HDDs/CDDs)', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Trading Volatility Futures', 
            lessons: [
                {title: 'Advanced Strategies for Trading VIX Futures', duration: '6h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '12h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'ft-a-5',
    title: 'Global Futures Trading',
    description: 'Understand the nuances of trading across international markets.',
    longDescription: 'Learn to navigate the complexities of global futures markets, including different time zones, regulatory environments, and macroeconomic influences for a 24/7 trading approach.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Trading on International Exchanges', 
            lessons: [
                {title: 'A Deep Dive into Eurex and Key Asian Markets', duration: '6h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Global Macro Trading Strategies', 
            lessons: [
                {title: 'Analyzing Currency and Interest Rate Effects on Global Markets', duration: '7h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '13h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ft-a-6',
    title: 'Systemic Risk Analysis',
    description: 'Analyze and manage risks that can impact the entire market.',
    longDescription: 'Explore the concept of systemic risk, how it builds up in the financial system, and how to use futures and other derivatives to monitor and hedge against tail risks.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Theory of Systemic Risk', 
            lessons: [
                {title: 'Understanding Financial Contagion and Cascading Failures', duration: '6h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Hedging Systemic and Tail Risks', 
            lessons: [
                {title: 'Advanced Hedging using Options and VIX Products', duration: '7h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '13h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ft-a-7',
    title: 'Advanced Legal and Regulatory Issues',
    description: 'A deep dive into the compliance landscape for professional traders.',
    longDescription: 'For aspiring professional and institutional traders, this course covers the complex legal and regulatory frameworks governing the futures industry worldwide, including Dodd-Frank and MiFID II.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Navigating Global Regulations', 
            lessons: [
                {title: 'In-Depth Analysis of Dodd-Frank and MiFID II Requirements', duration: '7h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Institutional Compliance', 
            lessons: [
                {title: 'Best Practices for Reporting, Surveillance, and Audits', duration: '6h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '13h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ft-a-8',
    title: 'Futures Trading Research',
    description: 'Learn how to conduct and publish original market research.',
    longDescription: 'This course teaches the methodologies for conducting academic-level research in futures markets, from forming a hypothesis to statistical analysis and writing a publishable paper.',
    category: 'Futures Trading',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Quantitative Research Methodology', 
            lessons: [
                {title: 'Sourcing, Cleaning, and Analyzing Financial Data', duration: '7h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Writing and Publishing Research', 
            lessons: [
                {title: 'How to Structure and Write a Publishable Research Paper', duration: '8h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 30m',
    instructor: 'John Smith'
  },
  
  // Category: Web3
  // Beginner
  {
    id: 'w3-b-1',
    title: 'Introduction to Web3',
    description: 'Understand the vision and core components of the decentralized web.',
    longDescription: 'Get a clear, high-level overview of Web3. This course explains the shift from Web2, the importance of decentralization, and the key technologies like blockchain and crypto that are driving the change.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Evolution of the Internet', 
            lessons: [
                {title: 'From Web1 to Web3: A Historical Perspective', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Core Concepts of a Decentralized Web', 
            lessons: [
                {title: 'Understanding Decentralization, Blockchain, and Trustless Systems', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '4h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'w3-b-2',
    title: 'Blockchain Fundamentals',
    description: 'Learn how blockchain technology works from the ground up.',
    longDescription: 'Demystify blockchain technology. This course covers blocks, chains, cryptographic hashing, consensus mechanisms, and public-key cryptography in an easy-to-understand way.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Anatomy of a Blockchain', 
            lessons: [
                {title: 'How Blocks, Chains, and Hashes Create an Immutable Ledger', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: How Blockchains Agree (Consensus)', 
            lessons: [
                {title: 'A Deep Dive into Proof-of-Work and Proof-of-Stake', duration: '3h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'w3-b-3',
    title: 'Cryptocurrencies 101',
    description: 'Get an introduction to Bitcoin, Ethereum, and other digital assets.',
    longDescription: 'Learn about the first and most important applications of blockchain technology: cryptocurrencies. This course covers the history and purpose of Bitcoin, Ethereum, and the broader altcoin ecosystem.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Pioneers of Cryptocurrency', 
            lessons: [
                {title: 'What is Bitcoin and Why is it Important?', duration: '2h 0min'}, 
                {title: 'Ethereum: The World Computer and Smart Contracts', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: The Broader Crypto Ecosystem', 
            lessons: [
                {title: 'A Guide to Understanding and Categorizing Altcoins', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '7h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'w3-b-4',
    title: 'Smart Contracts Basics',
    description: 'Understand what smart contracts are and how they work.',
    longDescription: 'Discover the power of smart contracts, the self-executing code that powers decentralized applications. This course explains their purpose, potential, and limitations in a non-technical way.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Core Idea of Smart Contracts', 
            lessons: [
                {title: 'How Code Can Automate Agreements and Transactions', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Real-World Use Cases', 
            lessons: [
                {title: 'Applications from Vending Machines to Complex Financial Derivatives', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'w3-b-5',
    title: 'Decentralized Applications (DApps)',
    description: 'Learn what DApps are and how they differ from traditional apps.',
    longDescription: 'Explore the new world of decentralized applications. This course covers the architecture of a DApp and showcases popular examples in finance (DeFi), gaming (GameFi), and social media.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Architecture of a DApp', 
            lessons: [
                {title: 'Connecting a Frontend, Backend, and Blockchain', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Exploring the DApp Ecosystem', 
            lessons: [
                {title: 'A Guided Tour of the Most Popular DApps', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'w3-b-6',
    title: 'Web3 Wallets',
    description: 'Learn how to create and manage your own crypto wallet securely.',
    longDescription: 'Your wallet is your gateway to the decentralized web. This essential course teaches you about different types of wallets (hot, cold, hardware), how to set one up, and best practices for security.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Types of Crypto Wallets', 
            lessons: [
                {title: 'Custodial vs. Non-Custodial, Hot vs. Cold Wallets', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Wallet Security Best Practices', 
            lessons: [
                {title: 'Protecting Your Seed Phrases and Private Keys at All Costs', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'w3-b-7',
    title: 'NFTs Explained',
    description: 'Understand the technology behind Non-Fungible Tokens.',
    longDescription: 'Go beyond the hype to understand what NFTs are, how they work on a technical level, and their potential use cases in art, gaming, digital identity, and intellectual property.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: What is an NFT?', 
            lessons: [
                {title: 'Understanding Fungibility and Non-Fungibility in Digital Assets', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: The Expanding World of NFT Use Cases', 
            lessons: [
                {title: 'Applications in Digital Art, Gaming, Ticketing, and More', duration: '2h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '4h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'w3-b-8',
    title: 'Web3 Security',
    description: 'Learn the basic principles of staying safe in the Web3 world.',
    longDescription: 'Security is paramount in Web3. This course covers common scams, how to identify malicious smart contracts, and best practices for protecting your assets from phishing and other attacks.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Identifying Common Threats', 
            lessons: [
                {title: 'A Deep Dive into Phishing, Scams, and Malicious Contracts', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Developing Best Security Practices', 
            lessons: [
                {title: 'How to Secure Your Wallet and Interactions with DApps', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'w3-b-9',
    title: 'Ethereum for Beginners',
    description: 'A focused introduction to the leading smart contract platform.',
    longDescription: 'Learn about Ethereum, the blockchain that pioneered smart contracts. This course covers Ether (ETH), gas fees, the Ethereum Virtual Machine (EVM), and the concept of a global computer.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Vision of Ethereum', 
            lessons: [
                {title: 'Understanding Ethereum as a World Computer', duration: '2h 0min'}
            ] 
        },
        { 
            title: 'Module 2: How Ethereum Works', 
            lessons: [
                {title: 'A Detailed Look at Gas, Transactions, and the EVM', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'w3-b-10',
    title: 'Web3 Development Tools',
    description: 'An overview of the essential tools for building in Web3.',
    longDescription: 'Get familiar with the Web3 developer stack. This course introduces you to tools like Hardhat, Foundry, Ethers.js, and IPFS that you will need to start building DApps.',
    category: 'Web3',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Smart Contract Development Environments', 
            lessons: [
                {title: 'An Introduction to Hardhat and Foundry', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Frontend Libraries for Web3', 
            lessons: [
                {title: 'Interacting with the Blockchain using Ethers.js and Viem', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Fatima Ahmed'
  },
  // Intermediate
  {
    id: 'w3-i-1',
    title: 'Advanced Smart Contract Development',
    description: 'Build complex and optimized smart contracts.',
    longDescription: 'Go beyond basic contracts to learn about upgradeability patterns (proxies), advanced gas optimization techniques, and complex data structures for professional-grade DApps.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Design Patterns', 
            lessons: [
                {title: 'Implementing Upgradeable Contracts using Proxy Patterns', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Smart Contract Optimization', 
            lessons: [
                {title: 'Mastering Gas Saving Techniques for Efficient Code', duration: '5h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '11h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'w3-i-2',
    title: 'Solidity Programming',
    description: 'Master the primary language for Ethereum smart contracts.',
    longDescription: 'A deep dive into Solidity. This course covers everything from basic syntax to advanced features like assembly, preparing you to write secure and efficient smart contracts.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Solidity Language Fundamentals', 
            lessons: [
                {title: 'Mastering Data Types, Functions, and Modifiers', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Solidity Concepts', 
            lessons: [
                {title: 'Using Inheritance, Libraries, and Assembly for Power and Efficiency', duration: '7h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '13h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'w3-i-3',
    title: 'Web3 Frontend Development',
    description: 'Learn to build user interfaces that interact with the blockchain.',
    longDescription: 'Connect your frontend skills to Web3. This course teaches you how to use libraries like Ethers.js and Wagmi to build modern React applications that talk to smart contracts.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Connecting Wallets and Users', 
            lessons: [
                {title: 'Integrating WalletConnect, MetaMask, and Other Wallets', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Interacting with Smart Contracts', 
            lessons: [
                {title: 'Reading Blockchain Data and Writing Transactions from the Frontend', duration: '7h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'w3-i-4',
    title: 'Blockchain Scalability',
    description: 'Understand the solutions for making blockchains faster.',
    longDescription: 'Explore the blockchain trilemma and the different approaches to scalability, including a deep dive into Layer 2 solutions like Optimistic Rollups and ZK-Rollups.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Scalability Problem Explained', 
            lessons: [
                {title: 'A Deep Dive into the Blockchain Trilemma', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Understanding Layer 2 Solutions', 
            lessons: [
                {title: 'Comparing and Contrasting Optimistic vs. ZK-Rollups', duration: '6h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '9h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'w3-i-5',
    title: 'DeFi Protocols',
    description: 'A deep dive into the mechanics of decentralized finance.',
    longDescription: 'Learn how major DeFi protocols like Uniswap, Aave, and MakerDAO work under the hood. This course covers automated market makers, lending protocols, and stablecoin architectures.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Decentralized Exchanges (DEXs)', 
            lessons: [
                {title: 'The Inner Workings of Uniswap and Automated Market Makers', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Decentralized Lending and Borrowing', 
            lessons: [
                {title: 'The Architecture of Aave and Compound', duration: '6h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'w3-i-6',
    title: 'NFT Marketplaces',
    description: 'Learn to build your own NFT marketplace from scratch.',
    longDescription: 'This project-based course guides you through the process of building a fully functional NFT marketplace, from the ERC-721 smart contracts to the React frontend.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Building the NFT Smart Contracts (ERC-721)', 
            lessons: [
                {title: 'Writing and Deploying the Core NFT and Marketplace Contracts', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Developing the Marketplace Frontend', 
            lessons: [
                {title: 'Building the UI in React to Mint and Trade NFTs', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'w3-i-7',
    title: 'Web3 Security Audits',
    description: 'Learn the process of auditing smart contracts for vulnerabilities.',
    longDescription: 'Develop the skills to become a smart contract auditor. This course covers common attack vectors, security tools like Slither and Mythril, and the methodology for conducting a thorough audit.',
    category: 'Web3',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Common Smart Contract Vulnerabilities', 
            lessons: [
                {title: 'A Deep Dive into Reentrancy, Oracle Manipulation, and Other Attacks', duration: '6h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Professional Auditing Tools and Techniques', 
            lessons: [
                {title: 'Hands-on Practice with Slither, Mythril, and Echidna', duration: '6h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '13h 0m',
    instructor: 'Jane Doe'
  },
  // Advanced
  {
    id: 'w3-a-1',
    title: 'Zero-Knowledge Proofs',
    description: 'Understand the cryptography behind ZKPs and their applications.',
    longDescription: 'A deep dive into one of the most exciting fields in cryptography. This course explains the math behind ZK-SNARKs and ZK-STARKs and their use in scaling and privacy.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Theory of Zero-Knowledge Proofs', 
            lessons: [
                {title: 'A Comparative Analysis of SNARKs vs. STARKs', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Practical Applications and Development', 
            lessons: [
                {title: 'Building a Simple Application using ZK-Rollup Technology', duration: '9h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'w3-a-2',
    title: 'Layer 1 Blockchains',
    description: 'Analyze and compare the architecture of different L1s.',
    longDescription: 'Go beyond Ethereum to explore the design and architecture of other Layer 1 blockchains like Solana, Avalanche, and Cosmos, and understand their technical trade-offs.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Alternative L1 Architectures', 
            lessons: [
                {title: 'An In-Depth Look at the Solana Model (Proof-of-History)', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: The Interoperable Cosmos Ecosystem', 
            lessons: [
                {title: 'Mastering the Inter-Blockchain Communication Protocol (IBC)', duration: '8h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'w3-a-3',
    title: 'Web3 Interoperability',
    description: 'Explore solutions for communication between different blockchains.',
    longDescription: 'As the multi-chain world grows, interoperability is key. This course covers different bridging solutions, their security models, and protocols like LayerZero that enable cross-chain communication.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: A Deep Dive into Bridge Designs', 
            lessons: [
                {title: 'Analyzing the Security and Trade-offs of Different Bridge Architectures', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Generic Messaging Interoperability Protocols', 
            lessons: [
                {title: 'Understanding LayerZero, Axelar, and Chainlink CCIP', duration: '8h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'w3-a-4',
    title: 'Decentralized Autonomous Organizations (DAOs)',
    description: 'Learn to design, build, and manage DAOs.',
    longDescription: 'Explore the future of organizations. This course covers the technical and social aspects of DAOs, including governance structures, treasury management, and legal wrappers.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: DAO Creation and Frameworks', 
            lessons: [
                {title: 'Building on Aragon, OpenZeppelin Governor, and Other Frameworks', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced DAO Governance and Treasury Management', 
            lessons: [
                {title: 'Designing Voting Mechanisms and Managing a DAO Treasury', duration: '8h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'w3-a-5',
    title: 'Advanced DeFi Strategies',
    description: 'Explore complex strategies like leveraged yield farming.',
    longDescription: 'For the advanced DeFi user, this course covers high-risk, high-reward strategies including leveraged yield farming, delta-neutral strategies, and structured products.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Leveraged Yield Farming', 
            lessons: [
                {title: 'Managing Leveraged Positions and Liquidation Risk', duration: '8h 0min'}
            ] 
        },
        { 
            title: 'Module 2: DeFi Structured Products and Options', 
            lessons: [
                {title: 'Understanding and Using DeFi Options Vaults (DOVs)', duration: '8h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'w3-a-6',
    title: 'Web3 and AI Integration',
    description: 'Explore the intersection of decentralized and intelligent systems.',
    longDescription: 'Discover the synergies between AI and Web3. This course explores decentralized AI marketplaces, on-chain machine learning models (zkML), and AI-powered DAOs.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Decentralized AI Networks and Marketplaces', 
            lessons: [
                {title: 'Exploring the Use Cases and Challenges of Decentralized AI', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: On-chain AI with zkML', 
            lessons: [
                {title: 'Understanding Verifiable Computation for AI Models on the Blockchain', duration: '8h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'w3-a-7',
    title: 'Regulatory Compliance in Web3',
    description: 'Navigate the evolving legal landscape of Web3.',
    longDescription: 'For founders and professionals, this course provides an overview of the key regulatory challenges in Web3, including securities laws (Howey Test), AML/KYC for DeFi, and taxation.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Navigating Securities Law in Token Offerings', 
            lessons: [
                {title: 'Applying the Howey Test to Modern Digital Assets', duration: '8h 0min'}
            ] 
        },
        { 
            title: 'Module 2: AML/KYC Compliance for DeFi Protocols', 
            lessons: [
                {title: 'Implementing Compliance Strategies in Decentralized Environments', duration: '8h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'w3-a-8',
    title: 'Web3 Research',
    description: 'Learn to conduct and contribute to research in Web3.',
    longDescription: 'This course focuses on the methodologies for research in the fast-moving Web3 space, covering protocol analysis, mechanism design, and cryptoeconomics.',
    category: 'Web3',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Field of Cryptoeconomics', 
            lessons: [
                {title: 'Analyzing and Designing Incentive Systems in Protocols', duration: '8h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Mechanism Design for Protocols', 
            lessons: [
                {title: 'How to Design and Propose Novel Web3 Protocols', duration: '9h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '17h 30m',
    instructor: 'Maria Garcia'
  },
  
  // Category: Crypto
  // Beginner
  {
    id: 'c-b-1',
    title: 'Introduction to Cryptocurrency',
    description: 'Learn the basics of blockchain, Bitcoin, and Ethereum.',
    longDescription: 'This course is the perfect starting point for anyone new to crypto. We cover the history of money, what makes blockchain revolutionary, and how to safely buy and sell digital assets.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Foundations of Cryptocurrency', 
            lessons: [
                {title: 'What is Blockchain and Why Does It Matter?', duration: '2h 0min'}, 
                {title: 'A Deep Dive into Bitcoin and its Properties', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Your First Steps in Crypto', 
            lessons: [
                {title: 'A Secure Guide to Setting up Your First Crypto Wallet', duration: '3h 0min'}, 
                {title: 'How to Execute Your First Cryptocurrency Transaction', duration: '1h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'c-b-2',
    title: 'Blockchain Technology',
    description: 'A deeper dive into the technology that powers cryptocurrencies.',
    longDescription: 'Understand the technical foundations of cryptocurrencies. This course explains concepts like decentralization, cryptography, and consensus in more detail.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Technological Concepts', 
            lessons: [
                {title: 'Understanding Decentralized and Distributed Ledgers', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: The Role of Cryptography', 
            lessons: [
                {title: 'A Detailed Look at Public and Private Keys', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'c-b-3',
    title: 'Buying and Selling Crypto',
    description: 'A practical guide to using exchanges to trade crypto.',
    longDescription: 'Learn step-by-step how to use a cryptocurrency exchange to buy, sell, and trade your first digital assets safely and efficiently.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Navigating Crypto Exchanges', 
            lessons: [
                {title: 'Centralized vs. Decentralized Exchanges: Pros and Cons', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Order Types', 
            lessons: [
                {title: 'How and When to Use Market, Limit, and Stop-Loss Orders', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '5h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'c-b-4',
    title: 'Crypto Wallets',
    description: 'Learn how to securely store your cryptocurrencies.',
    longDescription: 'An essential course on wallet security. Learn the difference between software and hardware wallets and the best practices for keeping your crypto safe from threats.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: A Deep Dive into Wallet Types', 
            lessons: [
                {title: 'Software (Hot) vs. Hardware (Cold) Wallets: A Security Comparison', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Wallet Security', 
            lessons: [
                {title: 'Best Practices for Managing Your Seed Phrase and Private Keys', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'c-b-5',
    title: 'Crypto Security',
    description: 'Learn to identify and avoid common scams in the crypto space.',
    longDescription: 'Protect yourself from the risks in the crypto world. This course teaches you how to spot phishing attacks, rug pulls, and other common scams.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding the Threat Landscape', 
            lessons: [
                {title: 'An In-Depth Look at Common Scams and Exploits', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Implementing Defensive Measures', 
            lessons: [
                {title: 'Practical Steps to Keep Your Crypto Safe', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'c-b-6',
    title: 'Understanding Altcoins',
    description: 'Explore the world of cryptocurrencies beyond Bitcoin.',
    longDescription: 'Bitcoin is just the beginning. This course provides an overview of the altcoin market, including different categories like Layer 1s, DeFi tokens, and memecoins.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Vast World of Altcoins', 
            lessons: [
                {title: 'Categorizing and Understanding Different Types of Altcoins', duration: '2h 30min'}
            ] 
        },
        { 
            title: 'Module 2: How to Research New Projects', 
            lessons: [
                {title: 'A Framework for Evaluating an Altcoin Project and its Potential', duration: '3h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'c-b-7',
    title: 'Crypto Market Analysis',
    description: 'An introduction to analyzing the cryptocurrency market.',
    longDescription: 'Learn the basics of both technical and fundamental analysis as they apply to the crypto markets to help you make more informed trading decisions.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Basics of Technical Analysis', 
            lessons: [
                {title: 'Reading Candlestick Charts and Identifying Basic Patterns', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: The Basics of Fundamental Analysis', 
            lessons: [
                {title: 'How to Evaluate a Project’s Whitepaper, Team, and Tokenomics', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'c-b-8',
    title: 'ICO and Token Sales',
    description: 'Understand how new cryptocurrencies are launched.',
    longDescription: 'Learn about Initial Coin Offerings (ICOs), Initial DEX Offerings (IDOs), and other methods of token distribution, including the risks and opportunities.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding Different Token Launch Models', 
            lessons: [
                {title: 'From ICOs and IEOs to IDOs and Airdrops', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: How to Evaluate a Token Sale', 
            lessons: [
                {title: 'Identifying Red Flags and Green Flags in New Projects', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'c-b-9',
    title: 'Crypto Regulations',
    description: 'A simple overview of the regulatory landscape for crypto.',
    longDescription: 'Get a basic understanding of how governments and regulators are approaching cryptocurrency around the world, and what it means for you as an investor.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: A Global Regulatory Overview', 
            lessons: [
                {title: 'Comparing the Regulatory Approaches of Different Countries', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Key Regulatory Issues', 
            lessons: [
                {title: 'Understanding Taxation and Securities Law for Crypto', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'c-b-10',
    title: 'Building a Crypto Portfolio',
    description: 'Learn the basics of asset allocation and portfolio construction.',
    longDescription: 'This course provides a framework for building your first crypto portfolio, covering diversification, risk tolerance, and setting long-term goals.',
    category: 'Crypto',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Principles of Portfolio Theory', 
            lessons: [
                {title: 'The Importance of Diversification in a Volatile Market', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Practical Portfolio Construction', 
            lessons: [
                {title: 'A Step-by-Step Guide to Building and Rebalancing Your First Portfolio', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Jane Doe'
  },
  // Intermediate
  {
    id: 'c-i-1',
    title: 'Technical Analysis for Crypto',
    description: 'Master technical analysis for the volatile crypto markets.',
    longDescription: 'A deep dive into technical analysis specifically for cryptocurrencies. This course covers advanced chart patterns, indicators, and strategies tailored to the crypto market.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Crypto Charting', 
            lessons: [
                {title: 'Using On-Chain Indicators to Supplement Technical Analysis', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Developing Trading Strategies', 
            lessons: [
                {title: 'How to Combine Multiple Indicators to Create a Robust Strategy', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '10h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'c-i-2',
    title: 'Fundamental Analysis',
    description: 'Learn how to properly value cryptocurrency projects.',
    longDescription: 'Go beyond the whitepaper to conduct deep fundamental analysis. This course covers tokenomics, community analysis, developer activity, and competitive landscape.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Tokenomics', 
            lessons: [
                {title: 'Analyzing Supply, Demand, and Value Accrual for Tokens', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: A Framework for Project Valuation', 
            lessons: [
                {title: 'A Step-by-Step Guide to Conducting Fundamental Analysis', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '10h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'c-i-3',
    title: 'Crypto Trading Strategies',
    description: 'Explore strategies like swing trading and day trading.',
    longDescription: 'Develop a repertoire of trading strategies for different market conditions. This course covers swing trading, scalping, and position trading in the crypto markets.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Swing Trading Crypto', 
            lessons: [
                {title: 'Strategies for Capturing Medium-Term Trends in the Market', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Day Trading and Scalping Crypto', 
            lessons: [
                {title: 'A Guide to Short-Term Trading Strategies', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'c-i-4',
    title: 'Risk Management in Crypto',
    description: 'Advanced techniques for managing risk in a volatile market.',
    longDescription: 'Learn professional risk management techniques to protect your capital. This course covers advanced position sizing, portfolio hedging, and managing volatility.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Position Sizing', 
            lessons: [
                {title: 'Using Models like the Kelly Criterion to Optimize Bet Size', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Hedging Your Crypto Portfolio', 
            lessons: [
                {title: 'Using Derivatives and Other Assets to Hedge Risk', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '10h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'c-i-5',
    title: 'DeFi Investing',
    description: 'Learn to navigate and invest in the world of decentralized finance.',
    longDescription: 'This course provides a practical guide to participating in DeFi. Learn about yield farming, liquidity providing, and staking to earn passive income on your crypto.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Yield Farming', 
            lessons: [
                {title: 'Strategies, Risks, and Automation', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Providing Liquidity to DEXs', 
            lessons: [
                {title: 'Understanding and Managing Impermanent Loss', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'c-i-6',
    title: 'NFT Trading',
    description: 'Learn strategies for trading and investing in NFTs.',
    longDescription: 'Move from collecting to trading NFTs. This course covers how to value NFT projects, identify trends, and develop strategies for flipping and long-term holding.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: How to Value NFTs', 
            lessons: [
                {title: 'Using Rarity, Community, and other Factors to Value NFTs', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced NFT Trading Strategies', 
            lessons: [
                {title: 'Flipping, Trend Analysis, and Identifying Undervalued Projects', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '10h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'c-i-7',
    title: 'Crypto Tax Planning',
    description: 'Understand the tax implications of crypto trading and investing.',
    longDescription: 'A practical guide to navigating the complex world of crypto taxes. This course covers how crypto is taxed, how to track your transactions, and strategies for tax optimization.',
    category: 'Crypto',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Taxation of Crypto Transactions', 
            lessons: [
                {title: 'A Deep Dive into How Different Crypto Activities are Taxed', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Tracking and Reporting for Tax Purposes', 
            lessons: [
                {title: 'How to Use Crypto Tax Software to Stay Compliant', duration: '4h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '9h 0m',
    instructor: 'John Smith'
  },
  // Advanced
  {
    id: 'c-a-1',
    title: 'Algorithmic Crypto Trading',
    description: 'Design, build, and deploy your own crypto trading bots.',
    longDescription: 'This advanced, project-based course teaches you how to build and operate your own automated trading strategies for the crypto markets using Python.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Designing the Bot Architecture', 
            lessons: [
                {title: 'Connecting to Exchange APIs for Market Data and Execution', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Strategy Implementation and Deployment', 
            lessons: [
                {title: 'From Backtesting to Live Deployment and Monitoring', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'c-a-2',
    title: 'Quantitative Crypto Analysis',
    description: 'Apply quantitative models to the crypto markets.',
    longDescription: 'Learn to use sophisticated quantitative methods to analyze the crypto markets. This course covers on-chain data analysis, statistical modeling, and machine learning applications.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced On-Chain Analysis', 
            lessons: [
                {title: 'Extracting Signals from Raw Blockchain Data', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Applying Machine Learning to Crypto', 
            lessons: [
                {title: 'Building Predictive Models for the Crypto Markets', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'c-a-3',
    title: 'Crypto Derivatives',
    description: 'Master trading crypto futures, options, and perpetual swaps.',
    longDescription: 'A deep dive into the crypto derivatives market. This course covers the mechanics of these products, advanced trading strategies, and risk management.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Perpetual Swaps', 
            lessons: [
                {title: 'Understanding Funding Rates and Advanced Trading Mechanics', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Crypto Options Strategies', 
            lessons: [
                {title: 'Implementing Complex Spreads and Hedging Strategies', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'c-a-4',
    title: 'Advanced DeFi',
    description: 'Explore the frontiers of decentralized finance.',
    longDescription: 'This course explores the cutting edge of DeFi, including structured products, undercollateralized lending, and the design of new financial primitives.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: DeFi Structured Products', 
            lessons: [
                {title: 'A Deep Dive into Options Vaults and other Exotic Products', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: The Future of DeFi Protocol Design', 
            lessons: [
                {title: 'How to Design and Build New DeFi Protocols', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'c-a-5',
    title: 'Crypto Arbitrage',
    description: 'Learn to find and execute arbitrage opportunities.',
    longDescription: 'Exploit price differences across exchanges and protocols. This course covers different types of arbitrage (spatial, triangular) and how to automate their execution.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Theory of Crypto Arbitrage', 
            lessons: [
                {title: 'How to Systematically Find Arbitrage Opportunities', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Building an Automated Arbitrage Bot', 
            lessons: [
                {title: 'A Step-by-Step Guide to Building an Arbitrage Bot', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'c-a-6',
    title: 'Blockchain Development',
    description: 'Learn the fundamentals of building a new blockchain.',
    longDescription: 'For the highly ambitious, this course provides an introduction to the computer science behind building a Layer 1 blockchain, using frameworks like the Cosmos SDK.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Consensus Engines', 
            lessons: [
                {title: 'A Deep Dive into Tendermint and other BFT Consensus', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building with the Cosmos SDK', 
            lessons: [
                {title: 'A Step-by-Step Guide to Creating Your Own Blockchain', duration: '12h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '19h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'c-a-7',
    title: 'Crypto Security Audits',
    description: 'Become a professional smart contract security auditor.',
    longDescription: 'This advanced course prepares you for a career in smart contract auditing. It covers advanced vulnerability analysis, formal verification, and industry best practices.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Smart Contract Vulnerabilities', 
            lessons: [
                {title: 'Logic Errors, Exploits, and Advanced Attack Vectors', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: The Professional Auditing Process', 
            lessons: [
                {title: 'From Initial Scoping to Delivering the Final Report', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'c-a-8',
    title: 'Research in Cryptocurrency',
    description: 'Learn to conduct and publish original research in the crypto field.',
    longDescription: 'This course provides the tools and methodologies for conducting high-level research in cryptoeconomics, protocol design, and market analysis.',
    category: 'Crypto',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: A Framework for Crypto Research', 
            lessons: [
                {title: 'How to Form a Hypothesis and Design a Research Study', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced On-Chain Data Analysis', 
            lessons: [
                {title: 'Working with and Extracting Insights from Raw On-Chain Data', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'David Lee'
  },
  
  // Category: Tech Skills
  // Beginner
  {
    id: 'ts-b-1',
    title: 'Introduction to Programming',
    description: 'Learn the fundamental concepts of programming with Python.',
    longDescription: 'The perfect starting point for your coding journey. This course teaches the universal concepts of programming like variables, loops, and functions, using the beginner-friendly Python language.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Building Blocks of Code', 
            lessons: [
                {title: 'Understanding Variables, Data Types, and Operators', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Controlling Program Flow', 
            lessons: [
                {title: 'Mastering Loops and Conditional Statements', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '10h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ts-b-2',
    title: 'Web Development Fundamentals',
    description: 'Learn the core technologies of the web: HTML, CSS, and JavaScript.',
    longDescription: 'Build your first websites from scratch. This course covers the three essential technologies that form the foundation of all web pages and web applications.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Structuring Web Content with HTML', 
            lessons: [
                {title: 'A Comprehensive Guide to HTML5 Tags and Document Structure', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Styling and Interactivity with CSS and JavaScript', 
            lessons: [
                {title: 'Mastering CSS for Styling and JavaScript for Interactivity', duration: '9h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '13h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ts-b-3',
    title: 'Data Structures and Algorithms',
    description: 'Learn the essential DS&A concepts for coding interviews.',
    longDescription: 'Prepare for technical interviews and become a better problem-solver. This course covers essential data structures like arrays, hashmaps, and trees, along with key algorithms.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Data Structures', 
            lessons: [
                {title: 'Understanding Arrays, Linked Lists, Stacks, and Queues', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Fundamental Algorithms', 
            lessons: [
                {title: 'Mastering Sorting and Searching Algorithms', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '12h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ts-b-4',
    title: 'Database Management',
    description: 'Learn the basics of SQL and managing relational databases.',
    longDescription: 'Understand how data is stored and retrieved. This course provides a hands-on introduction to SQL, the standard language for interacting with databases.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Fundamentals of SQL', 
            lessons: [
                {title: 'Mastering SELECT, FROM, WHERE, and other core commands', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Relational Database Design', 
            lessons: [
                {title: 'Designing Tables, Keys, and Relationships', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ts-b-5',
    title: 'Version Control with Git',
    description: 'Learn how to use Git and GitHub to manage your code.',
    longDescription: 'An essential skill for any developer. This course teaches you how to use Git for version control and GitHub for collaboration, from basic commits to handling merge conflicts.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Git Concepts', 
            lessons: [
                {title: 'Mastering Commits, Branches, and Merges', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Collaborating with GitHub', 
            lessons: [
                {title: 'Using Pull Requests and Forks for Team Collaboration', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '10h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ts-b-6',
    title: 'Cloud Computing Basics',
    description: 'Understand the fundamentals of cloud services like AWS and Azure.',
    longDescription: 'Get an introduction to the world of cloud computing. This course explains core concepts like IaaS, PaaS, and SaaS, and provides an overview of major cloud providers.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Core Concepts of Cloud Computing', 
            lessons: [
                {title: 'Understanding IaaS, PaaS, and SaaS', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: An Overview of the Major Cloud Providers', 
            lessons: [
                {title: 'Comparing and Contrasting AWS, Google Cloud, and Azure', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '7h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'ts-b-7',
    title: 'Cybersecurity Essentials',
    description: 'Learn the basic principles of protecting systems and data.',
    longDescription: 'This course provides a foundational understanding of cybersecurity, covering common threats, defensive measures, and key principles of digital security.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding the Threat Landscape', 
            lessons: [
                {title: 'A Deep Dive into Malware, Phishing, and Social Engineering', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Fundamental Defensive Principles', 
            lessons: [
                {title: 'The Basics of Network, System, and Application Security', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ts-b-8',
    title: 'Software Testing',
    description: 'Learn the fundamentals of quality assurance and software testing.',
    longDescription: 'Discover the importance of testing in the software development lifecycle. This course introduces different testing types, like unit tests and integration tests.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Fundamentals of Software Testing', 
            lessons: [
                {title: 'Understanding the Testing Pyramid and Different Testing Levels', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Practical Test Writing', 
            lessons: [
                {title: 'A Hands-On Introduction to Writing Unit Tests', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '10h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ts-b-9',
    title: 'Agile Methodology',
    description: 'Understand the principles of Agile, Scrum, and Kanban.',
    longDescription: 'Learn the modern approach to software development. This course covers the Agile manifesto, the Scrum framework, and how to work effectively in an Agile team.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Principles of Agile Development', 
            lessons: [
                {title: 'A Deep Dive into the Agile Manifesto and its 12 Principles', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering the Scrum Framework', 
            lessons: [
                {title: 'Understanding Sprints, Roles, Events, and Artifacts', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ts-b-10',
    title: 'Tech Career Development',
    description: 'Learn how to build your resume, portfolio, and interview skills.',
    longDescription: 'This course provides practical advice on launching your career in tech, from creating a standout portfolio to acing the technical and behavioral interviews.',
    category: 'Tech Skills',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Creating a Standout Portfolio', 
            lessons: [
                {title: 'How to Build and Showcase Your Projects to Impress Recruiters', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering the Tech Interview', 
            lessons: [
                {title: 'A Guide to Acing Both Technical and Behavioral Interviews', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '10h 30m',
    instructor: 'John Smith'
  },
  // Intermediate
  {
    id: 'ts-i-1',
    title: 'Advanced Programming',
    description: 'Explore advanced topics like concurrency and design patterns.',
    longDescription: 'Take your programming skills to the next level. This course covers advanced topics like object-oriented design patterns, multithreading, and performance optimization.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Software Design Patterns', 
            lessons: [
                {title: 'Implementing Singleton, Factory, Observer, and other key patterns', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Concurrent and Parallel Programming', 
            lessons: [
                {title: 'Mastering Threads, Locks, and Asynchronous Programming', duration: '7h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '15h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ts-i-2',
    title: 'Full-Stack Development',
    description: 'Master the MERN stack and build complete web applications.',
    longDescription: 'Become a full-stack developer by mastering the MERN (MongoDB, Express, React, Node.js) stack. This project-based course will guide you through building and deploying a real-world web application from scratch.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Building a Robust Backend with Node.js and Express', 
            lessons: [
                {title: 'Designing and Implementing RESTful APIs', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Creating a Dynamic Frontend with React', 
            lessons: [
                {title: 'Advanced State Management and Component Architecture', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '15h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'ts-i-3',
    title: 'DevOps Practices',
    description: 'Learn the principles and tools of DevOps.',
    longDescription: 'Bridge the gap between development and operations. This course covers CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Continuous Integration and Continuous Delivery (CI/CD)', 
            lessons: [
                {title: 'Building Automated Build and Deployment Pipelines', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Containerization and Orchestration', 
            lessons: [
                {title: 'Mastering Docker and Kubernetes for Scalable Applications', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ts-i-4',
    title: 'Machine Learning Basics',
    description: 'A practical introduction to building machine learning models.',
    longDescription: 'For developers looking to get into AI, this course provides a hands-on introduction to machine learning, covering common algorithms and how to build models with Scikit-learn.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding Supervised Learning', 
            lessons: [
                {title: 'Implementing Regression and Classification Algorithms', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Evaluating Model Performance', 
            lessons: [
                {title: 'Using Key Metrics and Validation Techniques', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '13h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ts-i-5',
    title: 'Big Data Analytics',
    description: 'Learn to work with large datasets using tools like Spark.',
    longDescription: 'This course introduces the challenges and opportunities of big data. You will learn to use distributed computing frameworks like Apache Spark to process and analyze massive datasets.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Big Data Ecosystem', 
            lessons: [
                {title: 'Understanding the 3 Vs and the Hadoop Ecosystem', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Large-Scale Data Processing with Apache Spark', 
            lessons: [
                {title: 'Writing and Optimizing Spark Jobs for Big Data', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '13h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ts-i-6',
    title: 'API Development',
    description: 'Learn to design and build robust and scalable RESTful APIs.',
    longDescription: 'Master the art of API design. This course covers REST principles, API security, documentation with OpenAPI/Swagger, and building APIs with Node.js/Express.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced RESTful API Design', 
            lessons: [
                {title: 'Following Industry Best Practices for API Design', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Securing Your APIs', 
            lessons: [
                {title: 'Implementing Authentication and Authorization with JWT and OAuth', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ts-i-7',
    title: 'Mobile App Development',
    description: 'Learn to build cross-platform mobile apps with React Native.',
    longDescription: 'Build apps for both iOS and Android with a single codebase. This course teaches you the fundamentals of mobile development using the popular React Native framework.',
    category: 'Tech Skills',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Fundamentals of React Native', 
            lessons: [
                {title: 'Mastering Core Components and Styling', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building a Complete Multi-Screen App', 
            lessons: [
                {title: 'Implementing Navigation, State Management, and Device API Access', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Maria Garcia'
  },
  // Advanced
  {
    id: 'ts-a-1',
    title: 'Distributed Systems',
    description: 'Learn the principles of designing and building distributed systems.',
    longDescription: 'This course covers the fundamental challenges in distributed systems, including consensus, fault tolerance, and consistency. A must for senior engineers.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Fundamental Principles of Distributed Systems', 
            lessons: [
                {title: 'A Deep Dive into the CAP Theorem and its Tradeoffs', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Understanding Consensus Algorithms', 
            lessons: [
                {title: 'Implementing and Analyzing Paxos and Raft', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'ts-a-2',
    title: 'Artificial Intelligence',
    description: 'A comprehensive course on the theory and practice of AI.',
    longDescription: 'This advanced course covers a broad range of AI topics, from search algorithms and knowledge representation to machine learning and robotics.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Search Algorithms', 
            lessons: [
                {title: 'Implementing Heuristic Search Algorithms like A*', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Knowledge Representation and Reasoning', 
            lessons: [
                {title: 'Using Logic and other Formalisms for AI Reasoning', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ts-a-3',
    title: 'Blockchain Development',
    description: 'Learn the computer science behind building a blockchain.',
    longDescription: 'Go beyond DApps to learn how a blockchain itself is built. This course covers cryptography, consensus protocols, and peer-to-peer networking.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Cryptographic Foundations of Blockchain', 
            lessons: [
                {title: 'Implementing Hash Functions and Digital Signatures', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building a Consensus Protocol', 
            lessons: [
                {title: 'A Deep Dive into Proof-of-Work and Proof-of-Stake', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ts-a-4',
    title: 'Quantum Computing',
    description: 'An introduction to the principles of quantum computing.',
    longDescription: 'Explore the next frontier of computation. This course introduces the mind-bending concepts of quantum mechanics and how they can be harnessed for computing.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Principles of Quantum Mechanics', 
            lessons: [
                {title: 'Understanding Superposition, Entanglement, and Quantum Gates', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Foundational Quantum Algorithms', 
            lessons: [
                {title: 'Implementing Shor\'s and Grover\'s Algorithms', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ts-a-5',
    title: 'Cybersecurity Advanced',
    description: 'Learn advanced techniques in ethical hacking and defense.',
    longDescription: 'This course is for those looking to specialize in cybersecurity. It covers penetration testing, reverse engineering, and advanced defensive strategies.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Offensive Security', 
            lessons: [
                {title: 'Mastering Modern Penetration Testing Methodologies', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Advanced Defensive Security', 
            lessons: [
                {title: 'Mastering Incident Response and Digital Forensics', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ts-a-6',
    title: 'Data Engineering',
    description: 'Learn to build and manage large-scale data pipelines.',
    longDescription: 'Master the skills of a data engineer. This course covers data modeling, ETL/ELT pipelines, data warehousing, and workflow orchestration with tools like Airflow.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Building Scalable Data Pipelines', 
            lessons: [
                {title: 'Designing and Implementing Large-Scale ETL/ELT pipelines', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Data Warehousing', 
            lessons: [
                {title: 'Advanced Concepts and Tools for Data Warehousing', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ts-a-7',
    title: 'Tech Leadership',
    description: 'Develop the skills to lead and manage engineering teams.',
    longDescription: 'For senior engineers looking to move into management, this course covers project management, team building, and the principles of technical leadership.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Managing Engineering Teams', 
            lessons: [
                {title: 'How to Lead, Motivate, and Grow High-Performing Engineers', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Technical Project Management', 
            lessons: [
                {title: 'From Technical Roadmap to Successful Delivery', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'ts-a-8',
    title: 'Research in Technology',
    description: 'Learn how to conduct and publish original research in tech.',
    longDescription: 'This course provides a framework for conducting research in computer science, from identifying a research question to writing and submitting a paper for publication.',
    category: 'Tech Skills',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Research Methodology in Computer Science', 
            lessons: [
                {title: 'Applying the Scientific Method to Computer Science Research', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Writing and Publishing Your Research', 
            lessons: [
                {title: 'A Guide to Publishing in Top-Tier Conferences and Journals', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'Chen Wang'
  },
  
  // Category: AI & Machine Learning
  // Beginner
  {
    id: 'ai-b-1',
    title: 'Introduction to AI',
    description: 'Get a high-level overview of the field of Artificial Intelligence.',
    longDescription: 'This course demystifies AI, explaining the different types of AI, its history, and its potential impact on society. No technical background required.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Defining Artificial Intelligence', 
            lessons: [
                {title: 'A Journey Through the History and Types of AI', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: AI in the Modern World', 
            lessons: [
                {title: 'Exploring the Key Applications of AI Today', duration: '3h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '6h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ai-b-2',
    title: 'Machine Learning Fundamentals',
    description: 'Understand the core concepts of training machines to learn.',
    longDescription: 'Learn the foundational concepts of machine learning, including supervised, unsupervised, and reinforcement learning, and understand the lifecycle of an ML project.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Core Machine Learning Concepts', 
            lessons: [
                {title: 'A Deep Dive into Supervised vs. Unsupervised Learning', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: The Machine Learning Project Lifecycle', 
            lessons: [
                {title: 'From Data Collection and Preparation to Model Deployment', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ai-b-3',
    title: 'Python for AI',
    description: 'Learn the Python libraries essential for AI and ML.',
    longDescription: 'Get up to speed with the key Python libraries for AI, including NumPy for numerical operations, Pandas for data manipulation, and Matplotlib for visualization.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering NumPy and Pandas', 
            lessons: [
                {title: 'Advanced Techniques for Working with and Manipulating Data', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Effective Data Visualization with Matplotlib', 
            lessons: [
                {title: 'Creating Insightful and Professional Data Visualizations', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '12h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ai-b-4',
    title: 'Data Preprocessing',
    description: 'Learn how to clean and prepare data for machine learning.',
    longDescription: 'Garbage in, garbage out. This crucial course teaches you how to handle missing values, normalize data, and perform feature engineering to improve model performance.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Data Cleaning Techniques', 
            lessons: [
                {title: 'Strategies for Handling Missing Data, Outliers, and Inconsistencies', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Feature Engineering', 
            lessons: [
                {title: 'The Art of Creating and Selecting High-Impact Features', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '10h 30m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ai-b-5',
    title: 'Supervised Learning',
    description: 'Build your first predictive models with supervised learning.',
    longDescription: 'Learn to build models that predict outcomes based on labeled data. This course covers fundamental algorithms like linear and logistic regression.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Regression', 
            lessons: [
                {title: 'A Deep Dive into Linear Regression and its Variants', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Classification', 
            lessons: [
                {title: 'A Deep Dive into Logistic Regression and its Applications', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '12h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'ai-b-6',
    title: 'Unsupervised Learning',
    description: 'Discover hidden patterns in data with unsupervised learning.',
    longDescription: 'Learn to find structure in unlabeled data. This course covers key algorithms like K-Means for clustering and PCA for dimensionality reduction.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Mastering Clustering', 
            lessons: [
                {title: 'A Deep Dive into the K-Means Algorithm and other Clustering Methods', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Mastering Dimensionality Reduction', 
            lessons: [
                {title: 'Understanding and Applying Principal Component Analysis (PCA)', duration: '6h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '12h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ai-b-7',
    title: 'Neural Networks Basics',
    description: 'Get a simple introduction to the building blocks of deep learning.',
    longDescription: 'This course provides a gentle, conceptual introduction to neural networks, explaining neurons, layers, and activation functions without the heavy math.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Artificial Neuron', 
            lessons: [
                {title: 'A Detailed Look at How a Single Artificial Neuron Works', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building a Network', 
            lessons: [
                {title: 'Understanding Layers, Activation Functions, and Network Architecture', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ai-b-8',
    title: 'AI Ethics',
    description: 'Explore the ethical challenges and responsibilities in AI.',
    longDescription: 'As AI becomes more powerful, its ethical implications are crucial. This course discusses issues of bias, fairness, transparency, and accountability in AI systems.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Understanding Bias and Fairness in AI', 
            lessons: [
                {title: 'Identifying and Mitigating the Sources of Bias in AI Systems', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Accountability and Transparency in AI', 
            lessons: [
                {title: 'Who is Responsible When AI Fails and How Do We Build Trust?', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ai-b-9',
    title: 'AI Tools',
    description: 'An overview of popular frameworks like TensorFlow and PyTorch.',
    longDescription: 'Get introduced to the major tools of the trade. This course provides a high-level overview of the most popular deep learning frameworks used by researchers and companies.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: An Introduction to TensorFlow', 
            lessons: [
                {title: 'Getting Started with the TensorFlow Ecosystem', duration: '4h 30min'}
            ] 
        },
        { 
            title: 'Module 2: An Introduction to PyTorch', 
            lessons: [
                {title: 'Getting Started with the PyTorch Framework', duration: '4h 30min'}
            ] 
        },
    ],
    price: 15000,
    duration: '9h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ai-b-10',
    title: 'Building ML Models',
    description: 'A project-based course to build a complete ML model.',
    longDescription: 'Apply everything you have learned in a hands-on project. This course guides you through the end-to-end process of building a machine learning model to solve a real-world problem.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Scoping and Planning Your ML Project', 
            lessons: [
                {title: 'How to Define a Problem and Set it up for Machine Learning', duration: '3h 0min'}
            ] 
        },
        { 
            title: 'Module 2: End-to-End Model Building', 
            lessons: [
                {title: 'From Data Collection and Training to Evaluation and Interpretation', duration: '9h 0min'}
            ] 
        },
    ],
    price: 15000,
    duration: '12h 0m',
    instructor: 'Maria Garcia'
  },
  // Intermediate
  {
    id: 'ai-i-1',
    title: 'Deep Learning',
    description: 'A comprehensive course on building and training deep neural networks.',
    longDescription: 'Dive deep into the world of deep learning. This course covers the theory and practice of building deep neural networks with TensorFlow or PyTorch, including convolutional and recurrent networks.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Theory of Deep Learning', 
            lessons: [
                {title: 'Understanding Backpropagation and Gradient Descent', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building Common Network Architectures', 
            lessons: [
                {title: 'Implementing CNNs and RNNs from Scratch', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'David Lee'
  },
  {
    id: 'ai-i-2',
    title: 'Natural Language Processing',
    description: 'Learn to build models that can understand and generate text.',
    longDescription: 'This course covers the techniques for processing and analyzing text data, from classic methods like bag-of-words to modern techniques using embeddings and RNNs.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Advanced Text Processing Techniques', 
            lessons: [
                {title: 'Mastering Tokenization and Word Embeddings (Word2Vec, GloVe)', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Building NLP Models', 
            lessons: [
                {title: 'Implementing Sentiment Analysis and Text Classification with RNNs', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ai-i-3',
    title: 'Computer Vision',
    description: 'Learn to build models that can "see" and interpret images.',
    longDescription: 'Explore the field of computer vision. This course teaches you how to use convolutional neural networks (CNNs) for tasks like image classification, object detection, and segmentation.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: A Deep Dive into Convolutional Neural Networks', 
            lessons: [
                {title: 'The Theory and Implementation of CNNs', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Core Computer Vision Tasks', 
            lessons: [
                {title: 'Implementing Image Classification and Object Detection', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ai-i-4',
    title: 'Reinforcement Learning',
    description: 'Learn to train agents that can make optimal decisions.',
    longDescription: 'This course introduces the exciting field of reinforcement learning. You will learn about concepts like Q-learning and Policy Gradients to train agents to master games and other tasks.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Foundations of Reinforcement Learning', 
            lessons: [
                {title: 'Mastering Markov Decision Processes and Bellman Equations', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Core Reinforcement Learning Algorithms', 
            lessons: [
                {title: 'Implementing Q-Learning and Deep Q-Networks (DQN)', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ai-i-5',
    title: 'Time Series Forecasting',
    description: 'Build models to predict future values based on past data.',
    longDescription: 'Learn the techniques for forecasting time series data, which is common in finance and business. This course covers statistical methods like ARIMA and deep learning models like LSTMs.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Traditional Statistical Models for Time Series', 
            lessons: [
                {title: 'Implementing and Understanding ARIMA Models', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Using Deep Learning for Forecasting', 
            lessons: [
                {title: 'Building Forecasting Models with LSTMs and other RNNs', duration: '9h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '16h 30m',
    instructor: 'John Smith'
  },
  {
    id: 'ai-i-6',
    title: 'Model Deployment',
    description: 'Learn how to take your ML models from research to production.',
    longDescription: 'A model is not useful until it is deployed. This course covers the practical aspects of deploying machine learning models, including creating APIs and using cloud services.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Serving Machine Learning Models', 
            lessons: [
                {title: 'Creating a Production-Ready Model API with Flask or FastAPI', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: An Introduction to MLOps', 
            lessons: [
                {title: 'Understanding the Principles of MLOps for a Robust ML System', duration: '7h 30min'}
            ] 
        },
    ],
    price: 35000,
    duration: '15h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ai-i-7',
    title: 'AI in Business',
    description: 'Understand how to apply AI to solve real-world business problems.',
    longDescription: 'For aspiring product managers and business leaders, this course provides a framework for identifying opportunities for AI and managing AI projects.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Developing an AI Strategy', 
            lessons: [
                {title: 'How to Identify High-Impact Use Cases for AI in Business', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: A Guide to Managing AI Projects', 
            lessons: [
                {title: 'The AI Project Lifecycle from a Business Perspective', duration: '6h 0min'}
            ] 
        },
    ],
    price: 35000,
    duration: '12h 0m',
    instructor: 'David Lee'
  },
  // Advanced
  {
    id: 'ai-a-1',
    title: 'Generative Models',
    description: 'Explore models that can generate new content, like GANs and VAEs.',
    longDescription: 'Dive into the world of generative AI. This course covers the theory and implementation of Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs).',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Generative Adversarial Networks (GANs)', 
            lessons: [
                {title: 'The Theory and Implementation of GANs from Scratch', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Variational Autoencoders (VAEs)', 
            lessons: [
                {title: 'The Theory and Implementation of VAEs from Scratch', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ai-a-2',
    title: 'Transformers',
    description: 'Master the transformer architecture that powers modern NLP.',
    longDescription: 'A deep dive into the transformer architecture, the foundation of models like BERT and GPT. This course covers attention mechanisms and how to build transformers from scratch.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Attention Mechanism', 
            lessons: [
                {title: 'A Deep Dive into the Paper "Attention is All You Need"', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Building a Transformer from Scratch', 
            lessons: [
                {title: 'A Step-by-Step Guide to Implementing a Transformer Model', duration: '12h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '21h 0m',
    instructor: 'Fatima Ahmed'
  },
  {
    id: 'ai-a-3',
    title: 'AI for Robotics',
    description: 'Learn to apply AI and reinforcement learning to robotics.',
    longDescription: 'Explore the intersection of AI and robotics. This course covers topics like motion planning, computer vision for robots, and training robots with reinforcement learning.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Robot Perception with Computer Vision', 
            lessons: [
                {title: 'Applying Computer Vision Techniques for Robot Perception', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Robot Control with Reinforcement Learning', 
            lessons: [
                {title: 'Using Reinforcement Learning for Complex Control Tasks', duration: '12h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '21h 0m',
    instructor: 'Jane Doe'
  },
  {
    id: 'ai-a-4',
    title: 'Quantum Machine Learning',
    description: 'Explore the intersection of quantum computing and AI.',
    longDescription: 'This course is for those interested in the future of AI. It explores how quantum computers could revolutionize machine learning, and introduces quantum ML algorithms.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Fundamentals of Quantum Computing', 
            lessons: [
                {title: 'Understanding Qubits, Quantum Gates, and Quantum Circuits', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: An Introduction to Quantum Machine Learning Algorithms', 
            lessons: [
                {title: 'Exploring the Potential of QML', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'John Smith'
  },
  {
    id: 'ai-a-5',
    title: 'AI Security',
    description: 'Learn about the security vulnerabilities of AI models.',
    longDescription: 'As AI models are deployed in critical systems, their security is vital. This course covers adversarial attacks, data poisoning, and methods for making models more robust.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: Offensive AI Security and Adversarial Attacks', 
            lessons: [
                {title: 'How to Fool Neural Networks and other AI Models', duration: '9h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Defensive AI Security', 
            lessons: [
                {title: 'Strategies for Making AI Models More Robust and Secure', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '18h 0m',
    instructor: 'Maria Garcia'
  },
  {
    id: 'ai-a-6',
    title: 'Explainable AI',
    description: 'Learn techniques to make "black box" AI models more interpretable.',
    longDescription: 'Understand why your AI models make the decisions they do. This course covers techniques like LIME and SHAP that help to explain the predictions of complex models.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Need for Explainable AI (XAI)', 
            lessons: [
                {title: 'Understanding the Black Box Problem in AI', duration: '6h 0min'}
            ] 
        },
        { 
            title: 'Module 2: Core XAI Techniques', 
            lessons: [
                {title: 'A Deep Dive into LIME, SHAP, and other XAI methods', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'David Lee'
  },
  {
    id: 'ai-a-7',
    title: 'AI Research',
    description: 'Learn how to conduct and publish original research in AI.',
    longDescription: 'This course prepares you for a career in AI research. It covers how to identify research problems, design experiments, and write papers for top AI conferences.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The AI Research Process', 
            lessons: [
                {title: 'From Identifying a Research Problem to Writing a Paper', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: Rigorous Experiment Design', 
            lessons: [
                {title: 'How to Design and Conduct Rigorous Empirical Evaluations', duration: '9h 0min'}
            ] 
        },
    ],
    price: 50000,
    duration: '16h 30m',
    instructor: 'Chen Wang'
  },
  {
    id: 'ai-a-8',
    title: 'Ethics and Policy in AI',
    description: 'A deep dive into the societal and policy challenges of AI.',
    longDescription: 'This course explores the complex ethical and policy issues surrounding advanced AI, including autonomous weapons, job displacement, and long-term safety.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    progress: Math.floor(Math.random() * 101),
    modules: [
        { 
            title: 'Module 1: The Societal Impact of Advanced AI', 
            lessons: [
                {title: 'Analyzing the Future of Work and other Societal Changes', duration: '7h 30min'}
            ] 
        },
        { 
            title: 'Module 2: The Governance of Advanced AI', 
            lessons: [
                {title: 'Exploring Different AI Policy and Governance Frameworks', duration: '7h 30min'}
            ] 
        },
    ],
    price: 50000,
    duration: '15h 0m',
    instructor: 'Fatima Ahmed'
  }
];
