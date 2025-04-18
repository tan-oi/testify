import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if(!session || !session?.user) return NextResponse.json({
            success : false,
            error : "Unauthorised"
        }, {
            status : 401
        })

        
        const res = await prisma.testimonials.findMany({
            where : {
                source :"IMPORT"
            }
        })
        return NextResponse.json({
            res,
            success : true,
            message : "received"
        }, {
            status : 200
        })
    }
    catch(err) 
     {
        return NextResponse.json({
            message : "failed"
        })
     }
}