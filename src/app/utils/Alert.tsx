'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

interface AlertProps {
  message: string
}

let showAlertFunction: (message: string) => void = () => {}
let hideAlertFunction: () => void = () => {}

const AlertComponent: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-4">
        <div className="bg-orange-500 px-4 py-2 flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Alert</h2>
          <button onClick={hideAlertFunction} className="text-white hover:text-orange-200 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-800">{message}</p>
        </div>
        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={hideAlertFunction}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const Alert = (message: string) => {
  showAlertFunction(message)
}

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<AlertProps | null>(null)

  showAlertFunction = (message: string) => {
    setAlertProps({ message })
  }

  hideAlertFunction = () => {
    setAlertProps(null)
  }

  return (
    <>
      {children}
      {alertProps && <AlertComponent {...alertProps} />}
    </>
  )
}

export default Alert

