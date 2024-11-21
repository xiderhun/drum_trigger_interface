"use client";

import { Card } from "@/components/ui/card";
import { TriggerType, TriggerZone } from "./trigger-types";
import { cn } from "@/lib/utils";

interface TriggerSelectorProps {
  selectedType: TriggerType;
  selectedZone: TriggerZone;
  onTypeChange: (type: TriggerType) => void;
  onZoneChange: (zone: TriggerZone) => void;
}

const triggerTypes: { id: TriggerType; label: string; zones: TriggerZone[] }[] = [
  { id: "PDX", label: "Mesh Pad", zones: ["Head", "Rim"] },
  { id: "PD", label: "Rubber Pad", zones: ["Head", "Rim"] },
  { id: "KD", label: "Kick Pad", zones: ["Head"] },
  { id: "CY", label: "Cymbal", zones: ["Bow", "Edge", "Bell"] },
  { id: "VH", label: "Hi-Hat", zones: ["Bow", "Edge"] },
  { id: "BT", label: "Bar Trigger", zones: ["Head"] },
];

export function TriggerSelector({
  selectedType,
  selectedZone,
  onTypeChange,
  onZoneChange,
}: TriggerSelectorProps) {
  const selectedTrigger = triggerTypes.find((t) => t.id === selectedType);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {triggerTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer p-4 transition-colors hover:bg-accent",
              selectedType === type.id && "border-primary bg-accent"
            )}
            onClick={() => {
              onTypeChange(type.id);
              if (!type.zones.includes(selectedZone)) {
                onZoneChange(type.zones[0]);
              }
            }}
          >
            <p className="text-sm font-medium">{type.label}</p>
            <p className="text-xs text-muted-foreground">{type.id}</p>
          </Card>
        ))}
      </div>

      {selectedTrigger && selectedTrigger.zones.length > 1 && (
        <div className="flex gap-2">
          {selectedTrigger.zones.map((zone) => (
            <button
              key={zone}
              className={cn(
                "rounded-full px-3 py-1 text-sm",
                "border border-input hover:bg-accent",
                selectedZone === zone && "bg-primary text-primary-foreground"
              )}
              onClick={() => onZoneChange(zone)}
            >
              {zone}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}