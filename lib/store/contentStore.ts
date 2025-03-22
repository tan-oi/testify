import {create} from "zustand"

interface contentStoreInterface {
    currentView : string;
    setCurrentView : (view : string) => void
}

export const contentStore = create<contentStoreInterface>((set) => ({
    currentView : "all",

    setCurrentView : (view : string) => set({
        currentView : view
    })
}))