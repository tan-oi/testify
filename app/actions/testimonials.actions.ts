"use server";
import { prisma } from "@/lib/prisma";
import { getTextTestimonialsSchema } from "@/lib/schema";
import { Testimonials } from "@prisma/client";

export async function submitTextTestimonial(
  values: Partial<Testimonials> & {
    contentLength: number;
    allowStarRatings: boolean;
   
  }
) {
    
 try {
  const schemaToValidate = getTextTestimonialsSchema({
    contentLength: values.contentLength ,
    allowStarRatings : values.allowStarRatings
  })

  const dataisValid = schemaToValidate.safeParse(values);
  if(!dataisValid.success) {
    return {
      success : false,
      message : 'Validation error!',
      error : dataisValid.error.format(),
    }
  }


  const uploadTestimonial = await prisma.testimonials.create({
    data : {
      spaceId : values.spaceId as string,
      type : "TEXT",
      source : "MANUAL",
      senderEmail : dataisValid.data.senderEmail,
      senderName : dataisValid.data.senderName,
      content : dataisValid.data.content,
      rating : dataisValid.data.rating,
      consentDisplay : dataisValid.data.consentGiven
    }
    })


    return {
      success: true,
      message: "Testimonial submitted successfully!",
      
    }
 }
 catch(err) {
  return {
    success: false,
    message: "Something went wrong. Please try again later.",
    error : err
  }
 }
  
}



export async function submitVideoTestimonial(values : Partial<Testimonials>) {
  try {
   
    const uploadTestimonial = await prisma.testimonials.create({
        data : {
          videoUrl : values.videoUrl as string,
          spaceId : values.spaceId as string,
          senderName : values.senderName as string,
          senderEmail : values.senderEmail as string,
          consentDisplay : values.consentDisplay,
          rating : values.rating
        }
    })
   

    console.log("uplaod values",uploadTestimonial);
    return {
      success : true,
      message : "testimonial submitted!"
    }
  }
  catch(err) {
    return { 
      success : false,
      message : "internal server error"
    }  
  
  }
}