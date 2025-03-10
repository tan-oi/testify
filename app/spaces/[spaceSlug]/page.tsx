
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { TestimonialsList } from "@/components/testimonials-space/testimonials-list";


async function isSpaceValid(spaceSlug: string, userId: string) {
  return await prisma.space.findUnique({
    where: {
      userId: userId,
      slug: spaceSlug
    }
  });
}


async function getTestimonials(spaceId: string) {
  return await prisma.testimonials.findMany({
    where: {
      spaceId: spaceId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export default async function SpacePage({
  params
}: {
  params: Promise<{ spaceSlug: string }>
}) {
  const session = await auth();
  if (!session || !session?.user) redirect("/auth");

  const { spaceSlug } = await params;
  
  const space = await isSpaceValid(spaceSlug, session?.user?.id as string);
  if (!space) return notFound();

  const queryClient = new QueryClient();
  
  
  await queryClient.prefetchQuery({
    queryKey: ['testimonials', space.slug],
    queryFn: () => getTestimonials(space.slug),
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Space: {space.name}</h1>
      
   
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading testimonials...</p>}>
          <TestimonialsList spaceSlug={space.slug} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}