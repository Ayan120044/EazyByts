import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolio } from "@/hooks/portfolio";

function SocialLinks() {
  const {
    portfolioData,
    addSocialLink,
    updateSocialLink,
    socialPlatforms,
    removeSocialLink,
  } = usePortfolio();
  return (
    <Card className="border-0 overflow-auto grow relative pt-0 shadow-none">
      <CardHeader className="sticky top-0 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
              <Globe className="w-6 h-6 text-coral-500" />
              <span>Social Media Links</span>
            </CardTitle>
            <CardDescription>
              Connect your social media profiles
            </CardDescription>
          </div>
          <Button
            onClick={addSocialLink}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {portfolioData.socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="w-48">
                <Select
                  value={link.platform}
                  onValueChange={(value) =>
                    updateSocialLink(index, "platform", value)
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-coral-400 rounded-lg bg-white">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialPlatforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://platform.com/username"
                  value={link.url}
                  onChange={(e) =>
                    updateSocialLink(index, "url", e.target.value)
                  }
                  className="border-gray-200 focus:border-coral-400 rounded-lg bg-white"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(index)}
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

export default SocialLinks;
