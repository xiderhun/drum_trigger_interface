"use client";

import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

export function useWebMidi() {
  const [inputs, setInputs] = useState<WebMidi.MIDIInput[]>([]);
  const [outputs, setOutputs] = useState<WebMidi.MIDIOutput[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        setInputs(WebMidi.inputs);
        setOutputs(WebMidi.outputs);

        const handleConnect = () => {
          setInputs(WebMidi.inputs);
          setOutputs(WebMidi.outputs);
        };

        WebMidi.addListener("connected", handleConnect);
        WebMidi.addListener("disconnected", handleConnect);

        return () => {
          WebMidi.removeListener("connected", handleConnect);
          WebMidi.removeListener("disconnected", handleConnect);
        };
      })
      .catch((err) => {
        setError("Failed to access MIDI devices. Please ensure MIDI support is enabled in your browser.");
      });
  }, []);

  return { inputs, outputs, error };
}