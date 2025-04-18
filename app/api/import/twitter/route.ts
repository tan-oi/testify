import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

export async function POST(){
    try {
        

       

        const tweetData = await getTweet("1911873234338820485") 
        console.log(tweetData);

        return NextResponse.json({
            message :"okay",
            tweetData
        })
    }
    catch(err) {
        console.log(err);
    }
}

