"use client"
import { Video } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useQuery, useQueryClient } from "@tanstack/react-query"


export function DashboardOverview() {
    const { data,isLoading } = useQuery({
    queryKey : ["dashboard","overview"],
    queryFn : async () => {
      const res = await fetch("/api/dashboard/overview");
      if(!res.ok) throw new Error("failed to fetch");
      return res.json();
    },
    staleTime : 25*1000,
    refetchInterval : 30*1000,
    
    refetchIntervalInBackground : false,
  
  })

  if(isLoading) {
    return (
      <p>loading brev</p>
    )
  }
  const dashboardData = data.data

    return(
        <>
        <div className="space-y-8">
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
                    <p className="text-muted-foreground">{dashboardData.spaceCount}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full h-[100px] md:h-[120px] border-muted border bg-secondary">
                <CardContent className="pt-2 md:pt-4 flex items-center ">
                  <div className="flex flex-col space-y-2">
                    <h1 className="font-semibold text-muted-foreground">
                      Text testimonials
                    </h1>
                    <p className="text-muted-foreground">{dashboardData.textTestimonials}</p>
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
                    <p className="text-muted-foreground">{dashboardData.videoTestimonials}</p>
                  </div>
                  <div>
                    <Video className="text-muted"/>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
    )
}

