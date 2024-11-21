"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriggerVisualizer } from "./trigger-visualizer";
import { TriggerResponse } from "./trigger-response";
import { TriggerConfig } from "./trigger-config";

interface SignalAnalysisProps {
  config: TriggerConfig;
  hits: Array<{ velocity: number; timestamp: number }>;
}

export function SignalAnalysis({ config, hits }: SignalAnalysisProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Signal Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Waveform Analysis</h4>
          <TriggerVisualizer config={config} />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Hit Response</h4>
          <TriggerResponse hits={hits} />
        </div>
      </CardContent>
    </Card>
  );
}