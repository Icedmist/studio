
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { z } from 'zod';

const introToProgrammingCourse: NewCourse = {
    title: "Introduction to Programming",
    description: "Learn what programming is, understand core concepts, and write your first lines of code. Perfect for absolute beginners.",
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
                duration: "30m"
            }],
            quiz: [
                { questionText: "Programming is the process of:", options: ["Cooking", "Giving instructions to a computer", "Writing stories"], correctAnswerIndex: 1 },
                { questionText: "Computers understand:", options: ["Body language", "Programming languages", "Random thoughts"], correctAnswerIndex: 1 },
                { questionText: "Programming can be used for:", options: ["Driving a car manually", "Automating tasks", "Making lemonade"], correctAnswerIndex: 1 },
                { questionText: "Who was the first programmer?", options: ["Elon Musk", "Ada Lovelace", "Mark Zuckerberg"], correctAnswerIndex: 1 },
                { questionText: "Which of these is NOT a reason to learn programming?", options: ["To confuse computers", "To solve real-world problems", "To build software"], correctAnswerIndex: 0 },
                { questionText: "Programming is:", options: ["Guesswork", "Magic", "Logic and instructions"], correctAnswerIndex: 2 },
            ]
        },
        {
            title: "Module 2: Basic Programming Concepts",
            lessons: [{
                title: "Variables, Data Types, and Control Structures",
                content: "Variables are like boxes where you store information (e.g., name = \"Tobi\"). Data comes in different types: Strings (text), Integers (whole numbers), Floats (decimals), and Booleans (True/False). Control structures like 'if statements' make decisions, while 'loops' repeat actions. Functions are reusable chunks of code.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "A variable stores:", options: ["A joke", "Data", "A mouse"], correctAnswerIndex: 1 },
                { questionText: "What is a Boolean?", options: ["A string", "A decimal", "True or False"], correctAnswerIndex: 2 },
                { questionText: "Which of these is a control structure?", options: ["Table", "Loop", "Variable"], correctAnswerIndex: 1 },
                { questionText: "What will 'if 5 > 3: print(\"Yes\")' print?", options: ["Yes", "No", "Error"], correctAnswerIndex: 0 },
                { questionText: "Which is the correct way to define a function in Python?", options: ["create function {}", "def greet():", "make greet()"], correctAnswerIndex: 1 },
                { questionText: "What is a float in programming?", options: ["A balloon", "A decimal number", "An error"], correctAnswerIndex: 1 },
            ]
        },
        {
            title: "Module 3: Introduction to Programming Languages",
            lessons: [{
                title: "Python vs. JavaScript and Others",
                content: "You don't need to learn all languages. Python is readable and great for beginners, used in AI and web. JavaScript runs in browsers and makes websites interactive. Other languages like Java, C++, and Swift are used for Android apps, games, and iOS apps respectively. Choose Python to start simple, or JavaScript for web development.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Which language is beginner-friendly?", options: ["Python", "Binary", "Rust"], correctAnswerIndex: 0 },
                { questionText: "JavaScript is used mainly in:", options: ["Microwave ovens", "Web browsers", "Traffic lights"], correctAnswerIndex: 1 },
                { questionText: "Python is known for being:", options: ["Complicated", "Hard to read", "Easy and clean"], correctAnswerIndex: 2 },
                { questionText: "Which language is used in Android apps?", options: ["Java", "Python", "HTML"], correctAnswerIndex: 0 },
                { questionText: "What does 'print(\"Welcome!\")' print?", options: ["Welcome!", "Error", "Nothing"], correctAnswerIndex: 0 },
                { questionText: "What is the best way to learn a programming language?", options: ["Watch only videos", "Practice writing code", "Memorize syntax"], correctAnswerIndex: 1 },
            ]
        },
        {
            title: "Module 4: Exercises and Projects",
            lessons: [{
                title: "Putting Knowledge into Practice",
                content: "Time to get hands-on. Try mini-exercises like printing your name, adding two numbers, or using a loop. Then, build beginner projects like an Age Calculator, a To-Do App, a Number Guessing Game, or a simple login system to solidify your understanding.",
                duration: "1h 30m"
            }],
            quiz: [
                { questionText: "What function prints text in Python?", options: ["show()", "print()", "echo()"], correctAnswerIndex: 1 },
                { questionText: "How do you get user input?", options: ["listen()", "input()", "ask()"], correctAnswerIndex: 1 },
                { questionText: "Which project uses random guessing?", options: ["Age calculator", "Number guessing game", "Login system"], correctAnswerIndex: 1 },
                { questionText: "What does a to-do app need?", options: ["Task list", "Calculator", "Timer"], correctAnswerIndex: 0 },
                { questionText: "Does 'if num % 2 == 0:' check if a number is even?", options: ["Yes", "No"], correctAnswerIndex: 0 },
                { questionText: "What kind of loop prints numbers repeatedly?", options: ["if loop", "for loop", "variable loop"], correctAnswerIndex: 1 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "What is programming?", options: ["The process of giving instructions to a computer.", "The process of designing websites.", "The process of creating hardware."], correctAnswerIndex: 0 },
        { questionText: "Name two reasons we use programming.", options: ["To automate tasks and solve problems.", "To design logos and edit videos.", "To browse the internet and send emails."], correctAnswerIndex: 0 },
        { questionText: "Write a variable that stores your name.", options: ["name = \"Your Name\"", "variable name = \"Your Name\"", "let name = \"Your Name\""], correctAnswerIndex: 0 },
        { questionText: "What is a string?", options: ["A sequence of characters.", "A number.", "A boolean value."], correctAnswerIndex: 0 },
        { questionText: "Name two data types.", options: ["String and Integer.", "Image and Video.", "Button and Link."], correctAnswerIndex: 0 },
        { questionText: "What is a Boolean value?", options: ["True or False.", "A number.", "A piece of text."], correctAnswerIndex: 0 },
        { questionText: "How does a for loop work?", options: ["It iterates over a sequence.", "It makes a single decision.", "It stops the program."], correctAnswerIndex: 0 },
        { questionText: "What is the syntax to define a function in Python?", options: ["def function_name():", "function function_name() {}", "define function_name():"], correctAnswerIndex: 0 },
        { questionText: "What language is best for beginners?", options: ["Python.", "C++.", "Assembly."], correctAnswerIndex: 0 },
        { questionText: "Name two uses of JavaScript.", options: ["Making websites interactive and building web apps.", "Data analysis and machine learning.", "Operating systems and embedded systems."], correctAnswerIndex: 0 },
        { questionText: "Write a Python if-statement that checks if a number is greater than 10.", options: ["if number > 10:", "if (number > 10)", "check if number > 10:"], correctAnswerIndex: 0 },
        { questionText: "Create a simple program that adds two numbers.", options: ["print(5 + 3)", "add(5, 3)", "sum = 5 and 3"], correctAnswerIndex: 0 },
        { questionText: "What does this line do? `input(\"Enter your name: \")`", options: ["Prompts the user for input.", "Prints the user's name.", "Creates a variable."], correctAnswerIndex: 0 },
        { questionText: "Why are control structures important?", options: ["They control the flow of the program.", "They style the program.", "They store data."], correctAnswerIndex: 0 },
        { questionText: "List two simple projects you can build after this course.", options: ["A calculator and a to-do list.", "A social media platform and a search engine.", "An operating system and a database."], correctAnswerIndex: 0 },
    ]
};

const machineLearningBasics: NewCourse = {
    title: "Machine Learning Basics",
    description: "Foundational understanding of machine learning and how to build practical models.",
    longDescription: "This course will help you understand the core concepts of machine learning (ML), differentiate between supervised, unsupervised, and reinforcement learning, know common ML algorithms like linear regression, decision trees, etc., work with data cleaning, feature engineering, and model evaluation, and get hands-on with Python + scikit-learn workflows.",
    category: "AI & Machine Learning",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: What is Machine Learning?",
            lessons: [{
                title: "Definitions and Core Concepts",
                content: "Machine Learning (ML) is a field of **Artificial Intelligence** that allows computers to **learn from data** and make decisions without being explicitly programmed. Instead of writing rules, you feed the machine data and let it **figure out patterns**. The types of machine learning are Supervised, Unsupervised, and Reinforcement Learning.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Machine Learning is part of:", options: ["Artificial Intelligence", "Frontend Dev", "Baking"], correctAnswerIndex: 0 },
                { questionText: "In ML, you give the computer:", options: ["Data", "CSS files", "Cookies"], correctAnswerIndex: 0 },
                { questionText: "Netflix recommendations use:", options: ["ML", "Pure guessing", "Magic"], correctAnswerIndex: 0 },
                { questionText: "Unsupervised learning means:", options: ["No labels", "All labels", "Only cats"], correctAnswerIndex: 0 },
                { questionText: "Reinforcement Learning works by:", options: ["Trial, error, rewards", "Copying code", "Refreshing pages"], correctAnswerIndex: 0 },
                { questionText: "The formula for ML is:", options: ["Data + Algorithm = Model", "HTML + CSS", "Login + Logout"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Data and Features",
            lessons: [{
                title: "Data Cleaning and Preprocessing",
                content: "You can't have ML without data. But raw data is usually messy, inconsistent, or full of missing values. That's why **cleaning** and **preprocessing** is key. This involves Feature Engineering, Normalization, and One-hot encoding using tools like Pandas and NumPy.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Features are:", options: ["Inputs", "Passwords", "Wi-Fi codes"], correctAnswerIndex: 0 },
                { questionText: "Labels are:", options: ["Outputs", "Inputs", "Names"], correctAnswerIndex: 0 },
                { questionText: "Normalization is for:", options: ["Scaling values", "Adding emojis", "Plotting graphs"], correctAnswerIndex: 0 },
                { questionText: "One-hot encoding is used for:", options: ["Categorical data", "Heatmaps", "CSS gradients"], correctAnswerIndex: 0 },
                { questionText: "Pandas is:", options: ["A data tool", "A bear", "A laptop brand"], correctAnswerIndex: 0 },
                { questionText: "What’s missing data filled with in `fillna()`?", options: ["A default value", "HTML tags", "GIFs"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Supervised Learning (Regression + Classification)",
            lessons: [{
                title: "Predicting Numbers and Categories",
                content: "In Supervised Learning, you give the model input AND output so it learns how to map inputs to outputs. There are two main types: Regression (predicts a number like a house price) and Classification (predicts a category like 'spam' vs 'not spam'). Common algorithms include Linear Regression, Decision Trees, and Random Forests.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Supervised learning means:", options: ["Input + known output", "No output", "Unmonitored data"], correctAnswerIndex: 0 },
                { questionText: "Regression predicts:", options: ["Numbers", "Email addresses", "Emoji count"], correctAnswerIndex: 0 },
                { questionText: "Classification predicts:", options: ["Categories", "Vectors", "Syntax"], correctAnswerIndex: 0 },
                { questionText: "Linear regression is used for:", options: ["Predicting values", "Drawing lines", "Compiling CSS"], correctAnswerIndex: 0 },
                { questionText: "KNN stands for:", options: ["K Nearest Neighbors", "Keyboard Notation Number", "Known Net Node"], correctAnswerIndex: 0 },
                { questionText: "`model.fit()` is used to:", options: ["Train model", "Format disk", "Zip folder"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Unsupervised Learning",
            lessons: [{
                title: "Finding Hidden Patterns",
                content: "In Unsupervised Learning, you only give the model input—it **finds patterns** on its own. This is useful for market segmentation, user clustering, and anomaly detection. Common algorithms include K-Means Clustering and Principal Component Analysis (PCA).",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Unsupervised learning means:", options: ["Only input", "Input + output", "Label only"], correctAnswerIndex: 0 },
                { questionText: "K-means is used for:", options: ["Clustering", "Predicting", "Styling text"], correctAnswerIndex: 0 },
                { questionText: "PCA is:", options: ["Dimensionality reduction", "Anime", "CSS property"], correctAnswerIndex: 0 },
                { questionText: "Hierarchical clustering builds:", options: ["Cluster trees", "Style trees", "Passwords"], correctAnswerIndex: 0 },
                { questionText: "Clustering helps with:", options: ["Grouping similar items", "Changing fonts", "Input validation"], correctAnswerIndex: 0 },
                { questionText: "What does `.fit()` do in KMeans?", options: ["Trains model", "Sets color", "Fades opacity"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Model Evaluation & Metrics",
            lessons: [{
                title: "How Good Is Your Model?",
                content: "Training a model is only step one. You need to check **how good it is**. For classification problems, you use metrics like Accuracy, Precision, Recall, and the F1 Score. For regression problems, you use metrics like Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Accuracy is:", options: ["% of correct predictions", "Login time", "Line color"], correctAnswerIndex: 0 },
                { questionText: "MAE stands for:", options: ["Mean Absolute Error", "Metric Adjustment Endpoint", "Max Auto Encode"], correctAnswerIndex: 0 },
                { questionText: "Confusion Matrix shows:", options: ["Prediction vs reality", "User confusion", "JSON"], correctAnswerIndex: 0 },
                { questionText: "Precision means:", options: ["Correct positives out of all predicted positives", "RAM size", "Clicks per minute"], correctAnswerIndex: 0 },
                { questionText: "F1 Score balances:", options: ["Precision & Recall", "X & Y axis", "Lights and shadows"], correctAnswerIndex: 0 },
                { questionText: "R² shows:", options: ["How well the model fits data", "Road traffic", "CSS compatibility"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Tools, Libraries & ML Workflow",
            lessons: [{
                title: "Putting It All Together",
                content: "The typical ML workflow involves collecting data, cleaning it, splitting it for training and testing, training a model, evaluating it, and then improving it. Common tools for this are Jupyter Notebooks, scikit-learn for classical ML, and TensorFlow/Keras for deep learning.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Jupyter Notebooks allow:", options: ["Code + notes", "Zoom calls", "PDF creation"], correctAnswerIndex: 0 },
                { questionText: "Scikit-learn is used for:", options: ["ML models", "CSS debugging", "Game dev"], correctAnswerIndex: 0 },
                { questionText: "Colab lets you:", options: ["Run notebooks in cloud", "Animate CSS", "Bake cookies"], correctAnswerIndex: 0 },
                { questionText: "The ML workflow starts with:", options: ["Collecting data", "Making graphs", "Deploying"], correctAnswerIndex: 0 },
                { questionText: "`train_test_split` does what?", options: ["Splits data", "Plays music", "Resizes font"], correctAnswerIndex: 0 },
                { questionText: "Random Forest is a:", options: ["Classifier algorithm", "Forest image", "Jungle script"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "What is machine learning?", options: ["A field of AI where computers learn from data.", "A type of hardware.", "A programming language."], correctAnswerIndex: 0 },
        { questionText: "Describe the difference between supervised and unsupervised learning.", options: ["Supervised uses labeled data, unsupervised does not.", "Supervised is for images, unsupervised for text.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "Give two real-life examples of ML in action.", options: ["Spam detection and movie recommendations.", "Word processing and printing.", "Web browsing and file downloads."], correctAnswerIndex: 0 },
        { questionText: "What is feature engineering?", options: ["Creating new input variables from existing ones.", "Designing the UI of an application.", "A type of database."], correctAnswerIndex: 0 },
        { questionText: "Why is normalization important?", options: ["It scales data to a similar range.", "It makes data more colorful.", "It deletes unnecessary data."], correctAnswerIndex: 0 },
        { questionText: "Explain regression vs classification.", options: ["Regression predicts a number, classification predicts a category.", "Regression is for images, classification is for text.", "They are the same thing."], correctAnswerIndex: 0 },
        { questionText: "What does `fit()` do in a model?", options: ["Trains the model on the data.", "Makes a prediction.", "Evaluates the model."], correctAnswerIndex: 0 },
        { questionText: "How does KNN work?", options: ["It classifies data based on its nearest neighbors.", "It draws a line through the data.", "It clusters data into groups."], correctAnswerIndex: 0 },
        { questionText: "What is K-means clustering used for?", options: ["Grouping similar data points together.", "Predicting a continuous value.", "Classifying data into predefined categories."], correctAnswerIndex: 0 },
        { questionText: "Explain the purpose of a confusion matrix.", options: ["It evaluates the performance of a classification model.", "It shows the relationships between variables.", "It plots data on a graph."], correctAnswerIndex: 0 },
        { questionText: "What does a high F1 Score mean?", options: ["The model has a good balance of precision and recall.", "The model is very accurate.", "The model is very fast."], correctAnswerIndex: 0 },
        { questionText: "What metric is best for regression models?", options: ["Mean Squared Error (MSE).", "Accuracy.", "F1 Score."], correctAnswerIndex: 0 },
        { questionText: "How does scikit-learn help with ML?", options: ["It provides tools for data analysis and modeling.", "It is a code editor.", "It is a database."], correctAnswerIndex: 0 },
        { questionText: "What are the steps in an ML workflow?", options: ["Data collection, preprocessing, training, evaluation.", "Design, coding, testing, deployment.", "Planning, execution, monitoring."], correctAnswerIndex: 0 },
        { questionText: "Name one library for deep learning and one for classical ML.", options: ["TensorFlow (deep learning), scikit-learn (classical).", "React (deep learning), Angular (classical).", "Pandas (deep learning), NumPy (classical)."], correctAnswerIndex: 0 },
    ]
};

const devOpsPracticesCourse: NewCourse = {
    title: "DevOps Practices",
    description: "Automate software development pipelines, use tools like GitHub Actions, Docker, Jenkins, and Kubernetes, and deploy software faster, safer, and smarter.",
    longDescription: "This course will help you understand what DevOps is and why it matters, automate software development pipelines, use tools like GitHub Actions, Docker, Jenkins, and Kubernetes, deploy software faster, safer, and smarter, and monitor and maintain live systems like a pro.",
    category: "Tech Skills",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Introduction to DevOps",
            lessons: [{
                title: "What is DevOps?",
                content: "DevOps = Development + Operations. It’s a culture, process, and toolset that bridges developers and system administrators to deliver software faster, maintain high reliability, and automate repetitive tasks. Core principles are Automation, CI/CD, Monitoring, and Collaboration.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "DevOps combines:", options: ["Dev & Ops", "Design & Printing", "Debug & Export"], correctAnswerIndex: 0 },
                { questionText: "CI/CD stands for:", options: ["Continuous Integration / Continuous Deployment", "Custom Imports / Clean Directories", "Chrome Inspect / CSS Debug"], correctAnswerIndex: 0 },
                { questionText: "What’s a major benefit of DevOps?", options: ["Faster releases", "Bigger logos", "Manual backups"], correctAnswerIndex: 0 },
                { questionText: "DevOps tools include:", options: ["Docker, Jenkins", "Photoshop, InDesign", "Zoom, Skype"], correctAnswerIndex: 0 },
                { questionText: "Automation reduces:", options: ["Human error", "API usage", "CSS classes"], correctAnswerIndex: 0 },
                { questionText: "Monitoring helps you:", options: ["Track app health", "Build landing pages", "Animate logos"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 2: CI/CD Pipelines (Continuous Integration & Delivery)",
            lessons: [{
                title: "CI/CD Pipelines",
                content: "Continuous Integration (CI) automatically tests and merges code when changes are pushed to version control. Continuous Deployment/Delivery (CD) automatically deploys your tested app to production or staging environments. This leads to faster shipping and earlier bug detection.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "CI stands for:", options: ["Continuous Integration", "Coding Interface", "Code Import"], correctAnswerIndex: 0 },
                { questionText: "CD helps with:", options: ["Automatic deployment", "Photoshop exports", "CSS generation"], correctAnswerIndex: 0 },
                { questionText: "GitHub Actions is:", options: ["A CI/CD tool", "A social network", "Game engine"], correctAnswerIndex: 0 },
                { questionText: "What happens in a CI pipeline?", options: ["Code is built and tested", "CSS is colored", "Users are logged out"], correctAnswerIndex: 0 },
                { questionText: "Benefits of CI/CD include:", options: ["Faster release cycles", "Slower testing", "More bugs"], correctAnswerIndex: 0 },
                { questionText: "A YAML file in CI/CD defines:", options: ["The workflow", "Database tables", "UI layout"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 3: Containers and Docker",
            lessons: [{
                title: "Containers and Docker",
                content: "Docker packages your app with everything it needs (code, dependencies, environment) into portable and consistent 'containers'. This ensures your application works the same way everywhere, from your local machine to production servers. A Dockerfile defines the steps to build your container image.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Docker creates:", options: ["Containers", "ZIP files", "CSS animations"], correctAnswerIndex: 0 },
                { questionText: "What’s inside a container?", options: ["Code + environment", "Fonts", "Bootstrap themes"], correctAnswerIndex: 0 },
                { questionText: "`docker build` does what?", options: ["Builds an image", "Creates React app", "Logs in users"], correctAnswerIndex: 0 },
                { questionText: "Docker improves:", options: ["Portability", "Image filters", "CSS margins"], correctAnswerIndex: 0 },
                { questionText: "What does CMD do in Dockerfile?", options: ["Specifies default command", "Closes the container", "Binds ports"], correctAnswerIndex: 0 },
                { questionText: "Benefit of containers?", options: ["Consistent environments", "Faster typing", "Less debugging"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 4: Infrastructure as Code (IaC)",
            lessons: [{
                title: "Infrastructure as Code",
                content: "Infrastructure as Code (IaC) means automating infrastructure setup using code, not manual clicks. With tools like Terraform, you can define servers, databases, and load balancers in a file, making your infrastructure reproducible, version-controlled, and scalable.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "IaC stands for:", options: ["Infrastructure as Code", "Interface as Clipboard", "Integration after Commit"], correctAnswerIndex: 0 },
                { questionText: "Terraform is used to:", options: ["Automate infrastructure", "Animate graphics", "Upload videos"], correctAnswerIndex: 0 },
                { questionText: "IaC improves:", options: ["Reproducibility", "Copy-paste", "Image compression"], correctAnswerIndex: 0 },
                { questionText: "`.tf` files are used in:", options: ["Terraform", "TypeForm", "Twitter"], correctAnswerIndex: 0 },
                { questionText: "Which is NOT an IaC tool?", options: ["Illustrator", "Terraform", "Ansible"], correctAnswerIndex: 0 },
                { questionText: "Ansible does:", options: ["Configuration management", "CSS styling", "API routing"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 5: Monitoring & Logging",
            lessons: [{
                title: "Monitoring & Logging",
                content: "Monitoring shows how your app behaves in production: Is it up? Is it fast? Are there errors? Tools like Prometheus and Grafana help visualize metrics (CPU, memory, traffic), while logging stacks like ELK help debug issues by analyzing log data.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Monitoring checks for:", options: ["Uptime and health", "CSS padding", "API styles"], correctAnswerIndex: 0 },
                { questionText: "Grafana does what?", options: ["Visualize metrics", "Compress images", "Animate buttons"], correctAnswerIndex: 0 },
                { questionText: "Prometheus is used for:", options: ["Metrics collection", "HTML parsing", "Testing routes"], correctAnswerIndex: 0 },
                { questionText: "ELK stack includes:", options: ["Elasticsearch, Logstash, Kibana", "Emails, Links, Keywords", "Emmet, Lint, Karma"], correctAnswerIndex: 0 },
                { questionText: "PagerDuty alerts when:", options: ["Something breaks", "It's lunchtime", "Font fails"], correctAnswerIndex: 0 },
                { questionText: "Why monitor logs?", options: ["Debug issues", "Resize images", "Animate dashboards"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 6: DevOps Culture & Collaboration",
            lessons: [{
                title: "DevOps Culture & Collaboration",
                content: "DevOps is more than tools; it's about shared responsibility, breaking down silos between teams, and continuous improvement. Practices like pair programming, shared dashboards, and blameless postmortems foster a collaborative environment where teams can ship software effectively.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "DevOps culture values:", options: ["Collaboration", "Solo work", "Siloed teams"], correctAnswerIndex: 0 },
                { questionText: "MTTR stands for:", options: ["Mean Time to Recovery", "Most Time to Render", "Main Thread To Release"], correctAnswerIndex: 0 },
                { questionText: "KPIs help you:", options: ["Measure performance", "Draw logos", "Color dashboards"], correctAnswerIndex: 0 },
                { questionText: "Blameless postmortems do what?", options: ["Improve trust after failure", "Blame interns", "Track spending"], correctAnswerIndex: 0 },
                { questionText: "DORA metrics are about:", options: ["DevOps performance", "CSS debugging", "UI animations"], correctAnswerIndex: 0 },
                { questionText: "Clear documentation ensures:", options: ["Smooth handoffs", "Colorful screens", "Faster copying"], correctAnswerIndex: 0 }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "What does DevOps aim to solve?", options: ["The gap between development and operations teams.", "Frontend design issues.", "Database connection problems."], correctAnswerIndex: 0 },
        { questionText: "List 3 popular DevOps tools and their functions.", options: ["Docker (containers), Jenkins (CI/CD), Terraform (IaC).", "Photoshop (design), Figma (prototyping), Slack (communication).", "VS Code (editor), Git (version control), Chrome (browser)."], correctAnswerIndex: 0 },
        { questionText: "What is CI/CD and why is it important?", options: ["Automating the build, test, and deployment process; it increases speed and reduces errors.", "A new programming language.", "A design methodology."], correctAnswerIndex: 0 },
        { questionText: "Write a simple GitHub Actions CI workflow.", options: ["A YAML file with 'on: push' and jobs for build/test.", "A JavaScript file that runs tests.", "A shell script that deploys code."], correctAnswerIndex: 0 },
        { questionText: "What is a Docker container?", options: ["A lightweight, portable package of an application and its dependencies.", "A type of virtual machine.", "A file format for images."], correctAnswerIndex: 0 },
        { questionText: "How does Docker differ from traditional deployment?", options: ["It provides consistent environments, avoiding 'it works on my machine' issues.", "It is much slower.", "It only works for frontend applications."], correctAnswerIndex: 0 },
        { questionText: "List 3 Docker commands and their purposes.", options: ["`docker build` (creates an image), `docker run` (starts a container), `docker ps` (lists containers).", "`docker start`, `docker stop`, `docker delete`.", "`docker push`, `docker pull`, `docker commit`."], correctAnswerIndex: 0 },
        { questionText: "What is IaC?", options: ["Managing infrastructure with code.", "A new type of cloud service.", "A frontend framework."], correctAnswerIndex: 0 },
        { questionText: "What are the benefits of using Terraform?", options: ["It allows you to manage infrastructure across multiple clouds with a single language.", "It is a design tool.", "It is a database."], correctAnswerIndex: 0 },
        { questionText: "Name 2 monitoring tools and their roles.", options: ["Prometheus (metrics collection), Grafana (visualization).", "Slack (communication), Trello (project management).", "Git (version control), GitHub (hosting)."], correctAnswerIndex: 0 },
        { questionText: "How does logging help in debugging?", options: ["It provides a record of events that can be used to trace errors.", "It prevents errors from happening.", "It automatically fixes errors."], correctAnswerIndex: 0 },
        { questionText: "What is a blameless postmortem and why is it useful?", options: ["A process to analyze failures without assigning blame, to encourage learning.", "A meeting to decide who to fire.", "A way to ignore problems."], correctAnswerIndex: 0 },
        { questionText: "Explain MTTR and its significance.", options: ["Mean Time to Recovery; a measure of how quickly a system can recover from failure.", "A metric for marketing.", "A measure of code quality."], correctAnswerIndex: 0 },
        { questionText: "How does DevOps culture differ from traditional IT?", options: ["It emphasizes collaboration, shared responsibility, and automation.", "It is more hierarchical.", "It focuses on manual processes."], correctAnswerIndex: 0 },
        { questionText: "Create a deployment plan for a Node.js app using Docker and GitHub Actions.", options: ["Dockerfile to containerize the app, GitHub Actions to build/push image and deploy.", "Manually copy files to a server.", "Use an FTP client to upload the code."], correctAnswerIndex: 0 },
    ]
};

const advancedProgrammingCourse: NewCourse = {
    title: "Advanced Programming",
    description: "Understand advanced programming concepts beyond syntax, improve problem-solving skills, and learn to think like a software engineer.",
    longDescription: "This course will help you understand advanced programming concepts beyond syntax, improve your problem-solving skills with real-world examples, dive into Object-Oriented Programming, recursion, data structures, and algorithms, learn modular design, file handling, and error management, and think like a software engineer, not just a coder.",
    category: "Tech Skills",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Object-Oriented Programming (OOP)",
            lessons: [{
                title: "What is OOP?",
                content: "OOP is a programming paradigm based on the concept of **“objects”**—data bundled with methods that operate on that data. Key concepts include Classes, Objects, Encapsulation, Inheritance, Polymorphism, and Abstraction. It makes code reusable and reflects real-world structures.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What is a class in OOP?", options: ["A blueprint for objects", "A variable", "A Python file"], correctAnswerIndex: 0 },
                { questionText: "What does encapsulation protect?", options: ["Internal data", "The screen", "Network ports"], correctAnswerIndex: 0 },
                { questionText: "Inheritance lets a class:", options: ["Reuse another class’s code", "Copy-paste functions", "Delete methods"], correctAnswerIndex: 0 },
                { questionText: "What is polymorphism?", options: ["Same method name, different behavior", "Duplicating code", "String conversion"], correctAnswerIndex: 0 },
                { questionText: "Abstraction hides:", options: ["Unneeded details", "HTML tags", "Source code"], correctAnswerIndex: 0 },
                { questionText: "An object is:", options: ["An instance of a class", "A folder", "A loop"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Data Structures and Algorithms",
            lessons: [{
                title: "What Are Data Structures?",
                content: "Data structures organize and store data efficiently. Examples include Lists, Stacks (LIFO), Queues (FIFO), Linked Lists, Trees, and Hash Maps. Algorithms are step-by-step instructions to solve problems, such as Binary Search or various sorting algorithms like Bubble Sort.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "A stack follows:", options: ["Last in, first out", "First in, first out", "Sorted order"], correctAnswerIndex: 0 },
                { questionText: "A queue is:", options: ["FIFO", "Random access", "Reverse list"], correctAnswerIndex: 0 },
                { questionText: "What is a hash map?", options: ["Key-value store", "Tree", "While loop"], correctAnswerIndex: 0 },
                { questionText: "Binary search works on:", options: ["Sorted arrays", "Random data", "Text files"], correctAnswerIndex: 0 },
                { questionText: "Linked lists store:", options: ["Nodes linked to each other", "Images", "Indexes only"], correctAnswerIndex: 0 },
                { questionText: "Which algorithm finds shortest path?", options: ["Dijkstra", "Bubble sort", "Recursion"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: File Handling and Modular Design",
            lessons: [{
                title: "File Handling",
                content: "File handling allows your program to **read/write from external files** like `.txt`, `.json`, or `.csv`. Modular design involves breaking large programs into smaller, independent modules, which makes code easier to maintain, cleaner, and more reusable.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What does `with open()` do?", options: ["Opens and safely closes a file", "Creates a database", "Launches a GUI"], correctAnswerIndex: 0 },
                { questionText: "Modular code is:", options: ["Divided into reusable chunks", "One giant file", "Made with CSS"], correctAnswerIndex: 0 },
                { questionText: ".json files are used for:", options: ["Structured data", "Images", "Audio"], correctAnswerIndex: 0 },
                { questionText: "Benefit of modular design:", options: ["Easier to maintain", "Slower apps", "Copy-paste heaven"], correctAnswerIndex: 0 },
                { questionText: "Importing modules promotes:", options: ["Code reuse", "Spaghetti code", "Crashes"], correctAnswerIndex: 0 },
                { questionText: "File modes include:", options: ["“r”, “w”, “a”", "“get”, “put”, “grab”", "“ftp”"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Error Handling and Debugging",
            lessons: [{
                title: "Why Handle Errors?",
                content: "Error handling prevents your program from crashing. Using `try-except` blocks allows you to catch potential errors, like a `ValueError` when a user inputs text instead of a number. It's best practice to log errors, specify the exceptions you're catching, and use debugging tools like `pdb` or IDE debuggers.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What is the purpose of `try-except`?", options: ["Catch errors", "Format strings", "Sort lists"], correctAnswerIndex: 0 },
                { questionText: "`ValueError` happens when:", options: ["Invalid input type", "File missing", "No internet"], correctAnswerIndex: 0 },
                { questionText: "Which module helps with logging?", options: ["logging", "math", "random"], correctAnswerIndex: 0 },
                { questionText: "`pdb` is used for:", options: ["Debugging", "Web scraping", "Painting"], correctAnswerIndex: 0 },
                { questionText: "You should avoid:", options: ["Empty except blocks", "Try-except", "Handling errors"], correctAnswerIndex: 0 },
                { questionText: "A `finally` block runs:", options: ["Always", "Only on success", "Only on failure"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Writing Clean, Maintainable Code",
            lessons: [{
                title: "Clean Code Rules",
                content: "Clean code involves naming variables clearly, avoiding long functions, and following the DRY (Don’t Repeat Yourself) principle. Following a style guide like Python's PEP 8—which enforces rules for indentation, line length, and naming conventions—makes your code more readable and maintainable.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What is DRY?", options: ["Don’t Repeat Yourself", "Debug Recent YAML", "Define Real Yields"], correctAnswerIndex: 0 },
                { questionText: "Variable names should be:", options: ["Descriptive", "Short like x1", "Emojis"], correctAnswerIndex: 0 },
                { questionText: "A docstring is:", options: ["A function description", "A secret code", "An error"], correctAnswerIndex: 0 },
                { questionText: "PEP 8 recommends:", options: ["4-space indent", "Tabs only", "No comments"], correctAnswerIndex: 0 },
                { questionText: "One sign of bad code:", options: ["Long, duplicate functions", "Clear comments", "Modular design"], correctAnswerIndex: 0 },
                { questionText: "`# do stuff` is:", options: ["A bad comment", "Helpful", "Syntax error"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Explain the 4 pillars of OOP.", options: ["Encapsulation, Inheritance, Polymorphism, Abstraction.", "Variables, Functions, Loops, Conditionals.", "HTML, CSS, JavaScript, Python."], correctAnswerIndex: 0 },
        { questionText: "What is the difference between a class and an object?", options: ["A class is a blueprint, an object is an instance of a class.", "A class is a function, an object is a variable.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What is polymorphism in real-world programming?", options: ["When different objects respond to the same message in different ways.", "When a function calls itself.", "When data is hidden within a class."], correctAnswerIndex: 0 },
        { questionText: "Compare stacks and queues.", options: ["Stacks are LIFO, queues are FIFO.", "Stacks are for numbers, queues are for strings.", "Stacks are fast, queues are slow."], correctAnswerIndex: 0 },
        { questionText: "What is a hash map and when would you use one?", options: ["A key-value store, used for fast lookups.", "A sorted list, used for searching.", "A tree structure, used for hierarchical data."], correctAnswerIndex: 0 },
        { questionText: "Write Python code to open and read a file named “log.txt”.", options: ["with open('log.txt', 'r') as f: print(f.read())", "open('log.txt').read()", "read file 'log.txt'"], correctAnswerIndex: 0 },
        { questionText: "What is modular design and why is it important?", options: ["Breaking code into smaller, reusable modules; it improves maintainability.", "Writing all code in a single file.", "Using a specific design pattern."], correctAnswerIndex: 0 },
        { questionText: "Explain the difference between `try`, `except`, and `finally`.", options: ["`try` contains code that might error, `except` handles the error, `finally` always runs.", "`try` is for testing, `except` is for production, `finally` is for cleanup.", "They are all the same."], correctAnswerIndex: 0 },
        { questionText: "List 3 common exceptions in Python.", options: ["`ValueError`, `TypeError`, `FileNotFoundError`.", "`SyntaxError`, `IndentationError`, `NameError`.", "`HTTPError`, `ConnectionError`, `Timeout`."], correctAnswerIndex: 0 },
        { questionText: "Why should you avoid empty `except:` blocks?", options: ["They can hide errors and make debugging difficult.", "They are slow.", "They are not supported in Python 3."], correctAnswerIndex: 0 },
        { questionText: "What’s the use of the `logging` module?", options: ["To record events and errors for debugging.", "To print output to the console.", "To create log files for users."], correctAnswerIndex: 0 },
        { questionText: "List 3 best practices from PEP 8.", options: ["Use 4 spaces for indentation, limit lines to 79 characters, use descriptive variable names.", "Use tabs for indentation, write long lines of code, use short variable names.", "There are no best practices in PEP 8."], correctAnswerIndex: 0 },
        { questionText: "Explain the DRY principle with an example.", options: ["Don't Repeat Yourself; e.g., use a function instead of copy-pasting code.", "A principle for writing dry, boring code.", "A principle for writing code that is hard to understand."], correctAnswerIndex: 0 },
        { questionText: "How do clean code practices help in teamwork?", options: ["They make code easier for others to read and understand.", "They make code harder to read.", "They are not important for teamwork."], correctAnswerIndex: 0 },
        { questionText: "Write a Python function that returns the factorial of a number using recursion.", options: ["def factorial(n): if n == 0: return 1 else: return n * factorial(n-1)", "def factorial(n): return n * (n-1)", "def factorial(n): pass"], correctAnswerIndex: 0 },
    ]
};

const apisAndBackend: NewCourse = {
    title: "APIs and Backend Development",
    description: "Real-world API development and backend system building.",
    longDescription: "By the end of this course, you’ll be able to: Understand what APIs are and how they work, Build RESTful APIs using Node.js and Express, Understand and use GraphQL APIs, Secure your APIs with tokens and rate limiting, Connect APIs to databases, Test, deploy, and monitor backend systems.",
    category: "Tech Skills",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Understanding APIs",
            lessons: [{
                title: "What is an API?",
                content: "API stands for Application Programming Interface. It's like a waiter in a restaurant that takes your request to the kitchen (server) and brings the response (data) back. APIs let different software applications talk to each other. Common types include REST, GraphQL, and WebSockets.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "API stands for:", options: ["Application Programming Interface", "Advanced Program Info", "Applied Python Integration"], correctAnswerIndex: 0 },
                { questionText: "REST uses which format?", options: ["JSON", "MP3", "ZIP"], correctAnswerIndex: 0 },
                { questionText: "`POST` is used to:", options: ["Create data", "Delete data", "Format buttons"], correctAnswerIndex: 0 },
                { questionText: "WebSockets are good for:", options: ["Real-time communication", "Animation", "Static websites"], correctAnswerIndex: 0 },
                { questionText: "A waiter analogy is used for:", options: ["APIs", "Routers", "Modems"], correctAnswerIndex: 0 },
                { questionText: "GraphQL lets you:", options: ["Query exactly what you need", "Style HTML", "Format PDFs"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 2: Building REST APIs with Node.js & Express",
            lessons: [{
                title: "Setting Up a Simple API",
                content: "To build a REST API, you can use Node.js with the Express.js framework. After setting up a project with `npm`, you define routes for different HTTP methods like GET, POST, PUT, and DELETE to handle creating, reading, updating, and deleting resources.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Securing APIs with JWT",
                content: "Unsecured APIs are vulnerable. Common security methods include API Keys, Bearer Tokens (like JWT - JSON Web Tokens), and OAuth2 for third-party logins. JWTs are often sent in the `Authorization` header and can be verified by the server to protect endpoints.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "JWT stands for:", options: ["JSON Web Token", "Java Web Tool", "Just Want Tokens"], correctAnswerIndex: 0 },
                { questionText: "An API key is:", options: ["Basic auth method", "CSS class", "Database name"], correctAnswerIndex: 0 },
                { questionText: "`Bearer <token>` is used in:", options: ["Authorization header", "Image tag", "DNS lookup"], correctAnswerIndex: 0 },
                { questionText: "OAuth2 allows:", options: ["Third-party login", "Styling pages", "UI testing"], correctAnswerIndex: 0 },
                { questionText: "Rate limiting prevents:", options: ["API abuse", "JSON compression", "Route duplication"], correctAnswerIndex: 0 },
                { questionText: "`jsonwebtoken` is used to:", options: ["Generate/verify tokens", "Run tests", "Connect databases"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 4: Connecting APIs to Databases",
            lessons: [{
                title: "Integrating MongoDB with Mongoose",
                content: "APIs often act as a middleman between the frontend and a database. For a Node.js application, you can use a library like Mongoose to connect to a MongoDB database, define data models (schemas), and perform operations like creating, reading, updating, and deleting documents.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Mongoose is used for:", options: ["MongoDB in Node.js", "Security testing", "UI animation"], correctAnswerIndex: 0 },
                { questionText: "`User.find()` is used to:", options: ["Fetch users", "Generate tokens", "Render HTML"], correctAnswerIndex: 0 },
                { questionText: "`mongoose.connect()` connects:", options: ["Node to DB", "API to frontend", "Two routers"], correctAnswerIndex: 0 },
                { questionText: "POST + DB insert means:", options: ["Add data via API", "Delete everything", "Encrypt app"], correctAnswerIndex: 0 },
                { questionText: "`req.body` contains:", options: ["Sent JSON data", "Environment config", "HTML tags"], correctAnswerIndex: 0 },
                { questionText: "MongoDB stores documents in:", options: ["Collections", "Tables", "Spreadsheets"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 5: GraphQL APIs",
            lessons: [{
                title: "Introduction to GraphQL",
                content: "GraphQL is a query language for APIs that allows clients to request exactly the data they need, preventing over-fetching. Unlike REST which uses multiple endpoints, GraphQL typically uses a single endpoint. You define your data schema with `typeDefs` and handle data fetching with `resolvers`.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "GraphQL is a:", options: ["Query language", "Style guide", "Route config"], correctAnswerIndex: 0 },
                { questionText: "GraphQL queries return:", options: ["Only requested fields", "All HTML", "SQL joins"], correctAnswerIndex: 0 },
                { questionText: "Apollo Server helps:", options: ["Build GraphQL APIs", "Style buttons", "Upload files"], correctAnswerIndex: 0 },
                { questionText: "`typeDefs` define:", options: ["Schema types", "SQL tables", "API routes"], correctAnswerIndex: 0 },
                { questionText: "REST vs GraphQL key difference:", options: ["Number of endpoints", "Color of JSON", "Token format"], correctAnswerIndex: 0 },
                { questionText: "GraphQL avoids:", options: ["Overfetching", "Encryption", "Styling"], correctAnswerIndex: 0 }
            ]
        },
        {
            title: "Module 6: Testing & Deploying Your Backend",
            lessons: [{
                title: "Automated API Testing with Jest",
                content: "APIs should be tested before deployment. Manual testing can be done with tools like Postman, while automated testing can be set up with frameworks like Jest and Supertest. For deployment, you can use platforms like Render or Vercel, connect to a cloud database like MongoDB Atlas, and add your secret keys as environment variables.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Postman is used to:", options: ["Test APIs", "Draw UIs", "Generate CSS"], correctAnswerIndex: 0 },
                { questionText: "Render is a:", options: ["Deployment platform", "Design tool", "SQL generator"], correctAnswerIndex: 0 },
                { questionText: "`Jest` is for:", options: ["Unit testing", "Authorization", "Routing"], correctAnswerIndex: 0 },
                { questionText: "MongoDB Atlas is:", options: ["Cloud DB", "PDF viewer", "API builder"], correctAnswerIndex: 0 },
                { questionText: "`.env` files store:", options: ["Secrets and variables", "CSS", "Font styles"], correctAnswerIndex: 0 },
                { questionText: "`supertest` is used for:", options: ["API testing", "GraphQL hosting", "HTML debugging"], correctAnswerIndex: 0 }
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Define API and give an analogy.", options: ["An interface that allows software to communicate; like a waiter.", "A type of database.", "A frontend framework."], correctAnswerIndex: 0 },
        { questionText: "What are the 4 core HTTP methods in REST?", options: ["GET, POST, PUT, DELETE.", "CREATE, READ, UPDATE, DESTROY.", "FETCH, SEND, MODIFY, REMOVE."], correctAnswerIndex: 0 },
        { questionText: "Write a simple GET route in Express.js.", options: ["app.get('/path', (req, res) => res.send('Hello'))", "get('/path', () => 'Hello')", "route.get('/path').action('Hello')"], correctAnswerIndex: 0 },
        { questionText: "What is JWT used for?", options: ["Securely transmitting information as a JSON object for authentication.", "A database for tokens.", "A frontend library for animations."], correctAnswerIndex: 0 },
        { questionText: "Show an example of a POST request with JSON.", options: ["`fetch('/api', { method: 'POST', body: JSON.stringify(data) })`", "`POST /api { data }`", "`axios.post('/api', { data })`"], correctAnswerIndex: 0 },
        { questionText: "What’s the difference between REST and GraphQL?", options: ["REST uses multiple endpoints, GraphQL uses one and allows flexible queries.", "REST is for frontend, GraphQL for backend.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "How does rate limiting help protect APIs?", options: ["It prevents abuse by limiting the number of requests a user can make.", "It encrypts API requests.", "It validates user input."], correctAnswerIndex: 0 },
        { questionText: "What is `mongoose.connect()` used for?", options: ["Connecting a Node.js application to a MongoDB database.", "Creating a new database.", "Defining a database schema."], correctAnswerIndex: 0 },
        { questionText: "Name two authentication strategies.", options: ["API Keys and JWT.", "Username/Password and Email Verification.", "SSL Certificates and Firewalls."], correctAnswerIndex: 0 },
        { questionText: "What are resolvers in GraphQL?", options: ["Functions that fetch the data for a specific field in a query.", "The schema definition.", "A tool for testing GraphQL queries."], correctAnswerIndex: 0 },
        { questionText: "Describe the role of Postman.", options: ["A tool for testing APIs.", "A code editor for backend development.", "A deployment platform."], correctAnswerIndex: 0 },
        { questionText: "How do you deploy an API to Render?", options: ["Push code to GitHub, connect repo to Render, and set environment variables.", "Manually upload files via FTP.", "Use a desktop application to deploy."], correctAnswerIndex: 0 },
        { questionText: "Explain the purpose of environment variables.", options: ["To store configuration and secrets outside of the code.", "To define variables for frontend use.", "To store user data."], correctAnswerIndex: 0 },
        { questionText: "What is the use of `express.json()`?", options: ["It is a middleware to parse incoming JSON requests.", "It converts JavaScript objects to JSON.", "It sends JSON responses."], correctAnswerIndex: 0 },
        { questionText: "Write an example of a database-connected API endpoint.", options: ["An Express route that uses a Mongoose model to find and return data.", "A simple function that returns a JSON object.", "A frontend component that fetches data."], correctAnswerIndex: 0 },
    ]
};

const cybersecurityAdvanced: NewCourse = {
    title: "Cybersecurity Advanced",
    description: "Identify, model, and mitigate real-world security threats.",
    longDescription: "Learn to perform ethical hacking and penetration testing, design and implement Zero Trust Architectures, write secure code, set up enterprise-level incident response plans, and secure infrastructure across networks, servers, and the cloud.",
    category: "Tech Skills",
    level: "Advanced",
    duration: "24h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Advanced Threat Modeling & Attack Surface Analysis",
            lessons: [{
                title: "Threat Modeling & Analysis",
                content: "Threat Modeling is the process of identifying potential threats, vulnerabilities, and mitigation strategies before your app even goes live. A common framework is STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). The goal is to understand and shrink your attack surface.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Pen Testing & Hacking",
                content: "Penetration Testing (Pen Testing) involves simulated attacks on your system to find vulnerabilities before real attackers do. The process includes reconnaissance, scanning, gaining access, maintaining access, and covering tracks. Teams are often split into Red (attackers) and Blue (defenders).",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Understanding Zero Trust",
                content: "The principle of Zero Trust Architecture is “Never trust, always verify.” It assumes every user, device, and connection is hostile by default. Core principles include continuous authentication, granular access control, least privilege enforcement, and microsegmentation.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Secure Coding Practices",
                content: "Secure coding is the first line of defense against vulnerabilities like SQL Injection and Cross-Site Scripting (XSS). DevSecOps integrates security into the development pipeline through practices like static code analysis (with tools like SonarQube) and dependency scanning.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Network and Cloud Security",
                content: "Network security involves concepts like firewalls, IDS/IPS systems, and VPNs. In the cloud, this extends to cloud-native firewalls (like AWS WAF), strict IAM roles and policies, and encryption for data both at rest and in transit. Defense-in-depth strategies like using a DMZ or bastion hosts are crucial.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Incident Response and Recovery",
                content: "Incident Response (IR) is the structured approach to handling cyber threats. The plan typically involves stages: Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Lessons Learned. Roles like Forensics Analyst and the Security Operations Center (SOC) team are vital.",
                duration: "1h"
            }],
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
    finalAssessment: [
        { questionText: "Explain STRIDE threat modeling.", options: ["A framework for identifying security threats (Spoofing, Tampering, etc.).", "A project management methodology.", "A network protocol."], correctAnswerIndex: 0 },
        { questionText: "What’s the difference between pen testing and vulnerability scanning?", options: ["Pen testing is an active attack simulation; scanning is a passive check for known flaws.", "They are the same thing.", "Scanning is more advanced than pen testing."], correctAnswerIndex: 0 },
        { questionText: "Name 3 tools used in penetration testing.", options: ["Metasploit, Burp Suite, Nmap.", "VS Code, Git, Docker.", "Figma, Sketch, Photoshop."], correctAnswerIndex: 0 },
        { questionText: "Describe the principles of Zero Trust Architecture.", options: ["Never trust, always verify; continuous authentication and least privilege.", "Trust all internal users by default.", "A focus on physical security only."], correctAnswerIndex: 0 },
        { questionText: "How would you prevent XSS and SQL injection?", options: ["Input sanitization, output escaping, and parameterized queries.", "By using a strong firewall.", "By disabling JavaScript."], correctAnswerIndex: 0 },
        { questionText: "What is DevSecOps, and how is it implemented?", options: ["Integrating security into the DevOps pipeline through automation.", "A separate security team that reviews code at the end.", "A marketing term for secure development."], correctAnswerIndex: 0 },
        { questionText: "Explain the difference between IDS and IPS.", options: ["IDS detects intrusions, IPS actively prevents them.", "IDS is for networks, IPS is for applications.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What role does IAM play in cloud security?", options: ["It manages user identities and their permissions to access resources.", "It monitors network traffic.", "It encrypts data at rest."], correctAnswerIndex: 0 },
        { questionText: "What is the purpose of a bastion host?", options: ["A secure server to jump through to access a private network.", "A server that hosts the main application.", "A database server."], correctAnswerIndex: 0 },
        { questionText: "List the 6 steps of the IR lifecycle.", options: ["Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned.", "Planning, Coding, Testing, Deployment, Monitoring, Maintenance.", "Discovery, Analysis, Mitigation, Reporting, Follow-up."], correctAnswerIndex: 0 },
        { questionText: "What are some tools used in log analysis during IR?", options: ["Splunk, ELK Stack, Graylog.", "Wireshark, Nmap, Metasploit.", "VS Code, Git, Docker."], correctAnswerIndex: 0 },
        { questionText: "Give an example of microsegmentation in Zero Trust.", options: ["Isolating different application services on a network from each other.", "Putting a firewall in front of the entire network.", "Using a single password for all services."], correctAnswerIndex: 0 },
        { questionText: "Why is secure CI/CD important?", options: ["To prevent vulnerabilities from being introduced and deployed automatically.", "To make the deployment process slower.", "It is not important."], correctAnswerIndex: 0 },
        { questionText: "How would you isolate and respond to a ransomware attack?", options: ["Disconnect the affected systems, identify the malware, restore from backups.", "Pay the ransom immediately.", "Ignore it and hope it goes away."], correctAnswerIndex: 0 },
        { questionText: "Describe the difference between Red, Blue, and Purple teams.", options: ["Red team attacks, Blue team defends, Purple team facilitates collaboration between them.", "They are different levels of security clearance.", "They are different types of firewalls."], correctAnswerIndex: 0 },
    ]
};

const techLeadership: NewCourse = {
    title: "Tech Leadership",
    description: "Transforming skilled developers into strategic, visionary, and effective tech leaders.",
    longDescription: "This course covers the essential skills for tech leadership, including managing development teams, aligning goals, resolving conflicts, making strategic technical decisions, scaling teams and processes, and communicating effectively with all stakeholders.",
    category: "Tech Skills",
    level: "Advanced",
    duration: "24h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: The Mindset of a Tech Leader",
            lessons: [{
                title: "From Coder to Leader",
                content: "A good developer solves problems; a great tech leader helps others solve problems. This module covers the transition from an individual contributor to roles like Tech Lead, Engineering Manager, or CTO. It contrasts leadership (inspiring people) with management (organizing processes).",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Team Composition and Goals",
                content: "Effective teams have a balance of skills and experience levels. Setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals and clarifying roles prevents burnout. Leaders must also facilitate effective standups and provide regular, constructive feedback.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Frameworks for Decision-Making",
                content: "Tech leaders make critical decisions about frameworks, architecture (monolith vs. microservices), and whether to build or buy solutions. Using frameworks like a trade-off matrix or risk/reward mapping helps make these choices strategically and transparently.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Scaling Teams and Culture",
                content: "As a company grows, leaders must scale their teams, systems, and culture. This involves structuring teams into pods, automating infrastructure with tools like Terraform, implementing monitoring, and reinforcing a positive culture through documentation and celebrating wins.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Leadership Communication",
                content: "Effective leadership is rooted in communication. This means sharing the 'why' behind decisions, tailoring messages for different audiences, and using emotional intelligence (EQ) to guide your team. Influencing without authority is achieved through logic, emotion, and storytelling.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Vision and Strategy Tools",
                content: "A leader paints a clear vision of the future. Strategy tools like OKRs (Objectives & Key Results) and roadmaps help align the team's work with that vision. It's crucial to identify all stakeholders, communicate progress, and report on metrics that matter, like ROI and uptime.",
                duration: "1h"
            }],
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
    finalAssessment: [
        { questionText: "What distinguishes leadership from management?", options: ["Leadership inspires, management organizes.", "Leadership is for seniors, management for juniors.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "How do you build and scale a high-performing tech team?", options: ["By setting clear goals, fostering collaboration, and providing resources.", "By hiring only senior engineers.", "By micromanaging every task."], correctAnswerIndex: 0 },
        { questionText: "Explain SMART goals with examples.", options: ["Specific, Measurable, Achievable, Relevant, Time-bound; e.g., 'Reduce API latency by 10% in Q3'.", "A goal that is smart.", "A goal that is easy to achieve."], correctAnswerIndex: 0 },
        { questionText: "What is a trade-off matrix, and how would you use it?", options: ["A tool for comparing options based on multiple criteria.", "A way to track team performance.", "A database schema."], correctAnswerIndex: 0 },
        { questionText: "List and explain 3 architectural decision-making tools.", options: ["Trade-off matrix, risk/reward mapping, build vs. buy analysis.", "Git, Docker, Jenkins.", "Figma, Sketch, Adobe XD."], correctAnswerIndex: 0 },
        { questionText: "What are the signs of strong technical culture?", options: ["Collaboration, continuous learning, and psychological safety.", "High turnover and burnout.", "Silos and finger-pointing."], correctAnswerIndex: 0 },
        { questionText: "How does DevSecOps contribute to tech leadership?", options: ["By integrating security into the development process, reducing risk.", "By slowing down development.", "It is not related to leadership."], correctAnswerIndex: 0 },
        { questionText: "Give 3 examples of scaling patterns in infrastructure.", options: ["Horizontal scaling, vertical scaling, and database sharding.", "Monolith, microservices, and serverless.", "Load balancing, caching, and CDNs."], correctAnswerIndex: 0 },
        { questionText: "How can you resolve conflict within an engineering team?", options: ["By addressing it early, focusing on the problem, and facilitating open communication.", "By ignoring it.", "By firing the people involved."], correctAnswerIndex: 0 },
        { questionText: "Define OKRs and give a tech-related example.", options: ["Objectives and Key Results; e.g., Objective: Improve app performance, Key Result: Achieve 99.9% uptime.", "A project management tool.", "A type of database."], correctAnswerIndex: 0 },
        { questionText: "What is emotional intelligence and how does it help in leadership?", options: ["The ability to understand and manage emotions; it helps in communication and empathy.", "A measure of intelligence.", "Not important for leadership."], correctAnswerIndex: 0 },
        { questionText: "Describe the ideal structure of a sprint retrospective.", options: ["A meeting to discuss what went well, what didn't, and what to improve.", "A meeting to plan the next sprint.", "A meeting to assign blame."], correctAnswerIndex: 0 },
        { questionText: "How do you align technical goals with executive expectations?", options: ["By translating technical metrics into business outcomes.", "By ignoring executive expectations.", "By promising everything."], correctAnswerIndex: 0 },
        { questionText: "Explain the difference between Red, Blue, and Purple teams.", options: ["Red team attacks, Blue team defends, Purple team facilitates collaboration.", "Different levels of security clearance.", "Different types of firewalls."], correctAnswerIndex: 0 },
        { questionText: "Write a brief memo convincing stakeholders to switch to microservices.", options: ["Focus on benefits like scalability, independent deployments, and team autonomy.", "Focus on the technical details.", "Focus on the risks."], correctAnswerIndex: 0 },
    ]
};

const researchInTechnology: NewCourse = {
    title: "Research in Technology",
    description: "Equip learners with the skills to design, execute, and apply high-quality research in the field of technology and innovation.",
    longDescription: "This course will equip learners with the skills to design, execute, and apply high-quality research in the field of technology and innovation. You will understand the principles and methodology of technical research, conduct research-driven innovation in areas like AI, Web3, IoT, and more, analyze emerging tech trends with evidence-based frameworks, create hypotheses and validate them through data and testing, follow ethical guidelines for responsible innovation, and produce publishable research documentation and reports.",
    category: "Tech Skills",
    level: "Advanced",
    duration: "24h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Introduction to Research in Technology",
            lessons: [{
                title: "What Is Research in Tech?",
                content: "Research in technology involves **systematic investigation** to discover, analyze, and improve systems, software, hardware, or methods. It fuels innovation, powers patents, and drives decisions. Types include Basic, Applied, Experimental, and Exploratory research.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What is the primary goal of tech research?", options: ["Discover and solve tech problems", "Increase ad revenue", "Generate memes"], correctAnswerIndex: 0 },
                { questionText: "Basic research is mainly:", options: ["Knowledge-driven", "Product-focused", "UI styling"], correctAnswerIndex: 0 },
                { questionText: "Applied research targets:", options: ["Real-world solutions", "Code formatting", "Game design only"], correctAnswerIndex: 0 },
                { questionText: "Which is exploratory research?", options: ["Investigating emerging tech", "Installing updates", "Writing CSS"], correctAnswerIndex: 0 },
                { questionText: "Example of applied research:", options: ["Drone delivery testing", "Font smoothing", "Commenting code"], correctAnswerIndex: 0 },
                { questionText: "Experimental research involves:", options: ["Controlled variables", "Guessing", "Rebooting"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: The Research Process in Tech",
            lessons: [{
                title: "The Research Process",
                content: "The research process follows key phases: Problem Identification, Literature Review, Hypothesis Formulation, Research Design, Data Collection & Analysis, and Conclusion. A literature review is crucial for understanding existing work using resources like Google Scholar and IEEE Xplore.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "What’s the first step in research?", options: ["Problem identification", "Writing results", "Applying for grants"], correctAnswerIndex: 0 },
                { questionText: "A literature review helps to:", options: ["Understand existing research", "Skip reading", "Print graphs"], correctAnswerIndex: 0 },
                { questionText: "Hypotheses are:", options: ["Assumptions to test", "Fonts", "Plagiarism protection"], correctAnswerIndex: 0 },
                { questionText: "Quantitative methods include:", options: ["Statistics", "Sketching", "Typography"], correctAnswerIndex: 0 },
                { questionText: "Mixed methods combine:", options: ["Qualitative + quantitative", "HTML + CSS", "AI + IoT"], correctAnswerIndex: 0 },
                { questionText: "A useful research database is:", options: ["IEEE Xplore", "Facebook", "Canva"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Emerging Technologies & Trend Analysis",
            lessons: [{
                title: "Analyzing Tech Trends",
                content: "Analyzing trends helps predict industry shifts and identify opportunities. Tools like the Gartner Hype Cycle, Google Trends, and MIT Tech Review are useful. Frameworks like SWOT and PEST help structure the analysis of trends like AI Ethics, Web3, and Quantum Security.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Why analyze trends?", options: ["Predict industry direction", "Design posters", "Reuse old code"], correctAnswerIndex: 0 },
                { questionText: "A good trend tool:", options: ["MIT Tech Review", "Pinterest", "Excel shortcuts"], correctAnswerIndex: 0 },
                { questionText: "SWOT is for:", options: ["Strengths & Weaknesses", "CSS animation", "Server reset"], correctAnswerIndex: 0 },
                { questionText: "Web3 focuses on:", options: ["Decentralized identity", "Email marketing", "UI shapes"], correctAnswerIndex: 0 },
                { questionText: "The \"Trough of Disillusionment\" is:", options: ["Reality check phase", "Server reboot phase", "Font mismatch"], correctAnswerIndex: 0 },
                { questionText: "Edge Computing brings:", options: ["Data processing closer to users", "Fonts to devices", "Loud noises"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Data Collection & Hypothesis Testing",
            lessons: [{
                title: "Data Collection and Testing",
                content: "Data in tech research can be collected from system logs, APIs, surveys, and GitHub analytics. Hypothesis testing involves a null hypothesis (H0, no effect) and an alternative (H1, effect exists). Methods like A/B testing, regression analysis, and t-tests are used to validate hypotheses.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "API logs are a source of:", options: ["Data", "Fonts", "Themes"], correctAnswerIndex: 0 },
                { questionText: "A null hypothesis means:", options: ["No observed effect", "The data is deleted", "Too many logs"], correctAnswerIndex: 0 },
                { questionText: "p-value helps:", options: ["Evaluate probability", "Predict color", "Parse cookies"], correctAnswerIndex: 0 },
                { questionText: "Regression analysis is used to:", options: ["Find relationships", "Generate passwords", "Tag images"], correctAnswerIndex: 0 },
                { questionText: "Chi-square tests are:", options: ["For categorical data", "For styling", "For blockchains"], correctAnswerIndex: 0 },
                { questionText: "Jupyter Notebook is a:", options: ["Data analysis tool", "Calendar", "VPN"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Publishing, Presenting & Applying Research",
            lessons: [{
                title: "Publishing and Presenting",
                content: "Research can be published in peer-reviewed journals like IEEE/ACM or on platforms like arXiv. When presenting, use storytelling and visuals tailored to your audience. Tools like LaTeX and Zotero are standard for creating professional research papers.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Peer-reviewed journals include:", options: ["IEEE", "Instagram", "Reddit"], correctAnswerIndex: 0 },
                { questionText: "Research should be:", options: ["Presented clearly", "Hidden in code", "Auto-formatted"], correctAnswerIndex: 0 },
                { questionText: "LaTeX is used for:", options: ["Research formatting", "Coding GUIs", "Hosting servers"], correctAnswerIndex: 0 },
                { questionText: "arXiv is a:", options: ["Research repository", "App builder", "Git client"], correctAnswerIndex: 0 },
                { questionText: "Storytelling in research helps:", options: ["Explain value", "Show font types", "Parse tokens"], correctAnswerIndex: 0 },
                { questionText: "Whitepapers apply research in:", options: ["Business/product plans", "Slide decks", "App UIs"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Ethics & Responsible Innovation",
            lessons: [{
                title: "Ethics in Research",
                content: "Ethics in tech research is non-negotiable. Key topics include AI bias, data privacy, surveillance, and responsible data usage. Frameworks like IEEE’s Ethically Aligned Design and regulations like GDPR guide researchers to innovate responsibly.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Ethics ensures:", options: ["Responsible innovation", "Fast prototyping", "Cheaper hosting"], correctAnswerIndex: 0 },
                { questionText: "Bias in AI can cause:", options: ["Unfair decisions", "Style conflicts", "Slow responses"], correctAnswerIndex: 0 },
                { questionText: "GDPR regulates:", options: ["Personal data use", "Video compression", "Reboot timing"], correctAnswerIndex: 0 },
                { questionText: "Ethical frameworks include:", options: ["Google AI Principles", "DNS caching", "Auth0 docs"], correctAnswerIndex: 0 },
                { questionText: "Deepfakes threaten:", options: ["Trust and truth", "Image size", "SEO speed"], correctAnswerIndex: 0 },
                { questionText: "One best practice:", options: ["Anonymize data", "Delete backups", "Cache styles"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "List the main phases of a research process.", options: ["Problem ID, Lit Review, Hypothesis, Design, Data, Conclusion.", "Design, Code, Test, Deploy.", "Plan, Execute, Monitor, Report."], correctAnswerIndex: 0 },
        { questionText: "Explain the difference between applied and basic research.", options: ["Applied solves a specific problem; basic expands knowledge.", "Applied is for hardware; basic is for software.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What is a hypothesis, and how is it tested?", options: ["A testable assumption; tested with data and statistical methods.", "A guess about the future.", "A type of database query."], correctAnswerIndex: 0 },
        { questionText: "Describe the Gartner Hype Cycle and its phases.", options: ["A model for tech adoption: Trigger, Peak, Trough, Slope, Plateau.", "A project management tool.", "A network protocol."], correctAnswerIndex: 0 },
        { questionText: "List and explain at least three data collection methods in tech research.", options: ["Logs (system events), APIs (programmatic access), Surveys (user feedback).", "Copy-paste, screenshots, and downloads.", "Email, phone calls, and meetings."], correctAnswerIndex: 0 },
        { questionText: "What are the tools used in technical data analysis?", options: ["Python (Pandas, NumPy), R, Jupyter Notebooks.", "Photoshop, Figma, Sketch.", "VS Code, Git, Docker."], correctAnswerIndex: 0 },
        { questionText: "How does exploratory research work?", options: ["It investigates new areas with limited data to form initial hypotheses.", "It repeats existing research.", "It is not a valid research method."], correctAnswerIndex: 0 },
        { questionText: "What are the ethical concerns in AI research?", options: ["Bias, privacy, and transparency.", "Performance, speed, and cost.", "Hardware, software, and networking."], correctAnswerIndex: 0 },
        { questionText: "Define and give examples of qualitative vs quantitative research.", options: ["Qualitative (interviews, observations), Quantitative (surveys, metrics).", "Qualitative is for text, Quantitative for numbers.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What is arXiv, and how is it useful?", options: ["A repository for pre-print research papers.", "A code editor.", "A project management tool."], correctAnswerIndex: 0 },
        { questionText: "Describe how to structure a research presentation.", options: ["Start with the problem, explain the method, show results, and conclude with implications.", "Start with the conclusion, then show the data.", "Show a demo and nothing else."], correctAnswerIndex: 0 },
        { questionText: "What’s the role of the null hypothesis in testing?", options: ["It is the default assumption that there is no effect, which the researcher tries to disprove.", "It is the hypothesis the researcher wants to prove.", "It is not important."], correctAnswerIndex: 0 },
        { questionText: "Name two tech trend spotting frameworks.", options: ["Gartner Hype Cycle and PEST analysis.", "Agile and Scrum.", "REST and GraphQL."], correctAnswerIndex: 0 },
        { questionText: "What is GDPR and how does it apply to researchers?", options: ["A data protection regulation that requires researchers to handle personal data responsibly.", "A programming language.", "A type of database."], correctAnswerIndex: 0 },
        { questionText: "How can research lead to product innovation?", options: ["By identifying new opportunities and validating new technologies.", "It cannot.", "By slowing down development."], correctAnswerIndex: 0 },
    ]
};

const innovationProductEngineering: NewCourse = {
    title: "Innovation, Product Engineering & Tech Strategy",
    description: "Equip advanced tech professionals with the skills to innovate, engineer high-impact products, and align technology with long-term strategic vision.",
    longDescription: "This course will equip you to lead innovation from idea to impact, build lovable and scalable products, create and execute bold tech strategies, and balance vision, users, code, and business goals.",
    category: "Tech Skills",
    level: "Advanced",
    duration: "24h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Innovation Principles & Practice",
            lessons: [{
                title: "What Is Innovation (for Real)?",
                content: "Innovation isn't just invention; it's about creating *value* from new ideas. We explore disruptive innovation (like GPTs), sustaining innovation (like new iPhone models), and frameworks like Design Thinking and Blue Ocean Strategy.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Innovation must:", options: ["Deliver value", "Just sound cool", "Be random"], correctAnswerIndex: 0 },
                { questionText: "Design Thinking includes:", options: ["Empathy", "Coloring", "Pricing sheets"], correctAnswerIndex: 0 },
                { questionText: "Disruptive innovation means:", options: ["Redefines industry", "Minor updates", "UI changes"], correctAnswerIndex: 0 },
                { questionText: "Process innovation example:", options: ["Agile", "TikTok", "CI/CD logos"], correctAnswerIndex: 0 },
                { questionText: "TRIZ is:", options: ["Problem-solving model", "Framework for SQL", "API version"], correctAnswerIndex: 0 },
                { questionText: "A sustaining innovation:", options: ["iPhone model refresh", "Keyboard shortcut", "CSS rebrand"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Building MVPs & Product Foundations",
            lessons: [{
                title: "What is an MVP?",
                content: "An MVP (Minimum Viable Product) is the simplest version of your idea that delivers value and allows you to learn from users. We cover the product lifecycle, lean cycles (Build-Measure-Learn), and prioritization frameworks like RICE and MoSCoW.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "MVP stands for:", options: ["Minimum Viable Product", "Major Visual Prototype", "Market Value Pitch"], correctAnswerIndex: 0 },
                { questionText: "Lean cycle steps:", options: ["Build → Measure → Learn", "Brainstorm → Code → Launch", "Guess → Ship → Wait"], correctAnswerIndex: 0 },
                { questionText: "Product-market fit happens when:", options: ["Users want it and pay for it", "UI looks good", "Team agrees"], correctAnswerIndex: 0 },
                { questionText: "RICE is used for:", options: ["Prioritizing features", "Data backup", "Logo design"], correctAnswerIndex: 0 },
                { questionText: "MoSCoW framework helps:", options: ["Rank importance", "Track bugs", "Do marketing"], correctAnswerIndex: 0 },
                { questionText: "A good MVP:", options: ["Is testable and usable", "Is full-featured", "Has dark mode only"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Product Engineering at Scale",
            lessons: [{
                title: "Engineering for Growth",
                content: "Products scale, and so must the code. This module covers engineering ecosystems, not just features. We'll explore API-first design, feature toggles (LaunchDarkly), CI/CD, observability (Datadog), and containerization (Docker, Kubernetes) to build resilient, scalable systems.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Product engineering means:", options: ["Building at scale", "Frontend colors", "Page animations"], correctAnswerIndex: 0 },
                { questionText: "Feature flags help:", options: ["Rollout new features safely", "Flag bugs", "Design themes"], correctAnswerIndex: 0 },
                { questionText: "CI/CD stands for:", options: ["Continuous Integration/Delivery", "Code Inspector", "Click Iterate/Create"], correctAnswerIndex: 0 },
                { questionText: "Auto-scaling adjusts:", options: ["Resources dynamically", "Typography", "Fonts"], correctAnswerIndex: 0 },
                { questionText: "Developer Experience improves:", options: ["Productivity", "Fonts", "PowerPoint"], correctAnswerIndex: 0 },
                { questionText: "Canary deployments mean:", options: ["Release to a subset", "Bird-named APIs", "Testing mobile UI"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Aligning Tech with Business Strategy",
            lessons: [{
                title: "Tech Drives Business",
                content: "Technology is strategy. This module teaches how to map architecture to business goals using OKRs and roadmaps. Learn to speak the executive language by translating tech debt into ROI loss and showing how features drive revenue.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "KPIs must connect to:", options: ["Business outcomes", "Theme colors", "Button clicks"], correctAnswerIndex: 0 },
                { questionText: "OKRs help with:", options: ["Setting goals", "Debugging", "UX tweaking"], correctAnswerIndex: 0 },
                { questionText: "Execs care about:", options: ["ROI, outcomes", "CSS bugs", "Emojis"], correctAnswerIndex: 0 },
                { questionText: "CAC\\:LTV measures:", options: ["Cost vs value of user", "Uptime", "Browser latency"], correctAnswerIndex: 0 },
                { questionText: "Time to Market measures:", options: ["Shipping speed", "UI speed", "Design themes"], correctAnswerIndex: 0 },
                { questionText: "Feature roadmaps show:", options: ["Development timeline", "Code quality", "App memory"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Strategic Innovation & Market Timing",
            lessons: [{
                title: "When to Build, Buy, or Wait",
                content: "Strategic decisions involve timing. Learn when to build a solution (if it's core to your advantage), buy it (if it's a utility), or wait (if the market isn't ready). We cover frameworks like the Technology Adoption Curve and Jobs To Be Done (JTBD).",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Build vs Buy depends on:", options: ["Core business value", "Fonts", "CSS rules"], correctAnswerIndex: 0 },
                { questionText: "Jobs To Be Done asks:", options: ["What problem are we solving?", "Who is coding?", "Which IDE?"], correctAnswerIndex: 0 },
                { questionText: "Competitive edge comes from:", options: ["IP, brand, speed", "Stickers", "Meetings"], correctAnswerIndex: 0 },
                { questionText: "The Adoption Curve shows:", options: ["Market phases", "Code quality", "ROI metrics"], correctAnswerIndex: 0 },
                { questionText: "Innovation is validated by:", options: ["Pilots, feedback", "Guessing", "Fonts"], correctAnswerIndex: 0 },
                { questionText: "A great internal test:", options: ["Hackathon", "Committee vote", "Email chain"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Leading with Vision, Speed & Impact",
            lessons: [{
                title: "What Makes Visionary Tech Leaders?",
                content: "Visionary leaders share a bold, clear vision and have an obsession with users and relentless execution. This module covers how to build an innovation culture by rewarding experimentation, tolerating fast failure, and balancing speed with stability.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Visionary leaders:", options: ["Inspire bold direction", "Just manage servers", "Rename buttons"], correctAnswerIndex: 0 },
                { questionText: "Innovation culture means:", options: ["Rewarding risk", "Limiting ideas", "Buying logos"], correctAnswerIndex: 0 },
                { questionText: "Balance means:", options: ["Speed + stability", "Rush + crash", "Wait + see"], correctAnswerIndex: 0 },
                { questionText: "Fast failure allows:", options: ["Quick lessons", "Debugging delays", "UI downtime"], correctAnswerIndex: 0 },
                { questionText: "Influence is earned by:", options: ["Story + logic", "Pressure", "Titles"], correctAnswerIndex: 0 },
                { questionText: "Guardrails offer:", options: ["Controlled innovation", "Border colors", "DevOps limits"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Explain the difference between disruptive and sustaining innovation.", options: ["Disruptive creates a new market; sustaining improves an existing one.", "Disruptive is for software; sustaining for hardware.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What is the Design Thinking process?", options: ["Empathize, Define, Ideate, Prototype, Test.", "Plan, Code, Test, Deploy.", "Discover, Analyze, Mitigate, Report."], correctAnswerIndex: 0 },
        { questionText: "Describe the MVP approach and how it prevents overbuilding.", options: ["Building the simplest valuable version to learn from users.", "Building a full-featured product from the start.", "Building a non-functional prototype."], correctAnswerIndex: 0 },
        { questionText: "What frameworks help prioritize product features?", options: ["RICE, MoSCoW, Kano Model.", "Agile, Scrum, Kanban.", "REST, GraphQL, SOAP."], correctAnswerIndex: 0 },
        { questionText: "What’s the relationship between tech architecture and business goals?", options: ["Architecture should be designed to support and enable business goals.", "They are not related.", "Business goals should be designed to support architecture."], correctAnswerIndex: 0 },
        { questionText: "Give three real-world examples of scalable product engineering practices.", options: ["Microservices, serverless, and CI/CD.", "Monolith, manual deployment, and local databases.", "WordPress, Joomla, and Drupal."], correctAnswerIndex: 0 },
        { questionText: "How do tech teams validate innovation before launching?", options: ["Through pilot programs, user feedback, and A/B testing.", "By guessing.", "By asking the CEO."], correctAnswerIndex: 0 },
        { questionText: "Explain RICE and MoSCoW prioritization.", options: ["RICE uses Reach, Impact, Confidence, Effort; MoSCoW uses Must, Should, Could, Won't.", "They are both for project management.", "They are the same thing."], correctAnswerIndex: 0 },
        { questionText: "How can CI/CD pipelines improve shipping velocity?", options: ["By automating the build, test, and deployment process.", "By slowing down development.", "By adding more manual steps."], correctAnswerIndex: 0 },
        { questionText: "Why is developer experience (DX) crucial for innovation?", options: ["It improves productivity and allows developers to focus on creative solutions.", "It is not important.", "It is only for junior developers."], correctAnswerIndex: 0 },
        { questionText: "Define OKRs and how they align engineering with business.", options: ["Objectives and Key Results; they connect company goals to team actions.", "A project management tool.", "A type of database."], correctAnswerIndex: 0 },
        { questionText: "What is the Technology Adoption Curve?", options: ["A model that describes how new technologies are adopted by different groups.", "A graph of technology prices over time.", "A measure of technology performance."], correctAnswerIndex: 0 },
        { questionText: "How do strategic leaders balance risk and experimentation?", options: ["By using controlled experiments and clear guardrails.", "By avoiding all risks.", "By taking huge, uncontrolled risks."], correctAnswerIndex: 0 },
        { questionText: "What metrics matter most for product-led growth?", options: ["Activation, Retention, and Net Promoter Score (NPS).", "Lines of code written.", "Number of meetings attended."], correctAnswerIndex: 0 },
        { questionText: "Summarize how you’d build a tech product with strategic impact and user-first innovation.", options: ["Start with user needs, build a lean MVP, iterate based on data, and align with business goals.", "Start with the technology, build a full-featured product, and hope users like it.", "Start with a marketing plan and build the product later."], correctAnswerIndex: 0 },
    ]
};

const apiDevelopmentAdvanced: NewCourse = {
    title: "API Development (Advanced)",
    description: "Designing, scaling, securing, and managing modern APIs.",
    longDescription: "Build scalable REST and GraphQL APIs with proper design patterns, implement authentication with OAuth2, OpenID Connect, and JWT, use Swagger (OpenAPI) for documentation, apply API versioning, caching, rate limiting, and monitoring, design for multi-client consumption, and deploy using microservices and CI/CD pipelines.",
    category: "Tech Skills",
    level: "Advanced",
    duration: "18h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Designing Scalable REST APIs",
            lessons: [{
                title: "REST Principles and Best Practices",
                content: "REST (Representational State Transfer) is built on HTTP methods. Best practices include using nouns in URLs (e.g., `/users`), proper HTTP status codes (200, 404, 500), pagination for large datasets, and providing filtering/sorting options.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "REST APIs are based on:", options: ["HTTP", "FTP", "WebSockets"], correctAnswerIndex: 0 },
                { questionText: "A 201 status code means:", options: ["Resource created", "Forbidden", "Server crash"], correctAnswerIndex: 0 },
                { questionText: "URLs should contain:", options: ["Nouns", "Verbs", "Emojis"], correctAnswerIndex: 0 },
                { questionText: "`GET /products?page=2` is used for:", options: ["Pagination", "Authentication", "File upload"], correctAnswerIndex: 0 },
                { questionText: "Error 404 means:", options: ["Not Found", "Unauthorized", "Timeout"], correctAnswerIndex: 0 },
                { questionText: "REST is a:", options: ["Stateless architecture", "Stateful API", "Proxy protocol"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: API Authentication (OAuth2, OpenID, JWT)",
            lessons: [{
                title: "Authentication vs. Authorization",
                content: "Authentication confirms 'who you are,' while Authorization determines 'what you can access.' This module covers OAuth 2.0 for delegated access, OpenID Connect for identity verification, and JSON Web Tokens (JWT) for secure, stateless authentication.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "OAuth2 is used for:", options: ["Authorization", "Logging", "Graphing"], correctAnswerIndex: 0 },
                { questionText: "JWT stands for:", options: ["JSON Web Token", "JavaScript Web Tool", "Job Waiting Token"], correctAnswerIndex: 0 },
                { questionText: "OpenID Connect provides:", options: ["Identity layer", "API monitoring", "Styling rules"], correctAnswerIndex: 0 },
                { questionText: "`jwt.sign()` is used to:", options: ["Create token", "Encrypt DB", "Ping server"], correctAnswerIndex: 0 },
                { questionText: "OAuth2 uses:", options: ["Access tokens", "MAC address", "URL paths"], correctAnswerIndex: 0 },
                { questionText: "Authentication means:", options: ["Identifying the user", "Formatting a page", "Scaling server"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Documenting APIs with Swagger and Postman",
            lessons: [{
                title: "The OpenAPI Specification (Swagger)",
                content: "Good documentation drives API adoption. Swagger (OpenAPI) allows you to define your API's structure in YAML or JSON, creating interactive documentation. Postman Collections provide a shareable, testable format for your API, complete with environments for managing variables like tokens.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "API Versioning Strategies",
                content: "To ensure backward compatibility, APIs must be versioned, either through the URI (`/v1/users`) or headers. Rate limiting prevents abuse, and caching (client-side with headers, server-side with Redis) improves performance.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "/v1/users is an example of:", options: ["URI versioning", "REST endpoint", "DNS setup"], correctAnswerIndex: 0 },
                { questionText: "Rate limiting helps prevent:", options: ["Abuse & spam", "Layout issues", "Data loss"], correctAnswerIndex: 0 },
                { questionText: "Redis is used for:", options: ["Caching", "Deployment", "Auth"], correctAnswerIndex: 0 },
                { questionText: "`express-rate-limit` is:", options: ["Node.js middleware", "SQL query", "Font loader"], correctAnswerIndex: 0 },
                { questionText: "`Cache-Control` is for:", options: ["Client-side caching", "OAuth", "Sorting data"], correctAnswerIndex: 0 },
                { questionText: "Header versioning uses:", options: ["Accept headers", "IP address", "HTML5"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: API Testing and Monitoring",
            lessons: [{
                title: "Automated API Testing Strategies",
                content: "Automated testing is crucial for API reliability. Unit tests check individual functions, while integration tests validate endpoints. Tools like Jest and Supertest facilitate this. Monitoring with tools like New Relic and Datadog tracks production API health, including latency and error rates.",
                duration: "1h"
            }],
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
            lessons: [{
                title: "Monolith vs. Microservices Architecture",
                content: "While monoliths are easier to build initially, microservices are easier to scale. In a microservices architecture, an application is split into small, independent services that communicate via APIs. Best practices include each service owning its own database and using an API Gateway for routing and authentication.",
                duration: "1h"
            }],
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
    finalAssessment: [
        { questionText: "What’s the difference between REST and GraphQL?", options: ["REST uses multiple endpoints; GraphQL uses a single endpoint with flexible queries.", "REST is for frontend; GraphQL is for backend.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "Describe a standard OAuth2 flow.", options: ["User grants permission, app gets auth code, exchanges it for access token.", "User logs in with username/password.", "User clicks a magic link."], correctAnswerIndex: 0 },
        { questionText: "What’s the purpose of the API Gateway?", options: ["To act as a single entry point for all API requests, handling routing, auth, and rate limiting.", "To bypass security checks.", "To host the frontend application."], correctAnswerIndex: 0 },
        { questionText: "Write a basic rate-limiter snippet in Node.js.", options: ["Using `express-rate-limit` middleware.", "Writing a custom function with a timer.", "It cannot be done in Node.js."], correctAnswerIndex: 0 },
        { questionText: "How do you use Swagger to document an endpoint?", options: ["Define the path, method, parameters, and responses in a YAML or JSON file.", "By adding comments to the code.", "Swagger does it automatically."], correctAnswerIndex: 0 },
        { questionText: "What is JWT, and how is it used in APIs?", options: ["A token for stateless authentication, sent in the Authorization header.", "A frontend library for UI.", "A type of database."], correctAnswerIndex: 0 },
        { questionText: "Compare URI versioning and Header versioning.", options: ["URI versioning includes the version in the URL (e.g., /v1/); Header versioning uses a custom header.", "URI is for REST, Header is for GraphQL.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "List two tools for monitoring live APIs.", options: ["Datadog and New Relic.", "VS Code and Git.", "Figma and Sketch."], correctAnswerIndex: 0 },
        { questionText: "What’s the use of Postman environments?", options: ["To store variables like API keys and URLs for different environments (dev, prod).", "To design API responses.", "To write API documentation."], correctAnswerIndex: 0 },
        { questionText: "Explain the difference between unit and integration tests.", options: ["Unit tests check individual functions; integration tests check how components work together.", "Unit tests are manual; integration tests are automated.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "What does Redis help with in API design?", options: ["Caching responses to improve performance.", "Storing user data.", "Authenticating users."], correctAnswerIndex: 0 },
        { questionText: "Give an example of caching headers.", options: ["`Cache-Control: max-age=3600`.", "`X-Cache: true`.", "`Use-Cache: yes`."], correctAnswerIndex: 0 },
        { questionText: "List 3 benefits of microservices architecture.", options: ["Scalability, independent deployments, and technology diversity.", "Simplicity, easy testing, and fast development.", "Low cost, high performance, and small codebase."], correctAnswerIndex: 0 },
        { questionText: "What’s the use of service discovery in APIs?", options: ["To allow services to find and communicate with each other dynamically.", "To document API endpoints.", "To monitor API health."], correctAnswerIndex: 0 },
        { questionText: "Write a `GET` endpoint in Express that returns a paginated list of users.", options: ["An endpoint that accepts `page` and `limit` query parameters.", "An endpoint that returns all users at once.", "An endpoint that returns a single user."], correctAnswerIndex: 0 },
    ]
};

const mobileAppDevelopment: NewCourse = {
    title: "Mobile App Development",
    description: "Learn to build real, cross-platform mobile apps using Flutter and React Native.",
    longDescription: "This course covers the essentials of mobile app development, from understanding architecture and UI/UX best practices to building and publishing apps. You will learn the differences between native and cross-platform development and get hands-on experience with both Flutter and React Native, preparing you to bring your app ideas to life on both Android and iOS.",
    category: "Tech Skills",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Introduction to Mobile App Development",
            lessons: [{
                title: "What is Mobile App Development?",
                content: "Mobile app development is the process of building software applications for mobile devices. Apps can be 'native' (built for one platform like iOS or Android) or 'cross-platform' (one codebase for both). Native offers the best performance, while cross-platform allows for faster development.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Mobile apps run on:", options: ["Phones & tablets", "Fridges", "Game consoles"], correctAnswerIndex: 0 },
                { questionText: "Native apps are built for:", options: ["A specific platform", "Any browser", "Cars"], correctAnswerIndex: 0 },
                { questionText: "Cross-platform tools include:", options: ["Flutter, React Native", "Blender, Maya", "Bootstrap"], correctAnswerIndex: 0 },
                { questionText: "Web apps are accessed via:", options: ["Browsers", "USB", "SMS"], correctAnswerIndex: 0 },
                { questionText: "Native offers better:", options: ["Performance", "Ping", "Spinning logos"], correctAnswerIndex: 0 },
                { questionText: "React Native uses:", options: ["JavaScript", "C++", "HTML only"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Setting Up Your Development Environment",
            lessons: [{
                title: "Setting Up Your Development Environment",
                content: "To get started, you'll need tools like the Flutter SDK (which uses the Dart language) or the React Native CLI. You will also need Android Studio for Android development and Xcode (on macOS) for iOS development. The `flutter doctor` command helps verify your setup is correct.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Flutter uses:", options: ["Dart", "Go", "Bash"], correctAnswerIndex: 0 },
                { questionText: "Android Studio is used to:", options: ["Build Android apps", "Write music", "Edit PDFs"], correctAnswerIndex: 0 },
                { questionText: "React Native CLI is based on:", options: ["Node.js", "Java", "Ruby"], correctAnswerIndex: 0 },
                { questionText: "Flutter doctor checks:", options: ["System readiness", "Wi-Fi speed", "Grammar"], correctAnswerIndex: 0 },
                { questionText: "To start a Flutter project, use:", options: ["`flutter create`", "`npm install`", "`new Flutter()`"], correctAnswerIndex: 0 },
                { questionText: "Xcode is required for:", options: ["iOS dev", "Android APKs", "Website hosting"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Building UI with Flutter and React Native",
            lessons: [{
                title: "Building UI with Flutter and React Native",
                content: "Flutter builds UI using a tree of 'widgets' for everything from layout to text. React Native uses JSX, a syntax similar to HTML, with components like `<View>` and `<Text>`. Both provide a rich set of pre-built components to create beautiful user interfaces.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Flutter builds UI using:", options: ["Widgets", "Spreadsheets", "Charts"], correctAnswerIndex: 0 },
                { questionText: "React Native uses:", options: ["JSX", "PHP", "JSP"], correctAnswerIndex: 0 },
                { questionText: "Scaffold is a:", options: ["Flutter layout", "React router", "Android emulator"], correctAnswerIndex: 0 },
                { questionText: "FlatList is used for:", options: ["Lists in React Native", "Excel files", "Maps"], correctAnswerIndex: 0 },
                { questionText: "In React Native, `View` is similar to:", options: ["`<div>`", "`<iframe>`", "`<script>`"], correctAnswerIndex: 0 },
                { questionText: "Flutter uses what for layouts?", options: ["Rows, Columns", "Tables", "Paddings"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: Navigation, State, and Interactivity",
            lessons: [{
                title: "Navigation, State, and Interactivity",
                content: "To navigate between screens, Flutter uses a `Navigator` widget, while React Native often uses the `react-navigation` library. To manage data that changes over time (state), Flutter uses `setState` or state management libraries like Provider, and React Native uses `useState` or libraries like Redux.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Navigator is used for:", options: ["Routing in Flutter", "Browsing web", "Data fetching"], correctAnswerIndex: 0 },
                { questionText: "`useState` is used in:", options: ["React Native", "Flutter", "Vue"], correctAnswerIndex: 0 },
                { questionText: "`setState()` does what?", options: ["Updates UI", "Loads DB", "Uploads files"], correctAnswerIndex: 0 },
                { questionText: "Buttons handle:", options: ["User interaction", "Footers", "Fonts"], correctAnswerIndex: 0 },
                { questionText: "Redux is for:", options: ["State management", "Graphics", "Image hosting"], correctAnswerIndex: 0 },
                { questionText: "Flutter’s `Provider` is used to:", options: ["Share app-wide state", "Host websites", "Style buttons"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Testing, Debugging, and Optimization",
            lessons: [{
                title: "Testing, Debugging, and Optimization",
                content: "Testing your app is crucial. This includes unit tests for logic, widget tests for UI, and integration tests for entire flows. Flutter has built-in testing and DevTools, while React Native uses tools like Jest. Optimization involves compressing images, lazy loading screens, and removing unused packages.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "`jest` is used in:", options: ["React Native", "Flutter", "PHP"], correctAnswerIndex: 0 },
                { questionText: "Widget tests are:", options: ["UI-specific", "APIs", "Animations"], correctAnswerIndex: 0 },
                { questionText: "Logcat is for:", options: ["Android debugging", "Maps", "Buttons"], correctAnswerIndex: 0 },
                { questionText: "Flutter DevTools helps:", options: ["Debug apps", "Paint UI", "Host files"], correctAnswerIndex: 0 },
                { questionText: "Lazy loading improves:", options: ["Performance", "Delay", "Font size"], correctAnswerIndex: 0 },
                { questionText: "Expo is used to:", options: ["Preview React Native apps", "Animate cards", "Test passwords"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Publishing to Play Store and App Store",
            lessons: [{
                title: "Publishing to Play Store and App Store",
                content: "Before release, you must optimize assets and sign your app. For Android, you build an APK or AAB file and upload it to the Google Play Console. For iOS, you need a macOS machine and Xcode to upload to App Store Connect. Both stores have a review process that checks for quality and policy compliance.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "APK stands for:", options: ["Android Package", "App Packing Kit", "App Preview Key"], correctAnswerIndex: 0 },
                { questionText: "You upload Android apps to:", options: ["Google Play Console", "iCloud", "Drive"], correctAnswerIndex: 0 },
                { questionText: "To publish to iOS, you need:", options: ["Xcode", "React", "Safari"], correctAnswerIndex: 0 },
                { questionText: "Before publishing, you should:", options: ["Test app", "Panic", "Rename files"], correctAnswerIndex: 0 },
                { questionText: "Apple reviews take:", options: ["Days", "Seconds", "2 hours"], correctAnswerIndex: 0 },
                { questionText: "Screenshots in listings must be:", options: ["Real", "Stock photos", "Memes"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Difference between native and cross-platform?", options: ["Native is for one platform, cross-platform is for multiple.", "Native is faster to develop.", "Cross-platform has better performance."], correctAnswerIndex: 0 },
        { questionText: "Two tools for mobile app development?", options: ["Flutter and React Native.", "VS Code and Git.", "Figma and Sketch."], correctAnswerIndex: 0 },
        { questionText: "How do you install Flutter and start a project?", options: ["Download the SDK, add it to PATH, and run `flutter create`.", "Run `npm install flutter`.", "You can't install Flutter."], correctAnswerIndex: 0 },
        { questionText: "What are widgets in Flutter?", options: ["Everything in a Flutter UI is a widget.", "A type of database.", "A project management tool."], correctAnswerIndex: 0 },
        { questionText: "What’s JSX in React Native?", options: ["A syntax extension for JavaScript that looks like HTML.", "A CSS preprocessor.", "A backend language."], correctAnswerIndex: 0 },
        { questionText: "Write a button example in React Native.", options: ["`<Button title='Click' onPress={() => {}} />`", "`button().click()`", "`new Button('Click')`"], correctAnswerIndex: 0 },
        { questionText: "What is `setState()` used for?", options: ["To update the state of a component and re-render the UI.", "To set the initial state of a component.", "To delete the state of a component."], correctAnswerIndex: 0 },
        { questionText: "How do you handle routing in Flutter?", options: ["Using the `Navigator` widget.", "Using the `Router` component.", "By manually changing the URL."], correctAnswerIndex: 0 },
        { questionText: "What’s the purpose of lazy loading?", options: ["To improve performance by only loading components when they are needed.", "To make the app slower.", "To load all components at once."], correctAnswerIndex: 0 },
        { questionText: "What are three debugging tools?", options: ["Flutter DevTools, React Native Debugger, Android Logcat.", "VS Code, Git, Docker.", "Figma, Sketch, Adobe XD."], correctAnswerIndex: 0 },
        { questionText: "Steps to prepare Android app for release?", options: ["Optimize assets, sign the app, and build an AAB.", "Write the code and upload it to the store.", "Design the UI and create screenshots."], correctAnswerIndex: 0 },
        { questionText: "How do you test a widget in Flutter?", options: ["Using `flutter test` and the `test` package.", "By manually clicking on it.", "It cannot be tested."], correctAnswerIndex: 0 },
        { questionText: "Why does Apple reject apps?", options: ["For violating their guidelines, having bugs, or poor UI.", "For no reason.", "For being too good."], correctAnswerIndex: 0 },
        { questionText: "What is the difference between APK and AAB?", options: ["AAB is a publishing format that allows for smaller, optimized APKs to be generated by Google Play.", "APK is for Android, AAB is for iOS.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "How would you optimize performance for large apps?", options: ["By using code splitting, lazy loading, and optimizing images.", "By writing all code in a single file.", "By using large, uncompressed images."], correctAnswerIndex: 0 },
    ]
};

const databaseDesignCourse: NewCourse = {
    title: "Database Design & Management",
    description: "Learn practical database skills for app, web, and backend integration.",
    longDescription: "This course covers everything from relational (SQL) and non-relational (NoSQL) databases to designing efficient schemas with ER diagrams. You will learn to write SQL queries, use MongoDB, connect databases to applications, and optimize for performance.",
    category: "Tech Skills",
    level: "Intermediate",
    duration: "12h",
    instructor: "Nasir Ibrahim Imam",
    price: 5000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: Introduction to Databases",
            lessons: [{
                title: "What Is a Database?",
                content: "A database is a structured collection of data, like a digital filing cabinet. We explore the differences between Relational (SQL) databases that use tables, and NoSQL databases that use flexible documents.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "A database is:", options: ["Structured data storage", "A game engine", "An image editor"], correctAnswerIndex: 0 },
                { questionText: "SQL databases store data in:", options: ["Tables", "XML files", "JSON only"], correctAnswerIndex: 0 },
                { questionText: "MongoDB is:", options: ["NoSQL", "SQL", "Spreadsheet"], correctAnswerIndex: 0 },
                { questionText: "DBMS stands for:", options: ["Database Management System", "Disk Boot Machine Set", "Developer Bug Manual Set"], correctAnswerIndex: 0 },
                { questionText: "A field in a table is like a:", options: ["Column", "Folder", "Dropdown"], correctAnswerIndex: 0 },
                { questionText: "NoSQL allows:", options: ["Flexible structure", "Only text", "Fixed HTML pages"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 2: Relational Database Design & ER Modeling",
            lessons: [{
                title: "What Is ER Modeling?",
                content: "Entity-Relationship (ER) modeling is a visual way to design your database. We cover entities, attributes, and relationships. You'll learn about Primary Keys (unique IDs) and Foreign Keys (for connecting tables), and the process of Normalization to reduce data redundancy.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Entity is:", options: ["A table", "A button", "A code editor"], correctAnswerIndex: 0 },
                { questionText: "Primary key is:", options: ["Unique identifier", "Image link", "Line color"], correctAnswerIndex: 0 },
                { questionText: "Foreign key is used for:", options: ["Relationships", "Imports", "Loops"], correctAnswerIndex: 0 },
                { questionText: "Normalization removes:", options: ["Redundancy", "Rows", "Buttons"], correctAnswerIndex: 0 },
                { questionText: "3NF stands for:", options: ["Third Normal Form", "Third Network Function", "Triangular Number Format"], correctAnswerIndex: 0 },
                { questionText: "ER diagrams are for:", options: ["Database design", "Layout design", "App deployment"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Writing SQL Queries",
            lessons: [{
                title: "SQL Basics",
                content: "SQL (Structured Query Language) is the language for interacting with relational databases. This module covers the core commands: `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, and `DELETE`. We also explore how to use `JOIN` to combine data from multiple tables.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "`SELECT * FROM` is used to:", options: ["Read data", "Remove table", "Save as PDF"], correctAnswerIndex: 0 },
                { questionText: "`INSERT INTO` is for:", options: ["Adding data", "Sorting files", "Compiling code"], correctAnswerIndex: 0 },
                { questionText: "`UPDATE` lets you:", options: ["Modify data", "Encrypt", "Animate"], correctAnswerIndex: 0 },
                { questionText: "JOIN combines:", options: ["Tables", "Stylesheets", "Scripts"], correctAnswerIndex: 0 },
                { questionText: "A WHERE clause is used to:", options: ["Filter results", "Start loop", "Define function"], correctAnswerIndex: 0 },
                { questionText: "Which of these is a valid SQL command?", options: ["DELETE", "REMOVE", "TAKEOUT"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 4: NoSQL & MongoDB",
            lessons: [{
                title: "What Is NoSQL?",
                content: "NoSQL means 'Not Only SQL'. These databases, like MongoDB, use flexible JSON-like documents instead of rigid tables. We'll cover the structure of a MongoDB database (Database > Collection > Document) and learn basic commands like `insertOne`, `find`, and `updateOne`.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "MongoDB is:", options: ["NoSQL database", "CSS tool", "Excel clone"], correctAnswerIndex: 0 },
                { questionText: "A collection is like a:", options: ["Table", "Style", "Route"], correctAnswerIndex: 0 },
                { questionText: "Documents in MongoDB are written in:", options: ["JSON", "XML", "Markdown"], correctAnswerIndex: 0 },
                { questionText: "`insertOne()` is used to:", options: ["Add document", "Drop DB", "Animate UI"], correctAnswerIndex: 0 },
                { questionText: "NoSQL is good for:", options: ["Flexible data", "Static pages", "Code compilers"], correctAnswerIndex: 0 },
                { questionText: "MongoDB stores data as:", options: ["Documents", "Lines", "Tables"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Performance Optimization & Indexing",
            lessons: [{
                title: "Why Optimize?",
                content: "Slow queries can cripple an application. This module teaches optimization techniques, with a focus on **Indexing** to speed up searches. We also cover why you should avoid `SELECT *`, the importance of normalization, and using `LIMIT` to handle large result sets.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Indexes are used to:", options: ["Speed up queries", "Make designs", "Encode images"], correctAnswerIndex: 0 },
                { questionText: "`SELECT *` is:", options: ["Slower than choosing fields", "Always best", "Used for loops"], correctAnswerIndex: 0 },
                { questionText: "LIMIT is used to:", options: ["Restrict results", "Change layout", "Apply CSS"], correctAnswerIndex: 0 },
                { questionText: "Archiving is:", options: ["Moving old data", "Logging in", "Coloring tables"], correctAnswerIndex: 0 },
                { questionText: "Which improves speed?", options: ["Indexes", "Adding HTML", "Removing Wi-Fi"], correctAnswerIndex: 0 },
                { questionText: "A slow query might be due to:", options: ["No index", "Lack of semicolons", "Invisible divs"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Connecting Databases to Apps",
            lessons: [{
                title: "Backend + Database",
                content: "Applications connect to databases through backend code using drivers. We'll look at common drivers for different languages, like Sequelize (SQL) and Mongoose (NoSQL) for Node.js, and SQLAlchemy for Python, to bridge the gap between your app and its data.",
                duration: "1h"
            }],
            quiz: [
                { questionText: "Mongoose is for:", options: ["MongoDB in Node.js", "Flying", "Design systems"], correctAnswerIndex: 0 },
                { questionText: "SQLAlchemy is used in:", options: ["Python", "Ruby", "Java"], correctAnswerIndex: 0 },
                { questionText: "`connect()` is used to:", options: ["Establish database link", "Create user", "Show error"], correctAnswerIndex: 0 },
                { questionText: "Sequelize helps with:", options: ["SQL in Node", "Styling in CSS", "Animation"], correctAnswerIndex: 0 },
                { questionText: "Apps talk to databases using:", options: ["Backend code", "Frontend buttons", "Wi-Fi"], correctAnswerIndex: 0 },
                { questionText: "Drivers are like:", options: ["Translators", "Fonts", "PDFs"], correctAnswerIndex: 0 },
            ]
        }
    ],
    finalAssessment: [
        { questionText: "Define a database.", options: ["A structured collection of data.", "A type of programming language.", "A design tool."], correctAnswerIndex: 0 },
        { questionText: "What is the difference between SQL and NoSQL?", options: ["SQL is relational and has a fixed schema; NoSQL is non-relational and has a flexible schema.", "SQL is for frontend; NoSQL for backend.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "Name one relational and one non-relational DBMS.", options: ["MySQL (relational), MongoDB (non-relational).", "React (relational), Angular (non-relational).", "Docker (relational), Kubernetes (non-relational)."], correctAnswerIndex: 0 },
        { questionText: "What is ER modeling?", options: ["A visual way to design a database schema.", "A project management methodology.", "A network protocol."], correctAnswerIndex: 0 },
        { questionText: "What is a primary key?", options: ["A unique identifier for a record in a table.", "The main password for a database.", "A type of encryption."], correctAnswerIndex: 0 },
        { questionText: "Why do we normalize a database?", options: ["To reduce data redundancy and improve data integrity.", "To make the database slower.", "To make the database larger."], correctAnswerIndex: 0 },
        { questionText: "Write a basic `SELECT` query.", options: ["`SELECT * FROM users;`", "`GET users;`", "`READ users;`"], correctAnswerIndex: 0 },
        { questionText: "What is a JOIN?", options: ["A way to combine rows from two or more tables based on a related column.", "A way to merge two databases.", "A way to create a new table."], correctAnswerIndex: 0 },
        { questionText: "Show an example of a MongoDB document.", options: ["`{ \"name\": \"John\", \"age\": 30 }`", "`<table><tr><td>John</td><td>30</td></tr></table>`", "`John,30`"], correctAnswerIndex: 0 },
        { questionText: "How does indexing improve performance?", options: ["It allows the database to find data faster without scanning the entire table.", "It makes the database smaller.", "It encrypts the data."], correctAnswerIndex: 0 },
        { questionText: "What does `LIMIT` do in SQL?", options: ["It restricts the number of rows returned by a query.", "It sets a time limit for a query.", "It limits access to a table."], correctAnswerIndex: 0 },
        { questionText: "How do you connect Node.js to MongoDB?", options: ["Using a driver like Mongoose.", "By directly importing the database file.", "It is not possible."], correctAnswerIndex: 0 },
        { questionText: "What is the purpose of Mongoose?", options: ["It provides a schema-based solution to model application data for MongoDB.", "It is a code editor for Node.js.", "It is a deployment platform."], correctAnswerIndex: 0 },
        { questionText: "Give two ways to optimize database speed.", options: ["Indexing and archiving old data.", "Using larger images and more animations.", "Writing all code in a single file."], correctAnswerIndex: 0 },
        { questionText: "Explain how a frontend app accesses data from a database.", options: ["Through a backend API that communicates with the database.", "Directly from the browser.", "It cannot access database data."], correctAnswerIndex: 0 },
    ]
};

const artificialIntelligenceCourse: NewCourse = {
    title: "Artificial Intelligence",
    description: "An intensive course covering the foundations, applications, and ethical considerations of AI.",
    longDescription: "This advanced course provides a comprehensive overview of Artificial Intelligence, from its theoretical and mathematical foundations to its real-world applications in computer vision, NLP, and decision-making. Students will learn to build AI systems using Python, understand the nuances of AI ethics and bias, and become capable of leading AI projects and research.",
    category: "AI & Machine Learning",
    level: "Advanced",
    duration: "18h",
    instructor: "Nasir Ibrahim Imam",
    price: 7000,
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
        {
            title: "Module 1: The Foundations of Artificial Intelligence",
            lessons: [{
                title: "What Is AI?",
                content: "Artificial Intelligence is the science of building **intelligent machines** that simulate human thinking. It includes branches like Machine Learning (learning from data), Natural Language Processing (understanding language), and Computer Vision (interpreting images).",
                duration: "1h 30m"
            }],
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
            lessons: [{
                title: "What Is Machine Learning?",
                content: "A method where computers **learn from data** without being explicitly programmed. We'll explore Supervised Learning (with labeled data), Unsupervised Learning (to discover patterns), and Reinforcement Learning (trial and error). Core concepts include features, labels, models, and loss functions.",
                duration: "1h 30m"
            }],
            quiz: [
                { questionText: "Supervised learning uses:", options: ["Labeled data", "Random loops", "Audio signals"], correctAnswerIndex: 0 },
                { questionText: "The purpose of a model is to:", options: ["Map inputs to outputs", "Beautify data", "Format pages"], correctAnswerIndex: 0 },
                { questionText: "Reinforcement learning learns by:", options: ["Trial and error", "HTML parsing", "Screenshotting"], correctAnswerIndex: 0 },
                { questionText: "`fit()` function is used to:", options: ["Train a model", "Plot a graph", "Import JSON"], correctAnswerIndex: 0 },
                { questionText: "A loss function measures:", options: ["Prediction errors", "File sizes", "Speed"], correctAnswerIndex: 0 },
                { questionText: "Backpropagation is used in:", options: ["Neural networks", "CSS", "Data scraping"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 3: Deep Learning and Neural Networks",
            lessons: [{
                title: "Understanding Neural Networks",
                content: "Neural networks are modeled after the human brain, consisting of layers of nodes. We will cover different types, including Feedforward Networks (DNNs), Convolutional Neural Networks (CNNs) for images, and Recurrent Neural Networks (RNNs) for sequential data like text.",
                duration: "1h 30m"
            }],
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
            lessons: [{
                title: "Understanding NLP",
                content: "Natural Language Processing enables machines to understand, interpret, and generate human language. Key tasks include tokenization, sentiment analysis, and Named Entity Recognition (NER). We'll get hands-on with libraries like SpaCy.",
                duration: "1h 30m"
            }],
            quiz: [
                { questionText: "NLP helps with:", options: ["Language tasks", "Drawing shapes", "Graphing"], correctAnswerIndex: 0 },
                { questionText: "Tokenization breaks text into:", options: ["Words/tokens", "Folders", "Emails"], correctAnswerIndex: 0 },
                { questionText: "NER finds:", options: ["Entities in text", "Passwords", "Ping speeds"], correctAnswerIndex: 0 },
                { questionText: "Sentiment analysis detects:", options: ["Emotion", "Spam", "Graph colors"], correctAnswerIndex: 0 },
                { questionText: "`spacy.load()` loads:", options: ["NLP model", "GraphQL query", "CSS theme"], correctAnswerIndex: 0 },
                { questionText: "Text generation is done by:", options: ["Language models", "React components", "Loops"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 5: Computer Vision and Real-World AI",
            lessons: [{
                title: "Intro to Computer Vision",
                content: "Computer Vision enables machines to see, analyze, and act on visual data. Use cases range from face detection and object tracking to medical image analysis. We will explore practical examples using the OpenCV library.",
                duration: "1h 30m"
            }],
            quiz: [
                { questionText: "OpenCV is used for:", options: ["Image processing", "APIs", "Game engines"], correctAnswerIndex: 0 },
                { questionText: "OCR means:", options: ["Optical Character Recognition", "Online CSS Resource", "Object Circular Rendering"], correctAnswerIndex: 0 },
                { questionText: "`cv2.imread()` loads:", options: ["Images", "APIs", "Fonts"], correctAnswerIndex: 0 },
                { questionText: "Object tracking is used in:", options: ["Surveillance", "HTML parsing", "SQL Joins"], correctAnswerIndex: 0 },
                { questionText: "Medical imaging is part of:", options: ["AI in healthcare", "Databases", "Frontend dev"], correctAnswerIndex: 0 },
                { questionText: "`cv2.imshow()` displays:", options: ["Image windows", "JSON", "Web pages"], correctAnswerIndex: 0 },
            ]
        },
        {
            title: "Module 6: Ethics, AI Safety, and the Future",
            lessons: [{
                title: "AI Ethics and the Future",
                content: "With great power comes great responsibility. This module addresses critical topics like bias in AI, data privacy, transparency, and the societal impact of automation. We'll discuss AI safety and the ongoing quest for explainable AI.",
                duration: "1h 30m"
            }],
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
    finalAssessment: [
        { questionText: "Define Artificial Intelligence and its main goal.", options: ["The science of building intelligent machines that simulate human thinking.", "The study of computer hardware.", "A new programming language."], correctAnswerIndex: 0 },
        { questionText: "Name 3 branches of AI.", options: ["Machine Learning, NLP, Computer Vision.", "Web Development, Mobile Development, Game Development.", "Database Management, Network Security, System Administration."], correctAnswerIndex: 0 },
        { questionText: "What is supervised vs unsupervised learning?", options: ["Supervised uses labeled data; unsupervised does not.", "Supervised is for text; unsupervised for images.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "Write sample ML code in Python using scikit-learn.", options: ["`from sklearn.linear_model import LinearRegression; model = LinearRegression()`", "`import react from 'react'`", "`let x = 10`"], correctAnswerIndex: 0 },
        { questionText: "Explain what a neural network does.", options: ["It processes data in layers of nodes, modeled after the human brain.", "It stores data in a database.", "It displays images on a screen."], correctAnswerIndex: 0 },
        { questionText: "What does CNN stand for, and what’s it used for?", options: ["Convolutional Neural Network, used for image processing.", "Complex Network Node, for networking.", "Central Node Network, for databases."], correctAnswerIndex: 0 },
        { questionText: "Compare RNN and CNN.", options: ["RNNs are for sequential data; CNNs are for grid-like data like images.", "RNNs are faster than CNNs.", "There is no difference."], correctAnswerIndex: 0 },
        { questionText: "Define NLP and give two examples of its use.", options: ["Natural Language Processing; used in chatbots and language translation.", "Network Layer Protocol; used in networking.", "New Logic Path; a programming paradigm."], correctAnswerIndex: 0 },
        { questionText: "What is tokenization?", options: ["Breaking text into smaller units like words or sentences.", "A method for securing APIs.", "A type of data compression."], correctAnswerIndex: 0 },
        { questionText: "Write a sample SpaCy NER snippet.", options: ["`import spacy; nlp = spacy.load('en_core_web_sm'); doc = nlp('text');`", "`console.log('Hello, world!');`", "`print('Hello, world!')`"], correctAnswerIndex: 0 },
        { questionText: "What does OpenCV do?", options: ["An open-source library for computer vision tasks.", "A database management system.", "A web framework."], correctAnswerIndex: 0 },
        { questionText: "Explain the risks of biased AI.", options: ["It can lead to unfair and discriminatory outcomes.", "It can make the AI run faster.", "There are no risks."], correctAnswerIndex: 0 },
        { questionText: "What is AGI?", options: ["Artificial General Intelligence, a hypothetical AI with human-like intelligence.", "Advanced Graphical Interface.", "API Governance Index."], correctAnswerIndex: 0 },
        { questionText: "How can we ensure ethical use of AI?", options: ["Through transparency, fairness, and accountability.", "By keeping the AI's workings secret.", "It is not possible."], correctAnswerIndex: 0 },
        { questionText: "List 2 real-world applications of AI today.", options: ["Facial recognition and virtual assistants.", "Printing documents and sending emails.", "Browsing the web and watching videos."], correctAnswerIndex: 0 },
    ]
};

const allCourses: NewCourse[] = [
    introToProgrammingCourse,
    machineLearningBasics,
    devOpsPracticesCourse,
    advancedProgrammingCourse,
    apisAndBackend,
    cybersecurityAdvanced,
    techLeadership,
    researchInTechnology,
    innovationProductEngineering,
    apiDevelopmentAdvanced,
    mobileAppDevelopment,
    databaseDesignCourse,
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
    allCourses.forEach(courseData => {
        const newCourseDoc = doc(coursesCollection);
        // We can just cast here because the objects are statically defined and known to be correct.
        // In a real-world scenario with dynamic data, you'd use Zod to parse.
        batch.set(newCourseDoc, courseData as any);
    });
    await batch.commit();
    console.log(`Successfully seeded ${allCourses.length} courses.`);
}
