
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, User, Linkedin, Twitter, Upload } from 'lucide-react';
import { type Instructor } from '@/lib/types';
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// This function exports the schema so the parent can infer the type.
export const getInstructorFormSchema = () => z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z
    .any()
    .refine((val) => typeof val === 'string' || (val instanceof File), `An image is required.`)
    .refine((val) => !(val instanceof File) || val.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine((val) => !(val instanceof File) || ACCEPTED_IMAGE_TYPES.includes(val.type), ".jpg, .jpeg, .png and .webp files are accepted."),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
});

type InstructorFormData = z.infer<ReturnType<typeof getInstructorFormSchema>>;

interface InstructorFormProps {
  onSubmit: (data: InstructorFormData) => Promise<void>;
  initialData?: Instructor | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function InstructorForm({ onSubmit, initialData, isSubmitting, onCancel }: InstructorFormProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.avatarUrl || null);
  
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          form.setValue('avatarUrl', file, { shouldValidate: true });
          const reader = new FileReader();
          reader.onloadend = () => {
              setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
         <FormItem>
            <FormLabel>Avatar Image</FormLabel>
            <div className="flex items-center gap-4">
              {preview && (
                  <Image
                      src={preview}
                      alt="Avatar preview"
                      width={64}
                      height={64}
                      className="rounded-full object-cover h-16 w-16"
                  />
              )}
              <FormControl>
                <Button asChild variant="outline">
                    <label htmlFor="avatar-upload" className="cursor-pointer flex items-center gap-2">
                        <Upload />
                        <span>{preview ? 'Change Image' : 'Upload Image'}</span>
                        <input id="avatar-upload" type="file" className="sr-only" accept={ACCEPTED_IMAGE_TYPES.join(',')} onChange={handleAvatarChange} />
                    </label>
                </Button>
              </FormControl>
            </div>
             <FormMessage>{form.formState.errors.avatarUrl?.message as React.ReactNode}</FormMessage>
        </FormItem>
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
