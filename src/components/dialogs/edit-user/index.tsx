import Dialog from "@/components/ui-kit/dialog"
import { FileBase64, Input } from "@/components/ui-kit/input";
import { useSnackbar } from "@/components/ui-kit/snackbar";
import { useAppDispatch } from "@/hooks/redux";
import { useThunkFetchCall } from "@/hooks/useThunkFetchCall";
import { EventActions, createOrUpdateUser } from "@/store/modules/event/actions";
import { EventDto, OptionalUserDto, UserDto } from "@/store/services/event/event.types";
import { useEffect, useState } from "react";

interface EditUserDialogProps {
  eventId: EventDto['id'];
  initialUser?: OptionalUserDto;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EditUsersDialog = ({ eventId, initialUser, isOpen, onClose, onConfirm }: EditUserDialogProps) => {
  const [form, setForm] = useState<OptionalUserDto | undefined>(initialUser)

  const dispatch = useAppDispatch()

  const { isLoading, wasLoading, isRejected, error } = useThunkFetchCall('events', EventActions.CREATE_OR_UPDATE_USER)

  const { showMessage } = useSnackbar()

  const isDisabled = !form?.name || !form?.email || !form?.cpf || !form?.card || !form?.picture

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const onUpload = (file: FileBase64) => {
    if (file) {
      setForm(prevState => ({ ...prevState, picture: file.base64 }))
    }
  }

  const onSubmit = async () => {
    const user: UserDto = {
      ...form,
      eventId,
      name: form?.name ?? '',
      email: form?.email ?? '',
      cpf: form?.cpf ?? '',
      card: form?.card ?? '',
      picture: form?.picture ?? '',
    }

    await dispatch(createOrUpdateUser(user))
  }

  useEffect(() => {
    if (wasLoading && !isLoading) {
      if (isRejected) {
        showMessage({ message: error, type: 'error' })
      }
      else {
        showMessage({ message: `Usuário ${initialUser ? 'editado' :'criado'} com sucesso!`, type: 'success' })
        onConfirm()
      }
    }
  }, [isRejected, error, showMessage, wasLoading, isLoading, onConfirm, initialUser])

  return (<Dialog
    isOpen={isOpen}
    className='md:w-[30rem]'
    title={!!initialUser ? 'Editar usuário' : 'Adicionar novo usuário'}
    onCloseText='Cancelar'
    isConfirmButtonDisabled={isDisabled}
    isLoading={isLoading}
    onCancel={onClose}
    onConfirm={onSubmit}
  >
    <div className='px-4'>
      <div className='flex gap-4 items-center'>
        <Input
          name='picture'
          value={form?.picture}
          onUpload={onUpload}
          inputClassName='rounded-lg flex justify-center items-center text-center w-[7.6rem] h-[7.6rem]'
          type='upload'
        />
        <div className='w-full'>
          <Input label='CPF' name='cpf' value={form?.cpf} onChange={onChange} />
          <Input className='my-2' label='Código NFC' name='card' value={form?.card} onChange={onChange} />
        </div>
      </div>
      <Input label='Nome' name='name' value={form?.name} onChange={onChange} />
      <Input label='Email' name='email' value={form?.email} onChange={onChange} />
    </div>
  </Dialog>)
}