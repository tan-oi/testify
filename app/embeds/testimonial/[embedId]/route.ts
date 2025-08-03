import { NextRequest, NextResponse } from "next/server";
import { getTestimonialEmbed } from "@/app/actions/testimonials.actions";
import { isValidEmbedId } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ embedId: string }> }
) {
  try {
    const { embedId } = await params;

    // Validate embed ID format
    if (!isValidEmbedId(embedId)) {
      return new NextResponse("Invalid embed ID", { status: 400 });
    }

    const result = await getTestimonialEmbed(embedId);
    
    if (!result.success) {
      return new NextResponse("Embed not found", { status: 404 });
    }

    const { data: embed } = result;
    const testimonial = embed?.testimonial;

    const wrapperStyles = embed?.wrapperStyles as any;
    const contentStyles = embed?.contentStyles as any;

    // Generate HTML based on template
    const html = generateEmbedHTML(testimonial, wrapperStyles, contentStyles, embed?.template || "classic");

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Embed error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}


function generateEmbedHTML(testimonial: any, wrapperStyles: any, contentStyles: any, template: string) {
  const containerBackground = wrapperStyles.gradient
    ? wrapperStyles.gradient
    : wrapperStyles.backgroundColor || "#ffffff";

  const baseContentStyle = `
    font-weight: ${contentStyles?.fontBold ? "700" : "400"};
    font-size: ${contentStyles?.fontSize || "18px"};
    background: ${contentStyles?.backgroundColor || "transparent"};
    color: ${contentStyles?.textColor || "#000000"};
    border: ${contentStyles?.border ? `${contentStyles?.borderWidth || "1px"} solid ${contentStyles?.borderColor || "#cccccc"}` : "none"};
    border-radius: ${contentStyles?.borderRadius || "0px"};
    font-family: ${contentStyles?.fontFamily || "Arial, sans-serif"};
  `;

  const wrapperStyle = `
    background: ${containerBackground};
    padding: ${wrapperStyles?.padding || "20px"};
    min-height: ${wrapperStyles?.minHeight || "300px"};
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const generateTemplateHTML = () => {
    switch (template) {
      case "modern":
        return generateModernHTML();
      case "minimal":
        return generateMinimalHTML();
      case "social":
        return generateSocialHTML();
      default:
        return generateClassicHTML();
    }
  };

  const generateClassicHTML = () => `
    <div class="testimonial-card" style="${baseContentStyle} padding: 24px; max-width: 500px; width: 100%; position: relative; box-shadow: ${contentStyles?.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)"};">
      <div class="quote-icon" style="position: absolute; top: -8px; left: -8px; opacity: 0.2; font-size: 36px; color: ${contentStyles?.textColor || "#000000"};">"</div>
      ${testimonial.rating && testimonial.rating > 0 ? `
        <div class="rating" style="display: flex; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
          ${Array.from({ length: 5 }).map((_, i) => 
            `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 16px;">★</span>`
          ).join('')}
        </div>
      ` : ''}
      <div class="content" style="margin-bottom: 20px; line-height: 1.6; text-align: ${contentStyles?.textAlign || "center"}; font-size: clamp(14px, 4vw, ${contentStyles?.fontSize || "18px"});">
        "${testimonial.content || ''}"
      </div>
      <div class="author" style="text-align: center;">
        <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <span style="font-size: 16px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
            ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
          </span>
        </div>
        <div class="author-name" style="font-weight: 500; font-size: clamp(12px, 3vw, 14px); opacity: 0.8; word-break: break-word;">${testimonial.senderName || 'Anonymous'}</div>
      </div>
    </div>
  `;

  const generateModernHTML = () => `
    <div class="testimonial-card" style="${baseContentStyle} padding: 20px; max-width: 600px; width: 100%; display: flex; flex-direction: column; gap: 16px; box-shadow: ${contentStyles?.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)"};">
      <div class="mobile-header" style="display: flex; align-items: center; gap: 12px;">
        <div class="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <span style="font-size: 18px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
            ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
          </span>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div class="author-name" style="font-weight: 500; font-size: clamp(14px, 3.5vw, 16px); opacity: 0.8; word-break: break-word;">${testimonial.senderName || 'Anonymous'}</div>
          ${testimonial.rating && testimonial.rating > 0 ? `
            <div class="rating" style="display: flex; align-items: center; margin-top: 4px;">
              ${Array.from({ length: 5 }).map((_, i) => 
                `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 14px;">★</span>`
              ).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="content" style="line-height: 1.6; text-align: ${contentStyles?.textAlign || "left"}; font-size: clamp(14px, 4vw, ${contentStyles?.fontSize || "16px"}); word-break: break-word;">
        "${testimonial.content || ''}"
      </div>
    </div>
  `;

  const generateMinimalHTML = () => `
    <div class="testimonial-card" style="${baseContentStyle} padding: 30px 20px; max-width: 500px; width: 100%; text-align: center;">
      <div style="margin-bottom: 20px;">
        <div style="font-size: clamp(24px, 6vw, 32px); margin-bottom: 12px; opacity: 0.6; color: ${contentStyles?.textColor || "#000000"};">"</div>
        <p style="font-size: clamp(14px, 4vw, ${contentStyles?.fontSize || "18px"}); font-weight: 300; line-height: 1.8; text-align: ${contentStyles?.textAlign || "center"}; word-break: break-word; margin: 0;">
          "${testimonial.content || ''}"
        </p>
      </div>
      ${testimonial.rating && testimonial.rating > 0 ? `
        <div class="rating" style="display: flex; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
          ${Array.from({ length: 5 }).map((_, i) => 
            `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 14px;">★</span>`
          ).join('')}
        </div>
      ` : ''}
      <div style="font-size: clamp(12px, 3vw, 14px); opacity: 0.7; word-break: break-word;">
        — ${testimonial.senderName || 'Anonymous'}
      </div>
    </div>
  `;

  const generateSocialHTML = () => `
    <div class="testimonial-card" style="${baseContentStyle} padding: 16px; max-width: 400px; width: 100%; box-shadow: ${contentStyles?.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)"};">
      <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
        <div class="avatar" style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <span style="font-size: 14px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
            ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
          </span>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
            <span style="font-weight: 500; font-size: clamp(12px, 3vw, 14px); word-break: break-word;">${testimonial.senderName || 'Anonymous'}</span>
            ${testimonial.rating && testimonial.rating > 0 ? `
              <div style="display: flex; align-items: center;">
                ${Array.from({ length: 5 }).map((_, i) => 
                  `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 12px;">★</span>`
                ).join('')}
              </div>
            ` : ''}
          </div>
          <p style="font-size: clamp(12px, 3.5vw, ${contentStyles?.fontSize || "14px"}); line-height: 1.5; text-align: ${contentStyles?.textAlign || "left"}; word-break: break-word; margin: 0;">
            "${testimonial.content || ''}"
          </p>
        </div>
      </div>
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Testimonial</title>
      <style>
        * { 
          box-sizing: border-box; 
        }
        body { 
          margin: 0; 
          padding: 0; 
          font-family: Arial, sans-serif;
          line-height: 1.5;
          overflow-x: hidden;
        }
        .testimonial-container { 
          ${wrapperStyle}
          width: 100%;
          min-height: 100vh;
          padding: clamp(16px, 4vw, 40px);
        }
        .star { 
          font-size: 16px; 
          display: inline-block;
        }
        .testimonial-card {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-radius: clamp(8px, 2vw, 12px);
          overflow: hidden;
          margin: 0 auto;
        }
        .avatar {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4));
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }    
        
     
        @media (max-width: 480px) {
          .testimonial-container {
            padding: 10px;
            min-height: auto;
          }
          
          .testimonial-card {
            padding: 10px !important;
          }
          
          .quote-icon {
            font-size: 28px !important;
            top: -6px !important;
            left: -6px !important;
          }
          
          .rating {
            margin-bottom: 12px !important;
          }
          
          .content {
            margin-bottom: 10px !important;
          }
          
          .avatar {
            width: 32px !important;
            height: 32px !important;
          }
          
          .avatar span {
            font-size: 14px !important;
          }
          
          .mobile-header {
            flex-direction: row !important;
          }
          
          .mobile-header .avatar {
            width: 40px !important;
            height: 40px !important;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .testimonial-container {
            padding: clamp(20px, 5vw, 32px);
          }
        }
        
        @media (max-width: 767px) and (orientation: landscape) {
          .testimonial-container {
            min-height: auto;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="testimonial-container">
        ${generateTemplateHTML()}
      </div>
    </body>
    </html>
  `;
}






