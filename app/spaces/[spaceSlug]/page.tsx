import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TestimonialsList } from "@/components/testimonials-space/testimonials-list";
import { getTestimonials, isSpaceValid } from "@/lib/services/spaceMetrics";

import { GlobalModal } from "@/components/use-dialog";
import { SpaceSidebar } from "@/components/testimonials-space/sidebar";
import { fetchTextTestimonials } from "@/lib/services/testimonials";



export default async function SpacePage({
  params,
}: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const session = await auth();
  if (!session || !session?.user) redirect("/auth");

  const { spaceSlug } = await params;

  const space = await isSpaceValid(spaceSlug, session?.user?.id as string);
  if (!space) return notFound();

  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["testimonials", "space", space.slug],
  //   queryFn: () => getTestimonials(space.id),
  // });

  await queryClient.prefetchInfiniteQuery({
    queryKey : ["testimonials","space", "text",space.slug],
    queryFn : async ({pageParam = null}) =>  {

      const res = await fetchTextTestimonials({
        limit : 10,
        cursor : pageParam,
        spaceId : space.id,
        type : "TEXT"
      })
      return {
        items: res.data?.items,
        nextCursor: res.data?.nextCursor,
        hasNextPage: res.data?.hasNextPage,
        isExhausted : res.data?.isExhausted
      };
    },
    initialPageParam: null,
    getNextPageParam : (lastPage:any) => lastPage.nextCursor
  })

  await queryClient.prefetchInfiniteQuery({
    queryKey : ["testimonials","space", "video",space.slug],
    queryFn : async ({pageParam = null}) =>  {

      const res = await fetchTextTestimonials({
        limit : 10,
        cursor : pageParam,
        spaceId : space.id,
        type : "VIDEO"
      })
      return {
        items: res.data?.items,
        nextCursor: res.data?.nextCursor,
        hasNextPage: res.data?.hasNextPage,
        isExhausted : res.data?.isExhausted
      };
    },
    initialPageParam: null,
    getNextPageParam : (lastPage:any) => lastPage.nextCursor
  })

  return (
    <div className="pt-10 space-y-10">
      <div className="flex gap-8">
        <div className="rounded-2xl bg-secondary 
        border border-slate-800 md:w-[320px]">
            <SpaceSidebar/>
        </div>
        <div className="w-full">
          
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading testimonials...</p>}>
          <TestimonialsList spaceSlug={space.slug} spaceId = {space.id}/>
        </Suspense>
        <GlobalModal/>
      </HydrationBoundary>
        </div>
     </div>
     
      
    
    </div>
  );
}
