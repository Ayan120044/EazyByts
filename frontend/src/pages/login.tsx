"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "../assets/Hero-image.jpg";
import { signInUser, signUpUser } from "@/api/auth";
import { useUser } from "@/hooks/user";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

export default function AuthPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, loading, refetchUser } = useUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user) navigate("/edit");
  }, [user, loading]);
  const {
    register: signInRegister,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignIn = async (data: SignInForm) => {
    try {
      setIsLoading(true);
      const res = await signInUser(data);

      const { token } = res.data;
      if (token) {
        console.log("saved token");

        localStorage.setItem("token", token);
      }
      toast.success("Logged in successfully");
      refetchUser();
    } catch (error) {
      toast.error((error as any).message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUp = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const res = await signUpUser(data);
      const { token } = res.data;
      if (token) {
        console.log("saved token");

        localStorage.setItem("token", token);
      }
      navigate("/user");
    } catch (error) {
      console.log(error);
      toast.error((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center flex-col justify-center p-4">
      <div className="fixed inset-0" aria-hidden="true">
        <img src={HeroImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="w-full max-w-md z-10 mt-5">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">
            PortfolioBuilder
          </span>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* --- Sign In Form --- */}
              <TabsContent value="signin">
                <form
                  onSubmit={handleSignInSubmit(onSignIn)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...signInRegister("email")}
                    />
                    {signInErrors.email && (
                      <p className="text-sm text-red-500">
                        {signInErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...signInRegister("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {signInErrors.password && (
                      <p className="text-sm text-red-500">
                        {signInErrors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* --- Sign Up Form --- */}
              <TabsContent value="signup">
                <form
                  onSubmit={handleSignUpSubmit(onSignUp)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      {...signUpRegister("name")}
                    />
                    {signUpErrors.name && (
                      <p className="text-sm text-red-500">
                        {signUpErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      {...signUpRegister("username")}
                    />
                    <p className="text-xs text-gray-500">
                      Your portfolio will be available at
                      yourdomain.com/username
                    </p>
                    {signUpErrors.username && (
                      <p className="text-sm text-red-500">
                        {signUpErrors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      {...signUpRegister("email")}
                    />
                    {signUpErrors.email && (
                      <p className="text-sm text-red-500">
                        {signUpErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        {...signUpRegister("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {signUpErrors.password && (
                      <p className="text-sm text-red-500">
                        {signUpErrors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
