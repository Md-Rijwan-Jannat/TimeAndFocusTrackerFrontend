"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSignUpMutation } from "@/redux/features/auth/autApi";
import { Icons } from "../shared/icons";
import { useToast } from "@/components/hooks/use-toast";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "@/redux/features/auth/authSlice";
import {
  Clock,
  Target,
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { FocusAndTimeTrackerLogo } from "../shared/focusAndTimeTrackerLogo";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signUp(values).unwrap();
      if (res.success) {
        toast({
          title: "Account created successfully",
          description: "You can now sign in with your new account.",
        });
        const userData = {
          id: res.data.user_id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          avatar_url: res.data.avatar_url,
        };

        dispatch(setCredentials({ user: userData, token: res.accessToken }));
        form.reset();
        router.push("/");

        console.log("res", res);
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-xl overflow-hidden p-3 md:p-5">
        <div className="mb-5">
          <div className="flex justify-between items-center mb-4">
            <FocusAndTimeTrackerLogo />
          </div>
          <CardTitle className="text-lg">Join FocusTrack</CardTitle>
          <CardDescription className="text-xs">
            Create an account to start managing your time and boosting your
            focus
          </CardDescription>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-3 p-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-500">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                        <Input
                          placeholder="name"
                          {...field}
                          className="pl-10 pr-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-500">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                        <Input
                          placeholder="email"
                          {...field}
                          className="pl-10 pr-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-500">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-500">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="password"
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-0 mt-7">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Create Account
              </Button>
              <div className="text-center text-xs">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="pl-1 text-purple-500 hover:text-purple-600"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
