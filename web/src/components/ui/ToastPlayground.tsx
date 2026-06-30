"use client";

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose?: () => void;
  duration?: number;
}

export function ToastSuccess({ message, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div id="toast-success" className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default font-sans" role="alert">
      <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button 
        onClick={() => { setVisible(false); if (onClose) onClose(); }}
        type="button" 
        className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none cursor-pointer" 
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  );
}

export function ToastDanger({ message, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div id="toast-danger" className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default font-sans" role="alert">
      <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-danger bg-danger-soft rounded">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button 
        onClick={() => { setVisible(false); if (onClose) onClose(); }}
        type="button" 
        className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none cursor-pointer" 
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  );
}

export function ToastWarning({ message, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div id="toast-warning" className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default font-sans" role="alert">
      <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-warning bg-warning-soft rounded">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <span className="sr-only">Warning icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button 
        onClick={() => { setVisible(false); if (onClose) onClose(); }}
        type="button" 
        className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none cursor-pointer" 
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  );
}

export function ToastPlayground() {
  const [activeToasts, setActiveToasts] = useState<{ id: number; type: 'success' | 'danger' | 'warning'; message: string }[]>([]);
  const [counter, setCounter] = useState(0);

  const addToast = (type: 'success' | 'danger' | 'warning', message: string) => {
    const id = counter;
    setCounter(prev => prev + 1);
    setActiveToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-6 border border-default rounded-base bg-neutral-primary-medium font-sans">
      <h3 className="text-lg font-bold text-heading mb-4">Demonstração de Toasts</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={() => addToast('success', 'Operação realizada com sucesso!')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-base text-sm cursor-pointer transition-colors"
        >
          Toast Sucesso
        </button>
        <button 
          onClick={() => addToast('danger', 'Erro: Ocorreu uma falha no sistema.')}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-base text-sm cursor-pointer transition-colors"
        >
          Toast Erro
        </button>
        <button 
          onClick={() => addToast('warning', 'Aviso: Verifique as configurações de exportação.')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-base text-sm cursor-pointer transition-colors"
        >
          Toast Alerta
        </button>
      </div>

      {/* Toast Stack Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        {activeToasts.map(toast => {
          if (toast.type === 'success') {
            return <ToastSuccess key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />;
          }
          if (toast.type === 'danger') {
            return <ToastDanger key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />;
          }
          return <ToastWarning key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />;
        })}
      </div>
    </div>
  );
}
