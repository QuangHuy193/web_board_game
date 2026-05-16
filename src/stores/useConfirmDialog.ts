import { ConfirmDialogState } from "@/types/storeType";
import { create } from "zustand";


export const useConfirmDialog =
  create<ConfirmDialogState>((set) => ({
    open: false,

    title: "",

    description: "",

    onConfirm: undefined,

    openDialog: ({
      title,
      description,
      onConfirm,
    }) =>
      set({
        open: true,

        title,

        description,

        onConfirm,
      }),

    closeDialog: () =>
      set({
        open: false,
      }),
  }));