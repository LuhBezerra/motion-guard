'use client'

import { Fragment, useEffect, useState } from 'react'
import { ArrowLeftIcon, CheckCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import { Header } from '@/components/header'
import logo from '@/assets/logo.svg'
import { Card } from '@/components/card'
import { EditUsersDialog } from '@/components/dialogs/edit-user'
import { getAllEventsSelector, getEventByIdSelector } from '@/store/modules/event/selectors'
import { RootState } from '@/store'
import { useEventStream } from '@/hooks/useEventStream'
import { useAppDispatch } from '@/hooks/redux'
import { deleteUser, getAllEvents } from '@/store/modules/event/actions'
import { eventActions } from '@/store/modules/event'
import { usePrevious } from '@/hooks/usePrevious'
import { UserDto } from '@/store/services/event/event.types'

import { EventStatus, EventStatusType } from './types'
import ReactModal from 'react-modal'
import { twMerge } from 'tailwind-merge'
import { EmptyState } from '@/components/empty-state'
import { API_URL } from '@/constants/routes'
import { CheckeUser } from '@/components/dialogs/checked-user'

export default function Event() {
  const [isEditUsers, setIsEditUsers] = useState(false)
  const [isAddUser, setIsAddUser] = useState(false)
  const [isEditUser, setIsEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDto>()
  const [isCheckedUser, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('fadeIn');

  const router = useRouter()
  const params = useParams()

  const dispatch = useAppDispatch()

  const events = useSelector(getAllEventsSelector)
  const event = useSelector((state: RootState) => getEventByIdSelector(state, params?.id as string))

  const currentUser = useEventStream<UserDto>(`${API_URL}/users/sse`, 'user');
  const previousUser = usePrevious<UserDto | null>(currentUser)
  
  const isAllowedUser = currentUser?.eventId === event?.id

  const getCount = (status: EventStatusType) => {
    switch (status) {
      case EventStatus.PRESENT:
        return event?.users?.filter((user) => !!user.enteredAt).length
      case EventStatus.LEFT:
        return event?.users?.filter((user) => !!user.exitedAt).length
      case EventStatus.ABSENT:
        return event?.users?.filter((user) => !user.enteredAt && !user.exitedAt).length
      case EventStatus.TOTAL_OF_USERS:
        return event?.users?.length
      default:
        return 0
    }
  }

  const sortUsers = (userA: UserDto, userB: UserDto) => {
    if (userA?.enteredAt && userB?.enteredAt) {
      return new Date(userA.enteredAt).getTime() - new Date(userB.enteredAt).getTime();
    } else if (userA?.enteredAt) {
      return -1; // a vem antes de b
    } else if (userB?.enteredAt) {
      return 1; // b vem antes de a
    }
    return 0; // a e b são equivalentes
  }

  const users = [...event?.users || []].sort(sortUsers)

  const showModal = () => {
    setAnimationClass('fadeIn');
    setIsModalOpen(true);
    setTimeout(() => {
      setAnimationClass('fadeOut');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }, 1000); // 5000ms = 5s
  };

  useEffect(() => {
    if (currentUser?.enteredAt !== previousUser?.enteredAt) {
      dispatch(eventActions.updateUser(currentUser))
      showModal();
    }
  }, [currentUser, dispatch, previousUser])

  useEffect(() => {
    if (!events?.length) {
      dispatch(getAllEvents())
    }
  }, [dispatch, event, events?.length, router])

  return (
    <div className="flex min-h-screen flex-col items-center ">
      {isCheckedUser && (
        <CheckeUser animationClass={animationClass} currentUser={currentUser} isAllowedUser={isAllowedUser} />
      )}
      <Header>
        <div className='flex flex-col md:flex-row w-[90%] md:w-[40rem] items-center justify-between'>
          <div className='relative flex items-start justify-center md:justify-start gap-6 w-full'>
            {!isEditUsers && (
              <button className='left-0 absolute text-white' onClick={() => router.push('/')}>
                <ArrowLeftIcon className='w-9 h-9 white' />
              </button>
            )}
            <Image src={logo} alt='logo' width={160} height={160} className='pb-6 md:pb-12 md:ml-12 mt-[0.2rem]' />
          </div>
          <div className='flex gap-10 md:mb-12 md:w-96 text-end justify-end'>
            <button
              className='border-b-2 text-white'
              onClick={() => setIsEditUsers(prevState => !prevState)}
            >
              {isEditUsers ? 'Voltar para dashboard' : 'Editar participantes'}
            </button>
          </div>
        </div>
        <h1 className='mt-4 md:mb-6 md:mt-0 font-semibold text-lg md:text-3xl text-white'>{event?.name}</h1>
        <div className='flex flex-wrap gap-2 mt-2 md:mt-0 md:px-0 w-[90%] md:w-[40rem] md:text-center md:items-center md:justify-center md:gap-10'>
          {['Presentes', 'Saíram', 'Ausentes', 'Total de participantes'].map((item, index) => (
            <div className='flex flex-grow items-center gap-2 text-sm md:text-base' key={item}>
              <span
                className={`w-3 h-3 
                  ${index === 0 && 'bg-green-600'} 
                  ${index === 1 && 'bg-orange-600'} 
                  ${index === 2 && 'bg-red-600'} 
                  ${index === 3 && 'bg-black'}
                  rounded-full`}
              />
              <p className='text-white'>{item}: {getCount(index)}</p>
            </div>
          ))}
        </div>
      </Header>
      <div className='mb-6 bg-white min-h-[20rem] w-[90%] md:w-[40rem] rounded-xl p-3 gap-3 flex flex-col' style={{ marginTop: -40 }}>
        {isEditUsers && (
          <button
            onClick={() => setIsAddUser(true)}
            className='p-3 w-full flex gap-3 justify-center items-center bg-green-600 rounded-xl text-white'
          >
            <PlusCircleIcon className='text-white w-6 h-6' />
            Adicionar novo participante
          </button>
        )}
        {users?.length ? users
          ?.map((item, index) => {
          const previousUser = users?.[index - 1]
          const isPreviousDisabled = previousUser?.exitedAt || !previousUser?.enteredAt
          const isDisabled = !item?.enteredAt

          return (
            <Fragment key={item?.id}>
              {previousUser && !isPreviousDisabled && isDisabled && !isEditUsers && <span className='border-2 border-slate-300 border-dashed my-3' />}
              <Card
                key={item?.id}
                disabled={isDisabled && !isEditUsers}
                avatar={item?.picture}
                title={item?.name}
                {...(isEditUsers && ({
                  onDelete: () => dispatch(deleteUser(item?.id)),
                  onEdit: () => {
                    setSelectedUser(item)
                    setIsEditUser(true)
                  }
                }))}
              />
            </Fragment>
          )
        }) : (
            <EmptyState title='Não há usuários cadastrados' />
          )}
      </div>
      {(isAddUser || isEditUser) && (
        <EditUsersDialog
          isOpen
          initialUser={selectedUser}
          eventId={params?.id as string}
          onClose={() => {
            setIsAddUser(false)
            setIsEditUser(false)
            setSelectedUser(undefined)
          }}
          onConfirm={() => {
            setSelectedUser(undefined)
            setIsAddUser(false)
            setIsEditUser(false)
          }}
        />
      )}
    </div>
  )
}
