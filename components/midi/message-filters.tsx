import { Toggle } from "@/components/ui/toggle";
import { 
  Music2, 
  Power, 
  Sliders, 
  ArrowLeftRight, 
  Activity 
} from "lucide-react";

interface MessageFiltersProps {
  filters: {
    noteOn: boolean;
    noteOff: boolean;
    controlChange: boolean;
    pitchBend: boolean;
    aftertouch: boolean;
  };
  onFiltersChange: (filters: MessageFiltersProps["filters"]) => void;
}

export function MessageFilters({ filters, onFiltersChange }: MessageFiltersProps) {
  const toggleFilter = (key: keyof typeof filters) => {
    onFiltersChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <div className="flex space-x-2">
      <Toggle
        pressed={filters.noteOn}
        onPressedChange={() => toggleFilter("noteOn")}
        title="Note On"
      >
        <Music2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={filters.noteOff}
        onPressedChange={() => toggleFilter("noteOff")}
        title="Note Off"
      >
        <Power className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={filters.controlChange}
        onPressedChange={() => toggleFilter("controlChange")}
        title="Control Change"
      >
        <Sliders className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={filters.pitchBend}
        onPressedChange={() => toggleFilter("pitchBend")}
        title="Pitch Bend"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={filters.aftertouch}
        onPressedChange={() => toggleFilter("aftertouch")}
        title="Aftertouch"
      >
        <Activity className="h-4 w-4" />
      </Toggle>
    </div>
  );
}