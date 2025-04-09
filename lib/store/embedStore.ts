import { create } from "zustand";

interface embedStore {
    open : boolean;
    openDialog : (type : "single" | "multiple", data : Record <string,any>) => void;
    close : () => void;
    type : "single" | "multiple",
    overlayData : Record<string,any>| null


}
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
const wrapperStyles = {
    padding: "0px",
    backgroundColor: "#000080",
    gradient: "",
  };
  
  const cardStyles = {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: "12px",
    borderRadius: "18px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    textColor: "#000000",
    starColor: "#FCB900",
    textAlign: 'center' as 'left' | 'right' | 'center' | 'justify' | undefined,
    fontBold : true,
    border : true
  };
  
  type WrapperStyleKeys = keyof typeof wrapperStyles;
  type CardStyleKeys = keyof typeof cardStyles;
  
  type StyleState = {
    styles: {
      wrapper: typeof wrapperStyles;
      content: typeof cardStyles;
    };
    updateWrapperStyle: (key: WrapperStyleKeys, value: string) => void;
    updateContentStyle: (key: CardStyleKeys, value: string|boolean) => void;
    resetStyles: () => void;
  };
  
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