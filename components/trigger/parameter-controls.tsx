"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriggerConfig } from "./trigger-config";

interface ParameterControlsProps {
  config: TriggerConfig;
  onConfigChange: (key: keyof TriggerConfig, value: number[]) => void;
}

export function ParameterControls({ config, onConfigChange }: ParameterControlsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sensitivity</Label>
              <Slider
                value={[config.sensitivity]}
                onValueChange={(value) => onConfigChange("sensitivity", value)}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Adjusts how responsive the trigger is to hits
              </p>
            </div>

            <div className="space-y-2">
              <Label>Threshold</Label>
              <Slider
                value={[config.threshold]}
                onValueChange={(value) => onConfigChange("threshold", value)}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Minimum force required to trigger a hit
              </p>
            </div>

            <div className="space-y-2">
              <Label>Scan Time</Label>
              <Slider
                value={[config.scanTime]}
                onValueChange={(value) => onConfigChange("scanTime", value)}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Duration to analyze the trigger signal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Retrigger Cancel</Label>
              <Slider
                value={[config.retrigger]}
                onValueChange={(value) => onConfigChange("retrigger", value)}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Prevents false triggers from pad vibration
              </p>
            </div>

            <div className="space-y-2">
              <Label>Crosstalk Level</Label>
              <Slider
                value={[config.crosstalk]}
                onValueChange={(value) => onConfigChange("crosstalk", value)}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Reduces interference from other pads
              </p>
            </div>

            <div className="space-y-2">
              <Label>Mask Time</Label>
              <Slider
                value={[config.maskTime]}
                onValueChange={(value) => onConfigChange("maskTime", value)}
                min={0}
                max={20}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Minimum time between triggers (ms)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}