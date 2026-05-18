import { useConfirmDialog } from "@/stores/useConfirmDialog";

type Props = {
  title: string;

  description?: string;

  reward?: number;

  onConfirm?: () => void;
};

export const openConfirm = ({
  title,
  description,
  reward,
  onConfirm,
}: Props) => {
  useConfirmDialog.getState().openDialog({
    title,
    description,
    reward,
    onConfirm,
  });
};
