
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { z } from 'zod';

const apiDevelopmentCourse: NewCourse = {
    title: "API Development (Advanced)",
    description: "Designing, scaling, securing, and managing modern APIs.",
    longDescription: "Build scalable REST and GraphQL APIs with proper design patterns, implement authentication with OAuth2, OpenID Connect, and JWT, use Swagger (OpenAPI) for documentation, apply API versioning, caching, rate limiting, and monitoring, design for multi-client consumption, and deploy using microservices and CI/CD pipelines.",
    category: "Tech Skills",
    level: "Advanced",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "18h",
    instructor: "The API Architects",
    price: 7000,
    modules: [
        {
            title: "Module 1: Designing Scalable REST APIs",
            lessons: [
                { title: "REST Principles and Best Practices", duration: "1h 30m", completed: false },
                { title: "Advanced Design Patterns (Pagination, Filtering)", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "REST APIs are based on:", options: ["HTTP", "FTP", "WebSockets"], correctAnswerIndex: 0 },
                { questionText: "A 201 status code means:", options: ["Resource created", "Forbidden", "Server crash"], correctAnswerIndex: 0 },
                { questionText: "URLs should contain:", options: ["Nouns", "Verbs", "Emojis"], correctAnswerIndex: 0 },
                { questionText: "GET /products?page=2 is used for:", options: ["Pagination", "Authentication", "File upload"], correctAnswerIndex: 0 },
                { questionText: "Error 404 means:", options: ["Not Found", "Unauthorized", "Timeout"], correctAnswerIndex: 0 },
                { questionText: "REST is a:", options: ["Stateless architecture", "Stateful API", "Proxy protocol"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: API Authentication (OAuth2, OpenID, JWT)",
            lessons: [
                { title: "Authentication vs. Authorization", duration: "1h", completed: false },
                { title: "OAuth 2.0 and OpenID Connect", duration: "1h", completed: false },
                { title: "Working with JWT Tokens", duration: "1h", completed: false },
            ],
            quiz: [
                { questionText: "OAuth2 is used for:", options: ["Authorization", "Logging", "Graphing"], correctAnswerIndex: 0 },
                { questionText: "JWT stands for:", options: ["JSON Web Token", "JavaScript Web Tool", "Job Waiting Token"], correctAnswerIndex: 0 },
                { questionText: "OpenID Connect provides:", options: ["Identity layer", "API monitoring", "Styling rules"], correctAnswerIndex: 0 },
                { questionText: "jwt.sign() is used to:", options: ["Create token", "Encrypt DB", "Ping server"], correctAnswerIndex: 0 },
                { questionText: "OAuth2 uses:", options: ["Access tokens", "MAC address", "URL paths"], correctAnswerIndex: 0 },
                { questionText: "Authentication means:", options: ["Identifying the user", "Formatting a page", "Scaling server"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Documenting APIs with Swagger and Postman",
            lessons: [
                { title: "The OpenAPI Specification (Swagger)", duration: "1h 30m", completed: false },
                { title: "Creating Postman Collections for Testing", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "Swagger is used to:", options: ["Document APIs", "Test UI", "Send emails"], correctAnswerIndex: 0 },
                { questionText: "OpenAPI is another name for:", options: ["Swagger", "Axios", "WebRTC"], correctAnswerIndex: 0 },
                { questionText: "Postman environments store:", options: ["Variables like tokens", "Fonts", "Firewalls"], correctAnswerIndex: 0 },
                { questionText: "Swagger uses:", options: ["YAML/JSON", "HTML", "CSS"], correctAnswerIndex: 0 },
                { questionText: "API docs help:", options: ["Other devs understand usage", "Format images", "Stream media"], correctAnswerIndex: 0 },
                { questionText: "Postman scripts can:", options: ["Run tests", "Fetch CSS", "Convert fonts"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Versioning, Rate Limiting, and Caching",
            lessons: [
                { title: "API Versioning Strategies", duration: "1h 30m", completed: false },
                { title: "Implementing Rate Limiting and Caching", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "/v1/users is an example of:", options: ["URI versioning", "REST endpoint", "DNS setup"], correctAnswerIndex: 0 },
                { questionText: "Rate limiting helps prevent:", options: ["Abuse & spam", "Layout issues", "Data loss"], correctAnswerIndex: 0 },
                { questionText: "Redis is used for:", options: ["Caching", "Deployment", "Auth"], correctAnswerIndex: 0 },
                { questionText: "express-rate-limit is:", options: ["Node.js middleware", "SQL query", "Font loader"], correctAnswerIndex: 0 },
                { questionText: "Cache-Control is for:", options: ["Client-side caching", "OAuth", "Sorting data"], correctAnswerIndex: 0 },
                { questionText: "Header versioning uses:", options: ["Accept headers", "IP address", "HTML5"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: API Testing and Monitoring",
            lessons: [
                { title: "Automated API Testing Strategies", duration: "1h 30m", completed: false },
                { title: "Monitoring with Prometheus and Grafana", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "Unit tests check:", options: ["Small parts of code", "Whole systems", "UI buttons"], correctAnswerIndex: 0 },
                { questionText: "Supertest is used for:", options: ["API testing", "HTML rendering", "CSS animations"], correctAnswerIndex: 0 },
                { questionText: "New Relic is a:", options: ["Monitoring tool", "Text editor", "Token"], correctAnswerIndex: 0 },
                { questionText: "Monitoring shows:", options: ["API health", "JSON size", "Page color"], correctAnswerIndex: 0 },
                { questionText: "Postman can:", options: ["Schedule monitors", "Play videos", "Resize icons"], correctAnswerIndex: 0 },
                { questionText: "A test should include:", options: ["Expected result", "Font size", "CSS loader"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Building APIs for Scale (Microservices)",
            lessons: [
                { title: "Monolith vs. Microservices Architecture", duration: "1h 30m", completed: false },
                { title: "Communication Patterns and API Gateways", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "Microservices are:", options: ["Small independent APIs", "Large monolithic apps", "Excel plugins"], correctAnswerIndex: 0 },
                { questionText: "API Gateway helps:", options: ["Manage requests", "Draw diagrams", "Save cookies"], correctAnswerIndex: 0 },
                { questionText: "Kafka is used for:", options: ["Messaging", "Routing pages", "Encrypting tokens"], correctAnswerIndex: 0 },
                { questionText: "Each service in microservices:", options: ["Has its own DB", "Shares tables", "Uses same port"], correctAnswerIndex: 0 },
                { questionText: "Service discovery helps:", options: ["Find API endpoints", "Draw diagrams", "Create tokens"], correctAnswerIndex: 0 },
                { questionText: "RabbitMQ is a:", options: ["Message broker", "JavaScript engine", "Cookie manager"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: {
        questions: [
            { questionText: "What’s the difference between REST and GraphQL?" },
            { questionText: "Describe a standard OAuth2 flow." },
            { questionText: "What’s the purpose of the API Gateway?" },
            { questionText: "Write a basic rate-limiter snippet in Node.js." },
            { questionText: "How do you use Swagger to document an endpoint?" },
            { questionText: "What is JWT, and how is it used in APIs?" },
            { questionText: "Compare URI versioning and Header versioning." },
            { questionText: "List two tools for monitoring live APIs." },
            { questionText: "What’s the use of Postman environments?" },
            { questionText: "Explain the difference between unit and integration tests." },
            { questionText: "What does Redis help with in API design?" },
            { questionText: "Give an example of caching headers." },
            { questionText: "List 3 benefits of microservices architecture." },
            { questionText: "What’s the use of service discovery in APIs?" },
            { questionText: "Write a GET endpoint in Express that returns a paginated list of users." },
        ]
    }
};

const aiCourse: NewCourse = {
    title: "Artificial Intelligence",
    description: "An intensive course covering the foundations, applications, and ethical considerations of AI.",
    longDescription: "This advanced course provides a comprehensive overview of Artificial Intelligence, from its theoretical and mathematical foundations to its real-world applications in computer vision, NLP, and decision-making. Students will learn to build AI systems using Python, understand the nuances of AI ethics and bias, and become capable of leading AI projects and research.",
    category: "AI & Machine Learning",
    level: "Advanced",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "18h",
    instructor: "The AI Faculty",
    price: 7000,
    modules: [
        {
            title: "Module 1: The Foundations of Artificial Intelligence",
            lessons: [
                { title: "What Is AI and Key Concepts", duration: "1h 30m", completed: false },
                { title: "Branches of AI and History", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "The Turing Test evaluates:", options: ["Machine intelligence", "Internet speed", "CPU temperature"], correctAnswerIndex: 0 },
                { questionText: "AI agents interact with:", options: ["Environments", "Data cables", "HTML pages"], correctAnswerIndex: 0 },
                { questionText: "NLP stands for:", options: ["Natural Language Processing", "Network Layer Protocol", "New Logic Path"], correctAnswerIndex: 0 },
                { questionText: "An expert system is based on:", options: ["Rules and logic", "Sound and graphics", "CSS and HTML"], correctAnswerIndex: 0 },
                { questionText: "Machine Learning enables:", options: ["Learning from data", "Reading JavaScript", "Spinning hard drives"], correctAnswerIndex: 0 },
                { questionText: "A robot is an AI that:", options: ["Interacts with the physical world", "Edits photos", "Plays MP3s"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Machine Learning in Depth",
            lessons: [
                { title: "Types of Machine Learning", duration: "1h 30m", completed: false },
                { title: "Core ML Concepts and Code", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "Supervised learning uses:", options: ["Labeled data", "Random loops", "Audio signals"], correctAnswerIndex: 0 },
                { questionText: "The purpose of a model is to:", options: ["Map inputs to outputs", "Beautify data", "Format pages"], correctAnswerIndex: 0 },
                { questionText: "Reinforcement learning learns by:", options: ["Trial and error", "HTML parsing", "Screenshotting"], correctAnswerIndex: 0 },
                { questionText: "fit() function is used to:", options: ["Train a model", "Plot a graph", "Import JSON"], correctAnswerIndex: 0 },
                { questionText: "A loss function measures:", options: ["Prediction errors", "File sizes", "Speed"], correctAnswerIndex: 0 },
                { questionText: "Backpropagation is used in:", options: ["Neural networks", "CSS", "Data scraping"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Deep Learning and Neural Networks",
            lessons: [
                { title: "Introduction to Neural Networks", duration: "1h 30m", completed: false },
                { title: "Types of Networks and TensorFlow Example", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "CNNs are used for:", options: ["Images", "Text docs", "Audio only"], correctAnswerIndex: 0 },
                { questionText: "An epoch is:", options: ["One full training pass", "A plot style", "An API method"], correctAnswerIndex: 0 },
                { questionText: "RNNs work well with:", options: ["Sequences", "Buttons", "Tables"], correctAnswerIndex: 0 },
                { questionText: "GANs are used to:", options: ["Generate new data", "Encrypt passwords", "Write SQL"], correctAnswerIndex: 0 },
                { questionText: "TensorFlow is a:", options: ["Deep learning library", "Browser", "CMS"], correctAnswerIndex: 0 },
                { questionText: "Activation functions decide:", options: ["Node output", "URL path", "Font weight"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Natural Language Processing (NLP)",
            lessons: [
                { title: "Understanding NLP Tasks", duration: "1h 30m", completed: false },
                { title: "Practical NLP with SpaCy", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "NLP helps with:", options: ["Language tasks", "Drawing shapes", "Graphing"], correctAnswerIndex: 0 },
                { questionText: "Tokenization breaks text into:", options: ["Words/tokens", "Folders", "Emails"], correctAnswerIndex: 0 },
                { questionText: "NER finds:", options: ["Entities in text", "Passwords", "Ping speeds"], correctAnswerIndex: 0 },
                { questionText: "Sentiment analysis detects:", options: ["Emotion", "Spam", "Graph colors"], correctAnswerIndex: 0 },
                { questionText: "spacy.load() loads:", options: ["NLP model", "GraphQL query", "CSS theme"], correctAnswerIndex: 0 },
                { questionText: "Text generation is done by:", options: ["Language models", "React components", "Loops"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Computer Vision and Real-World AI",
            lessons: [
                { title: "Intro to Computer Vision", duration: "1h 30m", completed: false },
                { title: "Computer Vision with OpenCV", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "OpenCV is used for:", options: ["Image processing", "APIs", "Game engines"], correctAnswerIndex: 0 },
                { questionText: "OCR means:", options: ["Optical Character Recognition", "Online CSS Resource", "Object Circular Rendering"], correctAnswerIndex: 0 },
                { questionText: "cv2.imread() loads:", options: ["Images", "APIs", "Fonts"], correctAnswerIndex: 0 },
                { questionText: "Object tracking is used in:", options: ["Surveillance", "HTML parsing", "SQL Joins"], correctAnswerIndex: 0 },
                { questionText: "Medical imaging is part of:", options: ["AI in healthcare", "Databases", "Frontend dev"], correctAnswerIndex: 0 },
                { questionText: "cv2.imshow() displays:", options: ["Image windows", "JSON", "Web pages"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Ethics, AI Safety, and the Future",
            lessons: [
                { title: "AI Ethics and Bias", duration: "1h 30m", completed: false },
                { title: "AI Safety and the Future", duration: "1h 30m", completed: false },
            ],
            quiz: [
                { questionText: "AI bias is caused by:", options: ["Biased training data", "CPU errors", "Loud speakers"], correctAnswerIndex: 0 },
                { questionText: "AI ethics involves:", options: ["Fairness, privacy, transparency", "Styling rules", "Loops and breaks"], correctAnswerIndex: 0 },
                { questionText: "AGI means:", options: ["Artificial General Intelligence", "Advanced Graphical Interface", "API Governance Index"], correctAnswerIndex: 0 },
                { questionText: "Explainable AI is:", options: ["Transparent decision-making", "Graph styling", "Audio filters"], correctAnswerIndex: 0 },
                { questionText: "Job displacement by AI is:", options: ["Real concern", "Science fiction", "Browser setting"], correctAnswerIndex: 0 },
                { questionText: "AI safety ensures:", options: ["Human-friendly outcomes", "Keyboard security", "JavaScript efficiency"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: {
        questions: [
            { questionText: "Define Artificial Intelligence and its main goal." },
            { questionText: "Name 3 branches of AI." },
            { questionText: "What is supervised vs unsupervised learning?" },
            { questionText: "In scikit-learn, what method is used to train a model?" },
            { questionText: "Explain what a neural network does." },
            { questionText: "What does CNN stand for, and what’s it used for?" },
            { questionText: "Compare RNN and CNN." },
            { questionText: "Define NLP and give two examples of its use." },
            { questionText: "What is tokenization?" },
            { questionText: "In SpaCy, `doc.ents` is used for what?" },
            { questionText: "What does OpenCV do?" },
            { questionText: "Explain the risks of biased AI." },
            { questionText: "What is AGI?" },
            { questionText: "How can we ensure ethical use of AI?" },
            { questionText: "List 2 real-world applications of AI today." },
        ]
    }
};

const advancedTechSkillsCourse: NewCourse = {
    title: "Advanced Tech Skills Certification",
    description: "Master cybersecurity, data science, and DevOps in one comprehensive course.",
    longDescription: "Dive deep into the most critical areas of modern technology. This advanced course is designed for professionals looking to specialize and lead in the fields of cybersecurity, data science, and DevOps. You will learn to protect systems, analyze data for actionable insights, and automate infrastructure for seamless deployment.",
    category: "Tech Skills",
    level: "Advanced",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "24h",
    instructor: "Dr. Evelyn Reed",
    price: 7000,
    modules: [
        {
            title: "Module 1: Advanced Cybersecurity",
            lessons: [
                { title: "Threat Modeling and Risk Assessment", duration: "1h 30m", completed: false },
                { title: "Penetration Testing Methodologies", duration: "2h", completed: false },
                { title: "Cloud Security Architecture (AWS, Azure)", duration: "2h 30m", completed: false },
                { title: "Incident Response and Forensics", duration: "2h", completed: false },
            ],
            quiz: [
                {
                    questionText: "What is the primary goal of threat modeling?",
                    options: ["To find all vulnerabilities", "To identify and mitigate potential security threats early", "To write secure code", "To configure firewalls"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "Which phase of penetration testing involves actively trying to exploit vulnerabilities?",
                    options: ["Reconnaissance", "Scanning", "Gaining Access", "Maintaining Access"],
                    correctAnswerIndex: 2
                },
                {
                    questionText: "What does 'defense in depth' refer to in cloud security?",
                    options: ["A single, strong security control", "Layering multiple security controls", "Encrypting all data", "Using only one cloud provider"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "Which of the following is NOT a standard phase of the incident response lifecycle?",
                    options: ["Preparation", "Detection & Analysis", "Public Disclosure", "Containment, Eradication & Recovery"],
                    correctAnswerIndex: 2
                },
                {
                    questionText: "What is the main purpose of a 'honeypot' in cybersecurity?",
                    options: ["To store sensitive data securely", "To attract and study attackers", "To filter network traffic", "To back up system files"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "In digital forensics, what is the 'chain of custody'?",
                    options: ["The order of network connections", "A log of all system commands", "The chronological documentation of evidence handling", "A list of all user accounts"],
                    correctAnswerIndex: 2
                },
            ]
        },
        {
            title: "Module 2: Applied Data Science",
            lessons: [
                { title: "Advanced Machine Learning Algorithms", duration: "2h", completed: false },
                { title: "Big Data Technologies (Spark, Hadoop)", duration: "2h 30m", completed: false },
                { title: "Natural Language Processing (NLP)", duration: "2h", completed: false },
                { title: "Model Deployment and MLOps", duration: "1h 30m", completed: false },
            ],
            quiz: [
                {
                    questionText: "Which algorithm is commonly used for anomaly detection?",
                    options: ["Linear Regression", "K-Means Clustering", "Isolation Forest", "Decision Tree"],
                    correctAnswerIndex: 2
                },
                {
                    questionText: "What is the primary advantage of Apache Spark over Hadoop MapReduce?",
                    options: ["Lower cost", "In-memory data processing for faster performance", "Better security features", "Wider language support"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "What is 'lemmatization' in NLP?",
                    options: ["Reducing words to their base or dictionary form", "Counting word frequencies", "Removing punctuation", "Identifying named entities"],
                    correctAnswerIndex: 0
                },
                {
                    questionText: "MLOps primarily focuses on:",
                    options: ["Developing new machine learning models", "Visualizing data dashboards", "Automating and managing the lifecycle of machine learning models", "Training models on larger datasets"],
                    correctAnswerIndex: 2
                },
                {
                    questionText: "Which of these is a supervised learning task?",
                    options: ["Customer segmentation", "Image classification", "Topic modeling", "Dimensionality reduction"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "What does 'TF-IDF' stand for?",
                    options: ["Total Frequency - Inverse Data Frequency", "Term Frequency - Inverse Document Frequency", "Text Formatting - Inverse Data Formatting", "True False - Independent Dependent"],
                    correctAnswerIndex: 1
                },
            ]
        },
        {
            title: "Module 3: DevOps and Cloud Automation",
            lessons: [
                { title: "Infrastructure as Code (Terraform, CloudFormation)", duration: "2h 30m", completed: false },
                { title: "CI/CD Pipelines with Jenkins and GitLab CI", duration: "2h", completed: false },
                { title: "Containerization with Docker and Kubernetes", duration: "2h 30m", completed: false },
                { title: "Monitoring and Observability (Prometheus, Grafana)", duration: "2h", completed: false },
            ],
            quiz: [
                {
                    questionText: "What is the role of Terraform?",
                    options: ["To run automated tests", "To build application code", "To provision and manage infrastructure as code", "To monitor application performance"],
                    correctAnswerIndex: 2
                },
                {
                    questionText: "In a CI/CD pipeline, what does 'CD' typically stand for?",
                    options: ["Continuous Development", "Continuous Delivery/Deployment", "Code Documentation", "Critical Damage"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "What is the primary function of Kubernetes?",
                    options: ["To build container images", "To orchestrate and manage containerized applications", "To store application code", "To provide a database service"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "Prometheus is a tool primarily used for:",
                    options: ["Log aggregation", "Monitoring and time-series data collection", "Code linting", "Container building"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "A Dockerfile is used to:",
                    options: ["Run a container", "Define how to build a Docker image", "Connect containers together", "Store container data"],
                    correctAnswerIndex: 1
                },
                {
                    questionText: "What is 'Canary Deployment'?",
                    options: ["Deploying to all users at once", "Rolling back a failed deployment", "Gradually rolling out a new version to a small subset of users", "Deploying during off-peak hours"],
                    correctAnswerIndex: 2
                },
            ]
        }
    ],
    finalAssessment: {
        questions: [
            {
                questionText: "In the context of the CIA triad in cybersecurity, what does 'Availability' ensure?",
            },
            {
                questionText: "A SQL Injection attack is primarily aimed at which part of an application?",
            },
            {
                questionText: "What is a key difference between supervised and unsupervised machine learning?",
            },
            {
                questionText: "In data science, what is 'overfitting'?",
            },
            {
                questionText: "What is the purpose of a `git commit` command in DevOps?",
            },
            {
                questionText: "Which of the following is a core principle of DevOps?",
            },
            {
                questionText: "What is a 'zero-day' vulnerability?",
            },
            {
                questionText: "What type of machine learning model is a 'neural network'?",
            },
            {
                questionText: "In Kubernetes, what is a 'Pod'?",
            },
            {
                questionText: "What is the primary function of an Intrusion Detection System (IDS)?",
            },
            {
                questionText: "The process of cleaning and transforming raw data into a usable format is called:",
            },
            {
                questionText: "What is 'immutable infrastructure' in the context of DevOps?",
            },
            {
                questionText: "Phishing is a type of attack that relies on:",
            },
            {
                questionText: "Which metric is commonly used to evaluate the performance of a classification model?",
            },
            {
                questionText: "What is the purpose of a CI (Continuous Integration) server like Jenkins?",
            },
        ]
    }
};

const apisAndBackendCourse: NewCourse = {
    title: "APIs and Backend Development",
    description: "Real-world API development and backend system building.",
    longDescription: "By the end of this course, you’ll be able to: Understand what APIs are and how they work, Build RESTful APIs using Node.js and Express, Understand and use GraphQL APIs, Secure your APIs with tokens and rate limiting, Connect APIs to databases, Test, deploy, and monitor backend systems.",
    category: "Tech Skills",
    level: "Intermediate",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "12h",
    instructor: "The Backend Brigade",
    price: 5000,
    modules: [
        {
            title: "Module 1: Understanding APIs",
            lessons: [
                { title: "What is an API?", duration: "1h", completed: false },
                { title: "Types of APIs (REST, GraphQL)", duration: "1h", completed: false }
            ],
            quiz: [
                { questionText: "API stands for:", options: ["Application Programming Interface", "Advanced Program Info", "Applied Python Integration"], correctAnswerIndex: 0 },
                { questionText: "REST uses which format?", options: ["JSON", "MP3", "ZIP"], correctAnswerIndex: 0 },
                { questionText: "POST is used to:", options: ["Create data", "Delete data", "Format buttons"], correctAnswerIndex: 0 },
                { questionText: "WebSockets are good for:", options: ["Real-time communication", "Animation", "Static websites"], correctAnswerIndex: 0 },
                { questionText: "A waiter analogy is used for:", options: ["APIs", "Routers", "Modems"], correctAnswerIndex: 0 },
                { questionText: "GraphQL lets you:", options: ["Query exactly what you need", "Style HTML", "Format PDFs"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 2: Building REST APIs with Node.js & Express",
            lessons: [
                { title: "Setting Up a Simple API", duration: "1h 30m", completed: false },
                { title: "HTTP Methods in Action", duration: "1h 30m", completed: false }
            ],
            quiz: [
                { questionText: "express.json() is used to:", options: ["Parse JSON in requests", "Animate headers", "Compress responses"], correctAnswerIndex: 0 },
                { questionText: "The method for updating a record is:", options: ["PUT", "FETCH", "EXEC"], correctAnswerIndex: 0 },
                { questionText: "POST is used to:", options: ["Create new data", "Log requests", "Format routes"], correctAnswerIndex: 0 },
                { questionText: "Express is built on:", options: ["Node.js", "PHP", "Python"], correctAnswerIndex: 0 },
                { questionText: "Port 3000 is:", options: ["Common dev port", "Airport gate", "SQL query"], correctAnswerIndex: 0 },
                { questionText: "Route parameters are written as:", options: ["/users/:id", "/users.id", "<users=id>"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 3: API Authentication & Security",
            lessons: [
                { title: "Securing APIs with JWT", duration: "1h", completed: false },
                { title: "Rate Limiting and Basic Security", duration: "1h", completed: false }
            ],
            quiz: [
                { questionText: "JWT stands for:", options: ["JSON Web Token", "Java Web Tool", "Just Want Tokens"], correctAnswerIndex: 0 },
                { questionText: "An API key is:", options: ["Basic auth method", "CSS class", "Database name"], correctAnswerIndex: 0 },
                { questionText: "Bearer <token> is used in:", options: ["Authorization header", "Image tag", "DNS lookup"], correctAnswerIndex: 0 },
                { questionText: "OAuth2 allows:", options: ["Third-party login", "Styling pages", "UI testing"], correctAnswerIndex: 0 },
                { questionText: "Rate limiting prevents:", options: ["API abuse", "JSON compression", "Route duplication"], correctAnswerIndex: 0 },
                { questionText: "jsonwebtoken is used to:", options: ["Generate/verify tokens", "Run tests", "Connect databases"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 4: Connecting APIs to Databases",
            lessons: [
                { title: "Integrating MongoDB with Mongoose", duration: "1h 30m", completed: false },
                { title: "Creating API CRUD Endpoints", duration: "1h 30m", completed: false }
            ],
            quiz: [
                { questionText: "Mongoose is used for:", options: ["MongoDB in Node.js", "Security testing", "UI animation"], correctAnswerIndex: 0 },
                { questionText: "User.find() is used to:", options: ["Fetch users", "Generate tokens", "Render HTML"], correctAnswerIndex: 0 },
                { questionText: "mongoose.connect() connects:", options: ["Node to DB", "API to frontend", "Two routers"], correctAnswerIndex: 0 },
                { questionText: "POST + DB insert means:", options: ["Add data via API", "Delete everything", "Encrypt app"], correctAnswerIndex: 0 },
                { questionText: "req.body contains:", options: ["Sent JSON data", "Environment config", "HTML tags"], correctAnswerIndex: 0 },
                { questionText: "MongoDB stores documents in:", options: ["Collections", "Tables", "Spreadsheets"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 5: GraphQL APIs",
            lessons: [
                { title: "Introduction to GraphQL", duration: "1h", completed: false },
                { title: "Building a GraphQL Server with Apollo", duration: "1h", completed: false }
            ],
            quiz: [
                { questionText: "GraphQL is a:", options: ["Query language", "Style guide", "Route config"], correctAnswerIndex: 0 },
                { questionText: "GraphQL queries return:", options: ["Only requested fields", "All HTML", "SQL joins"], correctAnswerIndex: 0 },
                { questionText: "Apollo Server helps:", options: ["Build GraphQL APIs", "Style buttons", "Upload files"], correctAnswerIndex: 0 },
                { questionText: "typeDefs define:", options: ["Schema types", "SQL tables", "API routes"], correctAnswerIndex: 0 },
                { questionText: "REST vs GraphQL key difference:", options: ["Number of endpoints", "Color of JSON", "Token format"], correctAnswerIndex: 0 },
                { questionText: "GraphQL avoids:", options: ["Overfetching", "Encryption", "Styling"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 6: Testing & Deploying Your Backend",
            lessons: [
                { title: "Automated API Testing with Jest", duration: "1h", completed: false },
                { title: "Deploying to the Cloud (Render/Vercel)", duration: "1h", completed: false }
            ],
            quiz: [
                { questionText: "Postman is used to:", options: ["Test APIs", "Draw UIs", "Generate CSS"], correctAnswerIndex: 0 },
                { questionText: "Render is a:", options: ["Deployment platform", "Design tool", "SQL generator"], correctAnswerIndex: 0 },
                { questionText: "Jest is for:", options: ["Unit testing", "Authorization", "Routing"], correctAnswerIndex: 0 },
                { questionText: "MongoDB Atlas is:", options: ["Cloud DB", "PDF viewer", "API builder"], correctAnswerIndex: 0 },
                { questionText: ".env files store:", options: ["Secrets and variables", "CSS", "Font styles"], correctAnswerIndex: 0 },
                { questionText: "supertest is used for:", options: ["API testing", "GraphQL hosting", "HTML debugging"], correctAnswerIndex: 0 }
            ]
        }
    ],
    finalAssessment: {
        questions: [
            { questionText: "Define API and give an analogy." },
            { questionText: "What are the 4 core HTTP methods in REST?" },
            { questionText: "Write a simple GET route in Express.js." },
            { questionText: "What is JWT used for?" },
            { questionText: "Show an example of a POST request with JSON." },
            { questionText: "What’s the difference between REST and GraphQL?" },
            { questionText: "How does rate limiting help protect APIs?" },
            { questionText: "What is `mongoose.connect()` used for?" },
            { questionText: "Name two authentication strategies." },
            { questionText: "What are resolvers in GraphQL?" },
            { questionText: "Describe the role of Postman." },
            { questionText: "How do you deploy an API to Render?" },
            { questionText: "Explain the purpose of environment variables." },
            { questionText: "What is the use of `express.json()`?" },
            { questionText: "Write an example of a database-connected API endpoint." },
        ]
    }
};


const allCourses: NewCourse[] = [aiCourse, advancedTechSkillsCourse, apiDevelopmentCourse, apisAndBackendCourse];

export async function seedInitialCourses() {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);
    const existingTitles = new Set(snapshot.docs.map(doc => doc.data().title));

    const coursesToAdd = allCourses.filter(course => !existingTitles.has(course.title));

    if (coursesToAdd.length > 0) {
        console.log(`Found ${coursesToAdd.length} new courses to seed...`);
        const batch = writeBatch(db);
        coursesToAdd.forEach(courseData => {
            const newCourseDoc = doc(coursesCollection);
             // Validate data against the schema before setting
            try {
                const validatedData = CourseSchema.omit({ 
                    id: true, 
                    progress: true,
                }).passthrough().parse(courseData);
                batch.set(newCourseDoc, validatedData);
            } catch(e) {
                if (e instanceof z.ZodError) {
                    console.error("Course data validation failed for:", courseData.title, e.errors);
                } else {
                    console.error("An unexpected error occurred during validation for:", courseData.title, e);
                }
            }
        });
        await batch.commit();
        console.log(`Successfully seeded ${coursesToAdd.length} new courses.`);
    } else {
        console.log('All defined courses already exist in the database. Skipping seed.');
    }
}
