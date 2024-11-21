"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { WebMidi } from "webmidi";
import { TriggerType, TriggerZone } from "./trigger-types";
import { TriggerSelector } from "./trigger-selector";
import { TriggerPresets } from "./trigger-presets";
import { ParameterControls } from "./parameter-controls";
import { SignalAnalysis } from "./signal-analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TriggerConfig {
  sensitivity: number;
  threshold: number;
  scanTime: number;
  retrigger: number;
  crosstalk: number;
  maskTime: number;
}

const defaultConfig: TriggerConfig = {
  sensitivity: 70,
  threshold: 20,
  scanTime: 50,
  retrigger: 30,
  crosstalk: 40,
  maskTime: 8,
};

interface TriggerConfigurationProps {
  deviceId?: string;
}

export function TriggerConfiguration({ deviceId }: TriggerConfigurationProps) {
  const [config, setConfig] = useState<TriggerConfig>(defaultConfig);
  const [selectedType, setSelectedType] = useState<TriggerType>("PDX");
  const [selectedZone, setSelectedZone] = useState<TriggerZone>("Head");
  const [hits, setHits] = useState<{ velocity: number; timestamp: number }[]>([]);

  useEffect(() => {
    if (!deviceId) return;

    const input = WebMidi.getInputById(deviceId);
    if (!input) return;

    const handleNoteOn = (e: any) => {
      setHits((prev) => [
        ...prev,
        { velocity: e.velocity * 127, timestamp: Date.now() },
      ].slice(-50));
    };

    input.addListener("noteon", handleNoteOn);

    return () => {
      input.removeListener("noteon", handleNoteOn);
    };
  }, [deviceId]);

  const handleConfigChange = (key: keyof TriggerConfig, value: number[]) => {
    setConfig((prev) => ({ ...prev, [key]: value[0] }));
  };

  if (!deviceId) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a MIDI device in the Device tab to configure triggers.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Trigger Configuration</h2>
        <TriggerPresets config={config} onLoadPreset={setConfig} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pad Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <TriggerSelector
              selectedType={selectedType}
              selectedZone={selectedZone}
              onTypeChange={setSelectedType}
              onZoneChange={setSelectedZone}
            />
          </CardContent>
        </Card>

        <ParameterControls config={config} onConfigChange={handleConfigChange} />
        <SignalAnalysis config={config} hits={hits} />
      </div>
    </div>
  );
}