// function generateEmbedHTML(testimonial: any, wrapperStyles: any, contentStyles: any, template: string) {



 
  
//   const containerBackground = wrapperStyles.gradient
//     ? wrapperStyles.gradient
//     : wrapperStyles.backgroundColor || "#ffffff";

//   const baseContentStyle = `
//     font-weight: ${contentStyles?.fontBold ? "700" : "400"};
//     font-size: ${contentStyles?.fontSize || "18px"};
//     background: ${contentStyles?.backgroundColor || "transparent"};
//     color: ${contentStyles?.textColor || "#000000"};
//     border: ${contentStyles?.border ? `${contentStyles?.borderWidth || "1px"} solid ${contentStyles?.borderColor || "#cccccc"}` : "none"};
//     border-radius: ${contentStyles?.borderRadius || "0px"};
//     font-family: ${contentStyles?.fontFamily || "Arial, sans-serif"};
//   `;

//   const wrapperStyle = `
//     background: ${containerBackground};
//     padding: ${wrapperStyles?.padding || "40px"};
//     min-height: ${wrapperStyles?.minHeight || "300px"};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   `;

//   const generateTemplateHTML = () => {
//     switch (template) {
//       case "modern":
//         return generateModernHTML();
//       case "minimal":
//         return generateMinimalHTML();
//       case "social":
//         return generateSocialHTML();
//       default:
//         return generateClassicHTML();
//     }
//   };

