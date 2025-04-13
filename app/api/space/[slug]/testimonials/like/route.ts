    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";
    import { redirect } from "next/navigation";
    import { NextRequest, NextResponse } from "next/server";

    export async function POST(req : NextRequest,{
        params
    } : {
        params : Promise<{slug : string}>
    }) {
        console.log("enters api");
        const session = await auth();

        if(!session || !session?.user) return redirect("/auth");
        const {slug} = await params;

        const {id, isLiked} = await req.json();
        console.log(isLiked, "like check");
        try {
            const testimonial = await prisma.testimonials.findUnique({
                where :{
                    id : id
                },  

            })

            console.log(testimonial,"tt");

            if (!testimonial) {
                return NextResponse.json({
                    sucess : false,
                    error : "Something gone wrong"
                },
                {
                    status : 500
                }
                )
                }

            const updated = await prisma.testimonials.update({
                where: { id },
                data: { isLiked: isLiked },
            });
            console.log(updated,"up");
            return NextResponse.json({
                success : true,
                message : "completed"
            }, {
                status : 200
            }) 
        }
        catch(err) {
            return NextResponse.json({
                sucess : false,
                error : "Something gone wrong"
            },
            {
                status : 500
            }
            )
        }

    }