'use client'

import { Fragment, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logo from '@/assets/logo.svg'
import { Card } from '@/components/card'
import { Header } from '@/components/header'
import useToggle from '@/hooks/useToggle'
import { EditEventDialog } from '@/components/dialogs/edit-event'

export default function Home() {
  const [isEditEvents, onToggleEditEvents] = useToggle(false)
  const [isAddEvent, setIsAddEvent] = useState(false)
  const [isEditEvent, setIsEditEvent] = useState(false)

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header>
        <div className='flex flex-col md:flex-row w-full md:w-[40rem] items-center justify-between'>
          <Image src={logo} alt='logo' width={160} height={160} className='pb-6 md:pb-12' />
          <div className='flex gap-10 md:mb-12'>
            <button
              className='border-b-2'
              onClick={onToggleEditEvents}
            >
              {isEditEvents ? 'Voltar para eventos' : 'Editar eventos'}
            </button>
            <button className='border-b-2' onClick={() => router.push('/login')}>Sair</button>
          </div>
        </div>
        <h1 className='mt-10 md:mt-0 font-semibold text-lg w-[90%] md:w-[40rem] md:text-3xl'>{'Bem vindo, {UserName}!'}</h1>
        <p className='text-left md:w-[40rem] md:mb-6 w-[90%]'>Aqui estão os seus eventos</p>
      </Header>
      <div className='mb-6 bg-white min-h-[20rem] w-[90%] md:w-[40rem] rounded-xl p-3 gap-3 flex flex-col' style={{ marginTop: -40 }}>
        {isEditEvents && (
          <button
            onClick={() => setIsAddEvent(true)}
            className='p-3 w-full flex gap-3 justify-center items-center bg-green-600 rounded-xl'
          >
            <PlusCircleIcon className='text-white w-6 h-6' />
            Adicionar novo evento
          </button>
        )}
        {[1, 2, 3, 4, 5].map((item) => (
          <Fragment key={item}>
            <Card
              key={item}
              title='{eventName}'
              {...(isEditEvents ? ({
                onDelete: () => { },
                onEdit: () => setIsEditEvent(true)
              }) : ({
                onClick: () => router.push(`/event/${item}`)
              }))}
            />
          </Fragment>
        ))}
      </div>
      {(isAddEvent || isEditEvent) && (
        <EditEventDialog
          isOpen
          onClose={() => {
            setIsAddEvent(false)
            setIsEditEvent(false)
          }}
          onConfirm={() => {
            setIsAddEvent(false)
            setIsEditEvent(false)
          }}
        />
      )}
    </main>
  )
}
