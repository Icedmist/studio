import type { Instructor } from './types';

export const instructors: Instructor[] = [
    {
        id: 'inst_john_smith',
        name: 'John Smith',
        bio: 'Co-Founder & Head of Trading Education. John is a seasoned futures trader with over 15 years of market experience.',
        avatarUrl: 'https://placehold.co/100x100.png',
        socials: {
            twitter: 'https://twitter.com/johnsmith',
            linkedin: 'https://linkedin.com/in/johnsmith',
        }
    },
    {
        id: 'inst_maria_garcia',
        name: 'Maria Garcia',
        bio: 'Lead Web3 & Blockchain Instructor. Maria is a full-stack developer specializing in decentralized applications and smart contracts.',
        avatarUrl: 'https://placehold.co/100x100.png',
        socials: {
            twitter: 'https://twitter.com/mariagarcia',
            linkedin: 'https://linkedin.com/in/mariagarcia',
        }
    },
    {
        id: 'inst_chen_wang',
        name: 'Chen Wang',
        bio: 'Lead AI & Machine Learning Instructor. Chen holds a PhD in Computer Science and has published several papers on deep learning.',
        avatarUrl: 'https://placehold.co/100x100.png',
        socials: {
            linkedin: 'https://linkedin.com/in/chenwang',
        }
    }
];
