import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Code,
  Palette,
  Database,
  Smartphone,
} from "lucide-react";
import { type PortfolioData } from "@/hooks/portfolio";
export interface portfolioTemlplateProps {
  portfolioData: PortfolioData;
  preview?: boolean;
}
export default function Portfolio({
  portfolioData,
  preview,
}: portfolioTemlplateProps) {
  const { personalInfo, skills, projects, socialLinks } = portfolioData;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Github className="h-5 w-5" />;
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />;
      case "Twitter":
        return <Twitter className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code className="h-6 w-6" />;
      case "Backend":
        return <Database className="h-6 w-6" />;
      case "Database":
        return <Database className="h-6 w-6" />;
      case "Mobile":
        return <Smartphone className="h-6 w-6" />;
      case "Design":
        return <Palette className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-svh bg-background relative">
      {/* Navigation */}
      <nav
        className={`${
          preview ? "absolute" : "fixed"
        } top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">
              {personalInfo.name}
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <p className="text-primary font-medium text-lg">Hello, I'm</p>
                  <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                    {personalInfo.name}
                  </h1>
                  <h2 className="text-2xl lg:text-3xl text-muted-foreground font-light">
                    {personalInfo.title}
                  </h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {personalInfo.bio}
                </p>

                <div className="flex justify-center flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-5 w-5" />
                      Get In Touch
                    </a>
                  </Button>
                  <Button variant="outline" size="lg">
                    <a href="#projects" className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      View My Work
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.platform}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                      asChild
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    </Button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                  {personalInfo.availableForWork && (
                    <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30 animate-glow">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-4 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-4"></span>
                      </span>
                      Available for Work
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {Array.from(new Set(skills.map((skill) => skill.category))).map(
              (category, index) => (
                <Card
                  key={category}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {getCategoryIcon(category)}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="text-xs hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-border/50"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3 pt-0 mt-auto">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary/10 hover:border-primary/50"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ready to bring your next project to life? I'd love to hear about
              your ideas and discuss how we can make them reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  {personalInfo.email}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  {personalInfo.phone}
                </a>
              </Button>
            </div>

            <Separator className="my-8" />

            <p className="text-muted-foreground">
              © {new Date().getFullYear()} {personalInfo.name}. Crafted with
              passion and precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
