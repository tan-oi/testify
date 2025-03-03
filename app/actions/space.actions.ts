"use server";

import { basicDetailsSchema } from "@/components/space-form/basic/basic-details";
import { thankYouSchema } from "@/components/space-form/thankyou/thankyou-details";
import { prisma } from "@/lib/prisma";
import {z} from "zod"



const fullSchema = z.object({
  name: z.string(),
  headerTitle:z.string(),
  headerDescription: z.string(),
  askConsent : z.boolean(),
  allowVideo : z.boolean(),
  allowStarRatings : z.boolean(),
  thankYouHeader : z.string(),
  thankYouMessage : z.string(),
  allowShare : z.boolean(),
  textLength : z.number().int().positive(),
  videoLength : z.number().int().optional()
})


export async function createSpace(data : unknown) {
  const parsedData = fullSchema.safeParse(data);
  console.log(parsedData);

     

    
  console.log(data);

}
