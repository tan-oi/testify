import { auth } from "@/auth";
import { DashboardOverview } from "@/components/space-form/dashboard-overview";
import { SpaceOverview } from "@/components/space-overview";

import { GlobalModal } from "@/components/use-dialog";

import { fetchDashboardOverview, fetchSpaceOverview } from "@/lib/services/dashboardMetrics";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { redirect } from "next/navigation";


export default async function Dashboard() {
  const session = await auth();
  console.log(session);
  if (!session || !session?.user) redirect("/auth");
  const userId = session?.user?.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: () => fetchDashboardOverview(userId as string),
  });


  await queryClient.prefetchQuery({
    queryKey : ["space","overview"],
    queryFn : () => fetchSpaceOverview(userId as string)
  })
  // const dehydratedState = dehydrate(queryClient);


  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="px-4 pt-10 pb-14 space-y-10">
          {/* <div className="space-y-8">
            <h1 className="text-2xl sm:text-4xl text-foreground font-bold">
              Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <Card className="w-full h-[100px] md:h-[120px] border-muted border bg-secondary">
                <CardContent className="pt-2 md:pt-4 flex items-center ">
                  <div className="flex flex-col space-y-2">
                    <h1 className="font-semibold text-muted-foreground">
                      Total Spaces
                    </h1>
                    <p className="text-muted-foreground">1</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full h-[100px] md:h-[120px] border-muted border bg-secondary">
                <CardContent className="pt-2 md:pt-4 flex items-center ">
                  <div className="flex flex-col space-y-2">
                    <h1 className="font-semibold text-muted-foreground">
                      Text testimonials
                    </h1>
                    <p className="text-muted-foreground">1</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="w-full h-[100px] md:h-[120px] border-muted border bg-secondary">
                <CardContent className="pt-2 md:pt-4 flex flex-1 justify-between">
                  <div className="flex flex-col space-y-2">
                    <h1 className="font-semibold text-muted-foreground">
                      Video Testimonials
                    </h1>
                    <p className="text-muted-foreground">1</p>
                  </div>
                  <div>
                    <Video className="text-muted"/>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> */}
          <DashboardOverview />

          <div>
            <SpaceOverview />
          </div>
          <GlobalModal/>
        </div>
      </HydrationBoundary>
    </>
  );
}
