"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageFilters } from "./message-filters";
import { MessageList } from "./message-list";
import { MidiMessage, useMidiMessages } from "@/hooks/use-midi-messages";

export function MidiMonitor({ deviceId }: { deviceId: string }) {
  const { messages, clearMessages } = useMidiMessages(deviceId);
  const [filters, setFilters] = useState({
    noteOn: true,
    noteOff: true,
    controlChange: true,
    pitchBend: true,
    aftertouch: true,
  });

  const filteredMessages = messages.filter((msg) => {
    if (msg.type === "noteon" && filters.noteOn) return true;
    if (msg.type === "noteoff" && filters.noteOff) return true;
    if (msg.type === "controlchange" && filters.controlChange) return true;
    if (msg.type === "pitchbend" && filters.pitchBend) return true;
    if ((msg.type === "aftertouch" || msg.type === "channelaftertouch") && filters.aftertouch)
      return true;
    return false;
  });

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>MIDI Monitor</CardTitle>
        <Badge variant="secondary" className="font-mono">
          {messages.length} messages
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="live" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <MessageFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          
          <TabsContent value="live" className="space-y-4">
            <ScrollArea className="h-[400px] rounded-md border">
              <MessageList messages={filteredMessages} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="rounded-md border p-4">
              <h4 className="mb-4 text-sm font-medium">Message Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Note On Messages</p>
                  <p className="text-2xl font-bold">
                    {messages.filter((m) => m.type === "noteon").length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Control Changes</p>
                  <p className="text-2xl font-bold">
                    {messages.filter((m) => m.type === "controlchange").length}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}