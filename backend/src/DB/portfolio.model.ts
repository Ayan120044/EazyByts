// src/models/portfolio.model.ts
import mongoose, { Schema, Document, model, Types } from "mongoose";

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
  owner: Types.ObjectId; // reference to the user
}

const SkillSchema = new Schema<Skill>({
  name: { type: String, required: true },
  category: { type: String, required: true },
});

const ProjectSchema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  githubUrl: { type: String, required: true },
  liveUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
});

const SocialLinkSchema = new Schema<SocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
});

const PersonalInfoSchema = new Schema<PersonalInfo>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  availableForWork: { type: Boolean, default: true },
});

const PortfolioSchema = new Schema<PortfolioData>(
  {
    personalInfo: { type: PersonalInfoSchema, required: true },
    skills: { type: [SkillSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    activeSection: { type: String, default: "" },
    skillCategories: { type: [String], default: [] },
    socialPlatforms: { type: [String], default: [] },
    selectedTemplate: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PortfolioModel = model<PortfolioData>(
  "Portfolio",
  PortfolioSchema
);
