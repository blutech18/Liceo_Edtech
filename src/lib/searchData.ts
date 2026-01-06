// Search data for the entire website
export interface SearchItem {
    title: string;
    description: string;
    category: "Page" | "Team" | "Resource" | "Contact";
    url: string;
    keywords?: string[];
}

export const searchData: SearchItem[] = [
    // Pages
    { title: "Home", description: "Liceo Educational Technology Center homepage", category: "Page", url: "/" },
    { title: "Hotline", description: "Get technical support from our specialists", category: "Page", url: "/hotline" },
    { title: "Google Classroom", description: "Google Classroom information and resources", category: "Page", url: "/google-classroom" },
    { title: "Resources", description: "Educational tools and platforms", category: "Page", url: "/resources" },
    { title: "Trainings", description: "Professional development and training programs", category: "Page", url: "/trainings" },
    { title: "EdTech Team", description: "Meet the people behind Liceo EdTech", category: "Page", url: "/edtech-team" },
    { title: "Feedback", description: "Share your feedback and suggestions", category: "Page", url: "/feedback" },
    { title: "About Us", description: "Mission, goals, and organizational structure", category: "Page", url: "/about-us" },
    { title: "Forms", description: "Access important forms and documents", category: "Page", url: "/forms" },

    // Team Members
    { title: "Dr. Marco Marvin L. Rado", description: "Director", category: "Team", url: "/edtech-team", keywords: ["director", "leadership"] },
    { title: "Dave Lawrence Pamotongan", description: "E-Learning Specialist - Main Campus", category: "Team", url: "/edtech-team", keywords: ["specialist", "google workspace", "school automate"] },
    { title: "Mary Jane Morato", description: "E-Learning Specialist - RNP Campus", category: "Team", url: "/edtech-team", keywords: ["specialist", "google workspace"] },
    { title: "Mary Abigail Paulan", description: "E-Learning Specialist - PDR Campus", category: "Team", url: "/edtech-team", keywords: ["specialist", "google workspace"] },
    { title: "Roy Emeterio L. Pabilona", description: "Coordinator, E-Learning Technology and Infrastructure", category: "Team", url: "/edtech-team", keywords: ["coordinator", "infrastructure"] },
    { title: "Remar Lumances", description: "Technical Staff - Main Campus", category: "Team", url: "/edtech-team", keywords: ["technical", "internet"] },
    { title: "Vidal Valledor", description: "Technical Staff - PDR Campus", category: "Team", url: "/edtech-team", keywords: ["technical", "internet"] },
    { title: "Judison Ferth R. Nunez", description: "Technical Staff - Grade School Campus", category: "Team", url: "/edtech-team", keywords: ["technical"] },

    // Resources
    { title: "Flippity", description: "Create flashcards, quizzes, and games from Google Sheets", category: "Resource", url: "/resources", keywords: ["interactive", "learning", "games"] },
    { title: "OBS Studio", description: "Free video recording and live streaming software", category: "Resource", url: "/resources", keywords: ["media", "production", "recording"] },
    { title: "Canva", description: "Design presentations, posters, and visual content", category: "Resource", url: "/resources", keywords: ["design", "graphics"] },
    { title: "Google Docs", description: "Create and edit documents online collaboratively", category: "Resource", url: "/resources", keywords: ["google", "workspace", "documents"] },
    { title: "Google Slides", description: "Create beautiful presentations", category: "Resource", url: "/resources", keywords: ["google", "workspace", "presentations"] },
    { title: "Google Forms", description: "Create surveys, quizzes, and collect data", category: "Resource", url: "/resources", keywords: ["google", "workspace", "surveys"] },
    { title: "Google Meet", description: "Video conferencing for virtual classes", category: "Resource", url: "/resources", keywords: ["google", "workspace", "video", "meetings"] },
    { title: "Google Drive", description: "Store, share, and access files from anywhere", category: "Resource", url: "/resources", keywords: ["google", "workspace", "storage"] },
    { title: "Kahoot!", description: "Game-based learning platform for interactive quizzes", category: "Resource", url: "/resources", keywords: ["interactive", "learning", "quizzes"] },
    { title: "Padlet", description: "Digital canvas for collaborative brainstorming", category: "Resource", url: "/resources", keywords: ["collaboration", "brainstorming"] },
    { title: "Quizizz", description: "Gamified quizzes for student engagement", category: "Resource", url: "/resources", keywords: ["interactive", "learning", "quizzes"] },
    { title: "Loom", description: "Screen and video recording for instructional content", category: "Resource", url: "/resources", keywords: ["media", "production", "recording"] },

    // Contacts
    { title: "Main Campus Support", description: "Dave Lawrence Pamotongan - Google Workspace & School Automate", category: "Contact", url: "/hotline", keywords: ["support", "help", "main campus"] },
    { title: "RNP Campus Support", description: "Mary Jane Morato - Google Workspace & School Automate", category: "Contact", url: "/hotline", keywords: ["support", "help", "rnp"] },
    { title: "PDR Campus Support", description: "Mary Abigail Paulan - Google Workspace & School Automate", category: "Contact", url: "/hotline", keywords: ["support", "help", "pdr"] },
    { title: "Grade School Support", description: "Judison Ferth R. Nunez - Technical Support", category: "Contact", url: "/hotline", keywords: ["support", "help", "grade school"] },
];
