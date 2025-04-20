import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface NewTestimonialsBannerProps {
  count: number;
  onRefresh: () => void;
}

export function NewTestimonialsBanner({ count, onRefresh }: NewTestimonialsBannerProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
        <span>
          {count} new testimonial{count > 1 ? 's' : ''} available
        </span>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onRefresh}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
}