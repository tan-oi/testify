// uploadthing.config.ts (using Next.js App Router)
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
const f = createUploadthing();

const checkAuth = async () => { 
  const session = await auth();

  if (!session?.user?.id || !session?.user) {
    throw new UploadThingError("Unauthorized");
  }

  return { id: session.user.id as string };
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => { 
      const user = await checkAuth();
      return { userId: user.id as string};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);


      return { uploadedBy: metadata.userId };
    }),
  videoUploader: f({
    "video": {
      maxFileSize: "512MB",
    },
  })
    .middleware(async () => {
      const user = await auth();
    //   @ts-ignore
      return { userId: user?.session?.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata);
      console.log("file url", file.ufsUrl); 

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;



