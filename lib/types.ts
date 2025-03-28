export interface FormInputTypes{
    header:string;
    description : string;
    type : string;
}

export interface FormCredTypes {
    email: string;
    password: string;
    type : string;

}

export interface UserError{
    success: boolean;
    message : string;
    errorType : string;
}

export interface SpaceOverViewDataInterface {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    textTestimonials: number;
    videoTestimonials: number;
  }
  


export interface CachedSpaceData {
    spaceSlug: string;
    data: {
      spaceData: {
        spaceCustomization: {
          id: string;
          spaceId: string;
          spaceHeader: string;
          spaceCustomMessage: string;
          spaceVideosAllowed: boolean;
          spaceStarRatings: boolean;
          spaceThankYouHeader: string;
          spaceThankYouDescription: string;
          spaceAskConsent: boolean;
          textLengthAllowed: number;
          videoLengthAllowed: number;
          shareAllowed: boolean;
        };
        name: string;
      };
    };
  }

 export interface SidebarElementInterface {
    name : string;
    viewName : string;
    icon : string
}


import { SpaceCustomization } from "@prisma/client";

export interface TextTestimonialProps {
  getFormDetails: SpaceCustomization | null;
}