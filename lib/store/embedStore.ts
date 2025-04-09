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