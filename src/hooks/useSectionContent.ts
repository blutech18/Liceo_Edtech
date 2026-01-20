import { useState, useEffect } from 'react';
import { getSectionContent, SectionContent } from '@/lib/api';

const defaultContent: Record<string, SectionContent> = {
    hero: { id: '', section_key: 'hero', title: 'LICEO EDUCATIONAL TECHNOLOGY CENTER', subtitle: 'Empowering education through innovative technology solutions' },
    activities: { id: '', section_key: 'activities', title: 'Our Activities', subtitle: 'Explore our workshops and training programs designed to enhance digital literacy' },
    videos: { id: '', section_key: 'videos', title: 'Google Workspace Updates', subtitle: 'Stay updated with the latest Google Workspace features and tutorials' },
    hotline: { id: '', section_key: 'hotline', title: 'EdTech Hotline', subtitle: 'Get technical support from our specialists' },
    google_classroom: { id: '', section_key: 'google_classroom', title: 'Guide to Google Classroom', subtitle: 'Select your role to access personalized resources' },
    resources: { id: '', section_key: 'resources', title: 'Educational Resources', subtitle: 'Tools and platforms to enhance your teaching' },
    trainings: { id: '', section_key: 'trainings', title: 'Training Programs', subtitle: 'Professional development for educators' },
    team: { id: '', section_key: 'team', title: 'Educational Technology Team', subtitle: 'Meet the people behind Liceo EdTech' },
    feedback: { id: '', section_key: 'feedback', title: 'Feedback', subtitle: 'We value your input to improve our services' },
    about_us: { id: '', section_key: 'about_us', title: 'About Us', subtitle: 'Empowering education through technology' },
    forms: { id: '', section_key: 'forms', title: 'Downloadable Forms', subtitle: 'Access official EdTech Center forms' },
};

export function useSectionContent() {
    const [content, setContent] = useState<Record<string, SectionContent>>(defaultContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            const data = await getSectionContent();
            if (Object.keys(data).length > 0) {
                setContent({ ...defaultContent, ...data });
            }
            setLoading(false);
        }
        fetchContent();
    }, []);

    const getSection = (key: string): SectionContent => {
        return content[key] || defaultContent[key] || { id: '', section_key: key, title: key, subtitle: '' };
    };

    return { content, loading, getSection };
}
