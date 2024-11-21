import { MidiMessage } from "@/hooks/use-midi-messages";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: MidiMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-1 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-1 text-sm",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(message.timestamp).toISOString().split("T")[1].split(".")[0]}
            </span>
            <span className="font-medium">{message.type}</span>
            {message.note && (
              <span className="font-mono">
                Note: {message.note} ({message.velocity})
              </span>
            )}
            {message.controller && (
              <span className="font-mono">
                CC: {message.controller} ({message.value})
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            Channel: {message.channel}
          </span>
        </div>
      ))}
    </div>
  );
}