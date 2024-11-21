"use client";

import { useState } from "react";
import { DeviceDashboard } from "@/components/device/device-dashboard";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TriggerConfiguration } from "@/components/trigger/trigger-config";
import { useWebMidi } from "@/hooks/use-webmidi";

export default function Home() {
  const { inputs } = useWebMidi();
  const [selectedDevice, setSelectedDevice] = useState<WebMidi.MIDIInput | null>(null);

  // Set initial device when inputs are loaded
  if (inputs.length > 0 && !selectedDevice) {
    setSelectedDevice(inputs[0]);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Tabs defaultValue="device" className="space-y-6">
          <TabsList>
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="device">
            <DeviceDashboard
              selectedDevice={selectedDevice}
              onDeviceSelect={setSelectedDevice}
            />
          </TabsContent>
          
          <TabsContent value="triggers">
            <TriggerConfiguration deviceId={selectedDevice?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}