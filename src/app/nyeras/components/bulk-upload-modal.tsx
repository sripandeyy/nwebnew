"use client"

import type React from "react"
import { useState, useRef } from "react"
import { X, Upload, FileText, AlertCircle } from "lucide-react"

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<{ success: boolean; error?: string }>;
  assignedTo?: string;
}

export default function BulkUploadModal({ isOpen, onClose, onUpload, assignedTo }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [successCount, setSuccessCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setError(null)
    } else {
      setFile(null)
      setError("Please select a valid CSV file")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile)
      setError(null)
    } else {
      setFile(null)
      setError("Please drop a valid CSV file")
    }
  }

  const processCSV = async (csvText: string) => {
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "")
    const headers = lines[0].toLowerCase().split(",").map((h) => h.trim())
    const dataRows = lines.slice(1)
    const limitedRows = dataRows.slice(0, 100)

    const processedData = limitedRows.map((row) => {
      const values = row.split(",").map((v) => v.trim())
      const rowData: Record<string, string> = {}

      headers.forEach((header, index) => {
        if (values[index]) {
          rowData[header] = values[index]
        }
      })

      return {
        name: rowData.name || "NA",
        email: rowData.email || "NA",
        phone: rowData.phone || "NA",
        course: rowData.course || "NA",
        assignedTo: assignedTo || rowData["assigned to"] || null,
      }
    })

    return processedData
  }

  const uploadLeads = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const result = await onUpload(file)
      
      if (result.success) {
        setSuccessCount(1)
        // Close the modal after a short delay
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError(result.error || "Upload failed. Please try again.")
      }
    } catch (err) {
      console.error("Error uploading leads:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Bulk Upload Leads (CSV)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {!isUploading && successCount === 0 && (
            <>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your CSV file here, or click to browse</p>
                <p className="text-xs text-gray-500">Only CSV files are supported (max 100 records)</p>
                {file && (
                  <div className="mt-4 p-2 bg-gray-100 rounded flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> CSV should contain columns: id, name, email, phone, action, course, date, my action, assigned to, notes, delete
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadLeads}
                  disabled={!file || isUploading}
                  className={`px-4 py-2 rounded-md flex items-center justify-center ${
                    !file || isUploading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </button>
              </div>
            </>
          )}

          {isUploading && (
            <div className="py-4 text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Uploading leads...</p>
              <div className="animate-pulse text-orange-500 font-semibold">Please wait...</div>
            </div>
          )}

          {!isUploading && successCount > 0 && (
            <div className="py-4 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Complete!</h3>
              <p className="text-sm text-gray-600 mb-4">Successfully uploaded {successCount} leads to the system.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
