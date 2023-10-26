import { UserDto } from "@/store/services/event/event.types";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import ReactModal from "react-modal";
import { twMerge } from "tailwind-merge";

interface CheckedUserProps {
  currentUser: UserDto | null;
  isAllowedUser: boolean;
  animationClass: string;
}

export const CheckeUser = ({ isAllowedUser, currentUser, animationClass }: CheckedUserProps) => {

  return isAllowedUser ? (
    <ReactModal
      isOpen
      className={twMerge('rounded-full h-96 w-96 bg-white relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', animationClass)}
      overlayClassName={'fixed z-50 top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-10 backdrop-blur'}
    >
      <div className='flex items-center justify-center rounded-full h-96 w-96 overflow-hidden'>
        <Image src={currentUser?.picture!} alt='logo' width={384} height={384} className='object-cover' />
      </div>
      <p className='p-4 bg-white rounded-lg text-gray-900 mt-4 text-center font-bold'>{currentUser?.name}</p>
      <div className='bg-white w-20 h-20 rounded-full absolute bottom-0 right-2 animate-bounce'>
        {currentUser?.enteredAt
          ? <CheckCircleIcon className='w-20 h-20 text-green-600' />
          : <XCircleIcon className='w-20 h-20 text-red-600' />}
      </div>
    </ReactModal>
  ) : (<ReactModal
    isOpen
    className={twMerge('w-96 h-24 rounded-lg bg-white relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', animationClass)}
    overlayClassName={'fixed z-50 top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-10 backdrop-blur'}
  >
    <div className="flex w-full justify-center items-center">
      <ExclamationTriangleIcon className=' h-20 text-red-600' />
      <p className='p-4 rounded-lg w-52 text-red-500 text-2xl font-bold'>Usuário não autorizado</p>
    </div>
  </ReactModal>)
}