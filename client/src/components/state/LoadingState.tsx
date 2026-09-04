import { Loader2 } from "lucide-react";

function LoadingState() {
  return (
    <div className="grid place-items-center py-20">
      <Loader2 className="animate-spin text-interactive-primary" size={40} />
    </div>
  );
}

export default LoadingState;