//   const generateClassicHTML = () => `
//     <div class="testimonial-card" style="${baseContentStyle} padding: 32px; max-width: 500px; width: 100%; position: relative; box-shadow: ${contentStyles?.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)"};">
//       <div class="quote-icon" style="position: absolute; top: -12px; left: -12px; opacity: 0.2; font-size: 48px; color: ${contentStyles?.textColor || "#000000"};">"</div>
//       ${testimonial.rating && testimonial.rating > 0 ? `
//         <div class="rating" style="display: flex; justify-content: center; margin-bottom: 16px;">
//           ${Array.from({ length: 5 }).map((_, i) => 
//             `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 16px;">★</span>`
//           ).join('')}
//         </div>
//       ` : ''}
//       <div class="content" style="margin-bottom: 24px; line-height: 1.6; text-align: ${contentStyles?.textAlign || "center"}; font-size: ${contentStyles?.fontSize || "18px"};">
//         "${testimonial.content || ''}"
//       </div>
//       <div class="author" style="text-align: center;">
//         <div class="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
//           <span style="font-size: 18px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
//             ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
//           </span>
//         </div>
//         <div class="author-name" style="font-weight: 500; font-size: 14px; opacity: 0.8;">${testimonial.senderName || 'Anonymous'}</div>
//       </div>
//     </div>
//   `;

