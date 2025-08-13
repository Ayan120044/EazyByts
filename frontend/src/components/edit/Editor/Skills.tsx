import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolio } from "@/hooks/portfolio";
import { Select } from "@radix-ui/react-select";
import { Code, Plus, Trash2 } from "lucide-react";

function Skills() {
  const { portfolioData, updateSkill, skillCategories, removeSkill, addSkill } =
    usePortfolio();

  return (
    <Card className="border-0 overflow-auto grow relative pt-0 shadow-none">
      <CardHeader className="sticky top-0 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
              <Code className="w-6 h-6 text-coral-500" />
              <span>Skills & Technologies</span>
            </CardTitle>
            <CardDescription>
              Manage your technical skills and expertise
            </CardDescription>
          </div>
          <Button
            onClick={addSkill}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {portfolioData.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <Input
                  placeholder="Skill name (e.g., React)"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                />
              </div>
              <div className="w-48">
                <Select
                  value={skill.category}
                  onValueChange={(value) =>
                    updateSkill(index, "category", value)
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-coral-400 rounded-lg bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Skills;
