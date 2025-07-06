import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { XIcon } from "@/components/icons/XIcon";

export function SocialLogins() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline">
        <GoogleIcon className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline">
        <XIcon className="mr-2 h-4 w-4" />
        X
      </Button>
    </div>
  );
}
