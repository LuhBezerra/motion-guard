import ReactModal from 'react-modal';
import type { ReactNode } from 'react';;
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../button';

type DialogProps = {
  className?: string;
  title?: string;
  children?: ReactNode;
  isOpen: boolean;
  isClosable?: boolean;
  isConfirmButtonDisabled?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onConfirmText?: string;
  onCloseText?: string;
};

export const Dialog = ({
  className,
  title,
  children,
  isOpen,
  isClosable,
  isConfirmButtonDisabled,
  isLoading,
  onCancel,
  onClose,
  onConfirm,
  onConfirmText = 'Salvar',
  onCloseText = 'Cancelar'
}: DialogProps) => (
  <ReactModal
    className={`
    ${className}
    bg-white max-h-[95%] rounded-2rem absolute top-1/2 left-1/2 transform 
    -translate-x-1/2 -translate-y-1/2 outline-none flex flex-col box-border
    rounded-2xl
    `}
    overlayClassName={'fixed z-50 top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-50 backdrop-blur'}
    isOpen={isOpen}
    bodyOpenClassName={'overflow-y-hidden'}
    ariaHideApp={false}
  >
    {isClosable && (
      <button aria-label="close modal" onClick={onClose} className={'absolute top-2 right-2 p-1 cursor-pointer z-3'}>
        <XMarkIcon className='w-6 h-6 text-gray-950' />
      </button>
    )}
    {title && <h1 className="text-gray-900 text-lg font-semibold leading-3.6rem mb-4 px-4 pt-4">{title}</h1>}
    {children}
    <footer className="flex justify-end mt-8 gap-2 px-4 pb-4">
      {onCancel && (
        <Button onClick={onCancel} text={onCloseText} type='secondary' disabled={isLoading} />
      )}
      <Button onClick={onConfirm} text={onConfirmText} disabled={isConfirmButtonDisabled || isLoading} isLoading={isLoading}/>
    </footer>
  </ReactModal>
);

export default Dialog
