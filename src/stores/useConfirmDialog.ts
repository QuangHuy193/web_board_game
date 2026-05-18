import { ConfirmDialogState } from "@/types/storeType";
import { create } from "zustand";


export const useConfirmDialog =
  create<ConfirmDialogState>((set) => ({
    open: false,

    title: "",

    description: "",

    reward: 0,

    onConfirm: undefined,

    openDialog: ({
      title,
      description,
      reward,
      onConfirm,
    }) =>
      set({
        open: true,

        title,

        description,

        reward,

        onConfirm,
      }),

    closeDialog: () =>
      set({
        open: false,
      }),
  }));