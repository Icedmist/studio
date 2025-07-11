
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';

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
    finalAssessment: [
        {
            questionText: "In the context of the CIA triad in cybersecurity, what does 'Availability' ensure?",
            options: ["Data is correct and trustworthy", "Data is accessible only to authorized users", "Systems and data are accessible when needed", "Data is stored in the cloud"],
            correctAnswerIndex: 2
        },
        {
            questionText: "A SQL Injection attack is primarily aimed at which part of an application?",
            options: ["The user interface", "The web server", "The database", "The firewall"],
            correctAnswerIndex: 2
        },
        {
            questionText: "What is a key difference between supervised and unsupervised machine learning?",
            options: ["Supervised learning is faster", "Supervised learning uses labeled data, while unsupervised uses unlabeled data", "Unsupervised learning is more accurate", "Unsupervised learning requires a human to monitor it"],
            correctAnswerIndex: 1
        },
        {
            questionText: "In data science, what is 'overfitting'?",
            options: ["When a model is too simple to capture the data's patterns", "When a model performs well on training data but poorly on new, unseen data", "When a dataset is too large to process", "When a model's predictions are always wrong"],
            correctAnswerIndex: 1
        },
        {
            questionText: "What is the purpose of a `git commit` command in DevOps?",
            options: ["To download changes from a remote repository", "To create a new branch", "To save changes to the local repository", "To upload changes to a remote repository"],
            correctAnswerIndex: 2
        },
        {
            questionText: "Which of the following is a core principle of DevOps?",
            options: ["Separating development and operations teams", "Manual testing and deployment", "Automation of the software delivery process", "Long release cycles"],
            correctAnswerIndex: 2
        },
        {
            questionText: "What is a 'zero-day' vulnerability?",
            options: ["A vulnerability that has been known for a long time", "A vulnerability that is discovered and exploited before a patch exists", "A vulnerability that is not critical", "A vulnerability that only affects servers"],
            correctAnswerIndex: 1
        },
        {
            questionText: "What type of machine learning model is a 'neural network'?",
            options: ["A simple linear model", "A model inspired by the structure of the human brain", "A type of clustering algorithm", "A rule-based system"],
            correctAnswerIndex: 1
        },
        {
            questionText: "In Kubernetes, what is a 'Pod'?",
            options: ["A tool for monitoring cluster health", "A single container", "The smallest deployable unit, which can contain one or more containers", "A network policy"],
            correctAnswerIndex: 2
        },
        {
            questionText: "What is the primary function of an Intrusion Detection System (IDS)?",
            options: ["To block malicious traffic", "To monitor network or system activities for malicious activities or policy violations", "To encrypt network traffic", "To authenticate users"],
            correctAnswerIndex: 1
        },
        {
            questionText: "The process of cleaning and transforming raw data into a usable format is called:",
            options: ["Data modeling", "Data visualization", "Data preprocessing", "Data warehousing"],
            correctAnswerIndex: 2
        },
        {
            questionText: "What is 'immutable infrastructure' in the context of DevOps?",
            options: ["Infrastructure that can be changed after deployment", "Servers that are never modified after deployment; they are replaced with new ones", "Using physical servers instead of virtual ones", "A type of database"],
            correctAnswerIndex: 1
        },
        {
            questionText: "Phishing is a type of attack that relies on:",
            options: ["Exploiting a software bug", "Overloading a server with traffic", "Social engineering to deceive users into revealing information", "Guessing passwords"],
            correctAnswerIndex: 2
        },
        {
            questionText: "Which metric is commonly used to evaluate the performance of a classification model?",
            options: ["Mean Squared Error (MSE)", "Accuracy, Precision, and Recall", "R-squared value", "Cluster Silhouette Score"],
            correctAnswerIndex: 1
        },
        {
            questionText: "What is the purpose of a CI (Continuous Integration) server like Jenkins?",
            options: ["To host the production website", "To automatically build, test, and integrate code changes", "To manage customer support tickets", "To design the user interface"],
            correctAnswerIndex: 1
        },
    ]
};

export async function seedInitialCourses() {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);

    if (snapshot.empty) {
        console.log('Courses collection is empty. Seeding initial data...');
        const batch = writeBatch(db);
        const newCourseDoc = doc(coursesCollection);
        batch.set(newCourseDoc, advancedTechSkillsCourse);
        await batch.commit();
        console.log('Successfully seeded 1 course.');
    } else {
        console.log('Courses collection already has data. Skipping seed.');
    }
}
