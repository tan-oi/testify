import { prisma } from "@/lib/prisma";
import { Testimonials } from "@prisma/client";


   export async function EditSingleTestimonial({
    data
} : Partial<Testimonials>) {
  const getTestimonial = await prisma.testimonials.findUnique({
    where : {
      id: data.id 
    },
    select : {
      content : true,
      senderName : true
    }

  })
    console.log(data);
    return (
      <>
      <p>edit rendering </p> 

      <iframe
        src="http://localhost:3000/embeds/testimonial/cm91pk31a0007ufsgjtg6n7wk"
        width="100%"
        height="150"
        frameBorder="0"
        loading="lazy"
      ></iframe> 
      </>


      
    )
}