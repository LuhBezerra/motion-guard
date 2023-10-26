import Dialog from "@/components/ui-kit/dialog"
import { Input } from "@/components/ui-kit/input";
import { useSnackbar } from "@/components/ui-kit/snackbar";
import { useAppDispatch } from "@/hooks/redux";
import { useThunkFetchCall } from "@/hooks/useThunkFetchCall";
import { EventActions, createEvent } from "@/store/modules/event/actions";
import { EventDto, OptionalEventDto } from "@/store/services/event/event.types";
import { useEffect, useState } from "react";

interface EditEventDialogProps {
  initialEvent?: OptionalEventDto;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EditEventDialog = ({ initialEvent, isOpen, onClose, onConfirm }: EditEventDialogProps) => {
  const [form, setForm] = useState<OptionalEventDto | undefined>(initialEvent)

  const dispatch = useAppDispatch()

  const { isLoading, wasLoading, isRejected, error } = useThunkFetchCall('events', EventActions.CREATE_EVENT)

  const { showMessage } = useSnackbar()

  const isDisabled = !form?.name || !form?.description

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = () => {
    const event: EventDto = {
      ...form,
      name: form?.name ?? '',
      description: form?.description ?? '',
    }

    dispatch(createEvent(event))
  }

  useEffect(() => {
    if (wasLoading && !isLoading) {
      if (isRejected) {
        showMessage({ message: error, type: 'error' })
      }
      else {
        showMessage({ message: `Evento ${initialEvent ? 'editado' : 'criado'} com sucesso!`, type: 'success' })
        onConfirm()
      }
    }
  }, [isRejected, error, showMessage, wasLoading, isLoading, onConfirm, initialEvent])

  return (<Dialog
    isOpen={isOpen}
    className='w-full md:w-[30rem]'
    title={initialEvent ? 'Editar evento' : 'Adicionar novo evento'}
    isLoading={isLoading}
    isConfirmButtonDisabled={isDisabled}
    onCloseText='Cancelar'
    onCancel={onClose}
    onConfirm={onSubmit}
  >
    <div className='px-4 w-full'>
      <Input label='Nome' name='name' value={form?.name} onChange={onChange} />
      <Input label='Descrição' name='description' value={form?.description} onChange={onChange} />
    </div>
  </Dialog>)
}