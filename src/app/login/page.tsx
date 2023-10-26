'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from '@/assets/logo.svg'
import { Input } from "@/components/ui-kit/input";
import Button from "@/components/ui-kit/button";
import { useAppDispatch } from "@/hooks/redux";
import { AuthActions, login } from "@/store/modules/auth/actions";
import { useEffect, useState } from "react";
import { AuthPayload, OptionalAuthPayload } from "@/store/services/auth/auth.types";
import { useThunkFetchCall } from "@/hooks/useThunkFetchCall";
import { useSnackbar } from "@/components/ui-kit/snackbar";
import { ROUTES } from "@/constants/routes";

export default function Login() {
  const [form, setForm] = useState<OptionalAuthPayload>()
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { isLoading, wasLoading, isRejected, error } = useThunkFetchCall('auth', AuthActions.LOGIN)
  const { showMessage } = useSnackbar()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  useEffect(() => {
    if (wasLoading && !isLoading) {
      if (isRejected) {
        return showMessage({ message: error, type: 'error' })
      }

      return router.push(ROUTES.PRIVATE.EVENTS.ROOT)
    }
  }, [error, isLoading, isRejected, router, showMessage, wasLoading])

  return (
    <div className="w-full h-screen bg-violet-900 flex flex-col items-center justify-center">
      <Image src={logo} alt='logo' width={300} height={300} />
      <form className='flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl w-[90%] md:w-96 mt-4'>
        <Input label='Login' name='email' onChange={onChange} className="w-full" />
        <Input type='password' label='Senha' name='password' onChange={onChange} className="w-full" />
        <Button
          isLoading={isLoading}
          onClick={() => dispatch(login({ payload: form as AuthPayload }))}
          text='Entrar'
          type='primary'
          className="w-full bg-green-600"
          disabled={!form?.email || !form?.password || isLoading} />
      </form>
    </div>
  )
}