import { OpenFormStore } from "@/types/storeType";
import { create } from "zustand";

export const useOpenForm = create<OpenFormStore>((set) => ({
  openForm: "",

  setopenForm: (form) => {
    set({ openForm: form });
  },
}));
