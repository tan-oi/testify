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
import { cardStyles, fontSizeLabels, wrapperStyles } from "./constant";

export interface TestimonialProps {
  getFormDetails: SpaceCustomization | null;
}



export type FontSizeKey = keyof typeof fontSizeLabels

export interface embedStore {
  open : boolean;
  openDialog : (type : "single" | "multiple", data : Record <string,any>) => void;
  close : () => void;
  type : "single" | "multiple",
  overlayData : Record<string,any>| null


}



export type WrapperStyleKeys = keyof typeof wrapperStyles;
export type CardStyleKeys = keyof typeof cardStyles;

export type StyleState = {
  styles: {
    wrapper: typeof wrapperStyles;
    content: typeof cardStyles;
  };
  updateWrapperStyle: (key: WrapperStyleKeys, value: string) => void;
  updateContentStyle: (key: CardStyleKeys, value: string|boolean) => void;
  resetStyles: () => void;
};