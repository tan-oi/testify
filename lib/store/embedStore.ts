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