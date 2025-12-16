"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

// Components
import Header from "../components/header"
import Footer from "../components/footer"
import LeadsTable from "../components/leads-table"
import ChatSupport from "../components/chat-support"
import BulkUploadModal from "../components/bulk-upload-modal"
import AddLeadModal from "../components/add-lead-modal"
import FilterModal from "../components/filter-modal"

// Types and Config
import type { TableData } from "../types/leads"

// Type Definitions
interface FilterState {
  course: string
  action: string
  myAction: string
}

interface SalesEmployee {
  id: string
  name: string
}

type LeadAssignmentStatus = 'idle' | 'loading' | 'success' | 'error'

export default function CRMPage() {
  // Router and Refs
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Auth State (from local storage session set by /api/crm/login)
  const [user, setUser] = useState<{ email: string } | null>(null)

  // Data State
  const [leads, setLeads] = useState<TableData[]>([])
  const [salesEmployees, setSalesEmployees] = useState<SalesEmployee[]>([])
  
  // UI State
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal States
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState<boolean>(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false)
  
  // Filter and Selection States
  const [filters, setFilters] = useState<FilterState>({
    course: "",
    action: "",
    myAction: "",
  })
  
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [isAssignDropdownOpen, setIsAssignDropdownOpen] = useState<boolean>(false)
  const [isAssigning, setIsAssigning] = useState<boolean>(false)
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [assignmentStatus, setAssignmentStatus] = useState<LeadAssignmentStatus>('idle')
  
  // Filter leads based on selected filters
  const filteredLeads = useMemo(() => {
    return leads.filter((lead: TableData) => {
      if (filters.course && lead.course !== filters.course) return false
      if (filters.action && lead.action !== filters.action) return false
      if (filters.myAction && lead.myaction !== filters.myAction) return false
      return true
    })
  }, [leads, filters])
  

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    if (!user?.email) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/crm/leads?email=${encodeURIComponent(user.email)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }
      const data = await response.json()
      setLeads(data)
    } catch (err) {
      console.error("Error fetching leads:", err)
      setError(err instanceof Error ? err.message : 'Failed to fetch leads')
    } finally {
      setIsLoading(false)
    }
  }, [user?.email])
  
  // Fetch sales employees
  const fetchSalesEmployees = useCallback(async () => {
    try {
      const response = await fetch("/api/bdasales/salesemp")
      if (!response.ok) {
        throw new Error("Failed to fetch sales employees")
      }
      const data = await response.json()
      setSalesEmployees(data)
    } catch (err) {
      console.error("Error fetching sales employees:", err)
      setError("Failed to load sales team")
    }
  }, [])
  
  // Initialize session state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem('crm_user')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (parsed?.email) {
          setUser({ email: parsed.email })
          return
        }
      } catch {}
    }
    router.push('/nyeras/login')
  }, [router])
  
  // Fetch data when user is authenticated
  useEffect(() => {
    if (user?.email) {
      fetchLeads()
      fetchSalesEmployees()
    }
  }, [user?.email, fetchLeads, fetchSalesEmployees])
  
  // Handle lead selection
  const handleSelectLead = useCallback((id: string, selected: boolean) => {
    setSelectedLeads(prev => selected ? [...prev, id] : prev.filter(leadId => leadId !== id))
  }, [])
  
  // Handle select all leads
  const handleSelectAll = useCallback((selected: boolean) => {
    setSelectedLeads(selected ? filteredLeads.map(lead => lead.id) : [])
  }, [filteredLeads])
  
  // Handle lead assignment
  const handleAssignLeads = useCallback(async () => {
    if (!selectedEmployee || selectedLeads.length === 0) return
    
    const assignee = salesEmployees.find(emp => emp.name === selectedEmployee)
    if (!assignee) {
      setError('Selected employee not found')
      return
    }
    
    setIsAssigning(true)
    setAssignmentStatus('loading')
    
    try {
      const response = await fetch('/api/crm/assign-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds: selectedLeads,
          assigneeId: assignee.id,
          assigneeName: assignee.name,
          assignedBy: user?.email || 'system'
        })
      })
      
      if (!response.ok) throw new Error('Failed to assign leads')
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          selectedLeads.includes(lead.id) ? { ...lead, assignedTo: assignee.name } : lead
        )
      )
      
      setSelectedLeads([])
      setSelectedEmployee('')
      setAssignmentStatus('success')
      setTimeout(() => setAssignmentStatus('idle'), 3000)
    } catch (err) {
      console.error('Error assigning leads:', err)
      setError(err instanceof Error ? err.message : 'Failed to assign leads')
      setAssignmentStatus('error')
    } finally {
      setIsAssigning(false)
    }
  }, [selectedEmployee, selectedLeads, salesEmployees, user?.email])
  
  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAssignDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Handle lead deletion
  const handleDeleteLead = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/crm/leads/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete lead')
      }
      
      // Update local state
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id))
      setSelectedLeads(prev => prev.filter(leadId => leadId !== id))
    } catch (err) {
      console.error('Error deleting lead:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete lead')
    }
  }, [])
  
  // Handle lead update
  const handleUpdateLead = useCallback(async (updatedLead: TableData) => {
    try {
      const response = await fetch(`/api/crm/leads/${updatedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead)
      })
      
      if (!response.ok) throw new Error('Failed to update lead')
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === updatedLead.id ? updatedLead : lead
        )
      )
      
      return true
    } catch (err) {
      console.error('Error updating lead:', err)
      setError(err instanceof Error ? err.message : 'Failed to update lead')
      return false
    }
  }, [])
  
  // Handle bulk upload
  const handleBulkUpload = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/crm/bulk-upload', {
        method: 'POST',
        body: formData,
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Refresh the leads after successful upload
        await fetchLeads()
        return { success: true }
      } else {
        return { 
          success: false, 
          error: result.message || 'Failed to upload file' 
        }
      }
    } catch (err) {
      console.error('Error during bulk upload:', err)
      return { 
        success: false, 
        error: 'An error occurred during upload' 
      }
    }
  }, [fetchLeads])
  
  // Handle filter application
  const applyFilters = useCallback((newFilters: Partial<FilterState>) => {
  }, [])
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  // Show error state
  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header companyName="NYERAS" userName={user?.email || 'User'} userRole="Admin" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setIsBulkUploadModalOpen(true)}
              className="px-4 py-2 bg-[#6600CC] text-white rounded hover:bg-[#4d0099]"
            >
              Bulk Upload
            </button>
            
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-4 py-2 bg-[#6600CC] text-white rounded hover:bg-[#4d0099]"
            >
              Add Lead
            </button>
            
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-4 py-2 bg-[#6600CC]/10 text-[#6600CC] rounded hover:bg-[#6600CC]/20"
            >
              Filter
            </button>
          </div>
        </div>
        
        {/* Assignment Dropdown */}
        <div className="relative mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAssignDropdownOpen(!isAssignDropdownOpen)}
                className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                disabled={selectedLeads.length === 0 || isAssigning}
              >
                Assign Selected
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              
              {isAssignDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg">
                  <div className="p-2">
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                      <option value="">Select an employee</option>
                      {salesEmployees.map((emp) => (
                        <option key={emp.id} value={emp.name}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                    
                    <button
                      onClick={handleAssignLeads}
                      disabled={!selectedEmployee || isAssigning}
                      className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {assignmentStatus === 'success' && (
              <div className="text-green-600">Leads assigned successfully!</div>
            )}
            
            {assignmentStatus === 'error' && (
              <div className="text-red-600">Failed to assign leads. Please try again.</div>
            )}
          </div>
        </div>
        
        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <LeadsTable
            data={filteredLeads}
            selectedLeads={selectedLeads}
            onSelectLead={handleSelectLead}
            onSelectAll={handleSelectAll}
            onDelete={handleDeleteLead}
            onActionChange={async (id, value) => {
              // Find the lead to update
              const leadToUpdate = filteredLeads.find(lead => lead.id === id);
              if (leadToUpdate) {
                // Create an updated lead with the new action
                const updatedLead = {
                  ...leadToUpdate,
                  action: value
                };
                await handleUpdateLead(updatedLead);
              }
            }}
            onNotesChange={async (id, notes) => {
              // Find the lead to update
              const leadToUpdate = filteredLeads.find(lead => lead.id === id);
              if (leadToUpdate) {
                // Create an updated lead with the new notes
                const updatedLead = {
                  ...leadToUpdate,
                  notes: notes
                };
                await handleUpdateLead(updatedLead);
              }
            }}
          />
        </div>
      </main>
      
      <Footer />
      
      {/* Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={(newLead) => {
          const newLeadWithDefaults: TableData = {
            ...newLead,
            id: Date.now().toString(),
            message: '',
            assignedto: newLead.assignedTo,
            // Add any other required fields with default values
          }
          setLeads(prev => [...prev, newLeadWithDefaults])
          setIsAddLeadModalOpen(false)
        }}
      />
      
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={applyFilters}
        currentFilters={filters}
        leads={leads}
      />
      
      <BulkUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={() => setIsBulkUploadModalOpen(false)}
        onUpload={handleBulkUpload}
      />
      
      <ChatSupport />
    </div>
  )
}