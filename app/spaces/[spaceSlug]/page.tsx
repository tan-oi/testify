import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation";

async function isSpaceValid(spaceSlug : string, userId: string) {
    return await prisma.space.findUnique({
        where : {
            userId : userId,
            slug : spaceSlug
        }
    })
  
}

export default async function SpacePage({params} : {params : {spaceSlug : string}}) {

    const session = await auth();
    if(!session || !session?.user) redirect("/auth");

    const {spaceSlug} = await params; 

    if (!(await isSpaceValid(spaceSlug, session?.user?.id as string))) return notFound();


    return (
        <p>
            yeah yeah
            {spaceSlug}
        </p>
    )
}