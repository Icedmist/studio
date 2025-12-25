
'use client';

import { useState, useEffect } from 'react';
import type { Blog } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDoc, getDocs, type DocumentData, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Badge, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlogForm } from './BlogForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewBlogSchema, BlogSchema } from '@/lib/types';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

type BlogFormData = z.infer<typeof NewBlogSchema>;

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const toBlog = (doc: DocumentData): Blog => {
    const data = doc.data();
    return BlogSchema.parse({
        id: doc.id,
        ...data,
    });
};

export function BlogManager() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Blog | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const blogPostsCollection = collection(db, 'blogPosts');
        const q = query(blogPostsCollection, orderBy('createdAt', 'desc'));
        const postsSnapshot = await getDocs(q);
        const data = postsSnapshot.docs.map(doc => toBlog(doc));
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
    fetchPosts();
  }, [toast, user]);

  const handleFormSubmit = async (data: BlogFormData) => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);

    try {
        if (editingPost) {
            const postDocRef = doc(db, 'blogPosts', editingPost.id);
            const dataToUpdate: any = { 
                ...data, 
                slug: slugify(data.title) 
            };
            if (data.status === 'published' && editingPost.status !== 'published') {
                dataToUpdate.publishedAt = serverTimestamp();
            }
            await updateDoc(postDocRef, dataToUpdate);
            const updatedSnap = await getDoc(postDocRef);
            const updatedPost = toBlog(updatedSnap);
            setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));

        } else {
            const dataToSave = { 
                ...data, 
                slug: slugify(data.title), 
                authorId: user.uid,
                createdAt: serverTimestamp(),
                publishedAt: data.status === 'published' ? serverTimestamp() : null,
            };
            const docRef = await addDoc(collection(db, 'blogPosts'), dataToSave);
            const newPostSnap = await getDoc(docRef);
            const newPost = toBlog(newPostSnap);
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }

        toast({
            title: `Post ${editingPost ? 'updated' : 'created'}`,
            description: `The blog post has been saved successfully.`,
            variant: "success",
        });

        setDialogOpen(false);
        setEditingPost(null);
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
        await deleteDoc(doc(db, 'blogPosts', id));
        setPosts(posts.filter(p => p.id !== id));
        toast({
            title: "Post Deleted",
            description: "The blog post has been removed successfully.",
            variant: "success",
        });
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

    