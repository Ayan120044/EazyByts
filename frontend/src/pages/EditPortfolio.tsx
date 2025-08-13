import { usePortfolio } from "@/hooks/portfolio";
import { Edit, Edit2, Save } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Editor from "@/components/edit/Editor";
import Portfolio from "@/components/templates/Portfolio";
import { useUser } from "@/hooks/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EditPortfolio() {
  const { portfolioData, handleSave, loading } = usePortfolio();
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoading) return;
    if (!user) navigate("/auth/signin");
  }, [user]);
  if (loading || userLoading)
    return (
      <div className="inset-0 bg-red-50 fixed grid place-content-center">
        <span className="h-12 aspect-square border-primary border-4 rounded-full border-t-transparent animate-spin"></span>
      </div>
    );

  return (
    <div className="max-h-svh h-svh flex relative flex-col bg-gray-50">
      {/* Header */}

      <div className="flex flex-1 overflow-auto border">
        {/* Preview Area */}
        <div className="flex-1 h-full overflow-y-auto space-y-2">
          <div className="space-y-12 w-full min-h-svh border relative">
            <Portfolio portfolioData={portfolioData} />
          </div>
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="fixed z-10 bottom-10 right-10">
            <Edit />
            Edit
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit your resume</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 flex border w-screen h-max items-center justify-evenly">
            {" "}
            <Editor>
              <Button className="bg-primary/30 font-semibold flex-col text-primary hover:text-primary-foreground hover:bg-primary h-32 w-32">
                <Edit2 className="text-3xl w-18 h-full" />
                <p>Edit</p>
              </Button>
            </Editor>
            <Button
              onClick={() => {
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
                handleSave();
              }}
              className="bg-primary/30 font-semibold flex-col text-primary hover:text-primary-foreground hover:bg-primary h-32 w-32"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            {/* <Button
              onClick={handleLogout}
              className="bg-primary/30 font-semibold flex-col text-primary hover:text-primary-foreground hover:bg-primary h-32 w-32"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button> */}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
