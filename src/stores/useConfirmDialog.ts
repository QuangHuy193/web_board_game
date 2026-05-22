import { ConfirmDialogState } from "@/types/storeType";
import { create } from "zustand";

export const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  open: false,

  title: "",

  description: "",

  reward: 0,

  onConfirm: undefined,

  onCancel: undefined,

  openDialog: ({ title, description, reward, onConfirm, onCancel }) =>
    set({
      open: true,

      title,

      description,

      reward,

      onConfirm,

      onCancel,
    }),

  closeDialog: () =>
    set({
      open: false,
    }),
}));
