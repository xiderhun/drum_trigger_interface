"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Download, Upload } from "lucide-react";
import { TriggerConfig } from "./trigger-config";

interface TriggerPresetsProps {
  config: TriggerConfig;
  onLoadPreset: (preset: TriggerConfig) => void;
}

const factoryPresets: Record<string, TriggerConfig> = {
  "Roland PDX": {
    sensitivity: 75,
    threshold: 20,
    scanTime: 40,
    retrigger: 35,
    crosstalk: 45,
    maskTime: 8,
  },
  "Yamaha PCY": {
    sensitivity: 65,
    threshold: 25,
    scanTime: 45,
    retrigger: 30,
    crosstalk: 50,
    maskTime: 10,
  },
  "ATV xPad": {
    sensitivity: 80,
    threshold: 15,
    scanTime: 35,
    retrigger: 25,
    crosstalk: 40,
    maskTime: 6,
  },
};

export function TriggerPresets({ config, onLoadPreset }: TriggerPresetsProps) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trigger-preset.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const preset = JSON.parse(e.target?.result as string);
            onLoadPreset(preset);
          } catch (error) {
            console.error("Failed to parse preset file:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(value) => onLoadPreset(factoryPresets[value])}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Load preset..." />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(factoryPresets).map((preset) => (
            <SelectItem key={preset} value={preset}>
              {preset}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleExport}
          title="Export preset"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleImport}
          title="Import preset"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}