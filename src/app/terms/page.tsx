import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Please replace this placeholder text with your actual Terms of Service. You can ask me to update this page with your content at any time.
          </p>
          <p>
            Welcome to TechTradeHub Academy! These terms and conditions outline the rules and regulations for the use of TechTradeHub Academy's Website.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use TechTradeHub Academy if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h3 className="text-xl font-semibold text-foreground pt-4">Cookies</h3>
          <p>
            We employ the use of cookies. By accessing TechTradeHub Academy, you agreed to use cookies in agreement with the TechTradeHub Academy's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit.
          </p>
          <h3 className="text-xl font-semibold text-foreground pt-4">License</h3>
          <p>
            Unless otherwise stated, TechTradeHub Academy and/or its licensors own the intellectual property rights for all material on TechTradeHub Academy. All intellectual property rights are reserved. You may access this from TechTradeHub Academy for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
