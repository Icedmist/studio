
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, User, Linkedin, Twitter, Image as ImageIcon } from 'lucide-react';
import { type Instructor } from '@/lib/types';

// This function exports the schema so the parent can infer the type.
// Disabled file uploads by only accepting a string URL.
export const getInstructorFormSchema = () => z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url('A valid image URL is required.'),
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
  
  const form = useForm<InstructorFormData>({
    resolver: zodResolver(getInstructorFormSchema()),
    defaultValues: {
      name: initialData?.name ?? '',
      bio: initialData?.bio ?? '',
      avatarUrl: initialData?.avatarUrl ?? 'https://placehold.co/100x100.png',
      socials: {
        twitter: initialData?.socials?.twitter ?? '',
        linkedin: initialData?.socials?.linkedin ?? '',
      },
    },
  });

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
        <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Avatar Image URL</FormLabel>
                <FormControl>
                    <Input icon={<ImageIcon />} placeholder="https://placehold.co/100x100.png" {...field} />
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
