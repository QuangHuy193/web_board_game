"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { useConfirmDialog } from "@/stores/useConfirmDialog";

const ConfirmDialog = () => {
  const {
    open,
    title,
    description,
    onConfirm,
    closeDialog,
  } = useConfirmDialog();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          closeDialog();
        }
      }}
    >
      <Dialog.Portal>
        {/* overlay */}
        <Dialog.Overlay
          className="
          fixed inset-0 z-50
          bg-black/50
          backdrop-blur-sm
        "
        />

        {/* content */}
        <Dialog.Content
          className="
          fixed left-1/2 top-1/2 z-50
          w-full max-w-md
          -translate-x-1/2 -translate-y-1/2

          rounded-[32px]
          border border-white/10

          bg-[linear-gradient(135deg,#2a2d45,#1b1d2e)]

          p-6
          shadow-2xl
          outline-none
        "
        >
          {/* title */}
          <Dialog.Title
            className="
            text-3xl
            font-extrabold
            text-white
          "
          >
            {title}
          </Dialog.Title>

          {/* desc */}
          {description && (
            <Dialog.Description
              className="
              mt-3
              text-sm
              text-gray-300
            "
            >
              {description}
            </Dialog.Description>
          )}

          {/* buttons */}
          <div
            className="
            mt-8 flex justify-end gap-3
          "
          >
            <button
              onClick={closeDialog}
              className="
              cursor-pointer
              rounded-2xl
              bg-white/10
              px-5 py-3
              font-semibold
              text-white
              transition
              hover:bg-white/20
            "
            >
              Hủy
            </button>

            <button
              onClick={() => {
                onConfirm?.();

                closeDialog();
              }}
              className="
              cursor-pointer
              rounded-2xl
              bg-linear-to-r
              from-pink-500
              to-purple-500
              px-5 py-3
              font-bold
              text-white
              shadow-lg
              transition
              hover:scale-105
            "
            >
              Xác nhận
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;