// ── Real CV data for Karan Kumar's portfolio ──────────────────

export const PERSONAL = {
    name: 'KARAN KUMAR',
    phone: '7858959761',
    email: 'kumarkaran233922@gmail.com',
    linkedin: 'https://linkedin.com/in/karan-kumar-58b282341',
    github: 'https://github.com/KaranKumar-13',
    leetcode: 'https://leetcode.com/u/KaranKumar_13/',
    objective: 'Aspiring software developer with a strong foundation in programming, web technologies, databases, and problem-solving. Interested in building practical software solutions and developing skills in software engineering, web development, and emerging technologies.',
};

export const SKILLS = [
    {
        category: 'Programming Languages',
        icon: '⚔',
        color: '#ff5555',
        items: [
            { name: 'C / C++', level: 75 },
            { name: 'Python', level: 70 },
            { name: 'JavaScript', level: 72 },
        ],
    },
    {
        category: 'Web Technologies',
        icon: '🌐',
        color: '#55ff55',
        items: [
            { name: 'HTML', level: 85 },
            { name: 'CSS', level: 80 },
            { name: 'React', level: 65 },
        ],
    },
    {
        category: 'Databases',
        icon: '🗄',
        color: '#4adcff',
        items: [
            { name: 'MySQL', level: 70 },
            { name: 'PostgreSQL', level: 60 },
        ],
    },
    {
        category: 'Tools',
        icon: '🛠',
        color: '#ffaa00',
        items: [
            { name: 'Git / GitHub', level: 75 },
            { name: 'VS Code', level: 90 },
            { name: 'Figma', level: 60 },
            { name: 'Canva', level: 65 },
        ],
    },
];

export const PROJECTS = [
    {
        title: 'Personalized Career Path Recommendations',
        stack: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
        icon: '🗺',
        color: '#55ff55',
        points: [
            'Responsive web platform for B.Tech students — collects specialization, academic year, and skill proficiency.',
            'Skill-based recommendation engine that suggests career roles matching student skills and levels.',
            'Generates personalized 6-month and 1-year learning roadmaps for target career roles.',
        ],
    },
    {
        title: 'Smart Class Participation & Response Analysis',
        stack: ['Arduino', 'Python', 'MySQL'],
        icon: '📡',
        color: '#4adcff',
        points: [
            'Hardware-based classroom system using Arduino, LEDs, and LCD for real-time student responses.',
            'Terminal-based Python app that processes hardware input and stores responses in MySQL.',
            'Stores student IDs, timestamps, and lecture data to analyse participation and topic performance.',
        ],
    },
];

export const EDUCATION = [
    {
        institution: 'Lovely Professional University (LPU)',
        degree: 'B.Tech — Computer Science and Engineering',
        period: '2025 – 2029',
        score: 'CGPA: 9.04',
        icon: '🎓',
    },
    {
        institution: 'Class 12 (PCM)',
        degree: 'Higher Secondary Education',
        period: '2022 – 2024',
        score: '85%',
        icon: '📚',
    },
    {
        institution: 'Class 10',
        degree: 'Secondary Education',
        period: '2022',
        score: '91%',
        icon: '📖',
    },
];

export const CERTS = [
    {
        name: 'ChatGPT for Everyone',
        link: 'https://drive.google.com/file/d/1C9DPrEeg0y8lu6I4jAqNVCWLySzZNuo_/view?usp=drive_link',
        color: '#ffaa00',
    },
    {
        name: 'Basics of AI',
        link: null,
        color: '#55ffff',
    },
    {
        name: 'Hackathon Participation Certificate',
        link: 'https://drive.google.com/file/d/11pxL964o0Gf9pC1xj5ph69sQzNoUfrNa/view?usp=drive_link',
        color: '#ff55ff',
    },
    {
        name: 'Basics of Training & Leadership',
        sub: 'UniAthena × Cambridge International, Nov 2025',
        link: null,
        color: '#55ff55',
    },
];

export const ACHIEVEMENTS = [
    { text: 'Solved 7 LeetCode problems with focus on solution optimisation.', icon: '⚡' },
    { text: 'Solved 10+ HackerRank problems.', icon: '🏆' },
    { text: '30 hours Cybersecurity Awareness volunteer at NGO.', icon: '🛡' },
];

export const STATS = [
    { value: '2', label: 'PROJECTS' },
    { value: '1+', label: 'YR EXP' },
    { value: '5+', label: 'TECH STACKS' },
    { value: '17+', label: 'PROBLEMS' },
];
