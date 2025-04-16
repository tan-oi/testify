"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTextTestimonialsSchema } from "@/lib/schema";
import { Testimonials } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

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


export async function deleteTestimonial(data : {
  id : string;
  name : string;
}) {

    try {
      const session = await auth();
      if(!session|| !session?.user) return redirect("/auth");

      const isTestimonialValid = await prisma.testimonials.findUnique({
        where : {
          id : data.id
        }
      });

      if(!isTestimonialValid) {
        return {
          success : false,
          error : "Testimonial does'n exist, refresh!"
        }
      }

      const deleteValidTestimonial = await prisma.testimonials.delete({
        where : {
          id : data.id
        }
      })

      if(deleteValidTestimonial) {
        return {
          success :true,
          message :"Deleted successfully."
        }
      }
      else {
        return {
          success : false,
          message :"please try again"
        }
      }

    }
    catch(err) {
          return {
            success : false,
            error : "Something went wrong"
          }
    }
}


export async function importX(spaceSlug : string, formData : any) {
  try {
    const link = formData.get("link");

    console.log(formData);
    console.log(spaceSlug);

    const findSpace = await prisma.space.findUnique({
      where : {
        slug : spaceSlug
      }
    })

     if(!findSpace) {
      return {
        success : false,
        error : "Could not find a space"
      }
    }

    const res = await getTweet(link);
    if(!res) return {
      success : false,
      error :  "Tweet not found"
    }

    const message = res.text;
    const firstName = res.user.name;

    const videos : string[] =[]
    if(res.video) {
        videos.push(res.video.variants[res.video.variants.length - 1].src)
    }

    const makeTestimonial = await prisma.testimonials.create({
      data : {
      spaceId : findSpace.id,
        type : res.video? "VIDEO" : "TEXT",
        senderName : firstName,
        content : message,
        videoUrl : videos[0],
        consentDisplay : true,
      }
    })

   
    return {
      success : true,
      message : "Added!"
    }

    // })
  }
  catch(err) {
    return { 
      success : false,
      error : "Something got wrong"
    }
  }
}