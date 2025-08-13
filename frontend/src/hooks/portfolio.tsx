import { getPortfolio, savePortfolio } from "@/api/portfolio";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availableForWork: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  activeSection: string;
  skillCategories: string[];
  socialPlatforms: string[];
  selectedTemplate: string;
  loading: boolean;

  setActiveSection: (section: string) => void;
  updatePersonalInfo: (
    field: keyof PersonalInfo,
    value: string | boolean
  ) => void;
  addSkill: () => void;
  updateSkill: (index: number, field: keyof Skill, value: string) => void;
  removeSkill: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, field: keyof Project, value: any) => void;
  removeProject: (index: number) => void;
  addSocialLink: () => void;
  updateSocialLink: (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => void;
  removeSocialLink: (index: number) => void;
  handleSave: () => void;
  handleSelectTemplate: (templateId: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { portfolioId = "6899978860c481b1c403380b" } = useParams<{
    portfolioId: string;
  }>();
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personalInfo: {
      name: "Arslaan",
      title: "Full Stack Developer",
      bio: "Transforming ideas into beautiful, functional digital experiences through innovative design and cutting-edge technology. Let's create something amazing together! ✨",
      email: "alex.chen@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      availableForWork: true,
    },
    skills: [
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Vue.js", category: "Frontend" },
      { name: "HTML5", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Python", category: "Backend" },
      { name: "Express", category: "Backend" },
      { name: "FastAPI", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "MongoDB", category: "Database" },
      { name: "Redis", category: "Database" },
      { name: "Supabase", category: "Database" },
      { name: "React Native", category: "Mobile" },
      { name: "Flutter", category: "Mobile" },
      { name: "Expo", category: "Mobile" },
      { name: "PWA", category: "Mobile" },
      { name: "Figma", category: "Design" },
      { name: "Adobe XD", category: "Design" },
      { name: "UI/UX Design", category: "Design" },
      { name: "Prototyping", category: "Design" },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "A comprehensive e-commerce solution that combines beautiful design with powerful functionality. Features include real-time inventory management, secure payments, and an intuitive admin dashboard.",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind", "Prisma"],
        githubUrl: "https://github.com/alexchen/ecommerce",
        liveUrl: "https://ecommerce-demo.com",
        featured: true,
      },
      {
        title: "Task Management App",
        description:
          "Collaborative workspace with real-time updates and beautiful animations.",
        technologies: ["React", "Socket.io", "MongoDB"],
        githubUrl: "https://github.com/alexchen/taskmanager",
        liveUrl: "https://taskmanager-demo.com",
        featured: false,
      },
      {
        title: "Weather Forecast",
        description:
          "Beautiful weather app with interactive maps and detailed forecasts.",
        technologies: ["React Native", "Maps API", "Geolocation"],
        githubUrl: "https://github.com/alexchen/weather",
        liveUrl: "https://weather-demo.com",
        featured: false,
      },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/alexchen" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/alexchen" },
      { platform: "Twitter", url: "https://twitter.com/alexchen" },
    ],
  });

  const [activeSection, setActiveSection] = useState("personalInfo");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleSelectTemplate = async (template: string) => {
    setSelectedTemplate(template);
    // Here you would typically save the selection or redirect to the portfolio with the selected template
    console.log("Selected template:", template);
  };

  const updatePersonalInfo = async (
    field: keyof PersonalInfo,
    value: string | boolean
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addSkill = async () => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", category: "Frontend" }],
    }));
  };

  const updateSkill = async (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const removeSkill = async (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addProject = async () => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: [],
          githubUrl: "",
          liveUrl: "",
          featured: false,
        },
      ],
    }));
  };

  const updateProject = async (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      ),
    }));
  };

  const removeProject = async (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addSocialLink = async () => {
    setPortfolioData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));
  };

  const updateSocialLink = async (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const removeSocialLink = async (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    const id = toast.loading("Saving portfolio data", {
      description: "Please don't refresh or leave the window",
    });
    try {
      console.log("Saving portfolio data:", portfolioData);

      const res = await savePortfolio({
        ...portfolioData,
        selectedTemplate,
        portfolioId,
      });

      const savedId = res.portfolio._id;

      if (portfolioId === "new") {
        navigate(`/portfolio/edit/${savedId}`);
      } else {
        toast.success("Portfolio saved successfully! 🎉", { id });
      }
      toast.success("Portfolio saved successfully!", { id });
    } catch (err) {
      console.error("Failed to save portfolio:", err);
      toast.error(
        (err as any).message || "Failed to save portfolio. Please try again.",
        { id }
      );
    }
  };

  const skillCategories = [
    "Frontend",
    "Backend",
    "Database",
    "Mobile",
    "Design",
    "DevOps",
  ];

  const socialPlatforms = [
    "GitHub",
    "LinkedIn",
    "Twitter",
    "Instagram",
    "Dribbble",
    "Behance",
  ];
  useEffect(() => {
    if (portfolioId && portfolioId !== "new") {
      (async () => {
        try {
          const data = await getPortfolio(portfolioId);
          console.log({ data });

          setPortfolioData(data.portfolio);
        } catch (err) {
          console.error("Failed to fetch portfolio:", err);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
      console.log({ portfolioId });
    }
  }, [portfolioId]);
  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        activeSection,
        setActiveSection,
        skillCategories,
        socialPlatforms,
        updatePersonalInfo,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addSocialLink,
        updateSocialLink,
        removeSocialLink,
        handleSave,
        handleSelectTemplate,
        selectedTemplate,
        loading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
