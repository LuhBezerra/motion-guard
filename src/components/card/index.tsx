import { ChevronRightIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Image, { StaticImageData } from "next/image"

interface CardProps {
  avatar?: string
  title: string
  disabled?: boolean
  onClick?: () => void
  onDelete?: () => void
  onEdit?: () => void
}

export const Card = ({ avatar, title, disabled, onDelete, onEdit, onClick }: CardProps) => {
  return <div className={`p-4 border ${disabled ? 'bg-slate-200 opacity-50' : 'bg-white'} ${onClick ? 'cursor-pointer' : 'cursor-default'} flex gap-5 items-center rounded-xl`} onClick={onClick}>
    {avatar && (
      <div className="overflow-hidden flex bg-gray-300 justify-center items-center rounded-full w-[4.4rem] h-[4.4rem]">
        <Image src={avatar} alt='avatar' width={70} height={70} className="object-cover" />
      </div>
    )}
    <p className="text-lg text-gray-950">{title}</p>
    {(onDelete || onEdit) && (
      <div className="ml-auto flex gap-1">
        {onDelete && (
          <button
            onClick={onDelete}
            className="hover:bg-slate-100 p-1 rounded-lg hover:opacity-90"
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="hover:bg-slate-100 p-1 rounded-lg hover:opacity-90"
          >
            <PencilSquareIcon className="w-5 h-5 text-gray-950" />
          </button>
        )
        }
      </div>
    )}
    {onClick && (
      <ChevronRightIcon className="w-8 h-8 text-gray-950 ml-auto" />
    )}
  </div>
} 