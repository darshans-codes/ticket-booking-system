import { Loader2 } from "lucide-react";

function LoadingSpinner({
  size = 40,
  text = "Loading...",
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        size={size}
        className="animate-spin text-indigo-600"
      />

      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      {content}
    </div>
  );
}

export default LoadingSpinner;