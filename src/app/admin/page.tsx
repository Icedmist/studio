import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Admin Dashboard
        </h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Manage courses, users, and site content from this secure dashboard.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>This area is restricted and for administrative use only.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Future features will include:</p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li>Course Management (Create, Edit, Delete)</li>
            <li>User Management (View, Edit roles)</li>
            <li>Content Management for the homepage</li>
            <li>Analytics and Reporting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
