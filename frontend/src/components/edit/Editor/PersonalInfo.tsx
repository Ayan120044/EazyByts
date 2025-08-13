import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/hooks/portfolio";
import { Label } from "@radix-ui/react-label";
import { User } from "lucide-react";

function PersonalInfo() {
  const { portfolioData, updatePersonalInfo } = usePortfolio();
  return (
    <Card className="border-0 grow overflow-auto w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
          <User className="w-6 h-6 text-coral-500" />
          <span>Personal Information</span>
        </CardTitle>
        <CardDescription>
          Update your basic information and availability status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              value={portfolioData.personalInfo.name}
              onChange={(e) => updatePersonalInfo("name", e.target.value)}
              className="border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
            />
          </div>
          <div>
            <Label htmlFor="title" className="text-gray-700 font-medium">
              Professional Title
            </Label>
            <Input
              id="title"
              value={portfolioData.personalInfo.title}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
              className="border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio" className="text-gray-700 font-medium">
            Bio / Introduction
          </Label>
          <Textarea
            id="bio"
            value={portfolioData.personalInfo.bio}
            onChange={(e) => updatePersonalInfo("bio", e.target.value)}
            className="min-h-[120px] border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
            placeholder="Tell visitors about yourself..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={portfolioData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              className="border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={portfolioData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              className="border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="text-gray-700 font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={portfolioData.personalInfo.location}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
            className="border-gray-200 focus:border-coral-400 rounded-xl bg-white/70"
          />
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
          <Switch
            checked={portfolioData.personalInfo.availableForWork}
            onCheckedChange={(checked) =>
              updatePersonalInfo("availableForWork", checked)
            }
          />
          <div>
            <Label className="text-gray-800 font-medium">
              Available for Work
            </Label>
            <p className="text-sm text-gray-600">
              Show availability status on your portfolio
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalInfo;
