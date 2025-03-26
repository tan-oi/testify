import TextTestimonial from "@/components/submit-testimonials/text-testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
                            <div className="flex items-center justify-center">
                            {getFormDetails?.spaceCustomization?.headerTitle}
                            </div>
                            <div>
                                {getFormDetails?.spaceCustomization?.headerDescription}
                            </div>
                        </CardTitle>
                    </CardHeader>

                <CardContent className="ml-6">
                    <div>
                        <p>
                            QUestions
                        </p>
                        <ul>
                            <li>one</li>
                            <li>two</li>
                            <li>three</li>
                        </ul>
                    </div>
                </CardContent>  
                    <CardFooter className="block">
                        <div className="flex justify-center items-center gap-4">
                            <Button variant={"default"}>
                                video
                            </Button>
                            <TextTestimonial getFormDetails={getFormDetails?.spaceCustomization || null}/>
                        </div>
                    </CardFooter>
                </Card>
           </div>
        </>
    )

}