import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolio } from "@/hooks/portfolio";
import PersonalInfo from "./PersonalInfo";
import Skills from "./Skills";
import Projects from "./Projects";
import SocialLinks from "./SocialLinks";
import { useState, type JSX } from "react";
import { useUser } from "@/hooks/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const sections: Record<string, () => JSX.Element> = {
  personalInfo: PersonalInfo,
  skills: Skills,
  projects: Projects,
  socialLinks: SocialLinks,
};

function Editor({ children }: { children: React.ReactNode }) {
  const { activeSection, setActiveSection } = usePortfolio();
  const [allowEdit, setAllowEdit] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const EditSection = sections[activeSection] ?? (() => <>Invalid Template</>);

  return (
    <Dialog
      open={allowEdit}
      onOpenChange={(open) => {
        if (!open) setAllowEdit(open);
        else {
          if (!user)
            return toast.error("Please login first", {
              action: (
                <Button
                  className="justify-self-end ml-auto"
                  onClick={() => navigate("/auth/signin")}
                >
                  Login
                </Button>
              ),
            });
          setAllowEdit(open);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-h-[90svh] h-screen sm:max-w-[80svw] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <>
              <Select value={activeSection} onValueChange={setActiveSection}>
                <SelectTrigger className="w-min border-0 text-xl font-semibold capitalize">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(sections).map((template) => (
                    <SelectItem
                      className="capitalize"
                      key={template}
                      value={template}
                    >
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          </DialogTitle>
        </DialogHeader>
        <EditSection />
      </DialogContent>
    </Dialog>
  );
}
export default Editor;
