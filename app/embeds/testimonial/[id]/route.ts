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
    },
  });


  if (!getTestimonial) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  // const html = `  
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1">
  //       <style>
  //         body {
  //           margin: 0;
  //           padding: 16px;
  //           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  //           background-color: #f42a2a;
  //         }
  //         .testimonial {
  //           border-radius: 18px;
  //           padding: 16px;
  //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  //           background-color: #ffffff;
  //         }
  //         .quote {
  //           font-size: 16px;
  //           line-height: 1.5;
  //           margin-bottom: 12px;
  //         }
  //         .author {
  //           display: flex;
  //           align-items: center;
  //         }
  //         .author-image {
  //           width: 40px;
  //           height: 40px;
  //           border-radius: 50%;
  //           margin-right: 12px;
  //           object-fit: cover;
  //         }
  //         .author-name {
  //           font-weight: bold;
  //         }
  //         .author-title {
  //           opacity: 0.7;
  //           font-size: 14px;
  //         }
  //       </style>
  //       <script>
  //         // Auto-resize script to communicate height to parent page
  //         window.addEventListener('load', function() {
  //           const height = document.body.scrollHeight;
  //           window.parent.postMessage({ 
  //             type: 'testimonial-height', 
  //             height: height 
  //           }, '*');
  //         });
  //       </script>
  //     </head>
  //     <body>
  //       <div class="testimonial">
  //         <div>
  //         <div>
  //         ${getTestimonial.content}
  //         </div>
  //           ${getTestimonial.senderName} 
  //         </div>

  //           </div>
  //         </div>
  //       </div>
  //     </body>
  //     </html>
  //   `;
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
