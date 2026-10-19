import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'md' }) => {
  if (!isOpen) return null

  const widthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#191919]/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full ${widthClasses[maxWidth]} bg-white border border-[#E5E3DA] rounded-2xl shadow-dropdown overflow-hidden flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DA] bg-[#FDFDFB]">
          <h3 className="text-base font-semibold text-[#191919] tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#777777] hover:text-[#191919] rounded-lg hover:bg-[#F5F5EF] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}
