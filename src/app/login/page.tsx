'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from '@/assets/logo.svg'
import { Input } from "@/components/ui-kit/input";
import Button from "@/components/ui-kit/button";

export default function Login() {
  const router = useRouter()

  return (
    <div className="w-full h-screen bg-violet-900 flex flex-col items-center justify-center">
      <Image src={logo} alt='logo' width={300} height={300} />
      <div className='flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl w-[90%] md:w-96 mt-4'>
        <Input label='Login' name='x' className="w-full" />
        <Input label='Senha' name='x' className="w-full" />
        <Button onClick={() => router.push('/')} text='Entrar' type='primary' className="w-full bg-green-600" disabled={false} />
      </div>
    </div>
  )
}