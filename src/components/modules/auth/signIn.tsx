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
import { Icons } from "@/components/modules/shared/icons";
import { useSignInMutation } from "@/redux/api/features/auth/autApi";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "@/redux/api/features/auth/authSlice";
import { Clock, Target, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FocusAndTimeTrackerLogo } from "../shared/focusAndTimeTrackerLogo";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export function SignIn() {
  const [signIn, { isLoading }] = useSignInMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "password123",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn(values).unwrap();
      if (res.success) {
        toast({
          title: "Signed in successfully",
          description: "Welcome back to FocusTrack!",
        });
        const userData = {
          id: res.data.user_id,
          email: res.data.email,
          role: res.data.role,
        };

        dispatch(setCredentials({ user: userData, token: res.accessToken }));
      }
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-3 md:p-5">
          <div className="flex justify-between items-center mb-4">
            <FocusAndTimeTrackerLogo />
          </div>
          <CardTitle className="text-lg">Welcome Back</CardTitle>
          <CardDescription className="text-xs">
            Sign in to manage your time and boost your focus
          </CardDescription>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 p-3 md:p-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                        <Input
                          placeholder="email"
                          {...field}
                          className="pl-10"
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
                    <FormLabel className="text-purple-800">Password</FormLabel>
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-purple-50 p-3 md:p-5">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Clock className="mr-2 h-4 w-4" />
                )}
                Sign In
              </Button>
              <div className="text-center text-xs text-purple-800">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className=" text-purple-600 hover:text-purple-500"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}