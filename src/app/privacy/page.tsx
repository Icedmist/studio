import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
                <strong>Last updated: {lastUpdated}</strong>
            </p>
            <p>
                Please replace this placeholder text with your actual Privacy Policy. You can ask me to update this page with your content at any time.
            </p>
            <p>
                TechTradeHub Academy ("us", "we", or "our") operates the TechTradeHub Academy website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Information Collection and Use</h3>
            <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            
            <h4 className="text-lg font-semibold text-foreground pt-2">Personal Data</h4>
            <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Cookies and Usage Data</li>
            </ul>

             <h3 className="text-xl font-semibold text-foreground pt-4">Use of Data</h3>
             <p>TechTradeHub Academy uses the collected data for various purposes:</p>
             <ul className="list-disc list-inside pl-4 space-y-1">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
             </ul>

        </CardContent>
      </Card>
    </div>
  );
}
