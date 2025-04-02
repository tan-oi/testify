import { create } from "zustand";
import { Testimonials } from "@prisma/client";

interface TestimonialStore {
  allTestimonials: Record<string, Testimonials>; 
  addTestimonial: (data: Testimonials[]) => void;
  getTestimonials: (type?: string) => Testimonials[];
  textCursor : string
  setTextCursor : (cursor : string) => void;
  videoCursor : string;
  setVideoCursor : (cursor : string) => void;
  allCursor : string;
  setAllCursor : (cursor : string) => void;
}

export const useTestimonialStore = create<TestimonialStore>((set, get) => ({

  allTestimonials: {},

  addTestimonial: (newData) => {
    set((state) => {
      const updatedTestimonials = { ...state.allTestimonials };
      
   
      newData.forEach((testimonial) => {
        if (!updatedTestimonials[testimonial.id]) {
          updatedTestimonials[testimonial.id] = testimonial;
        }
      });
      
      return { allTestimonials: updatedTestimonials };
    });
  },

  
  getTestimonials: (type?: string) => {
    const allData = Object.values(get().allTestimonials);
    return type ? allData.filter((item) => item.type === type) : allData;
  },

  textCursor : "",
  setTextCursor: (cursor) => set({
    textCursor : cursor
  }),
  videoCursor : "",
  setVideoCursor : (cursor) => set({
    videoCursor : cursor
  }),

  allCursor : "",
  setAllCursor : (cursor) => set({
    allCursor : cursor
  })

}));