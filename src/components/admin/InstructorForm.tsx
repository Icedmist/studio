
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, User, Linkedin, Twitter, Image as ImageIcon, Upload } from 'lucide-react';
import type { Instructor } from '@/lib/types';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// This function exports the schema so the parent can infer the type.
// It now includes a file upload field which is optional.
export const getInstructorFormSchema = () => z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
  avatarFile: z
    .any()
    .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
    )
    .refine(
        (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
});

type InstructorFormData = z.infer<ReturnType<typeof getInstructorFormSchema>>;

interface InstructorFormProps {
  onSubmit: (data: InstructorFormData) => Promise<void>;
  initialData?: Instructor | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function InstructorForm({ onSubmit, initialData, isSubmitting, onCancel }: InstructorFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.avatarUrl || null);
  
  const form = useForm<InstructorFormData>({
    resolver: zodResolver(getInstructorFormSchema()),
    defaultValues: {
      name: initialData?.name ?? '',
      bio: initialData?.bio ?? '',
      avatarUrl: initialData?.avatarUrl ?? '',
      socials: {
        twitter: initialData?.socials?.twitter ?? '',
        linkedin: initialData?.socials?.linkedin ?? '',
      },
    },
  });

  const avatarFile = form.watch('avatarFile');

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (initialData?.avatarUrl) {
      setImagePreview(initialData.avatarUrl);
    }
  }, [avatarFile, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {imagePreview && (
            <div className="flex justify-center">
                <NextImage 
                    src={imagePreview}
                    alt="Avatar preview"
                    width={128}
                    height={128}
                    className="rounded-full w-32 h-32 object-cover border-4 border-primary"
                />
            </div>
        )}
        <FormField
          control={form.control}
          name="avatarFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                      type="file" 
                      className="pl-12"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => field.onChange(e.target.files)}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Upload className="w-5 h-5" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input icon={<User />} placeholder="e.g., Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="A short biography about the instructor..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="socials.twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter URL (Optional)</FormLabel>
              <FormControl>
                <Input icon={<Twitter />} placeholder="https://twitter.com/username" {...field} />
              </FormControl>
               <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="socials.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input icon={<Linkedin />} placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
               <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Instructor' : 'Add Instructor'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
