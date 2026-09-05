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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className={`w-full ${widthClasses[maxWidth]} glass-panel-elevated border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-[#0A0A0E]/95`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
