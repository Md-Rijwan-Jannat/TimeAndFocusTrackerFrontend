"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/hooks/use-toast";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { getUser } from "@/redux/features/auth/authSlice";

// Schema for profile form validation
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please provide a valid email address.",
    })
    .email(),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {};

export function ProfileForm() {
  const [updateUserFn, { isLoading }] = useUpdateUserMutation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const user = useAppSelector(getUser);
  const { data } = useGetUserByIdQuery(user?.id || 0);
  const currentUser = data?.data;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
      email: currentUser?.email ?? "",
      avatarUrl: currentUser?.avatarUrl ?? undefined,
    },
    mode: "onChange",
  });

  // Handle image file change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      uploadToCloudinary(file);
    }
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryPreset as string);

    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        form.setValue("avatarUrl", data.secure_url);
      }
    } catch (error: any) {
      toast({ title: "Error uploading image", description: error.message });
    }
  };

  // Form submission handler
  async function onSubmit(data: ProfileFormValues) {
    try {
      const res = await updateUserFn({
        userId: currentUser?.id ?? "",
        userDetails: data,
      }).unwrap();
      toast({
        title: "Profile updated successfully!",
      });
    } catch (error: any) {
      toast({ title: "Update failed", description: error.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="mt-2"
                  />
                  {currentUser?.avatarUrl ? (
                    <>
                      <div className="mt-4">
                        <img
                          src={currentUser?.avatarUrl}
                          alt="Avatar Preview"
                          className="w-24 h-24 rounded-full"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {avatarPreview && (
                        <div className="mt-4">
                          <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-24 h-24 rounded-full"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
