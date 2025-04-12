import { generateHTML } from "@/components/embeds/singleTemplate";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const queryObject = Object.fromEntries(request.nextUrl.searchParams.entries());


  const id = (await params).id;
  const getTestimonial = await prisma.testimonials.findUnique({
    where: {
      id,
    },
    select: {
      content: true,
      senderName: true,
      videoUrl : true
    },
  });

    console.log(getTestimonial);

  if (!getTestimonial) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  
  if(!getTestimonial?.content) {
    const url = getTestimonial.videoUrl;
    const newHtml = `
    <div style="
      width: 350px;
      max-width: 100%
    ">
      <video src="${url}" controls autoplay width="100%" height="auto">
        Your browser does not support the video tag.
      </video>
    </div>
    `;
    
    return new NextResponse(newHtml, {
      headers: {
        "Content-Type": "text/html"
      }
    });
  }

  const html = generateHTML({
    content: getTestimonial.content,
    senderName: getTestimonial.senderName,
    video: null, 
    styles: {
      wrapper: queryObject.wrapper,
      content: queryObject.content
    }
  });
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      //gotta add caching.
    },
  });
}
