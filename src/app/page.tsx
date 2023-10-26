'use client'

import { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/redux'
import { useSelector } from 'react-redux'

import logo from '@/assets/logo.svg'
import { Card } from '@/components/card'
import { EmptyState } from '@/components/empty-state'
import { Header } from '@/components/header'
import { SkeletonWrapper } from '@/components/ui-kit/skeleton-wrapper'
import { EditEventDialog } from '@/components/dialogs/edit-event'
import { getAllEventsSelector } from '@/store/modules/event/selectors'
import { ROUTES } from '@/constants/routes'
import { AUTH_TOKEN } from '@/constants/cookies'
import { removeCookie } from '@/helpers/cookie'
import useToggle from '@/hooks/useToggle'
import { useThunkFetchCall } from '@/hooks/useThunkFetchCall'
import { EventDto } from '@/store/services/event/event.types'
import { EventActions, deleteEvent, getAllEvents } from '@/store/modules/event/actions'

export default function Home() {
  const [isEditEvents, onToggleEditEvents] = useToggle(false)
  const [isEventDetails, setIsEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventDto>()

  const dispatch = useAppDispatch()
  const router = useRouter()

  const events = useSelector(getAllEventsSelector)

  const { isLoading } = useThunkFetchCall('events', EventActions.GET_ALL_EVENTS)

  const onLogout = () => {
    removeCookie(AUTH_TOKEN);
    window.location.reload();
    router.push(ROUTES.PUBLIC.LOGIN)
  }

  const onClose = () => {
    setIsEventDetails(false)
    setSelectedEvent(undefined)
  }

  const onDelete = async (id: EventDto['id']) => {
    await dispatch(deleteEvent(id))
  }

  const onEdit = (item: EventDto) => {
    setIsEventDetails(true)
    setSelectedEvent(item)
  }

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header>
        <div className='flex flex-col md:flex-row w-full md:w-[40rem] items-center justify-between'>
          <Image src={logo} alt='logo' width={160} height={160} className='pb-6 md:pb-12' />
          <div className='flex gap-10 md:mb-12'>
            <button
              className='border-b-2 text-white'
              onClick={onToggleEditEvents}
            >
              {isEditEvents ? 'Voltar para eventos' : 'Editar eventos'}
            </button>
            <button className='border-b-2 text-white' onClick={onLogout}>Sair</button>
          </div>
        </div>
        <h1 className='mt-10 md:mt-0 font-semibold text-lg w-[90%] md:w-[40rem] md:text-3xl text-white'>{'Bem vindo!'}</h1>
        <p className='text-left md:w-[40rem] md:mb-6 w-[90%] text-white'>Aqui estão os seus eventos</p>
      </Header>
      <div className='mb-6 bg-white min-h-[20rem] w-[90%] md:w-[40rem] rounded-xl p-3 gap-3 flex flex-col' style={{ marginTop: -40 }}>
        <SkeletonWrapper isLoading={isLoading}>
          {isEditEvents && (
            <button
              onClick={() => setIsEventDetails(true)}
              className='p-3 w-full flex gap-3 justify-center items-center bg-green-600 rounded-xl text-white'
            >
              <PlusCircleIcon className='text-white w-6 h-6' />
              Adicionar novo evento
            </button>
          )}
          {events ? events?.map((item) => (
            <Card
              key={item.id}
              title={item?.name ?? ''}
              {...(isEditEvents ? ({
                onDelete: () => onDelete(item?.id ?? ''),
                onEdit: () => onEdit(item),
              }) : ({
                onClick: () => router.push(ROUTES.PRIVATE.EVENTS.DETAILS.replace(':id', item?.id ?? '')),
              }))}
            />
          )) : (
            <EmptyState title='Não há eventos cadastrados' />
          )}
        </SkeletonWrapper>
      </div>
      {isEventDetails && (
        <EditEventDialog
          isOpen
          initialEvent={selectedEvent}
          onClose={onClose}
          onConfirm={onClose}
        />
      )}
    </main>
  )
}
