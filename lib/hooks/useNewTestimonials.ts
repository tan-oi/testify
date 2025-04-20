import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

export function useNewTestimonialsDetection(
  spaceSlug: string,
  type: "TEXT" | "VIDEO",
  latestTimestamp: string | null,
  intervalTime: number = 30000
) {
  const [hasNewTestimonials, setHasNewTestimonials] = useState(false);
  const [newCount, setNewCount] = useState(0);

  const { refetch } = useQuery({
    queryKey: ["testimonials", "check-new", type, spaceSlug, latestTimestamp],
    gcTime: 60000,
    queryFn: async () => {
      if (!latestTimestamp) return null;

      const res = await fetch(
        `/api/space/${spaceSlug}/testimonials/check-new?type=${type}&afterTimestamp=${latestTimestamp}`
      );
      const data = await res.json();
      console.log(data);
      if (data.data.count > 0) {
        setHasNewTestimonials(true);
        setNewCount(data.data.count);
      }

      return data;
    },
    enabled: !!latestTimestamp,
    refetchInterval: intervalTime,
    refetchOnWindowFocus: false,
  });

  const resetCount = useCallback(() => {
    setHasNewTestimonials(false);
    setNewCount(0);
  }, []);

  return {
    hasNewTestimonials,
    newCount,
    resetCount,
    checkNow: refetch,
  };
}
