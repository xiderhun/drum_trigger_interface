import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DeviceListProps {
  devices: WebMidi.MIDIInput[];
  selectedDevice: WebMidi.MIDIInput | null;
  onSelectDevice: (device: WebMidi.MIDIInput) => void;
}

export function DeviceList({ devices, selectedDevice, onSelectDevice }: DeviceListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Connected Devices</h3>
      <div className="space-y-2">
        {devices.map((device) => (
          <Card
            key={device.id}
            className={cn(
              "cursor-pointer p-4 transition-colors hover:bg-accent",
              selectedDevice?.id === device.id && "border-primary"
            )}
            onClick={() => onSelectDevice(device)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{device.name}</h4>
                <p className="text-sm text-muted-foreground">ID: {device.id}</p>
              </div>
              <div className="flex h-2 w-2 rounded-full bg-green-500" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}