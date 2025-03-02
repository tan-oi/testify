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
  allowConsent: boolean;
  allowVideo: boolean;
  allowShare: boolean;
  questions: Questions[];
  thankYouHeader: string;
  thankYouMessage : string;
  
};

const initialData: Partial<Space> = {
  name: "",
  headerTitle: "your space header stays here",
  headerDescription:
    "hey thanks for buying our proudct, we'd appreciate a warm review",
  allowConsent: true,
  allowVideo: false,
  allowShare: true,
  questions: defaultQuestions,
  thankYouHeader: "Thank you!",
  thankYouMessage : "Thank you so much for your shoutout! It means a ton for us!"
};

interface SpaceModalStore {
  isOpen: boolean;
  type: "create" | "edit";
  currentStep: number;
  maxSteps: number;
  formData: Partial<Space>;
  updateFormData: (data: Partial<Space>) => void;
  closeModal: () => void;

  openModal: (type: "create" | "edit") => void;
  nextStep: () => void;
  prevStep: () => void;
  jumpStep: (data: number) => void;
}

export const useSpaceModalStore = create<SpaceModalStore>((set) => ({
  currentStep: 0,
  maxSteps: 3,
  isOpen: false,
  formData: { ...initialData },
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  type: "create",
  closeModal: () => set({ isOpen: false }),
  openModal: (type, initialValues = null) =>
    set((state) => ({
      isOpen: true,
      type,
      formData:
        type === "edit" && initialValues
          ? { ...state.formData, initialValues }
          : state.formData,
    })),

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
