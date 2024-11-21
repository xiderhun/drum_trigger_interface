import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeviceStatusProps {
  device: WebMidi.MIDIInput;
}

export function DeviceStatus({ device }: DeviceStatusProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Device Status</h3>
      <Card>
        <CardHeader>
          <CardTitle>{device.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Connection Status</p>
              <Badge variant="outline" className="mt-1">
                {device.connection}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">State</p>
              <Badge variant="outline" className="mt-1">
                {device.state}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Type</p>
              <Badge variant="outline" className="mt-1">
                {device.type}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Version</p>
              <Badge variant="outline" className="mt-1">
                {device.version}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}