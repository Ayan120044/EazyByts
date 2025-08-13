import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/hooks/portfolio";
import { Briefcase, Plus, Trash2 } from "lucide-react";

function Projects() {
  const { portfolioData, updateProject, removeProject, addProject } =
    usePortfolio();
  return (
    <Card className="border-0 overflow-auto grow relative pt-0 shadow-none">
      <CardHeader className="sticky top-0 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-coral-500" />

              <span>Projects Portfolio</span>
            </CardTitle>
            <CardDescription>
              Showcase your best work and projects
            </CardDescription>
          </div>
          <Button onClick={addProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Project {index + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(checked) =>
                        updateProject(index, "featured", checked)
                      }
                    />
                    <Label className="text-sm text-gray-600">Featured</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-medium">
                    Project Title
                  </Label>
                  <Input
                    placeholder="Amazing Project Name"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                    className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Description
                  </Label>
                  <Textarea
                    placeholder="Describe your project, its features, and impact..."
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    className="min-h-[100px] border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium">
                      GitHub URL
                    </Label>
                    <Input
                      placeholder="https://github.com/username/project"
                      value={project.githubUrl}
                      onChange={(e) =>
                        updateProject(index, "githubUrl", e.target.value)
                      }
                      className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">
                      Live Demo URL
                    </Label>
                    <Input
                      placeholder="https://project-demo.com"
                      value={project.liveUrl}
                      onChange={(e) =>
                        updateProject(index, "liveUrl", e.target.value)
                      }
                      className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Technologies (comma-separated)
                  </Label>
                  <Input
                    placeholder="React, Node.js, PostgreSQL, Tailwind CSS"
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        index,
                        "technologies",
                        e.target.value.split(", ").filter((tech) => tech.trim())
                      )
                    }
                    className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-coral-100 text-coral-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Projects;
