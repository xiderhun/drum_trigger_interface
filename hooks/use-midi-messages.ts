"use client";

import { useEffect, useState } from "react";
import { Input, WebMidi } from "webmidi";

export interface MidiMessage {
  type: string;
  channel: number;
  note?: number;
  velocity?: number;
  controller?: number;
  value?: number;
  timestamp: number;
}

export function useMidiMessages(deviceId: string) {
  const [messages, setMessages] = useState<MidiMessage[]>([]);
  const maxMessages = 1000;

  useEffect(() => {
    const input = WebMidi.getInputById(deviceId);
    if (!input) return;

    const handleMessage = (e: any) => {
      const message: MidiMessage = {
        type: e.type,
        channel: e.message.channel,
        timestamp: e.timestamp,
      };

      if ("note" in e) {
        message.note = e.note.number;
        message.velocity = e.velocity;
      }

      if ("controller" in e) {
        message.controller = e.controller.number;
        message.value = e.value;
      }

      setMessages((prev) => {
        const newMessages = [message, ...prev];
        return newMessages.slice(0, maxMessages);
      });
    };

    input.addListener("noteon", handleMessage);
    input.addListener("noteoff", handleMessage);
    input.addListener("controlchange", handleMessage);
    input.addListener("pitchbend", handleMessage);
    input.addListener("channelaftertouch", handleMessage);

    return () => {
      input.removeListener("noteon", handleMessage);
      input.removeListener("noteoff", handleMessage);
      input.removeListener("controlchange", handleMessage);
      input.removeListener("pitchbend", handleMessage);
      input.removeListener("channelaftertouch", handleMessage);
    };
  }, [deviceId]);

  const clearMessages = () => setMessages([]);

  return { messages, clearMessages };
}