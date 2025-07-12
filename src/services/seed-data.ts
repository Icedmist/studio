
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';

const coursesToSeed: NewCourse[] = [
    // Tech Skills - Beginner
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
        modules: [{
            title: "Module 1: What is Programming?",
            lessons: [{ title: "Definitions and Core Concepts", content: "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Learn about the history and importance of programming in the modern world.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Programming is the process of:", options: ["Cooking", "Giving instructions to a computer", "Writing stories"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is programming?", options: ["The process of giving instructions to a computer.", "The process of designing websites.", "The process of creating hardware."], correctAnswerIndex: 0 }]
    },
    {
        title: "Web Development Fundamentals",
        description: "Understand the building blocks of the web: HTML, CSS, and JavaScript.",
        longDescription: "Learn the three core technologies that power every website. This course covers how to structure web pages with HTML, style them with CSS, and add interactivity with JavaScript. It's the essential first step for any aspiring web developer.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "8h",
        instructor: "Emily Carter",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Getting Started",
            lessons: [{ title: "Introduction to HTML, CSS, & JavaScript", content: "Learn the roles of HTML, CSS, and JavaScript and how they work together to create modern websites.", duration: "45m", completed: false }],
            quiz: [{ questionText: "Which language is used for structuring web content?", options: ["CSS", "JavaScript", "HTML"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "What is the role of CSS?", options: ["To structure content", "To add interactivity", "To style the visual presentation"], correctAnswerIndex: 2 }]
    },
    {
        title: "Version Control with Git",
        description: "Learn how to track changes in your code and collaborate with others using Git.",
        longDescription: "Git is an essential tool for modern software development. This course teaches you how to create repositories, track changes, manage branches, and collaborate with teams using platforms like GitHub. You'll never lose code again.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "4h",
        instructor: "David Lee",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Git Basics",
            lessons: [{ title: "Understanding Version Control", content: "Learn what version control is and why it's crucial for any software project. We'll cover basic commands like git init, git add, and git commit.", duration: "30m", completed: false }],
            quiz: [{ questionText: "What is the main purpose of Git?", options: ["To write code", "To track changes in code", "To deploy websites"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What command saves your changes to the local repository?", options: ["git push", "git commit", "git save"], correctAnswerIndex: 1 }]
    },
    {
        title: "Cybersecurity Essentials",
        description: "Learn the basics of cybersecurity and how to protect digital assets from threats.",
        longDescription: "Get introduced to the world of cybersecurity. This course covers common threats, vulnerabilities, and the fundamental principles of digital defense. You'll learn about malware, phishing, network security, and best practices for staying safe online.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "7h",
        instructor: "Dr. Aisha Bello",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Introduction to Cybersecurity",
            lessons: [{ title: "The Threat Landscape", content: "Understand the common types of cyber threats and the importance of a security mindset in today's digital world.", duration: "40m", completed: false }],
            quiz: [{ questionText: "What is phishing?", options: ["A type of fishing", "A fraudulent attempt to obtain sensitive information", "A type of computer virus"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a firewall's primary function?", options: ["To speed up internet", "To monitor and filter network traffic", "To store passwords"], correctAnswerIndex: 1 }]
    },
    {
        title: "Software Testing",
        description: "Understand the fundamentals of software testing and quality assurance.",
        longDescription: "Learn the principles of software testing, including different testing levels (unit, integration, system) and types (functional, non-functional). This course will equip you with the skills to ensure software quality and reliability.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "5h",
        instructor: "Tunde Adekunle",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Testing Fundamentals",
            lessons: [{ title: "Why We Test Software", content: "Explore the importance of software testing in the development lifecycle and learn about the different goals of quality assurance.", duration: "30m", completed: false }],
            quiz: [{ questionText: "What is unit testing?", options: ["Testing the entire system", "Testing individual components or functions", "Testing user interfaces"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Which of these is a primary goal of software testing?", options: ["To write code faster", "To find bugs and ensure quality", "To design user interfaces"], correctAnswerIndex: 1 }]
    },
    {
        title: "Agile Methodology",
        description: "Learn the principles of Agile development for efficient and collaborative project management.",
        longDescription: "This course introduces the Agile mindset and popular frameworks like Scrum and Kanban. You'll learn how to work in iterative cycles, collaborate effectively with a team, and deliver value to customers faster.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "4h",
        instructor: "Jane Foster",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Introduction to Agile",
            lessons: [{ title: "The Agile Manifesto and Principles", content: "Dive into the core values and principles that define the Agile movement and how they contrast with traditional project management.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Agile development emphasizes:", options: ["Heavy documentation", "Responding to change over following a plan", "Strict, upfront planning"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A short, iterative development cycle in Scrum is called a:", options: ["Sprint", "Marathon", "Meeting"], correctAnswerIndex: 0 }]
    },
    {
        title: "Tech Career Development",
        description: "Plan your career path in the tech industry, from resume building to interview skills.",
        longDescription: "Navigate your career in the competitive tech landscape. This course covers how to build a strong portfolio, write an effective tech resume, master behavioral and technical interviews, and negotiate job offers.",
        category: "Tech Skills",
        level: "Beginner",
        duration: "3h",
        instructor: "Michael Chen",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Building Your Brand",
            lessons: [{ title: "Crafting Your Tech Resume and Portfolio", content: "Learn how to showcase your skills and projects effectively to catch the eye of recruiters and hiring managers.", duration: "30m", completed: false }],
            quiz: [{ questionText: "A portfolio is important for showcasing:", options: ["Your personality", "Your practical skills and projects", "Your academic grades"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The STAR method is a technique for answering:", options: ["Technical questions", "Behavioral interview questions", "Coding challenges"], correctAnswerIndex: 1 }]
    },
    // Tech Skills - Intermediate
    {
        title: "Advanced Programming",
        description: "Go beyond the basics with topics like data structures, algorithms, and design patterns.",
        longDescription: "Deepen your programming knowledge by learning about essential data structures like arrays, trees, and graphs, and fundamental algorithms for sorting and searching. We'll also cover common software design patterns to write more scalable and maintainable code.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "15h",
        instructor: "Nasir Ibrahim Imam",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Data Structures",
            lessons: [{ title: "Arrays, Linked Lists, and Trees", content: "Understand how to store and organize data efficiently with fundamental data structures, and the trade-offs of each.", duration: "2h", completed: false }],
            quiz: [{ questionText: "Which data structure is best for a key-value lookup?", options: ["Array", "Linked List", "Hash Map"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "Big O notation is used to describe an algorithm's:", options: ["Correctness", "Readability", "Time and space complexity"], correctAnswerIndex: 2 }]
    },
    {
        title: "Full-Stack Development",
        description: "Build complete web applications from front-end to back-end with modern frameworks.",
        longDescription: "Learn to build both the client-side and server-side of a web application. This course covers a front-end framework like React, a back-end framework like Node.js/Express, and how to connect them to a database like MongoDB or PostgreSQL.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "25h",
        instructor: "Emily Carter",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The MERN Stack",
            lessons: [{ title: "MongoDB, Express, React, Node.js", content: "Get an overview of the MERN stack, one of the most popular technology combinations for building full-stack applications.", duration: "3h", completed: false }],
            quiz: [{ questionText: "In the MERN stack, what is React used for?", options: ["The database", "The back-end logic", "The user interface"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "A REST API is used for:", options: ["Styling web pages", "Communication between client and server", "Storing data"], correctAnswerIndex: 1 }]
    },
    {
        title: "DevOps Practices",
        description: "Learn the culture and tools of DevOps for automating and streamlining software delivery.",
        longDescription: "Bridge the gap between development and operations. This course introduces DevOps principles like CI/CD, infrastructure as code, and containerization with Docker. You'll learn how to build automated pipelines to test and deploy applications faster and more reliably.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "12h",
        instructor: "David Lee",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Introduction to DevOps",
            lessons: [{ title: "CI/CD Pipelines", content: "Continuous Integration/Continuous Deployment (CI/CD) is a cornerstone of modern DevOps. Learn how to automate the build, test, and deployment process.", duration: "2h", completed: false }],
            quiz: [{ questionText: "What does CI/CD stand for?", options: ["Continuous Integration/Continuous Deployment", "Code Integration/Code Delivery", "Client Integration/Component Deployment"], correctAnswerIndex: 0 }]
        }],
        finalAssessment: [{ questionText: "Docker is a tool for:", options: ["Writing code", "Containerization", "Managing databases"], correctAnswerIndex: 1 }]
    },
    {
        title: "Machine Learning Basics",
        description: "Get a hands-on introduction to machine learning models and data analysis.",
        longDescription: "This course provides a practical introduction to machine learning for developers. You'll learn about supervised and unsupervised learning, build your first models for classification and regression, and understand how to evaluate their performance using Python and scikit-learn.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "14h",
        instructor: "Dr. Anya Sharma",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Supervised Learning",
            lessons: [{ title: "Classification and Regression", content: "Learn the difference between classification and regression tasks and build models to predict categorical and continuous outcomes.", duration: "2h", completed: false }],
            quiz: [{ questionText: "Predicting a house price is an example of:", options: ["Classification", "Regression", "Clustering"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Which Python library is commonly used for machine learning?", options: ["React", "scikit-learn", "Django"], correctAnswerIndex: 1 }]
    },
    {
        title: "Mobile App Development",
        description: "Build cross-platform mobile apps for iOS and Android using a modern framework.",
        longDescription: "Learn to build mobile applications for both iOS and Android from a single codebase. This course covers a framework like React Native or Flutter, teaching you how to build UIs, manage state, and interact with native device features.",
        category: "Tech Skills",
        level: "Intermediate",
        duration: "20h",
        instructor: "Fatima Aliyu",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Cross-Platform Fundamentals",
            lessons: [{ title: "Introduction to React Native/Flutter", content: "Understand the benefits of cross-platform development and get started with building your first mobile application UI.", duration: "2h", completed: false }],
            quiz: [{ questionText: "A key advantage of React Native is:", options: ["It's made by Google", "It's the only way to make apps", "It allows code reuse across iOS and Android"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "What is a 'component' in React Native?", options: ["A native API", "A reusable UI building block", "A database entry"], correctAnswerIndex: 1 }]
    },
    // Tech Skills - Advanced
    {
        title: "Artificial Intelligence",
        description: "Dive deep into the theory and application of advanced AI concepts and algorithms.",
        longDescription: "Go beyond basic machine learning with this advanced course on AI. Topics include neural networks, deep learning, natural language processing (NLP), and computer vision. You'll implement complex AI models using frameworks like TensorFlow or PyTorch.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "30h",
        instructor: "Dr. Anya Sharma",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Deep Learning",
            lessons: [{ title: "Introduction to Neural Networks", content: "Learn the architecture of neural networks and the backpropagation algorithm that enables them to learn from data.", duration: "4h", completed: false }],
            quiz: [{ questionText: "NLP is a field of AI focused on:", options: ["Images", "Numbers", "Human language"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "A Convolutional Neural Network (CNN) is primarily used for:", options: ["Text analysis", "Image recognition", "Time-series prediction"], correctAnswerIndex: 1 }]
    },
    {
        title: "API Development",
        description: "Design, build, and secure robust and scalable APIs with best practices.",
        longDescription: "Master the art of API development. This course covers RESTful principles, GraphQL, API security (OAuth, JWT), versioning, and documentation. You'll learn to build APIs that are efficient, secure, and easy for other developers to consume.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "18h",
        instructor: "David Lee",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: RESTful API Design",
            lessons: [{ title: "Principles and Best Practices", content: "Learn the constraints of REST and how to design clean, predictable, and scalable API endpoints.", duration: "2h", completed: false }],
            quiz: [{ questionText: "What does 'stateless' mean in the context of REST?", options: ["The API has no state", "Each request contains all information needed", "The server stores client state"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "GraphQL was developed by which company?", options: ["Google", "Facebook", "Microsoft"], correctAnswerIndex: 1 }]
    },
    {
        title: "Cybersecurity Advanced",
        description: "Explore advanced topics in cybersecurity, including penetration testing and threat intelligence.",
        longDescription: "This course is for those looking to specialize in cybersecurity. You'll learn offensive security techniques through penetration testing, how to conduct digital forensics, and how to analyze and respond to complex cyber threats using threat intelligence.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "25h",
        instructor: "Dr. Aisha Bello",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Ethical Hacking",
            lessons: [{ title: "Penetration Testing Methodologies", content: "Learn the phases of a penetration test, from reconnaissance to covering tracks, and the ethical considerations involved.", duration: "3h", completed: false }],
            quiz: [{ questionText: "What is the goal of penetration testing?", options: ["To crash a system", "To identify and exploit vulnerabilities", "To steal data"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The MITRE ATT&CK framework is used for:", options: ["Developing software", "Modeling and describing adversary behaviors", "Network monitoring"], correctAnswerIndex: 1 }]
    },
    {
        title: "Tech Leadership",
        description: "Develop the skills to lead technical teams, manage projects, and drive innovation.",
        longDescription: "Transition from a technical role to a leadership position. This course covers project management, team building, effective communication, and strategic thinking. You'll learn how to mentor engineers, manage technical debt, and align technology with business goals.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "15h",
        instructor: "Jane Foster",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Managing Technical Teams",
            lessons: [{ title: "Mentorship and Effective Feedback", content: "Learn how to foster a culture of growth and provide constructive feedback to help your team members develop their skills.", duration: "2h", completed: false }],
            quiz: [{ questionText: "Effective tech leadership involves balancing:", options: ["Writing code and attending meetings", "Technical decisions and people management", "Features and bugs"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is 'technical debt'?", options: ["Money owed for hardware", "The implied cost of rework caused by choosing an easy solution now", "A type of software bug"], correctAnswerIndex: 1 }]
    },
    {
        title: "Research in Technology",
        description: "Learn how to conduct and publish research in cutting-edge technology fields.",
        longDescription: "This course guides you through the process of technological research, from formulating a research question to writing a paper and submitting it for publication. It covers literature reviews, experimental design, and data analysis for tech-focused research.",
        category: "Tech Skills",
        level: "Advanced",
        duration: "20h",
        instructor: "Dr. Anya Sharma",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Research Process",
            lessons: [{ title: "Formulating a Research Question", content: "Learn how to identify a gap in existing research and formulate a clear, focused, and answerable research question.", duration: "2h", completed: false }],
            quiz: [{ questionText: "A literature review's primary purpose is to:", options: ["Summarize books", "Understand what is already known about a topic", "Find sources for an essay"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What does 'peer review' mean in academic publishing?", options: ["Review by students", "Evaluation of work by experts in the same field", "A public vote on a paper"], correctAnswerIndex: 1 }]
    },
    
    // AI & Machine Learning - Beginner
    {
        title: "Introduction to AI",
        description: "Discover the fundamentals of Artificial Intelligence and its real-world applications.",
        longDescription: "This course offers a broad overview of Artificial Intelligence, from its history to its modern applications. You'll learn about different types of AI, what makes an AI 'intelligent', and see examples in areas like healthcare, finance, and entertainment.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "4h",
        instructor: "Dr. Anya Sharma",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: What is AI?",
            lessons: [{ title: "History and Types of AI", content: "Explore the evolution of AI and understand the distinction between Narrow AI, General AI, and Superintelligence.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Which type of AI do we have today?", options: ["Superintelligence", "General AI", "Narrow AI"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "What is the Turing Test designed to measure?", options: ["A machine's processing speed", "A machine's ability to exhibit intelligent behavior", "A machine's memory capacity"], correctAnswerIndex: 1 }]
    },
    {
        title: "Machine Learning Fundamentals",
        description: "A beginner's guide to the core concepts of machine learning models.",
        longDescription: "This course is the perfect starting point for machine learning. You'll learn the difference between supervised, unsupervised, and reinforcement learning through clear explanations and simple examples. No coding required.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Anya Sharma",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Types of Machine Learning",
            lessons: [{ title: "Supervised vs. Unsupervised Learning", content: "Understand the key differences between learning from labeled data (supervised) and finding patterns in unlabeled data (unsupervised).", duration: "45m", completed: false }],
            quiz: [{ questionText: "Training a model to predict spam email is an example of:", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], correctAnswerIndex: 0 }]
        }],
        finalAssessment: [{ questionText: "Finding customer groups in data is an example of:", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], correctAnswerIndex: 1 }]
    },
    {
        title: "Python for AI",
        description: "Learn the essential Python libraries for data science and AI, including NumPy and Pandas.",
        longDescription: "Get up to speed with Python for AI. This course focuses on the practical skills you need, covering NumPy for numerical operations, Pandas for data manipulation, and Matplotlib for data visualization. It's a hands-on course designed to get you coding quickly.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "10h",
        instructor: "David Lee",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Introduction to Pandas",
            lessons: [{ title: "Working with DataFrames", content: "Learn how to use Pandas DataFrames to load, inspect, clean, and analyze structured data efficiently.", duration: "1h", completed: false }],
            quiz: [{ questionText: "Which library is used for numerical operations?", options: ["Pandas", "NumPy", "Matplotlib"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A Pandas DataFrame is a:", options: ["1D array", "2D labeled data structure", "Plotting function"], correctAnswerIndex: 1 }]
    },
    {
        title: "Data Preprocessing",
        description: "Learn the critical steps of cleaning and preparing data for machine learning models.",
        longDescription: "Good models start with good data. This course teaches you the essential techniques for data preprocessing, including handling missing values, encoding categorical data, and scaling features. This is a crucial skill for any data scientist.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "6h",
        instructor: "Tunde Adekunle",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Cleaning Data",
            lessons: [{ title: "Handling Missing Values", content: "Explore different strategies for dealing with missing data, such as imputation or removal, and understand the impact of each.", duration: "45m", completed: false }],
            quiz: [{ questionText: "One-hot encoding is used for:", options: ["Numerical features", "Categorical features", "Missing values"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Why is feature scaling important?", options: ["It makes data smaller", "It helps algorithms that are sensitive to feature scales", "It removes outliers"], correctAnswerIndex: 1 }]
    },
    {
        title: "Neural Networks Basics",
        description: "Understand the structure and function of a basic neural network.",
        longDescription: "Demystify neural networks. This course explains the building blocks of a neural network—neurons, layers, and activation functions—in a simple, intuitive way. You'll understand how they learn and make predictions without getting lost in the complex math.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "5h",
        instructor: "Dr. Anya Sharma",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Neuron",
            lessons: [{ title: "The Building Block of a Network", content: "Learn what a single neuron does, how it takes inputs, applies weights, and uses an activation function to produce an output.", duration: "30m", completed: false }],
            quiz: [{ questionText: "An activation function introduces:", options: ["More data", "Non-linearity", "More layers"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A neural network learns by adjusting its:", options: ["Number of layers", "Weights", "Activation functions"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI Ethics 1",
        description: "An introduction to the ethical challenges and considerations in AI development.",
        longDescription: "Explore the critical ethical issues surrounding AI. This course introduces topics like bias in algorithms, data privacy, and the societal impact of AI technologies. It encourages you to think critically about the responsibilities of AI developers.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "3h",
        instructor: "Jane Foster",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Bias in AI",
            lessons: [{ title: "Understanding Algorithmic Bias", content: "Learn how biases in data and algorithms can lead to unfair or discriminatory outcomes and why it's a major challenge in AI.", duration: "30m", completed: false }],
            quiz: [{ questionText: "Algorithmic bias often originates from:", options: ["The algorithm itself", "Biased training data", "The computer hardware"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a key ethical concern in AI?", options: ["Model speed", "Data privacy", "Code readability"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI Tools 1",
        description: "A practical guide to using popular AI tools and platforms for simple tasks.",
        longDescription: "Get hands-on experience with today's AI tools. This course walks you through using platforms for image generation, text summarization, and other common tasks, showing you how to leverage AI without writing code.",
        category: "AI & Machine Learning",
        level: "Beginner",
        duration: "4h",
        instructor: "David Lee",
        price: 2500,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Generative AI Tools",
            lessons: [{ title: "Using Large Language Models (LLMs)", content: "Learn how to write effective prompts to get the most out of large language models like ChatGPT or Gemini for tasks like writing, brainstorming, and summarization.", duration: "45m", completed: false }],
            quiz: [{ questionText: "An LLM is a type of AI specialized in:", options: ["Generating images", "Understanding and generating text", "Playing games"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is 'prompt engineering'?", options: ["Designing AI models", "Writing effective inputs for AI models", "Debugging AI tools"], correctAnswerIndex: 1 }]
    },
    
    // AI & Machine Learning - Intermediate
    {
        title: "Deep Learning",
        description: "Dive into the architectures and applications of deep neural networks.",
        longDescription: "This course takes you deeper into the world of neural networks. You'll learn about different architectures like Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) and build practical projects in image classification and text analysis using TensorFlow or PyTorch.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "20h",
        instructor: "Dr. Anya Sharma",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Convolutional Neural Networks (CNNs)",
            lessons: [{ title: "Image Classification with CNNs", content: "Learn how CNNs use filters and pooling layers to automatically learn features from images for powerful classification tasks.", duration: "3h", completed: false }],
            quiz: [{ questionText: "CNNs are primarily used for what type of data?", options: ["Text", "Images", "Audio"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "RNNs are well-suited for:", options: ["Image data", "Static data", "Sequential data like text or time series"], correctAnswerIndex: 2 }]
    },
    {
        title: "Supervised Learning",
        description: "A comprehensive look at supervised learning algorithms, from linear regression to support vector machines.",
        longDescription: "Master the most common category of machine learning. This course provides a deep dive into various supervised learning algorithms, covering the theory and practical implementation of linear/logistic regression, decision trees, random forests, and SVMs.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "15h",
        instructor: "Tunde Adekunle",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Regression Algorithms",
            lessons: [{ title: "Linear and Logistic Regression", content: "Understand the mathematical foundations of linear regression for predicting continuous values and logistic regression for classification.", duration: "2h", completed: false }],
            quiz: [{ questionText: "A decision tree is what type of model?", options: ["Linear model", "Tree-based model", "Neural network"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A Random Forest is an ensemble of:", options: ["Neural Networks", "Support Vector Machines", "Decision Trees"], correctAnswerIndex: 2 }]
    },
    {
        title: "Unsupervised Learning",
        description: "Discover patterns in data with clustering, dimensionality reduction, and association rules.",
        longDescription: "Learn to find hidden structures in unlabeled data. This course covers key unsupervised learning techniques, including K-Means clustering for customer segmentation, PCA for dimensionality reduction, and Apriori algorithm for market basket analysis.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "15h",
        instructor: "Tunde Adekunle",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Clustering",
            lessons: [{ title: "K-Means Algorithm", content: "Learn how the K-Means algorithm works to partition data into K distinct clusters based on their features.", duration: "2h", completed: false }],
            quiz: [{ questionText: "What is the goal of dimensionality reduction?", options: ["To add more features", "To reduce the number of features", "To cluster data"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "K-Means is an algorithm for:", options: ["Classification", "Clustering", "Regression"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI in Business",
        description: "Learn how to apply AI to solve real-world business problems and drive value.",
        longDescription: "This course bridges the gap between AI technology and business strategy. You'll learn to identify opportunities for AI in a business, build a business case for an AI project, and understand the lifecycle of deploying AI solutions in a corporate environment.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "8h",
        instructor: "Michael Chen",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: AI Strategy",
            lessons: [{ title: "Identifying AI Opportunities", content: "Learn frameworks for assessing business processes and identifying areas where AI can provide the most value, from automation to prediction.", duration: "1h", completed: false }],
            quiz: [{ questionText: "A key step in an AI project is:", options: ["Writing the code first", "Defining a clear business problem", "Hiring a large team"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "ROI stands for:", options: ["Rate of Innovation", "Return on Investment", "Risk of Implementation"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI Tools 2",
        description: "An advanced guide to using and integrating AI APIs into your own applications.",
        longDescription: "Move beyond using pre-built AI tools to integrating them into your own projects. This course covers how to use APIs from services like OpenAI, Google AI, and Hugging Face to add powerful AI capabilities to your applications.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "12h",
        instructor: "David Lee",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Working with AI APIs",
            lessons: [{ title: "Making Your First API Call", content: "Learn the fundamentals of working with REST APIs to send data to an AI service and receive a response, and how to handle authentication.", duration: "2h", completed: false }],
            quiz: [{ questionText: "An API key is used for:", options: ["Encrypting data", "Authentication and authorization", "Defining the model"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is an 'embedding' in the context of AI?", options: ["A type of image", "A numerical representation of text or other data", "A user interface element"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI Ethics 2",
        description: "A deeper dive into ethical frameworks, fairness, and accountability in AI systems.",
        longDescription: "This course builds on the basics of AI ethics to explore complex topics in more detail. You'll learn about different frameworks for ethical decision-making, technical methods for measuring and mitigating bias, and the challenges of ensuring accountability in AI.",
        category: "AI & Machine Learning",
        level: "Intermediate",
        duration: "8h",
        instructor: "Jane Foster",
        price: 5000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Fairness in Machine Learning",
            lessons: [{ title: "Defining and Measuring Fairness", content: "Explore the various mathematical definitions of fairness and understand that there is often no single 'best' way to be fair, leading to complex trade-offs.", duration: "1h", completed: false }],
            quiz: [{ questionText: "What is a key challenge in AI fairness?", options: ["There is only one way to be fair", "Different definitions of fairness can be mutually exclusive", "Fairness is not important"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "The 'black box' problem in AI refers to:", options: ["Secure AI systems", "Difficulty in understanding how a model makes decisions", "AI models that don't work"], correctAnswerIndex: 1 }]
    },
    
    // AI & Machine Learning - Advanced
    {
        title: "AI for Robotics",
        description: "Explore how AI powers autonomous systems, from perception to path planning.",
        longDescription: "This course explores the intersection of AI and robotics. You'll learn how robots use computer vision to perceive their environment, how reinforcement learning is used to teach robots tasks, and the algorithms behind path planning and navigation.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "25h",
        instructor: "Dr. Anya Sharma",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Robotic Perception",
            lessons: [{ title: "Computer Vision for Robots", content: "Learn how techniques like object detection and semantic segmentation allow robots to understand their surroundings.", duration: "3h", completed: false }],
            quiz: [{ questionText: "SLAM in robotics stands for:", options: ["Strategic Location and Mapping", "Simultaneous Localization and Mapping", "Systematic Logic and Memory"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Reinforcement learning is often used to teach robots:", options: ["To see", "Complex tasks through trial and error", "To speak"], correctAnswerIndex: 1 }]
    },
    {
        title: "AI Security",
        description: "Understand the unique security vulnerabilities of AI systems and how to defend against them.",
        longDescription: "Learn about the security risks specific to machine learning systems. This course covers adversarial attacks, data poisoning, and model inversion attacks, and explores the defensive techniques and best practices to build more secure and robust AI.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "18h",
        instructor: "Dr. Aisha Bello",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Adversarial Attacks",
            lessons: [{ title: "Fooling Neural Networks", content: "Discover how small, imperceptible changes to an input can cause a machine learning model to make a completely wrong prediction, and the implications for security.", duration: "2h", completed: false }],
            quiz: [{ questionText: "Data poisoning is an attack that targets the:", options: ["Live model", "Training data", "End user"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "What is a primary goal of AI security?", options: ["To make models faster", "To ensure model confidentiality, integrity, and availability", "To make models more accurate"], correctAnswerIndex: 1 }]
    },
    {
        title: "Explainable AI",
        description: "Learn techniques to interpret 'black box' AI models and make their decisions understandable.",
        longDescription: "As AI models become more complex, understanding why they make certain decisions is crucial. This course covers the field of Explainable AI (XAI), teaching you techniques like LIME and SHAP to interpret model predictions and build trust in AI systems.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "16h",
        instructor: "Jane Foster",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: The Need for Explainability",
            lessons: [{ title: "Interpreting Black Box Models", content: "Understand the risks of using models whose decision-making processes are not transparent, especially in high-stakes domains like healthcare and finance.", duration: "2h", completed: false }],
            quiz: [{ questionText: "SHAP and LIME are techniques for:", options: ["Training models", "Model explainability", "Deploying models"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "Explainable AI is important for:", options: ["Building trust and debugging models", "Making models bigger", "Speeding up training"], correctAnswerIndex: 0 }]
    },
    {
        title: "AI Research",
        description: "A course on conducting and contributing to the field of AI research.",
        longDescription: "This course is designed for those who want to contribute to the field of AI. It covers how to read research papers, identify research problems, design experiments, and write and submit papers to academic conferences and journals.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "20h",
        instructor: "Dr. Anya Sharma",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Reading Research Papers",
            lessons: [{ title: "How to Critically Analyze AI Papers", content: "Learn a systematic approach to reading and understanding dense academic papers in the field of AI, from the abstract to the experimental results.", duration: "2h", completed: false }],
            quiz: [{ questionText: "A key part of a research paper is the:", options: ["Abstract", "Conclusion", "Both A and B"], correctAnswerIndex: 2 }]
        }],
        finalAssessment: [{ questionText: "What is a common platform for accessing AI research papers?", options: ["GitHub", "arXiv", "Stack Overflow"], correctAnswerIndex: 1 }]
    },
    {
        title: "Ethics and Policy in AI",
        description: "Examine the intersection of AI ethics and public policy on a global scale.",
        longDescription: "This course examines the broader societal implications of AI and the role of public policy in shaping its future. Topics include global AI strategies, regulations like the EU AI Act, and the impact of AI on labor and governance.",
        category: "AI & Machine Learning",
        level: "Advanced",
        duration: "15h",
        instructor: "Jane Foster",
        price: 7000,
        imageUrl: 'https://placehold.co/600x400.png',
        modules: [{
            title: "Module 1: Global AI Governance",
            lessons: [{ title: "Comparing National AI Strategies", content: "Analyze and compare the AI strategies of different countries and blocs, such as the US, China, and the EU, to understand their different approaches to innovation and regulation.", duration: "2h", completed: false }],
            quiz: [{ questionText: "The EU AI Act takes what kind of approach?", options: ["A laissez-faire approach", "A risk-based approach", "A technology-neutral approach"], correctAnswerIndex: 1 }]
        }],
        finalAssessment: [{ questionText: "A major policy debate in AI is about:", options: ["The best programming language", "Balancing innovation and regulation", "The ideal model size"], correctAnswerIndex: 1 }]
    },
    // Existing Courses to Retain
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
