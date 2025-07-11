
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { z } from 'zod';

const advancedProgrammingCourse: NewCourse = {
    title: "Advanced Programming",
    description: "Understand advanced programming concepts beyond syntax, improve problem-solving skills, and learn to think like a software engineer.",
    longDescription: "This course will help you understand advanced programming concepts beyond syntax, improve your problem-solving skills with real-world examples, dive into Object-Oriented Programming, recursion, data structures, and algorithms, learn modular design, file handling, and error management, and think like a software engineer, not just a coder.",
    category: "Tech Skills",
    level: "Intermediate",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "12h",
    instructor: "The Code Crafters",
    price: 5000,
    modules: [
        {
            title: "Module 1: Object-Oriented Programming (OOP)",
            lessons: [{
                title: "What is OOP?",
                content: "OOP is a programming paradigm based on the concept of **“objects”**—data bundled with methods that operate on that data.\n\n> Imagine you’re designing a video game.\n> Each character (e.g., Dragon, Wizard) can move, attack, and defend. They all have health, armor, and weapons.\n\nOOP lets you model this logically and efficiently.\n\n### Key OOP Concepts\n\n1. **Class**: A blueprint (e.g., `class Car:`)\n2. **Object**: A real instance of a class (e.g., `myCar = Car()`)\n3. **Encapsulation**: Keeping data safe inside a class\n4. **Inheritance**: One class can inherit another’s traits\n5. **Polymorphism**: Same method, different behavior\n6. **Abstraction**: Hiding unnecessary details\n\n### Python OOP Example:\n\n```python\nclass Animal:\n    def speak(self):\n        return \"Generic sound\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\nbuddy = Dog()\nprint(buddy.speak())  # Output: Woof!\n```\n\n### Why It Matters\n\n* Makes your code **reusable**\n* Helps with **team collaboration**\n* Reflects **real-world** structures\n* Used heavily in frameworks (e.g., Django, React Components)",
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
                content: "Data structures organize and store data efficiently.\nExamples:\n\n* **Lists/Arrays**\n* **Stacks** (LIFO)\n* **Queues** (FIFO)\n* **Linked Lists**\n* **Trees**\n* **Hash Maps**\n* **Graphs**\n\n### Why Use Them?\n\nBecause:\n\n* Searching is faster\n* Memory is used wisely\n* Operations like sorting, insertion, and deletion are optimized\n\n### Algorithms\n\nAlgorithms are step-by-step instructions to solve problems.\n\n🔑 Famous ones:\n\n* **Binary Search**\n* **Sorting (Merge, Quick, Bubble)**\n* **Graph Traversal (DFS, BFS)**\n* **Dijkstra’s Algorithm (Shortest Path)**\n\n### Example Challenge: Sorting a List\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n```",
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
                content: "File handling allows your program to **read/write from external files** like `.txt`, `.json`, `.csv`, etc.\n\n```python\n# Reading a file\nwith open(\"data.txt\", \"r\") as file:\n    print(file.read())\n```\n\n### Modular Design\n\nModular design = break large programs into smaller, independent modules.\n\nExample:\n\n```python\n# main.py\nfrom utils.math_tools import add\n\nprint(add(3, 4))\n```\n\nBenefits:\n\n* Easier maintenance\n* Clean code structure\n* Reusability across projects",
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
                content: "Because no matter how smart you are, your code will break.\n**Error handling** prevents your program from crashing like a toddler after sugar.\n\n### Python Example:\n\n```python\ntry:\n    num = int(input(\"Enter a number: \"))\nexcept ValueError:\n    print(\"That wasn't a number.\")\n```\n\n### Debugging Tools\n\n* `print()` debugging (old but gold)\n* Python’s built-in `pdb`\n* IDE debuggers (VSCode, PyCharm)\n\n### Best Practices\n\n* Anticipate common errors (input, division, missing files)\n* Use `try`, `except`, `finally`\n* Log errors using `logging` module\n* Never leave a bare `except:` — always specify the exception",
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
                content: "* Name variables clearly\n* Avoid long functions\n* Follow DRY (Don’t Repeat Yourself)\n* Add docstrings\n* Use meaningful comments (not “# do stuff”)\n\n### PEP 8: Python’s Style Guide\n\nEnforces:\n\n* Indentation\n* Line length (max 79 chars)\n* Naming conventions\n* Whitespace formatting\n\n### Real Practice\n\nBad:\n\n```python\nx = 123\ndef a(x): return x*3\n```\n\nGood:\n\n```python\ndef triple_number(number):\n    \"\"\"Returns the input number multiplied by 3.\"\"\"\n    return number * 3\n```",
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
    finalAssessment: {
        questions: [
            { questionText: "Explain the 4 pillars of OOP." },
            { questionText: "What is the difference between a class and an object?" },
            { questionText: "What is polymorphism in real-world programming?" },
            { questionText: "Compare stacks and queues." },
            { questionText: "What is a hash map and when would you use one?" },
            { questionText: "Write Python code to open and read a file named “log.txt”." },
            { questionText: "What is modular design and why is it important?" },
            { questionText: "Explain the difference between `try`, `except`, and `finally`." },
            { questionText: "List 3 common exceptions in Python." },
            { questionText: "Why should you avoid empty `except:` blocks?" },
            { questionText: "What’s the use of the `logging` module?" },
            { questionText: "List 3 best practices from PEP 8." },
            { questionText: "Explain the DRY principle with an example." },
            { questionText: "How do clean code practices help in teamwork?" },
            { questionText: "Write a Python function that returns the factorial of a number using recursion." },
        ]
    }
};

const devOpsPracticesCourse: NewCourse = {
    title: "DevOps Practices",
    description: "Automate software development pipelines, use tools like GitHub Actions, Docker, Jenkins, and Kubernetes, and deploy software faster, safer, and smarter.",
    longDescription: "This course will help you understand what DevOps is and why it matters, automate software development pipelines, use tools like GitHub Actions, Docker, Jenkins, and Kubernetes, deploy software faster, safer, and smarter, and monitor and maintain live systems like a pro.",
    category: "Tech Skills",
    level: "Intermediate",
    imageUrl: "https://placehold.co/600x400.png",
    duration: "12h",
    instructor: "The DevOps Brigade",
    price: 5000,
    modules: [
        {
            title: "Module 1: Introduction to DevOps",
            lessons: [{
                title: "What is DevOps?",
                content: "DevOps = Development + Operations\nIt’s a **culture**, **process**, and **toolset** that bridges developers and system administrators to:\n\n* Deliver software faster\n* Maintain high reliability\n* Automate repetitive tasks\n\n> Think of DevOps like this: Developers build the car. Ops fuels it, maintains it, and ensures it never crashes… even while driving 200mph.\n\n### Core Principles of DevOps\n\n1. **Automation**: Build, test, and deploy without manual effort\n2. **Continuous Integration/Continuous Deployment (CI/CD)**\n3. **Monitoring**: Real-time app performance and uptime\n4. **Collaboration**: Dev and Ops aren’t rivals. They’re teammates now.\n\n### Key Tools in DevOps\n\n| Area          | Tools                              |\n| ------------- | ---------------------------------- |\n| CI/CD         | GitHub Actions, Jenkins, GitLab CI |\n| Containers    | Docker                             |\n| Orchestration | Kubernetes                         |\n| Monitoring    | Prometheus, Grafana                |\n| Infra         | Terraform, AWS, Azure              |",
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
                content: "### What is CI?\n\n**Continuous Integration** = automatically testing and merging code when changes are pushed to version control (e.g., GitHub).\n\n### What is CD?\n\n**Continuous Deployment/Delivery** = automatically deploying your tested app to production or staging environments.\n\n### Sample CI/CD Workflow (GitHub Actions)\n\n```yaml\nname: Node CI\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Install dependencies\n        run: npm install\n      - name: Run tests\n        run: npm test\n```\n\n### Benefits of CI/CD\n\n* Faster shipping\n* Catch bugs early\n* Standardized deployment\n* Happy devs and users 🥳",
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
                content: "### What Is Docker?\n\nDocker packages your app with everything it needs (code, dependencies, environment) into **containers**.\n\n> Think of Docker as a shipping container for software — identical, portable, and consistent.\n\n### Docker vs Traditional Deployment\n\n| Traditional          | Docker             |\n| -------------------- | ------------------ |\n| Works on one machine | Works anywhere     |\n| Needs manual setup   | Prebuilt images    |\n| Inconsistent results | Predictable builds |\n\n### Basic Dockerfile Example\n\n```Dockerfile\nFROM node:16  \nWORKDIR /app  \nCOPY . .  \nRUN npm install  \nCMD [\"npm\", \"start\"]\n```\n\n### Docker Commands\n\n* `docker build . -t myapp`\n* `docker run -p 3000:3000 myapp`\n* `docker ps`\n* `docker stop <container>`",
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
                content: "### What is IaC?\n\nInfrastructure as Code means **automating infrastructure setup** using code, not manual clicks.\n\n> With tools like Terraform, you can spin up servers, databases, and load balancers in seconds — with one file.\n\n### Why It Rocks\n\n* Reproducible environments\n* Version-controlled infrastructure\n* Scalable and consistent\n\n### Terraform Basics\n\nTerraform syntax:\n\n```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-123456\"\n  instance_type = \"t2.micro\"\n}\n```\n\n### Tools\n\n* **Terraform** – Multi-cloud IaC\n* **Ansible** – Configuration management\n* **Pulumi** – IaC with JavaScript",
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
                content: "### Why Monitor?\n\nMonitoring shows how your app behaves in production:\n\n* Is it up?\n* Is it fast?\n* Are there errors?\n\n### Tools for Monitoring\n\n| Category | Tools                                       |\n| -------- | ------------------------------------------- |\n| Logs     | ELK Stack (Elasticsearch, Logstash, Kibana) |\n| Metrics  | Prometheus, Grafana                         |\n| Alerts   | PagerDuty, New Relic                        |\n\n### Dashboards\n\nVisualize metrics in **real-time** — CPU, memory, traffic, errors.",
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
                content: "### DevOps is More Than Tools\n\nDevOps is also about:\n\n* Shared responsibility\n* Breaking silos\n* Transparency\n* Continuous improvement\n\n### Collaboration Practices\n\n* Pair programming between Dev and Ops\n* Shared dashboards\n* Blameless postmortems\n* Clear documentation\n\n### KPIs in DevOps\n\n* Deployment frequency\n* Mean time to recovery (MTTR)\n* Change failure rate\n* Lead time for changes",
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
    finalAssessment: {
        questions: [
            { questionText: "What does DevOps aim to solve?" },
            { questionText: "List 3 popular DevOps tools and their functions." },
            { questionText: "What is CI/CD and why is it important?" },
            { questionText: "Write a simple GitHub Actions CI workflow." },
            { questionText: "What is a Docker container?" },
            { questionText: "How does Docker differ from traditional deployment?" },
            { questionText: "List 3 Docker commands and their purposes." },
            { questionText: "What is IaC?" },
            { questionText: "What are the benefits of using Terraform?" },
            { questionText: "Name 2 monitoring tools and their roles." },
            { questionText: "How does logging help in debugging?" },
            { questionText: "What is a blameless postmortem and why is it useful?" },
            { questionText: "Explain MTTR and its significance." },
            { questionText: "How does DevOps culture differ from traditional IT?" },
            { questionText: "Create a deployment plan for a Node.js app using Docker and GitHub Actions." },
        ]
    }
};


const allCourses: NewCourse[] = [
    {
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
                lessons: [{
                    title: "What Is AI?",
                    content: "Artificial Intelligence is the science of building **intelligent machines** that simulate human thinking.\n\n> In plain English: teaching computers to *think*, *reason*, and *act smart*. Sometimes smarter than us. 😅\n\n### Key AI Concepts\n\n* **Agents**: An entity that perceives and acts\n* **Environment**: Where the agent operates\n* **Rationality**: Choosing the best action for the goal\n* **Turing Test**: Can a machine think like a human?\n\n### Branches of AI\n\n| Branch | Description |\n| --- | --- |\n| Machine Learning | Learning patterns from data |\n| Natural Language Processing (NLP) | Understanding human language |\n| Computer Vision | Interpreting visual input |\n| Robotics | Acting in the physical world |\n| Expert Systems | Rule-based reasoning |\n\n### Fun Fact:\n\nThe first AI program was written in **1956**, and it could play checkers.\nToday, we have AI writing poetry, driving cars, and diagnosing cancer.",
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
                    content: "A method where computers **learn from data** without being explicitly programmed.\n\n> Think of it like feeding your machine examples until it gets smart enough to handle new situations.\n\n### Types of Machine Learning\n\n| Type | Description | Example |\n| --- | --- | --- |\n| Supervised | Learn from labeled data | Spam detection |\n| Unsupervised | Discover patterns | Customer segmentation |\n| Reinforcement | Learn by trial & error | Game-playing AI |\n\n### Core Concepts\n\n* **Features**: Input variables\n* **Labels**: Output results (for supervised learning)\n* **Model**: Mathematical function\n* **Training**: Adjusting model to data\n* **Loss function**: Measures errors\n* **Backpropagation**: Algorithm to optimize model\n\n### Sample ML Code (Scikit-Learn)\n\n```python\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\n```",
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
                    content: "Neural networks are modeled after the human brain — made of **neurons** (nodes), layers, and weights.\n\n### Layers of a Neural Network\n\n1. Input Layer\n2. Hidden Layer(s)\n3. Output Layer\n\n### Types of Neural Networks\n\n| Type | Use Case |\n| --- | --- |\n| Feedforward (DNN) | General tasks |\n| CNN (Convolutional) | Image recognition |\n| RNN (Recurrent) | Time-series, language |\n| GAN (Generative Adversarial Network) | Deepfake, image generation |\n\n### Deep Learning Example (TensorFlow)\n\n```python\nimport tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(128, activation='relu'),\n  tf.keras.layers.Dense(1)\n])\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X, y, epochs=10)\n```",
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
                    content: "Natural Language Processing enables machines to understand, interpret, and generate **human language**.\n\n### NLP Tasks\n\n* **Tokenization**\n* **Stemming/Lemmatization**\n* **Named Entity Recognition (NER)**\n* **Sentiment Analysis**\n* **Text Generation** (like me! 😉)\n\n### NLP Example with SpaCy\n\n```python\nimport spacy\nnlp = spacy.load(\"en_core_web_sm\")\ndoc = nlp(\"Apple is looking at buying U.K. startup for $1 billion.\")\nfor ent in doc.ents:\n    print(ent.text, ent.label_)\n```",
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
                    content: "It enables machines to **see, analyze, and act** on visual data.\n\n### Use Cases\n\n* Face detection\n* Object tracking\n* OCR (Text recognition)\n* Medical image analysis\n\n### OpenCV Example\n\n```python\nimport cv2\nimg = cv2.imread('image.jpg')\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\ncv2.imshow('Gray Image', gray)\n```",
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
                    content: "### AI Ethics\n\nImportant topics:\n\n* **Bias in AI**\n* **Transparency**\n* **Data privacy**\n* **AI and Jobs**\n* **Autonomous decision-making**\n\n### AI Safety\n\n* Preventing **unintended behavior**\n* Ensuring **human control**\n* Building **explainable AI**\n\n### The Future of AI\n\n* AI as co-creators\n* General AI (AGI)\n* Regulation and governance\n* *“Should AI have rights?”* 😱",
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
        finalAssessment: {
            questions: [
                { questionText: "Define Artificial Intelligence and its main goal." },
                { questionText: "Name 3 branches of AI." },
                { questionText: "What is supervised vs unsupervised learning?" },
                { questionText: "Write sample ML code in Python using scikit-learn." },
                { questionText: "Explain what a neural network does." },
                { questionText: "What does CNN stand for, and what’s it used for?" },
                { questionText: "Compare RNN and CNN." },
                { questionText: "Define NLP and give two examples of its use." },
                { questionText: "What is tokenization?" },
                { questionText: "Write a sample SpaCy NER snippet." },
                { questionText: "What does OpenCV do?" },
                { questionText: "Explain the risks of biased AI." },
                { questionText: "What is AGI?" },
                { questionText: "How can we ensure ethical use of AI?" },
                { questionText: "List 2 real-world applications of AI today." },
            ]
        }
    },
    {
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
                lessons: [{
                    title: "REST Principles and Best Practices",
                    content: "### REST Recap\n\n* REST stands for **Representational State Transfer**\n* Built on HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, etc.\n* Resource-based: Each entity (user, post, product) is a resource\n\n### Best Practices\n\n* **Use nouns, not verbs** in URLs:\n  ✅ `/users` instead of `/getUsers`\n\n* **Proper HTTP status codes:**\n\n  * 200 OK\n  * 201 Created\n  * 204 No Content\n  * 400 Bad Request\n  * 401 Unauthorized\n  * 404 Not Found\n  * 500 Server Error\n\n* **Pagination:** For large data\n  Example: `GET /users?page=2&limit=10`\n\n* **Filtering & Sorting:**\n  `GET /products?category=phones&sort=price_desc`\n\n### Example (Node.js + Express)\n\n```javascript\napp.get('/users/:id', async (req, res) => {\n  try {\n    const user = await User.findById(req.params.id);\n    if (!user) return res.status(404).send(\"User not found\");\n    res.json(user);\n  } catch (err) {\n    res.status(500).send(\"Server error\");\n  }\n});\n```",
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
                    content: "* **Authentication:** Who are you?\n* **Authorization:** What can you access?\n\n### OAuth 2.0 Flow (Simplified)\n\n1. Client asks for permission\n2. User authenticates with provider (Google, Facebook)\n3. Provider sends back `access_token`\n4. Client uses token to access API\n\n### OpenID Connect\n\nAdds an identity layer on top of OAuth2 (for authentication).\nTokens:\n\n* **ID Token** – Who the user is\n* **Access Token** – What the user can do\n\n### JWT Tokens\n\n```js\n// Sign\nconst token = jwt.sign({ userId: 123 }, 'secret', { expiresIn: '1h' });\n\n// Verify\njwt.verify(token, 'secret');\n```",
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
                    content: "### Why Document?\n\nUnclear APIs = Confused developers = Bad adoption\nGood docs = More usage = Fewer support tickets\n\n### Tools\n\n* **Swagger (OpenAPI)**:\n  Define API structure in `openapi.yaml` or JSON\n\n* **Postman Collections**:\n  Shareable testable APIs with environment variables\n\n### Swagger Example\n\n```yaml\npaths:\n  /users:\n    get:\n      summary: Get all users\n      responses:\n        200:\n          description: A list of users\n```\n\n### Postman Tips\n\n* Use `environments` for tokens and URLs\n* Add tests and pre-request scripts\n* Export collections to share with frontend devs",
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
                    content: "### API Versioning\n\n* URI versioning: `/v1/users`\n* Header versioning: `Accept: application/vnd.api+json;version=2`\n\nWhy? Backward compatibility.\n\n### Rate Limiting\n\nLimit requests per IP/token\n**Node.js (express-rate-limit)**:\n\n```js\nconst rateLimit = require(\"express-rate-limit\");\napp.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));\n```\n\n### Caching APIs\n\n* **Client-side caching**: `Cache-Control` headers\n* **Server-side caching**: Redis\n* **Reverse proxy caching**: Varnish, NGINX",
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
                    content: "### Automated Testing\n\n* **Unit tests**: Test individual functions\n* **Integration tests**: Test endpoints with dependencies\n* **Tools**: Jest, Mocha, Supertest\n\n### Example\n\n```js\nconst request = require('supertest');\nrequest(app)\n  .get('/api/users')\n  .expect(200)\n  .end((err, res) => { /* assertions */ });\n```\n\n### API Monitoring\n\n* Tools: **New Relic**, **Datadog**, **Postman Monitors**\n* Track latency, error rates, uptime, memory usage",
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
                    content: "### Monolith vs Microservices\n\n| Monolith | Microservices |\n| --- | --- |\n| One large codebase | Split by services |\n| Shared memory | Communicate via APIs |\n| Easier to build | Easier to scale |\n\n### Microservice Best Practices\n\n* Each service owns its **own DB**\n* Use **service discovery**\n* Communicate via **REST or message brokers** (e.g. RabbitMQ, Kafka)\n* Use **API Gateway** for authentication, routing, and rate limiting\n\n### Example Architecture\n\n```text\nClient -> API Gateway -> Auth Service\n                        -> User Service\n                        -> Product Service\n```",
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
                { questionText: "Write a `GET` endpoint in Express that returns a paginated list of users." },
            ]
        }
    },
    {
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
                lessons: [{
                    title: "What is an API?",
                    content: "### What Is an API?\n\n**API = Application Programming Interface**\nIt's like a **waiter in a restaurant** 🍽️ — takes your request to the kitchen (server), and brings the response (data) back.\n\nAPIs let software **talk to each other** — your mobile app talks to your backend via API.\n\n### Types of APIs\n\n| Type | Description | Example |\n| --- | --- | --- |\n| REST | Web-standard, uses HTTP methods | JSONPlaceholder |\n| SOAP | XML-based, strict rules | Legacy banking APIs |\n| GraphQL | Flexible querying | GitHub API |\n| WebSocket | Real-time, 2-way | Chat apps, games |",
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
                    content: "### Tools You'll Use\n\n* **Node.js** – JavaScript runtime\n* **Express.js** – Web framework\n* **Postman** – API testing\n* **npm** – Dependency manager\n\n### Setting Up a Simple API\n\n```bash\nnpm init -y\nnpm install express\n```\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/hello', (req, res) => {\n  res.json({ message: 'Hello API World!' });\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));\n```\n\n### HTTP Methods in Action\n\n| Route | Method | Purpose |\n| --- | --- | --- |\n| `/users` | GET | Get users |\n| `/users` | POST | Add user |\n| `/users/:id` | PUT | Update user |\n| `/users/:id` | DELETE | Delete user |",
                    duration: "1h"
                }],
                quiz: [
                    { questionText: "`express.json()` is used to:", options: ["Parse JSON in requests", "Animate headers", "Compress responses"], correctAnswerIndex: 0 },
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
                    content: "### Why Secure APIs?\n\nUnsecured APIs are like **open bank vaults** — anyone can steal your data. Protect your endpoints!\n\n### Methods of API Security\n\n* **API Keys** – Basic security (limited)\n* **Bearer Tokens (JWT)** – Most common\n* **OAuth2** – Third-party login (Google, Facebook)\n* **Rate Limiting** – Prevent abuse\n\n### JWT Authentication Example\n\n```javascript\nconst jwt = require('jsonwebtoken');\nconst token = jwt.sign({ userId: 1 }, 'secret', { expiresIn: '1h' });\n```\n\n```javascript\n// Middleware to verify\nfunction authMiddleware(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ message: 'Unauthorized' });\n  try {\n    req.user = jwt.verify(token, 'secret');\n    next();\n  } catch {\n    res.status(403).json({ message: 'Forbidden' });\n  }\n}\n```",
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
                    content: "### Why Connect to a Database?\n\nAPIs often serve as the **middleman** between your frontend and your **database** — storing user data, posts, or products.\n\n### Example: MongoDB + Express\n\n```javascript\nconst mongoose = require('mongoose');\nmongoose.connect('mongodb://localhost/mydb');\n```\n\nDefine a model:\n\n```javascript\nconst User = mongoose.model('User', {\n  name: String,\n  email: String\n});\n```\n\nCreate a user:\n\n```javascript\napp.post('/api/users', async (req, res) => {\n  const user = new User(req.body);\n  await user.save();\n  res.status(201).json(user);\n});\n```",
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
                    content: "### What is GraphQL?\n\nGraphQL is a **query language** that allows clients to ask **only for the data they need** — nothing more, nothing less.\n\n> “It’s like ordering à la carte instead of a whole combo meal.” 🍱\n\n### REST vs GraphQL\n\n| Feature | REST | GraphQL |\n| --- | --- | --- |\n| Data Retrieval | Multiple endpoints | One endpoint |\n| Data Format | Fixed | Flexible |\n| Overfetch/Underfetch | Yes | No |\n\n### Basic GraphQL Example\n\n```graphql\nquery {\n  user(id: \"1\") {\n    name\n    email\n  }\n}\n```\n\n### Server Setup with Apollo Server\n\n```javascript\nconst { ApolloServer, gql } = require('apollo-server');\n\nconst typeDefs = gql`\n  type User { id: ID, name: String }\n  type Query { user(id: ID): User }\n`;\n\nconst resolvers = {\n  Query: {\n    user: () => ({ id: \"1\", name: \"John\" })\n  }\n};\n\nconst server = new ApolloServer({ typeDefs, resolvers });\nserver.listen().then(() => console.log(\"GraphQL server ready\"));\n```",
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
                    content: "### API Testing Tools\n\n* **Postman** – Manual testing\n* **Jest + Supertest** – Automated testing\n* **Insomnia** – Great UI for API tests\n\n### Deployment Steps\n\n1. Push code to GitHub\n2. Set up **Render, Railway, or Vercel**\n3. Connect MongoDB (MongoDB Atlas)\n4. Add environment variables\n5. Deploy and monitor",
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
    },
    {
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
                lessons: [{
                    title: "Threat Modeling & Analysis",
                    content: "### What Is Threat Modeling?\n\nIt’s the process of identifying **potential threats**, **vulnerabilities**, and **mitigation strategies** before your app even goes live.\n\n> Like imagining all the ways your house could be broken into—then setting up lasers, moats, and maybe a dragon 🐉.\n\n### Core Concepts\n\n* **Assets**: What needs protection (e.g., data, credentials)\n* **Attackers**: Who might try to harm the system\n* **Entry Points**: How attackers might get in\n* **STRIDE Model**:\n\n  * **S**poofing\n  * **T**ampering\n  * **R**epudiation\n  * **I**nformation Disclosure\n  * **D**enial of Service\n  * **E**levation of Privilege\n\n### Attack Surface\n\n* Every **publicly accessible endpoint**\n* All **third-party integrations**\n* Mobile APIs, cloud services, login pages, etc.\n\n### Tools & Practices\n\n* Microsoft Threat Modeling Tool\n* OWASP Threat Dragon\n* Visual threat maps",
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
                    content: "### What Is Pen Testing?\n\nSimulated attacks on your system to find vulnerabilities **before real attackers do**.\n\n### Pen Testing Lifecycle\n\n1. Reconnaissance (passive & active scanning)\n2. Scanning (Nmap, Nessus)\n3. Gaining Access (exploitation)\n4. Maintaining Access (backdoors, reverse shells)\n5. Covering Tracks\n\n### Red Team vs Blue Team\n\n| Team | Role |\n| --- | --- |\n| Red | Simulates attackers (ethical hackers) |\n| Blue | Defenders (security ops team) |\n\nPurple teams coordinate both for training.\n\n### Tools of the Trade\n\n* **Kali Linux**\n* **Burp Suite**\n* **Metasploit**\n* **Wireshark**\n* **OWASP ZAP**",
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
                    content: "### What Is Zero Trust?\n\n“**Never trust, always verify**.”\nAssume **every user**, **device**, and **connection** is hostile by default.\n\n### Core Principles\n\n* Continuous **authentication**\n* Granular **access control**\n* Least privilege enforcement\n* Microsegmentation\n* Device posture validation\n\n### Implementing ZTA\n\n* Identity Provider (Okta, Azure AD)\n* Multi-factor Authentication (MFA)\n* Per-request validation (tokens, device checks)\n* Monitoring & logging",
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
                    content: "### Secure Code Matters\n\nBad code = vulnerable app\nYou are your first line of defense.\n\n### Common Code Vulnerabilities\n\n* SQL Injection\n* Cross-Site Scripting (XSS)\n* Insecure Deserialization\n* Broken Authentication\n* Cross-Site Request Forgery (CSRF)\n\n### Example: XSS in JavaScript\n\n```html\n<script>alert('Hacked');</script>\n```\n\nSolution:\n\n* Sanitize inputs\n* Escape outputs\n* Use CSP headers\n\n### DevSecOps Integration\n\n* Static code analysis (SonarQube, Snyk)\n* Dependency scanning\n* Secure CI/CD pipelines\n* Secrets management (Vault, AWS Secrets Manager)",
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
                    content: "### Network Security Concepts\n\n* Firewalls (stateful/NGFW)\n* IDS/IPS systems (Snort, Suricata)\n* VPN and tunneling\n* Packet sniffing and encryption\n\n### Cloud Security Musts\n\n* Cloud-native firewalls (AWS WAF, Azure Firewall)\n* IAM roles & policies\n* Encryption at rest/in-transit\n* Bucket policies (S3), audit trails\n\n### Defense Layers\n\n* DMZ setup\n* Bastion hosts\n* Zero-trust cloud perimeters\n* DDoS protection (Cloudflare, AWS Shield)",
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
                    content: "### What Is Incident Response?\n\nThe structured approach to detecting, analyzing, and mitigating cyber threats.\n\n### IR Plan Stages\n\n1. Preparation\n2. Detection & Analysis\n3. Containment\n4. Eradication\n5. Recovery\n6. Lessons Learned\n\n### IR Roles\n\n* IR Manager\n* Forensics Analyst\n* Communication Officer\n* SOC Team (Security Operations Center)\n\n### Digital Forensics Tasks\n\n* Log analysis\n* Malware reverse engineering\n* Evidence preservation\n* Chain of custody documentation",
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
    },
    {
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
                lessons: [{
                    title: "From Coder to Leader",
                    content: "### From Coder to Leader\n\n> “A good developer solves problems. A great tech leader helps *others* solve problems.”\n\nThis is the evolution:\n\n* **Individual Contributor (IC)**: Write code, fix bugs, ship features\n* **Tech Lead**: Guide team technically, mentor junior devs\n* **Engineering Manager**: Drive execution, remove blockers\n* **CTO / VP Eng**: Set vision, manage teams/orgs, report to execs\n\n### Key Qualities of a Tech Leader\n\n* Vision-driven\n* Accountable\n* Empathetic\n* Strategic\n* Communicative\n* Calm under pressure (yes, even when the entire API breaks at 2 AM)\n\n### Leadership vs Management\n\n| Leadership | Management |\n| --- | --- |\n| Inspires and aligns | Plans and organizes |\n| Focuses on people | Focuses on process |\n| Vision-oriented | Execution-oriented |\n\n> A great tech leader balances **both**!",
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
                    content: "### Team Composition\n\n* Balance of skills: senior, mid, junior\n* Mix of frontend/backend/QA/devops\n* Hire for **attitude and adaptability**, not just skillset\n\n### Defining Roles and Goals\n\n* Role clarity prevents burnout & overlap\n* Set **SMART goals**\n\n  * Specific\n  * Measurable\n  * Achievable\n  * Relevant\n  * Time-bound\n\n### Leading Effective Standups\n\n* Focus on blockers, not micromanaging\n* 15 minutes max\n* Foster psychological safety so all voices are heard\n\n### Feedback & Performance\n\n* Regular 1:1s\n* Constructive, timely, and specific feedback\n* Praise in public, correct in private",
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
                    content: "### Making Smart Tech Choices\n\nTech leaders often decide:\n\n* **Which framework?**\n* **Which architecture?**\n* **When to scale?**\n* **Buy vs build?**\n\n### Frameworks for Decision-Making\n\n* **Trade-off matrix**\n* **Risk/reward mapping**\n* **Technical debt forecasting**\n* **TAM/SAM/SOM for product scaling**\n\n### Common Architectural Patterns\n\n* Monolith vs Microservices\n* Serverless vs container-based\n* Event-driven vs REST\n\n### Communicating Decisions\n\n* Back your choices with **data and empathy**\n* Involve stakeholders\n* Be **transparent** about risks and tradeoffs",
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
                    content: "### Scaling Teams\n\n* Add structure with **pods** (small cross-functional groups)\n* Layer leadership (tech leads, team leads, EMs)\n* Maintain team rituals: retros, show & tell, standups\n\n### Scaling Systems\n\n* Infrastructure automation (Terraform, Ansible)\n* Monitoring (Datadog, New Relic, Prometheus)\n* Scaling patterns (horizontal, vertical, stateless)\n\n### Scaling Culture\n\n* Culture scales through **behavioral reinforcement**\n* Celebrate wins\n* Document what matters\n* Onboard with clarity",
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
                    content: "### Leadership = Communication\n\n* Share the **why**, not just the **what**\n* Tailor message for audience (execs vs devs vs users)\n* Keep communication **frequent**, **clear**, and **empathetic**\n\n### Influencing Without Authority\n\n* Use **logic + emotion** to persuade\n* Align with goals\n* Gain buy-in through **storytelling**\n\n### Conflict Resolution\n\n* Address issues early\n* Focus on **problems**, not **personalities**\n* Use mediation and feedback tools\n\n### Emotional Intelligence (EQ)\n\n* Recognize your team’s stress, burnout, excitement\n* Leaders who “read the room” lead better rooms",
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
                    content: "### Vision = Direction\n\n* Where are we going?\n* Why does it matter?\n\nA leader paints the **future**—in terms your team can believe in.\n\n### Strategy Tools\n\n* OKRs (Objectives & Key Results)\n* V2MOM (Vision, Values, Methods, Obstacles, Measures)\n* 3 Horizons Framework (Innovation vs Sustaining projects)\n\n### Stakeholder Alignment\n\n* Identify stakeholders (product, design, execs, marketing, etc.)\n* Communicate impact + progress\n* Be proactive with risks\n\n### Leadership Reporting\n\n* Roadmaps\n* Budget & timelines\n* Metrics that matter (velocity, uptime, ROI, etc.)",
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
    },
    {
        title: "Research in Technology",
        description: "Equip learners with the skills to design, execute, and apply high-quality research in the field of technology and innovation.",
        longDescription: "This course will equip learners with the skills to design, execute, and apply high-quality research in the field of technology and innovation. You will understand the principles and methodology of technical research, conduct research-driven innovation in areas like AI, Web3, IoT, and more, analyze emerging tech trends with evidence-based frameworks, create hypotheses and validate them through data and testing, follow ethical guidelines for responsible innovation, and produce publishable research documentation and reports.",
        category: "Tech Skills",
        level: "Advanced",
        imageUrl: "https://placehold.co/600x400.png",
        duration: "24h",
        instructor: "The Research Team",
        price: 7000,
        modules: [
            {
                title: "Module 1: Introduction to Research in Technology",
                lessons: [{
                    title: "What Is Research in Tech?",
                    content: "Research in technology involves **systematic investigation** to discover, analyze, and improve systems, software, hardware, or methods. It fuels innovation, powers patents, drives decisions, and influences global trends.\n\n### Types of Research\n\n* **Basic Research**: Increases general knowledge (e.g., quantum computing models)\n* **Applied Research**: Solves practical problems (e.g., reducing server latency)\n* **Experimental Research**: Controlled studies with variables\n* **Exploratory Research**: Scouting emerging areas with limited information\n\n### Examples\n\n* Google’s Transformer model → Led to GPT\n* Amazon’s delivery drone research\n* MIT’s work on solar-powered microgrids\n\n> If you're doing research and no one understands you — congrats, you might be on to something.",
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
                    content: "### Key Phases\n\n1. **Problem Identification**\n2. **Literature Review**\n3. **Hypothesis Formulation**\n4. **Research Design & Methodology**\n5. **Data Collection & Analysis**\n6. **Conclusion & Recommendations**\n7. **Publishing or Application**\n\n### Literature Review\n\n* Survey past research\n* Identify what’s missing\n* Build your case for *why this matters*\n\nUse:\n\n* Google Scholar\n* IEEE Xplore\n* ACM Digital Library\n\n### Hypothesis Example\n\n> “Implementing federated learning will reduce training time for mobile AI by 30%.”\n\n### Research Design Methods\n\n* Quantitative (stats, measurement, benchmarks)\n* Qualitative (interviews, observations, open feedback)\n* Mixed Methods (both)",
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
                    content: "### Why Trends Matter\n\nTrends help you:\n\n* Predict industry shifts\n* Guide innovation\n* Identify future opportunities\n* Stay ahead of competitors\n\n### Trend Spotting Tools\n\n* Gartner Hype Cycle\n* Google Trends\n* Stack Overflow Surveys\n* MIT Tech Review\n* Hacker News, Arxiv, GitHub repos\n\n### Areas of Growth\n\n* AI Ethics & Regulation\n* Web3 and Decentralized Identity\n* Sustainable Tech & Green Computing\n* Neurotechnology\n* Edge Computing\n* Quantum Security\n\n### Analysis Frameworks\n\n* SWOT (Strengths, Weaknesses, Opportunities, Threats)\n* PEST (Political, Economic, Social, Technological)\n* Hype Cycle Phases:\n\n  * Innovation Trigger\n  * Peak of Inflated Expectations\n  * Trough of Disillusionment\n  * Slope of Enlightenment\n  * Plateau of Productivity",
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
                    content: "### Collecting Data in Tech Research\n\nMethods:\n\n* Instrumentation & telemetry\n* Logs and usage metrics\n* APIs & sensors\n* Surveys and interviews\n* GitHub analytics\n\n### Hypothesis Testing\n\n* Null Hypothesis (H0): No effect\n* Alternative Hypothesis (H1): Effect exists\n* Use p-values, confidence intervals, and statistical tests\n\n### Testing Examples\n\n* AB Testing\n* Regression analysis\n* Chi-square tests\n* T-tests for performance improvement\n\n### Tools\n\n* Jupyter Notebooks\n* Python: Pandas, NumPy, SciPy\n* R language\n* Tableau, Power BI",
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
                    content: "### Where to Publish\n\n* IEEE\n* ACM\n* arXiv\n* Google Research\n* Peer-reviewed journals\n* Medium/Dev.to (non-peer informal)\n\n### Presenting Research\n\n* Use storytelling: setup, struggle, solution\n* Keep it visual\n* Know your audience (tech, non-tech, execs)\n* Summarize results, then explain the details\n\n### Tools for Publication\n\n* LaTeX\n* Overleaf\n* Google Docs (for collaboration)\n* Mendeley / Zotero for citations\n\n### Applying Research\n\n* Product prototypes\n* Technical whitepapers\n* Patent applications\n* Startup ideation\n* Innovation sprints",
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
                    content: "### Why Ethics Matter\n\n* Innovation without boundaries → Danger\n* Trust and responsibility are non-negotiable in tech\n\n### Ethical Topics in Tech\n\n* AI bias and fairness\n* Surveillance vs privacy\n* Responsible data usage\n* Deepfake and misinformation risks\n* Automation vs job displacement\n\n### Frameworks\n\n* IEEE’s Ethically Aligned Design\n* Google AI Principles\n* EU’s GDPR & AI Act\n\n### Best Practices\n\n* Anonymous data collection\n* Consent & transparency\n* Bias audits in AI models\n* Open communication about risks",
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
        finalAssessment: {
            questions: [
                { questionText: "List the main phases of a research process." },
                { questionText: "Explain the difference between applied and basic research." },
                { questionText: "What is a hypothesis, and how is it tested?" },
                { questionText: "Describe the Gartner Hype Cycle and its phases." },
                { questionText: "List and explain at least three data collection methods in tech research." },
                { questionText: "What tools are used in technical data analysis?" },
                { questionText: "How does exploratory research work?" },
                { questionText: "What are the ethical concerns in AI research?" },
                { questionText: "Define and give examples of qualitative vs quantitative research." },
                { questionText: "What is arXiv, and how is it useful?" },
                { questionText: "Describe how to structure a research presentation." },
                { questionText: "What’s the role of the null hypothesis in testing?" },
                { questionText: "Name two tech trend spotting frameworks." },
                { questionText: "What is GDPR and how does it apply to researchers?" },
                { questionText: "How can research lead to product innovation?" },
            ]
        }
    },
    {
        title: "Innovation, Product Engineering & Tech Strategy",
        description: "Equip advanced tech professionals with the skills to innovate, engineer high-impact products, and align technology with long-term strategic vision.",
        longDescription: "This course will equip you to lead innovation from idea to impact, build lovable and scalable products, create and execute bold tech strategies, and balance vision, users, code, and business goals.",
        category: "Tech Skills",
        level: "Advanced",
        imageUrl: "https://placehold.co/600x400.png",
        duration: "24h",
        instructor: "The Strategists",
        price: 7000,
        modules: [
            {
                title: "Module 1: Innovation Principles & Practice",
                lessons: [{
                    title: "What Is Innovation (for Real)?",
                    content: "> Innovation ≠ invention.\n> Innovation = creating *value* from *new ideas*.\n\n* Not just something new — something *usefully* new\n* Must be adopted, applied, or bought by someone\n\n### Types of Innovation\n\n* **Disruptive** (Uber, GPTs)\n* **Sustaining** (iPhone 13 → 14)\n* **Process Innovation** (Agile, CI/CD)\n* **Business Model Innovation** (Netflix, SaaS)\n\n### Innovation Frameworks\n\n* **Design Thinking** (Empathize → Define → Ideate → Prototype → Test)\n* **Blue Ocean Strategy** (Create uncontested market space)\n* **TRIZ** (Inventive principles from engineering problems)\n\n### Examples\n\n* Amazon → Prime, Cloud, 1-click ordering\n* Tesla → OTA updates, battery innovation\n* OpenAI → ChatGPT API access to public",
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
                    content: "> **Minimum Viable Product** — the simplest version of your idea that delivers value and learns from users.\n\n* MVP ≠ junk\n* MVP = testable, usable, measurable\n* Think: \"Would people *miss* this if it disappeared?\"\n\n### The Product Lifecycle\n\n1. Idea → Prototype\n2. MVP → User feedback\n3. Product-Market Fit\n4. Scaling\n5. Maturity / Decline / Rebirth\n\n### Lean Product Cycles\n\n* Build → Measure → Learn\n* Focus: Minimize waste, maximize value\n* Uses metrics like:\n\n  * Activation\n  * Retention\n  * NPS (Net Promoter Score)\n  * Conversion Rate\n\n### Prioritization Frameworks\n\n* RICE (Reach × Impact × Confidence ÷ Effort)\n* MoSCoW (Must, Should, Could, Won’t)\n* Kano Model (Delighters vs Basics)",
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
                    content: "> Products scale. Code must too.\n> You’re not just shipping — you’re **engineering ecosystems**.\n\n* Decouple systems\n* API-first design\n* Backward compatibility\n* Feature flags, not feature fatigue\n\n### Key Tech for Product Builders\n\n* Feature toggles (LaunchDarkly, ConfigCat)\n* CI/CD (GitHub Actions, Jenkins)\n* Observability (Grafana, Datadog, Sentry)\n* Containerization (Docker, Kubernetes)\n\n### Performance & Resilience\n\n* Load testing\n* Failover systems\n* Canary deployments\n* Auto-scaling infra (e.g., GCP, AWS)\n\n### Developer Experience (DX)\n\n* Docs as first-class citizens\n* Internal tooling\n* Feedback loops with design + product",
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
                    content: "> Tech is no longer *support* — it’s *strategy*.\n> A tech leader’s job is to map architecture to business goals.\n\n### Strategic Alignment Tools\n\n* OKRs (Objectives & Key Results)\n* Roadmapping (Now → Next → Later)\n* KPIs that matter:\n\n  * Time to Market\n  * Churn\n  * CAC\\:LTV\n  * Uptime / Latency\n  * Engineering Velocity\n\n### Speaking the Exec Language\n\n* Translate tech debt into ROI loss\n* Map uptime to customer satisfaction\n* Show how features move revenue or retention\n\n### Tools for Strategic Planning\n\n* Productboard\n* Aha!\n* Notion (for lean teams)\n* Jira Advanced Roadmaps",
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
                    content: "* Build if it’s core to your edge\n* Buy if it's utility\n* Wait if the market’s not ready\n\n### Innovation Timing Frameworks\n\n* Technology Adoption Curve\n* Moore’s Chasm\n* Jobs To Be Done (JTBD)\n* 10x Innovation Rule\n\n### Validating Innovation\n\n* Pilot programs\n* Customer interviews\n* Landing page tests\n* Internal hackathons\n\n### Competitive Advantage in Tech\n\n* Speed (Time to ship)\n* IP (patents, models)\n* Talent (A-teams)\n* Brand (reputation, community)",
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
                    content: "* Bold, clear vision\n* Willingness to bet on future\n* Obsession with users\n* Relentless execution\n\n### Building Innovation Culture\n\n* Reward experimentation\n* Tolerate fast failure\n* Flatten the idea pipeline\n* Remove fear of “stupid questions”\n\n### Balancing Speed and Stability\n\n* Use guardrails, not roadblocks\n* Don’t sacrifice security or ethics\n* Ship fast, but **learn faster**\n\n### Influence Without Authority\n\n* Use narrative storytelling\n* Data + emotion = buy-in\n* Empower, don’t command",
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
        finalAssessment: {
            questions: [
                { questionText: "Explain the difference between disruptive and sustaining innovation." },
                { questionText: "What is the Design Thinking process?" },
                { questionText: "Describe the MVP approach and how it prevents overbuilding." },
                { questionText: "What frameworks help prioritize product features?" },
                { questionText: "What’s the relationship between tech architecture and business goals?" },
                { questionText: "Give three real-world examples of scalable product engineering practices." },
                { questionText: "How do tech teams validate innovation before launching?" },
                { questionText: "Explain RICE and MoSCoW prioritization." },
                { questionText: "How can CI/CD pipelines improve shipping velocity?" },
                { questionText: "Why is developer experience (DX) crucial for innovation?" },
                { questionText: "Define OKRs and how they align engineering with business." },
                { questionText: "What is the Technology Adoption Curve?" },
                { questionText: "How do strategic leaders balance risk and experimentation?" },
                { questionText: "What metrics matter most for product-led growth?" },
                { questionText: "Summarize how you’d build a tech product with strategic impact and user-first innovation." },
            ]
        }
    },
    advancedProgrammingCourse,
];

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
            try {
                // Ensure every lesson has a duration. Default to 1h if not specified.
                const modulesWithDuration = courseData.modules.map(module => ({
                    ...module,
                    lessons: module.lessons.map(lesson => ({
                        ...lesson,
                        duration: lesson.duration || '1h'
                    }))
                }));

                const dataWithDefaults = {
                    ...courseData,
                    modules: modulesWithDuration
                }

                const validatedData = CourseSchema.omit({ 
                    id: true, 
                    progress: true,
                }).passthrough().parse(dataWithDefaults);
                
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
