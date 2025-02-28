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
  thankYouText: string;

};

const initialData: Partial<Space> = {
  name: "",
  headerTitle: "your space header stays here",
  headerDescription:
    "hey thanks for buying our proudct, we'd appreciate a warm review",
  allowConsent: true,
  allowVideo: true,
  allowShare: true,
  questions: defaultQuestions,
  thankYouText: "Thank you for sharing your experiences."
};

interface SpaceModalStore {
  isOpen: boolean;
  type: "create" | "edit";
  formData: Partial<Space>;
  updateFormData: (data: Partial<Space>) => void;
  closeModal: () => void;

  openModal: (type: "create" | "edit") => void;
}

export const useSpaceModalStore = create<SpaceModalStore>((set) => ({
  isOpen: false,
  formData: {...initialData},
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
      formData: type === "edit" && initialValues ? { ...state.formData, initialValues } : state.formData, 
    })),
}));
