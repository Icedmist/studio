'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, User, Mail, Lock, ShieldAlert } from 'lucide-react';
import { updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

const emailFormSchema = z.object({
  newEmail: z.string().email({ message: 'Please enter a valid email.' }),
  currentPasswordForEmail: z.string().min(1, { message: 'Password is required.' }),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function AccountPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({ profile: false, email: false, password: false });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { fullName: user?.displayName ?? '' },
  });

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { newEmail: '', currentPasswordForEmail: '' },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  if (!user) {
    router.push('/login');
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const handleReauthentication = async (password: string) => {
    if (!user || !user.email) return null;
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: 'The password you entered is incorrect. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setIsLoading(prev => ({ ...prev, profile: true }));
    try {
      await updateProfile(user, { displayName: values.fullName });
      toast({ title: 'Success', description: 'Your profile has been updated.', variant: 'success' });
    } catch (error: any) {
      toast({ title: 'Error', description: `Failed to update profile: ${error.message}`, variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const onEmailSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    setIsLoading(prev => ({ ...prev, email: true }));
    const reauthenticated = await handleReauthentication(values.currentPasswordForEmail);
    if (reauthenticated) {
      try {
        await updateEmail(user, values.newEmail);
        toast({ title: 'Success', description: 'Your email has been updated. Please check your new email for verification.', variant: 'success' });
        emailForm.reset();
      } catch (error: any) {
        toast({ title: 'Error', description: `Failed to update email: ${error.message}`, variant: 'destructive' });
      }
    }
    setIsLoading(prev => ({ ...prev, email: false }));
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    setIsLoading(prev => ({ ...prev, password: true }));
    const reauthenticated = await handleReauthentication(values.currentPassword);
    if (reauthenticated) {
      try {
        await updatePassword(user, values.newPassword);
        toast({ title: 'Success', description: 'Your password has been changed successfully.', variant: 'success' });
        passwordForm.reset();
      } catch (error: any) {
        toast({ title: 'Error', description: `Failed to change password: ${error.message}`, variant: 'destructive' });
      }
    }
    setIsLoading(prev => ({ ...prev, password: false }));
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Account Settings</h1>
      <div className="space-y-8">
        {/* Profile Information */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your display name.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input icon={<User />} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading.profile}>
                  {isLoading.profile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Change Email */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Change Email Address</CardTitle>
            <CardDescription>Update the email address associated with your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="newEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Email</FormLabel>
                      <FormControl>
                        <Input icon={<Mail />} type="email" placeholder="new.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="currentPasswordForEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input icon={<Lock />} type="password" placeholder="Enter your current password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading.email}>
                  {isLoading.email && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Change Email
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>For security, you must enter your current password to make changes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input icon={<Lock />} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input icon={<Lock />} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input icon={<Lock />} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading.password}>
                  {isLoading.password && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Change Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
