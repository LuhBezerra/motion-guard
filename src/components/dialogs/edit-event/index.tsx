import Dialog from "@/components/ui-kit/dialog"
import { Input } from "@/components/ui-kit/input";

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EditEventDialog = ({ isOpen, onClose, onConfirm }: EditEventDialogProps) => {

  return (<Dialog
    isOpen={isOpen}
    className='w-[30rem]'
    title='Adicionar novo evento'
    onCloseText='Cancelar'
    onCancel={onClose}
    onConfirm={onConfirm}
  >
    <div className='px-4 w-full'>
      <Input label='Nome' name='x' />
    </div>
  </Dialog>)
}