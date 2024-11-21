import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function NoDevices() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No devices detected</AlertTitle>
      <AlertDescription>
        Connect a MIDI device to your computer and refresh the page.
      </AlertDescription>
    </Alert>
  );
}