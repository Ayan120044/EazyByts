import mongoose, { Document, Types } from "mongoose";
interface Skill {
    name: string;
    category: string;
}
interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
}
interface SocialLink {
    platform: string;
    url: string;
}
interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    availableForWork: boolean;
}
export interface PortfolioData extends Document {
    personalInfo: PersonalInfo;
    skills: Skill[];
    projects: Project[];
    socialLinks: SocialLink[];
    activeSection: string;
    skillCategories: string[];
    socialPlatforms: string[];
    selectedTemplate: string;
    owner: Types.ObjectId;
}
export declare const PortfolioModel: mongoose.Model<PortfolioData, {}, {}, {}, mongoose.Document<unknown, {}, PortfolioData, {}, {}> & PortfolioData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=portfolio.model.d.ts.map