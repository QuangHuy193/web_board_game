import { useConfirmDialog } from "@/stores/useConfirmDialog";

type Props = {
  title: string;

  description?: string;

  onConfirm?: () => void;
};

export const openConfirm = ({
  title,
  description,
  onConfirm,
}: Props) => {
  useConfirmDialog
    .getState()
    .openDialog({
      title,
      description,
      onConfirm,
    });
};