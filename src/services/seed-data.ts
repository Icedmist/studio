
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { z } from 'zod';

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

const cybersecurityCourse: NewCourse = {
    title: "Cybersecurity Advanced",
    description: "Identify, model, and mitigate real-world security threats.",
    longDescription: "Learn to perform ethical hacking and penetration testing, design and implement Zero Trust Architectures, write secure code, set up enterprise-level incident response plans, and secure infrastructure across networks, servers, and the cloud.",
    category: "Tech Skills",
    level: "Advanced",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "24h",
    instructor: "The Security Division",
    price: 7000,
    modules: [
        {
            title: "Module 1: Advanced Threat Modeling & Attack Surface Analysis",
            lessons: [
                { title: "What Is Threat Modeling?", duration: "2h", completed: false },
                { title: "Analyzing the Attack Surface", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "What is the purpose of threat modeling?", options: ["Identify potential threats early", "Boost server speed", "Write CSS themes"], correctAnswerIndex: 0 },
                { questionText: "STRIDE stands for:", options: ["Spoofing, Tampering, etc.", "Static Routing in DNS Engines", "Security Tracking Interface"], correctAnswerIndex: 0 },
                { questionText: "Entry points include:", options: ["Login forms, APIs", "USB drives only", "Video files"], correctAnswerIndex: 0 },
                { questionText: "Which of these is an asset?", options: ["Customer credentials", "CSS file", "Blog post"], correctAnswerIndex: 0 },
                { questionText: "Which tool is used for visual threat maps?", options: ["Threat Dragon", "Nmap", "MySQL Workbench"], correctAnswerIndex: 0 },
                { questionText: "Information disclosure is:", options: ["Unauthorized access to data", "Cookie sharing", "Font loading"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Penetration Testing & Ethical Hacking",
            lessons: [
                { title: "The Pen Testing Lifecycle", duration: "2h", completed: false },
                { title: "Red Team vs Blue Team", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Penetration testing is used to:", options: ["Simulate attacks", "Speed up data", "Resize images"], correctAnswerIndex: 0 },
                { questionText: "The reconnaissance phase involves:", options: ["Info gathering", "Encryption", "Signing off users"], correctAnswerIndex: 0 },
                { questionText: "Red teams are:", options: ["Ethical hackers", "Network engineers", "CSS coders"], correctAnswerIndex: 0 },
                { questionText: "Metasploit is used for:", options: ["Exploiting vulnerabilities", "Coding themes", "Rendering HTML"], correctAnswerIndex: 0 },
                { questionText: "Maintaining access means:", options: ["Backdoors", "CSS tokens", "File renaming"], correctAnswerIndex: 0 },
                { questionText: "Burp Suite is for:", options: ["Web app testing", "Data visualization", "File storage"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Zero Trust Architecture (ZTA)",
            lessons: [
                { title: "What Is Zero Trust?", duration: "2h", completed: false },
                { title: "Implementing ZTA", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "What does Zero Trust mean?", options: ["Verify everything", "Trust all users", "Disable MFA"], correctAnswerIndex: 0 },
                { questionText: "ZTA discourages:", options: ["Implicit trust", "Passwords", "HTTPS"], correctAnswerIndex: 0 },
                { questionText: "Microsegmentation involves:", options: ["Dividing networks", "Shortening URLs", "Scaling fonts"], correctAnswerIndex: 0 },
                { questionText: "Least privilege means:", options: ["Only needed access", "Full admin rights", "CSS-only security"], correctAnswerIndex: 0 },
                { questionText: "ZTA starts with:", options: ["Identity and access control", "Image optimization", "Token caching"], correctAnswerIndex: 0 },
                { questionText: "Okta is a(n):", options: ["Identity provider", "API gateway", "Code formatter"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Secure Coding & DevSecOps",
            lessons: [
                { title: "Common Code Vulnerabilities", duration: "2h", completed: false },
                { title: "DevSecOps Integration", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Secure coding helps prevent:", options: ["Exploits", "SEO loss", "Slow CSS"], correctAnswerIndex: 0 },
                { questionText: "XSS stands for:", options: ["Cross-Site Scripting", "External Style Sheet", "XML Secure Stack"], correctAnswerIndex: 0 },
                { questionText: "SQL injection targets:", options: ["Databases", "DNS", "APIs only"], correctAnswerIndex: 0 },
                { questionText: "DevSecOps means:", options: ["Security baked into development", "DNS load balancing", "Code minification"], correctAnswerIndex: 0 },
                { questionText: "SonarQube is for:", options: ["Static analysis", "UX design", "Hosting fonts"], correctAnswerIndex: 0 },
                { questionText: "CSRF attacks can be prevented using:", options: ["Anti-CSRF tokens", "Margin spacing", "Console logging"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Network & Cloud Security",
            lessons: [
                { title: "Network Security Concepts", duration: "2h", completed: false },
                { title: "Cloud Security Musts", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "IDS is used to:", options: ["Detect intrusions", "Host blogs", "Load images"], correctAnswerIndex: 0 },
                { questionText: "VPN stands for:", options: ["Virtual Private Network", "Variable Port Number", "Visual Packet Naming"], correctAnswerIndex: 0 },
                { questionText: "IAM manages:", options: ["Access to resources", "Markdown styling", "XML errors"], correctAnswerIndex: 0 },
                { questionText: "Cloudflare helps with:", options: ["DDoS protection", "Token creation", "DNS mirroring"], correctAnswerIndex: 0 },
                { questionText: "S3 bucket policies are:", options: ["Access rules", "Font loaders", "Upload buttons"], correctAnswerIndex: 0 },
                { questionText: "What is a Bastion host?", options: ["Secure jump server", "Firewall rule", "Image compression tool"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Incident Response and Recovery",
            lessons: [
                { title: "The Incident Response Plan", duration: "2h", completed: false },
                { title: "Digital Forensics Tasks", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "IR stands for:", options: ["Incident Response", "Infra Router", "Internal Repo"], correctAnswerIndex: 0 },
                { questionText: "First stage of IR plan is:", options: ["Preparation", "Firing someone", "Rebooting server"], correctAnswerIndex: 0 },
                { questionText: "Forensics analysts:", options: ["Analyze evidence", "Design logos", "Delete records"], correctAnswerIndex: 0 },
                { questionText: "Malware analysis is part of:", options: ["IR process", "SEO audits", "Font security"], correctAnswerIndex: 0 },
                { questionText: "Chain of custody ensures:", options: ["Evidence isn’t tampered", "Password length", "Theme backup"], correctAnswerIndex: 0 },
                { questionText: "The SOC is:", options: ["Security Operations Center", "Static Optimization Cache", "Software Onboarding Console"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: {
        questions: [
            { questionText: "Explain STRIDE threat modeling." },
            { questionText: "What’s the difference between pen testing and vulnerability scanning?" },
            { questionText: "Name 3 tools used in penetration testing." },
            { questionText: "Describe the principles of Zero Trust Architecture." },
            { questionText: "How would you prevent XSS and SQL injection?" },
            { questionText: "What is DevSecOps, and how is it implemented?" },
            { questionText: "Explain the difference between IDS and IPS." },
            { questionText: "What role does IAM play in cloud security?" },
            { questionText: "What is the purpose of a bastion host?" },
            { questionText: "List the 6 steps of the IR lifecycle." },
            { questionText: "What are some tools used in log analysis during IR?" },
            { questionText: "Give an example of microsegmentation in Zero Trust." },
            { questionText: "Why is secure CI/CD important?" },
            { questionText: "How would you isolate and respond to a ransomware attack?" },
            { questionText: "Describe the difference between Red, Blue, and Purple teams." },
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

const techLeadershipCourse: NewCourse = {
    title: "Tech Leadership",
    description: "Transforming skilled developers into strategic, visionary, and effective tech leaders.",
    longDescription: "This course covers the essential skills for tech leadership, including managing development teams, aligning goals, resolving conflicts, making strategic technical decisions, scaling teams and processes, and communicating effectively with all stakeholders.",
    category: "Tech Skills",
    level: "Advanced",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "24h",
    instructor: "The Visionaries",
    price: 7000,
    modules: [
        {
            title: "Module 1: The Mindset of a Tech Leader",
            lessons: [
                { title: "From Coder to Leader", duration: "2h", completed: false },
                { title: "Leadership vs Management", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "A tech leader focuses on:", options: ["Empowering teams", "Writing solo code only", "Designing marketing flyers"], correctAnswerIndex: 0 },
                { questionText: "Leadership vs Management difference?", options: ["Vision vs Process", "Code vs UI", "Design vs Branding"], correctAnswerIndex: 0 },
                { questionText: "Tech leadership requires:", options: ["Strategy + empathy", "Photoshop", "Faster typing"], correctAnswerIndex: 0 },
                { questionText: "Engineering Manager role includes:", options: ["Removing blockers", "Drawing UML", "Formatting emails"], correctAnswerIndex: 0 },
                { questionText: "A CTO sets:", options: ["Tech vision", "CSS themes", "Firewall names"], correctAnswerIndex: 0 },
                { questionText: "One key trait of a leader:", options: ["Accountability", "Popularity", "Short emails"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Building and Leading Teams",
            lessons: [
                { title: "Team Composition and Goals", duration: "2h", completed: false },
                { title: "Feedback & Performance", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "SMART goal means:", options: ["Specific, Measurable, etc.", "Speedy, Marketable, etc.", "Snappy, Modular, etc."], correctAnswerIndex: 0 },
                { questionText: "Team mix should include:", options: ["Diverse experience levels", "Same skill levels", "Only seniors"], correctAnswerIndex: 0 },
                { questionText: "Good standups last:", options: ["15 minutes", "1 hour", "Until lunch"], correctAnswerIndex: 0 },
                { questionText: "Feedback should be:", options: ["Timely and private when negative", "Shouted", "Avoided completely"], correctAnswerIndex: 0 },
                { questionText: "Role clarity helps:", options: ["Reduce burnout", "Increase marketing", "Resize code"], correctAnswerIndex: 0 },
                { questionText: "Hiring should prioritize:", options: ["Adaptability", "Font size knowledge", "Beard length"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Technical Decision-Making",
            lessons: [
                { title: "Frameworks for Decision-Making", duration: "2h", completed: false },
                { title: "Communicating Decisions", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Leaders decide between:", options: ["Build vs buy", "Code vs design", "HTML vs CSS"], correctAnswerIndex: 0 },
                { questionText: "Trade-off matrix is used for:", options: ["Comparing choices", "UI themes", "Button spacing"], correctAnswerIndex: 0 },
                { questionText: "Event-driven architecture benefits:", options: ["Loose coupling", "Monolithic builds", "Drag and drop"], correctAnswerIndex: 0 },
                { questionText: "Technical debt means:", options: ["Delayed costs from shortcuts", "Data loss", "Slow fonts"], correctAnswerIndex: 0 },
                { questionText: "TAM stands for:", options: ["Total Addressable Market", "Technical API Method", "Tool Audit Metrics"], correctAnswerIndex: 0 },
                { questionText: "Transparency builds:", options: ["Trust", "UI bounce", "Static routing"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Scaling Teams, Systems, and Culture",
            lessons: [
                { title: "Scaling Teams and Culture", duration: "2h", completed: false },
                { title: "Scaling Systems", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Pods are:", options: ["Cross-functional teams", "Serverless APIs", "Bug tickets"], correctAnswerIndex: 0 },
                { questionText: "Retros help:", options: ["Improve processes", "Boost UI speed", "Resize SVGs"], correctAnswerIndex: 0 },
                { questionText: "Ansible is used for:", options: ["Config automation", "OAuth", "CSS resets"], correctAnswerIndex: 0 },
                { questionText: "Scaling culture requires:", options: ["Repetition + recognition", "Hype + logos", "Fonts + themes"], correctAnswerIndex: 0 },
                { questionText: "Horizontal scaling means:", options: ["Adding more servers", "Changing layouts", "Rotating code"], correctAnswerIndex: 0 },
                { questionText: "Prometheus is a:", options: ["Monitoring tool", "AI platform", "CI/CD plugin"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Communication, Influence & Conflict Resolution",
            lessons: [
                { title: "Leadership Communication", duration: "2h", completed: false },
                { title: "Conflict Resolution and EQ", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Communication should be:", options: ["Clear & empathetic", "Constant & loud", "Hidden in code"], correctAnswerIndex: 0 },
                { questionText: "Influencing others needs:", options: ["Logic + emotion", "Emojis + memes", "Admin powers"], correctAnswerIndex: 0 },
                { questionText: "Conflict resolution is easier when:", options: ["Handled early", "Ignored", "Blamed"], correctAnswerIndex: 0 },
                { questionText: "Leaders need to share:", options: ["The why", "CSS paths", "API logs"], correctAnswerIndex: 0 },
                { questionText: "Tailoring messages means:", options: ["Adjusting per audience", "Speaking faster", "Adding memes"], correctAnswerIndex: 0 },
                { questionText: "EQ is important for:", options: ["Empathy and awareness", "Parsing HTML", "Copying tokens"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Strategic Vision and Stakeholder Alignment",
            lessons: [
                { title: "Vision and Strategy Tools", duration: "2h", completed: false },
                { title: "Stakeholder Alignment and Reporting", duration: "2h", completed: false },
            ],
            quiz: [
                { questionText: "Strategy starts with:", options: ["Vision", "Uptime", "Margins"], correctAnswerIndex: 0 },
                { questionText: "OKRs stand for:", options: ["Objectives & Key Results", "Outcomes & KPIs", "Open Kernel Requests"], correctAnswerIndex: 0 },
                { questionText: "V2MOM helps with:", options: ["Strategic clarity", "Server scaling", "Token mapping"], correctAnswerIndex: 0 },
                { questionText: "Stakeholders include:", options: ["All invested departments", "Just developers", "UX only"], correctAnswerIndex: 0 },
                { questionText: "Roadmaps show:", options: ["Future plans", "API specs", "CSS paths"], correctAnswerIndex: 0 },
                { questionText: "Metrics that matter include:", options: ["ROI, uptime", "Font weights", "Container margins"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: {
        questions: [
            { questionText: "What distinguishes leadership from management?" },
            { questionText: "How do you build and scale a high-performing tech team?" },
            { questionText: "Explain SMART goals with examples." },
            { questionText: "What is a trade-off matrix, and how would you use it?" },
            { questionText: "List and explain 3 architectural decision-making tools." },
            { questionText: "What are the signs of strong technical culture?" },
            { questionText: "How does DevSecOps contribute to tech leadership?" },
            { questionText: "Give 3 examples of scaling patterns in infrastructure." },
            { questionText: "How can you resolve conflict within an engineering team?" },
            { questionText: "Define OKRs and give a tech-related example." },
            { questionText: "What is emotional intelligence and how does it help in leadership?" },
            { questionText: "Describe the ideal structure of a sprint retrospective." },
            { questionText: "How do you align technical goals with executive expectations?" },
            { questionText: "Explain the difference between Red, Blue, and Purple teams." },
            { questionText: "Write a brief memo convincing stakeholders to switch to microservices." },
        ]
    }
};

const allCourses: NewCourse[] = [aiCourse, apiDevelopmentCourse, apisAndBackendCourse, cybersecurityCourse, techLeadershipCourse];

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
                    assessmentSubmissions: true,
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
