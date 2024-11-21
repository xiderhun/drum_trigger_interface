"use client";

import { useState } from "react";
import { DeviceList } from "./device-list";
import { DeviceStatus } from "./device-status";
import { NoDevices } from "./no-devices";
import { MidiMonitor } from "@/components/midi/midi-monitor";
import { useWebMidi } from "@/hooks/use-webmidi";
import { Input } from "@/components/ui/input";

interface DeviceDashboardProps {
  selectedDevice: WebMidi.MIDIInput | null;
  onDeviceSelect: (device: WebMidi.MIDIInput) => void;
}

export function DeviceDashboard({ selectedDevice, onDeviceSelect }: DeviceDashboardProps) {
  const { inputs, outputs, error } = useWebMidi();
  const [filter, setFilter] = useState("");

  const filteredDevices = inputs.filter(device => 
    device.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-8 text-card-foreground">
        <h2 className="text-lg font-semibold">Error</h2>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Device Configuration</h2>
        <Input
          placeholder="Search devices..."
          className="w-[250px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      
      {inputs.length === 0 ? (
        <NoDevices />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <DeviceList
            devices={filteredDevices}
            selectedDevice={selectedDevice}
            onSelectDevice={onDeviceSelect}
          />
          {selectedDevice && (
            <>
              <DeviceStatus device={selectedDevice} />
              <MidiMonitor deviceId={selectedDevice.id} />
            </>
          )}
        </div>
      )}
    </div>
  );
}