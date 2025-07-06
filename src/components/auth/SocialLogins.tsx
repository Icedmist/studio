import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { XIcon } from "@/components/icons/XIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";

export function SocialLogins() {
  return (
    <div className="flex justify-center gap-4">
      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
        <GoogleIcon className="h-6 w-6" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
        <FacebookIcon className="h-6 w-6" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
        <XIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