//   const generateModernHTML = () => `
//     <div class="testimonial-card" style="${baseContentStyle} padding: 24px; max-width: 600px; width: 100%; display: flex; align-items: start; gap: 16px; box-shadow: ${contentStyles?.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)"};">
//       <div style="flex-shrink: 0;">
//         <div class="avatar" style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center;">
//           <span style="font-size: 20px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
//             ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
//           </span>
//         </div>
//       </div>
//       <div style="flex: 1; min-width: 0;">
//         ${testimonial.rating && testimonial.rating > 0 ? `
//           <div class="rating" style="display: flex; align-items: center; margin-bottom: 8px;">
//             ${Array.from({ length: 5 }).map((_, i) => 
//               `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 14px;">★</span>`
//             ).join('')}
//           </div>
//         ` : ''}
//         <div class="content" style="margin-bottom: 12px; line-height: 1.6; text-align: ${contentStyles?.textAlign || "left"}; font-size: ${contentStyles?.fontSize || "16px"};">
//           "${testimonial.content || ''}"
//         </div>
//         <div class="author-name" style="font-weight: 500; font-size: 14px; opacity: 0.8;">${testimonial.senderName || 'Anonymous'}</div>
//       </div>
//     </div>
//   `;

//   const generateMinimalHTML = () => `
//     <div class="testimonial-card" style="${baseContentStyle} padding: 40px 20px; max-width: 500px; width: 100%; text-align: center;">
//       <div style="margin-bottom: 24px;">
//         <div style="font-size: 32px; margin-bottom: 16px; opacity: 0.6; color: ${contentStyles?.textColor || "#000000"};">"</div>
//         <p style="font-size: ${contentStyles?.fontSize || "18px"}; font-weight: 300; line-height: 1.8; text-align: ${contentStyles?.textAlign || "center"};">
//           "${testimonial.content || ''}"
//         </p>
//       </div>
//       ${testimonial.rating && testimonial.rating > 0 ? `
//         <div class="rating" style="display: flex; justify-content: center; margin-bottom: 16px;">
//           ${Array.from({ length: 5 }).map((_, i) => 
//             `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 14px;">★</span>`
//           ).join('')}
//         </div>
//       ` : ''}
//       <div style="font-size: 14px; opacity: 0.7;">
//         — ${testimonial.senderName || 'Anonymous'}
//       </div>
//     </div>
//   `;

//   const generateSocialHTML = () => `
//     <div class="testimonial-card" style="${baseContentStyle} padding: 16px; max-width: 400px; width: 100%; box-shadow: ${contentStyles?.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)"};">
//       <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
//         <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
//           <span style="font-size: 14px; font-weight: 600; color: ${contentStyles?.textColor || "#000000"}">
//             ${(testimonial.senderName || 'A').charAt(0).toUpperCase()}
//           </span>
//         </div>
//         <div style="flex: 1; min-width: 0;">
//           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
//             <span style="font-weight: 500; font-size: 14px;">${testimonial.senderName || 'Anonymous'}</span>
//             ${testimonial.rating && testimonial.rating > 0 ? `
//               <div style="display: flex; align-items: center;">
//                 ${Array.from({ length: 5 }).map((_, i) => 
//                   `<span class="star" style="color: ${i < testimonial.rating ? '#fbbf24' : '#d1d5db'}; font-size: 12px;">★</span>`
//                 ).join('')}
//               </div>
//             ` : ''}
//           </div>
//           <p style="font-size: ${contentStyles?.fontSize || "14px"}; line-height: 1.5; text-align: ${contentStyles?.textAlign || "left"};">
//             "${testimonial.content || ''}"
//           </p>
//         </div>
//       </div>
//     </div>
//   `;

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1">
//       <title>Testimonial</title>
//       <style>
//         * { box-sizing: border-box; }
//         body { 
//           margin: 0; 
//           padding: 0; 
//           font-family: Arial, sans-serif;
//           line-height: 1.5;
//         }
//         .testimonial-container { 
//           ${wrapperStyle}
//           width: 100%;
//           height: 100vh;
//         }
//         .star { 
//           font-size: 16px; 
//           display: inline-block;
//         }
//         .testimonial-card {
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
//           overflow: hidden;
//         }
//         .avatar {
//           background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4));
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="testimonial-container">
//         ${generateTemplateHTML()}
//       </div>
//     </body>
//     </html>
//   `;
// } 