import { create } from "zustand";
import { embedStore,WrapperStyleKeys,CardStyleKeys,StyleState } from "../types";
import { wrapperStyles,cardStyles } from "../constant";

export const useEmbedStore = create<embedStore>((set) => ({
    open : false,
    type : "single",
    overlayData : null,
    openDialog : (type,data) => set({
        open : true, type : type,overlayData : data
    }),
    close : () => set({
        open : false, type : "single", overlayData : null
    })
}))

// Cache for embeds to prevent repeated API calls
export const useEmbedCache = create<{
  embeds: Record<string, any[]>;
  setEmbeds: (testimonialId: string, embeds: any[]) => void;
  getEmbeds: (testimonialId: string) => any[] | null;
  clearCache: () => void;
  clearTestimonialCache: (testimonialId: string) => void;
}>((set, get) => ({
  embeds: {},
  setEmbeds: (testimonialId: string, embeds: any[]) => 
    set((state) => ({
      embeds: { ...state.embeds, [testimonialId]: embeds }
    })),
  getEmbeds: (testimonialId: string) => {
    const state = get();
    return state.embeds[testimonialId] || null;
  },
  clearCache: () => set({ embeds: {} }),
  clearTestimonialCache: (testimonialId: string) => 
    set((state) => {
      const newEmbeds = { ...state.embeds };
      delete newEmbeds[testimonialId];
      return { embeds: newEmbeds };
    }),
}));

export const useStyleStore = create<StyleState>((set) => ({
  styles: {
    wrapper: wrapperStyles,
    content: cardStyles,
  },
  updateWrapperStyle: (key, value) =>
    set((state) => ({
      styles: {
        ...state.styles,
        wrapper: {
          ...state.styles.wrapper,
          [key]: value,
        },
      },
    })),
  updateContentStyle: (key, value) =>
    set((state) => ({
      styles: {
        ...state.styles,
        content: {
          ...state.styles.content,
          [key]: value,
        },
      },
    })),
  resetStyles: () =>
    set(() => ({
      styles: {
        wrapper: wrapperStyles,
        content: cardStyles,
      },
    })),
}));