import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TestimonialsList } from "@/components/testimonials-space/testimonials-list";
import { getTestimonials, isSpaceValid } from "@/lib/services/spaceMetrics";
import { Button } from "@/components/ui/button";
import { AboutOverview } from "@/components/testimonials-space/overview";
import { GlobalModal } from "@/components/use-dialog";

// async function isSpaceValid(spaceSlug: string, userId: string) {
//   return await prisma.space.findUnique({
//     where: {
//       userId: userId,
//       slug: spaceSlug
//     }
//   });
// }

// async function getTestimonials(spaceId: string) {
//   return await prisma.testimonials.findMany({
//     where: {
//       spaceId: spaceId
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   });
// }

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

  await queryClient.prefetchQuery({
    queryKey: ["testimonials", "space", space.slug],
    queryFn: () => getTestimonials(space.id),
  });

  return (
    <div className="pt-10 space-y-10">
     
     <div className="flex items-center justify-between ">
      <h1 className="font-bold text-2xl">{space.name[0].toUpperCase() + space.name.substring(1)}</h1>
     <AboutOverview/>
     </div>
     
      <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading testimonials...</p>}>
          <TestimonialsList spaceSlug={space.slug} />
        </Suspense>
        <GlobalModal/>
      </HydrationBoundary>
     </div>
     
      
    
    </div>
  );
}
