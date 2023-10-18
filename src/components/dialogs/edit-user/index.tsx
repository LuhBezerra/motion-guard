import Dialog from "@/components/ui-kit/dialog"
import { Input } from "@/components/ui-kit/input";

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EditUsersDialog = ({isOpen, onClose, onConfirm}: EditUserDialogProps) => {

  return (<Dialog
    isOpen={isOpen}
    className='w-[30rem]'
    title='Adicionar novo usuário'
    onCloseText='Cancelar'
    onCancel={onClose}
    onConfirm={onConfirm}
  >
    <div className='px-4'>
      <div className='flex gap-4 items-center'>
        <Input name='avatar' inputClassName='rounded-lg flex justify-center items-center text-center w-[7.6rem] h-[7.6rem]' type='upload' />
        <div className='w-full'>
          <Input label='Nome' name='x' />
          <Input className='my-2' label='Código NFC' name='x' />
        </div>
      </div>
      <Input label='Email' name='x' />
    </div>
  </Dialog>)
}