import TextTestimonial from "@/components/submit-testimonials/text-testimonials";
import VideoTestimonial from "@/components/submit-testimonials/video-testimonials";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { spaceExists } from "@/lib/services/spaceMetrics";
import { Questions } from "@/lib/store/spaceStore";
export default async function ReceivedTestimonials({
  params,
}: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const { spaceSlug } = await params;

  const isValid = await spaceExists(spaceSlug);
  if (!isValid)
    return <p>this space doesnt exist, please check the link again, thanks</p>;

  const getFormDetails = await prisma.space.findUnique({
    where: {
      slug: spaceSlug,
    },
    select: {
      spaceCustomization: true,
    },
  });

  const questions = getFormDetails?.spaceCustomization?.spaceQuestions as
    | Questions[]
    | undefined;

  
  return (
    <>
      <div className="container pt-10 flex items-center justify-center mx-auto">
        <Card className="md:min-w-[400px] bg-card">
          <CardHeader>
            <CardTitle>
              <div className="flex-col items-center justify-center">
                <p className="text-xl text-center">
                  {getFormDetails?.spaceCustomization?.headerTitle}
                </p>
                <p className="text-sm text-white/60 text-center">
                  {getFormDetails?.spaceCustomization?.headerDescription}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="container mx-auto">
            <p className="text-md text-white/50">Respond accordingly</p>
            <ul>
              {questions?.map((item, i) => (
                <div key={i}>
                  {item?.id}. {item?.text}
                </div>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="gap-4">
            {getFormDetails?.spaceCustomization?.allowVideo ? (
              <VideoTestimonial
                getFormDetails={getFormDetails?.spaceCustomization || null}
              />
            ) : null}
            <TextTestimonial
              getFormDetails={getFormDetails?.spaceCustomization || null}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

// "use client";

// import { UploadButton } from "@/lib/uploadthing";
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {
//   const [image,setImage] = useState<string|null>(null);
//   const [video,setVideo] = useState<string|null>(null);
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <UploadButton
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {

//           console.log("Files: ", res[0].ufsUrl);
//           setImage(res[0].ufsUrl);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {

//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//       <UploadButton
//         endpoint="videoUploader"
//         onClientUploadComplete={(res) => {
//           setImage(null)
//           console.log("Files: ", res);
//           setVideo(res[0].ufsUrl)
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           console.log(error.cause);
//           alert(`ERROR! ${error.message}`);
//         }}
//       />

//       {image && (

//         <Image src={image} alt="okay"
//         width="100" height="100"/>

//       )}

//       {video && (
//           <div className="flex justify-center items-center">
//           <video controls width="600">
//             <source src={video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </main>
//   );
//       }
