import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Empty component
export function Empty() {
  return (
    <div className={cn("flex h-full items-center justify-center text-gray-400")}>Empty</div>
  );
}