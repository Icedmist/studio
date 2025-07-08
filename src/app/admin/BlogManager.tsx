'use client';

import { useState, useEffect } from 'react';
import type { Blog } from '@/lib/types';
import { getPosts, addPost, updatePost, deletePost } from '@/services/blog-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Badge, Newspaper, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlogForm } from './BlogForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewBlogSchema } from '@/lib/types';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

type BlogFormData = z.infer<typeof NewBlogSchema>;

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

async function seedWelcomePost() {
    const welcomePostContent = `Welcome to the official blog of TechTradeHub Academy! We are thrilled to have you here as part of our growing community of learners, innovators, and future leaders in the tech and finance industries.

### Our Vision
At TechTradeHub, our mission is simple: to democratize education in cutting-edge fields. We believe that everyone, regardless of their background, deserves access to high-quality, practical knowledge in areas like Futures Trading, Web3, Cryptocurrency, AI & Machine Learning, and other essential Tech Skills. The digital landscape is evolving at a breakneck pace, and we're here to ensure you have the tools and expertise to not just keep up, but to get ahead.

### What to Expect from This Blog
This blog will be your go-to resource for a variety of topics, including:
- **In-depth Tutorials:** Step-by-step guides on complex topics from our courses.
- **Industry Insights:** Analysis of market trends, new technologies, and what they mean for you.
- **Student Success Stories:** Get inspired by the journeys of fellow learners from our community.
- **Academy News & Updates:** Be the first to know about new courses, features, and events.
- **Career Advice:** Tips and tricks to help you land your dream job in tech or finance.

### Your Journey Starts Now
Whether you're a complete beginner looking to take your first step into a new field, or a seasoned professional aiming to sharpen your skills, you've come to the right place. Our courses are designed by industry experts to be practical, engaging, and immediately applicable.

We invite you to explore our [course library](/courses), engage with our content, and join the conversation. Your journey to mastering the future starts today.

Let's build the future, together.

Warmly,
The TechTradeHub Academy Team`;
        
    const welcomePost = {
        title: 'Welcome to TechTradeHub Academy: Your Journey to Mastery Begins!',
        content: welcomePostContent,
        imageUrl: 'https://placehold.co/800x400.png',
        authorName: 'The TechTradeHub Team',
        status: 'published' as const,
        authorId: 'system',
        slug: 'welcome-to-techtradehub-academy'
    };

    try {
      await addPost(welcomePost);
      return true;
    } catch(error) {
      console.error("Failed to seed welcome post:", error);
      return false;
    }
}


export function BlogManager() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Blog | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let data = await getPosts();
      if (data.length === 0) {
        const seeded = await seedWelcomePost();
        if (seeded) {
          data = await getPosts();
        }
      }
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch blog posts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFormSubmit = async (data: BlogFormData) => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);

    try {
        if (editingPost) {
            const dataToUpdate = { ...data, slug: slugify(data.title) };
            await updatePost(editingPost.id, dataToUpdate);
        } else {
            const dataToSave = { ...data, slug: slugify(data.title), authorId: user.uid };
            await addPost(dataToSave);
        }

        toast({
            title: `Post ${editingPost ? 'updated' : 'created'}`,
            description: `The blog post has been saved successfully.`,
            variant: "success",
        });

        setDialogOpen(false);
        setEditingPost(null);
        router.refresh();
        await fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const openEditDialog = (post: Blog) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingPost(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
      setDialogOpen(false);
      setEditingPost(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
        await deletePost(id);
        toast({
            title: "Post Deleted",
            description: "The blog post has been removed successfully.",
            variant: "success",
        });
        router.refresh();
        await fetchPosts();
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "An unknown error occurred.",
            variant: "destructive",
        });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4">
        <Button onClick={openAddDialog}>
          <FileText className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
                Fill in the details for the blog post. Content supports Markdown.
            </DialogDescription>
          </DialogHeader>
          <BlogForm 
            onSubmit={handleFormSubmit} 
            initialData={editingPost}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
          />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length > 0 ? posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.authorName}</TableCell>
              <TableCell>
                <Badge variant={post.status === 'published' ? 'success' : 'secondary'}>{post.status}</Badge>
              </TableCell>
              <TableCell>
                {post.createdAt?.toDate ? format(post.createdAt.toDate(), 'PPP') : 'N/A'}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Edit post</p></TooltipContent>
                </Tooltip>
                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent><p>Delete post</p></TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the blog post. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => confirmDelete(post.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No blog posts found. Click "Create Post" to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
