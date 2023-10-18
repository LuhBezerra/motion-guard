'use client'

import { Fragment, useState } from 'react'
import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import { Header } from '@/components/header'
import logo from '@/assets/logo.svg'
import { Card } from '@/components/card'
import { EditUsersDialog } from '@/components/dialogs/edit-user'

import mockedAvatar from '../../mocked-avatar.png'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'

export default function Event() {
  const [isEditUsers, setIsEditUsers] = useState(false)
  const [isAddUser, setIsAddUser] = useState(false)
  const [isEditUser, setIsEditUser] = useState(false)

  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center ">
      <Header>
        <div className='flex flex-col md:flex-row w-[90%] md:w-[40rem] items-center justify-between'>
          <div className='relative flex items-start justify-center md:justify-start gap-6 w-full'>
            {!isEditUsers && (
              <button className='left-0 absolute' onClick={() => router.push('/')}>
                <ArrowLeftIcon className='w-9 h-9 white' />
              </button>
            )}
            <Image src={logo} alt='logo' width={160} height={160} className='pb-6 md:pb-12 md:ml-12 mt-[0.2rem]' />
          </div>
          <div className='flex gap-10 md:mb-12 md:w-96 text-end justify-end'>
            <button
              className='border-b-2'
              onClick={() => setIsEditUsers(prevState => !prevState)}
            >
              {isEditUsers ? 'Voltar para dashboard' : 'Editar usuários'}
            </button>
            <button className='border-b-2'>Sair</button>
          </div>
        </div>
        <h1 className='mt-4 md:mb-6 md:mt-0 font-semibold text-lg md:text-3xl'>{'{EventName}'}</h1>
        <div className='flex flex-wrap gap-2 mt-2 md:mt-0 md:px-0 w-[90%] md:w-[40rem] md:text-center md:items-center md:justify-center md:gap-10'>
          {['Presentes:', 'Saíram:', 'Ausentes:', 'Total de usuários:'].map((item, index) => (
            <div className='flex flex-grow items-center gap-2 text-sm md:text-base' key={item}>
              <span
                className={`w-3 h-3 
                  ${index === 0 && 'bg-green-600'} 
                  ${index === 1 && 'bg-orange-600'} 
                  ${index === 2 && 'bg-red-600'} 
                  ${index === 3 && 'bg-black'}
                  rounded-full`}
              />
              <p className='text-white'>{item} </p>
            </div>
          ))}
        </div>
      </Header>
      <div className='mb-6 bg-white min-h-[20rem] w-[90%] md:w-[40rem] rounded-xl p-3 gap-3 flex flex-col' style={{ marginTop: -40 }}>
        {isEditUsers && (
          <button
            onClick={() => setIsAddUser(true)}
            className='p-3 w-full flex gap-3 justify-center items-center bg-green-600 rounded-xl'
          >
            <PlusCircleIcon className='text-white w-6 h-6' />
            Adicionar novo usuário
          </button>
        )}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Fragment key={item}>
            {item === 4 && <span className='border-2 border-slate-300 border-dashed my-3' />}
            <Card
              key={item}
              disabled={item > 3}
              avatar={mockedAvatar}
              title='José Paulo Lorem'
              {...(isEditUsers && ({
                onDelete: () => { },
                onEdit: () => setIsEditUser(true)
              }))}
            />
          </Fragment>
        ))}
      </div>
      {(isAddUser || isEditUser) && (
        <EditUsersDialog
          isOpen
          onClose={() => {
            setIsAddUser(false)
            setIsEditUser(false)
          }}
          onConfirm={() => {
            setIsAddUser(false)
            setIsEditUser(false)
          }}
        />
      )}
    </div>
  )
}
