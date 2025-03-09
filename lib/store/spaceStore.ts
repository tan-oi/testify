import { create } from "zustand";

const defaultQuestions: Questions[] = [
  {
    id: "1",
    text: "how did you find about our services?",
  },
  {
    id: "2",
    text: "how has our product helped you?",
  },
  {
    id: "3",
    text: "best thing about our product/services",
  },
];

interface Questions {
  id: string;
  text: string;
}

type Space = {
  name: string;
  logo?: string;
  headerTitle: string;
  headerDescription: string;
  askConsent: boolean;
  allowVideo: boolean;
  allowShare: boolean;
  allowStarRatings: boolean;

  questions: Questions[];
  thankYouHeader: string;
  thankYouMessage: string;
  textLength: number;
  videoLength: number | null;
};

const initialData: Partial<Space> = {
  name: "",
  headerTitle: "your space header stays here",
  headerDescription:
    "hey thanks for buying our proudct, we'd appreciate a warm review",
  askConsent: true,
  allowVideo: false,
  allowShare: true,
  allowStarRatings: true,
  questions: defaultQuestions,
  thankYouHeader: "Thank you!",
  thankYouMessage:
    "Thank you so much for your shoutout! It means a ton for us!",
};

interface SpaceModalStore {
  isOpen: boolean;
  type: "create" | "edit";
  currentStep: number;
  maxSteps: number;
  formData: Partial<Space> | null;
  updateFormData: (data: Partial<Space>) => void;
  closeModal: () => void;

  openModal: (
    newType: "create" | "edit",
    data: null | Partial<Space>,
    fullReset: boolean | null
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  jumpStep: (data: number) => void;
}

export const useSpaceModalStore = create<SpaceModalStore>((set) => ({
  currentStep: 0,
  maxSteps: 3,
  isOpen: false,
  formData: null,
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  type: "create",
  closeModal: () => set({ isOpen: false, currentStep: 0 }),
  openModal: (
    newType,
    data,
    fullReset
  ) =>
    set((state) => {
      let newFormData = state.formData;

      if (newType === "create" && state.type === "edit") {
        newFormData = null;
      }
     
      if (newType === "create" && fullReset) {
        newFormData = null;
      }
      
      if (newType === "edit" && data) {
        newFormData = { ...newFormData, ...data };
      }

      return {
        isOpen: true,
        type: newType,
        formData: newFormData,
      };
    }),

  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),

  jumpStep: (data: number) =>
    set({
      currentStep: data,
    }),
}));
