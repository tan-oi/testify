import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { spaceExists } from "@/lib/services/spaceMetrics";

export default async function ReceivedTestimonials(
    { params } : {
        params : Promise<{spaceSlug : string}>;
    }
) {

    const { spaceSlug } = await params;

    const isValid = await spaceExists(spaceSlug)
    if(!isValid) return <p>this space doesnt exist, please  check the link again, thanks</p>


    const getFormDetails = await prisma.space.findUnique({
        where : {
            slug : spaceSlug
        },
        select : {
            spaceCustomization : true
        }
    })

    console.log(getFormDetails);
    return (
        <>
           this is {spaceSlug}
           <div className="container pt-10 flex items-center justify-center mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div>

                            {getFormDetails?.spaceCustomization?.headerTitle}
                            </div>
                            <div>
                                {getFormDetails?.spaceCustomization?.headerDescription}
                            </div>
                        </CardTitle>
                    </CardHeader>

                </Card>
           </div>
        </>
    )

}