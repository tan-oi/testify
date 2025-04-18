import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";

interface LikeTestimonialParams {
  id: string;
  isLiked: boolean;
  type: string;
}

interface TestimonialItem {
  id: string;
  isLiked?: boolean; 
  [key: string]: any; 
}

interface TestimonialPage {
  items: TestimonialItem[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

type InfiniteQueryData = InfiniteData<TestimonialPage>;

export function useLikeTestimonial(spaceSlug: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isLiked, type }: LikeTestimonialParams) => {
      const response = await fetch(`/api/space/${spaceSlug}/testimonials/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLiked, id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
      
      return await response.json();
    },
    
    onMutate: async ({ id, isLiked, type }: LikeTestimonialParams) => {
      const queryKey = ["testimonials", "space", type.toLowerCase(), spaceSlug];
      await queryClient.cancelQueries({ queryKey });
      
      const previousData = queryClient.getQueryData<InfiniteQueryData>(queryKey);
      
      queryClient.setQueryData<InfiniteQueryData>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          
          const newPages = oldData.pages.map(page => ({
            ...page,
            items: page.items.map(item => {
              if (item.id === id) {
              
                return {
                  ...item,
                  isLiked: isLiked
                };
              }
              return item;
            })
          }));
          
          return { ...oldData, pages: newPages };
        }
      );
      
      return { previousData, queryKey };
    },
    
    onError: (err, variables, context) => {
      if (context?.previousData && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
    }
  });
}
