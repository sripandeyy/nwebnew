"use client"

import { useState, useRef, useEffect } from "react"
import { Clock, X, Plus, Search, CheckCircle2, CircleDashed, CircleEllipsis, ChevronDown } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import ChatSupport from "../components/chat-support"

type Task = {
  taskId: number
  title: string
  assignee: string
  status: "todo" | "inprogress" | "closed"
  dueDate: string
  type: "lead" | "opportunity" | "task"
  timeSpent: number
}

// Update the TimeLogEntry type to use taskId
type TimeLogEntry = {
  taskId: number
  date: string
  minutes: number
  description: string
}

export default function SalesTaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [timeLogs, setTimeLogs] = useState<TimeLogEntry[]>([])
  const [, setError] = useState<string | null>(null)
  const [assignees, setAssignees] = useState<string[]>([])
  const [assigneesLoading, setAssigneesLoading] = useState<boolean>(true)
  const [assigneesError, setAssigneesError] = useState<string | null>(null)
  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const response = await fetch("/api/bdasales/salesemp") // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch assignees")
        }
        const data = await response.json()
        const names = data.map((assignee: { name: string }) => assignee.name)
        setAssignees(names)
      } catch (error) {
        setAssigneesError("Error fetching assignees")
        console.error(error)
      } finally {
        setAssigneesLoading(false)
      }
    }

    fetchAssignees()
  }, [])
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/crm/tasktracker")
        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        setError("Error fetching tasks")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Dialog states
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [logTimeOpen, setLogTimeOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  // Form states
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    type: "task" as Task["type"],
  })

  const [newTimeLog, setNewTimeLog] = useState({
    hours: 0,
    minutes: 0,
    description: "",
  })

  // Add these state variables after the other useState declarations
  const [creatingTask, setCreatingTask] = useState(false)
  const [loggingTime, setLoggingTime] = useState(false)
  // Add this state variable after the other useState declarations
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null)
  // Refs for click outside handling
  const createTaskModalRef = useRef<HTMLDivElement>(null)
  const logTimeModalRef = useRef<HTMLDivElement>(null)
  const typeDropdownRef = useRef<HTMLDivElement>(null)

  // Handle status change
  const handleStatusChange = async (taskId: number, newStatus: Task["status"]) => {
    setUpdatingTaskId(taskId)

    try {
      const response = await fetch("/api/crm/tasktracker/updatestatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update task status")
      }

      setTasks((prevTasks) => prevTasks.map((task) => (task.taskId === taskId ? { ...task, status: newStatus } : task)))
    } catch (error) {
      console.error("Error updating task status:", error)
    } finally {
      setUpdatingTaskId(null)
    }
  }

  // Get status color
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "inprogress":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-green-100 text-green-800"
    }
  }

  // Get type icon
  const getTypeIcon = (type: Task["type"]) => {
    switch (type) {
      case "lead":
        return <CircleDashed className="w-4 h-4 text-slate-600" />
      case "opportunity":
        return <CircleEllipsis className="w-4 h-4 text-blue-600" />
      case "task":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    }
  }

  // Format time display
  const formatTimeSpent = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Update the handleCreateTask function to include loading state
  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) return

    setCreatingTask(true)

    const taskId = tasks.length + 1
    const newTaskObj: Task = {
      taskId,
      title: newTask.title,
      assignee: newTask.assignee,
      status: "todo",
      dueDate: newTask.dueDate,
      type: newTask.type,
      timeSpent: 0,
    }

    try {
      const response = await fetch("/api/crm/tasktracker/createtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskObj),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      // Add the new task to the local state
      setTasks([...tasks, newTaskObj])

      setNewTask({
        title: "",
        assignee: "",
        dueDate: "",
        type: "task",
      })
      setCreateTaskOpen(false)
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setCreatingTask(false)
    }
  }

  // Update the handleLogTime function to include loading state
  const handleLogTime = async () => {
    if (!selectedTaskId) return
    if (!newTimeLog.description) return
    const totalMinutes = newTimeLog.hours * 60 + newTimeLog.minutes
    if (totalMinutes <= 0) return

    setLoggingTime(true)

    try {
      const response = await fetch("/api/crm/tasktracker/logtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: Number(selectedTaskId),
          minutes: totalMinutes,
          description: newTimeLog.description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to log time")
      }

      // Add to time logs locally
      const newLog: TimeLogEntry = {
        taskId: Number(selectedTaskId),
        date: new Date().toISOString().split("T")[0],
        minutes: totalMinutes,
        description: newTimeLog.description,
      }
      setTimeLogs([...timeLogs, newLog])

      // Update task total time locally
      setTasks(
        tasks.map((task) => {
          if (task.taskId === Number(selectedTaskId)) {
            return {
              ...task,
              timeSpent: task.timeSpent + totalMinutes,
            }
          }
          return task
        }),
      )

      // Reset form
      setNewTimeLog({
        hours: 0,
        minutes: 0,
        description: "",
      })
      setLogTimeOpen(false)
      setSelectedTaskId(null)
    } catch (error) {
      console.error("Error logging time:", error)
    } finally {
      setLoggingTime(false)
    }
  }

  const openTimeLogDialog = (taskId: string) => {
    setSelectedTaskId(taskId)
    setLogTimeOpen(true)
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createTaskOpen && createTaskModalRef.current && !createTaskModalRef.current.contains(event.target as Node)) {
        setCreateTaskOpen(false)
      }

      if (logTimeOpen && logTimeModalRef.current && !logTimeModalRef.current.contains(event.target as Node)) {
        setLogTimeOpen(false)
      }

      if (typeDropdownOpen && typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setTypeDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [createTaskOpen, logTimeOpen, typeDropdownOpen])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header companyName="NYERAS" userName="Challa Sai" userRole="IT Team" />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sales Tasks</h2>
              <p className="mt-1 text-sm text-gray-500">Manage and track your sales activities</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={() => setCreateTaskOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </button>
            </div>
          </div>


          {/* Tasks Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.taskId}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(task.type)}
                        <span className="text-xs font-medium text-gray-500 capitalize">{task.type}</span>
                      </div>
                      {updatingTaskId === task.taskId ? (
                        <div
                          className={`text-sm font-medium rounded-full px-3 py-1 flex items-center ${getStatusColor(task.status)}`}
                        >
                          <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></div>
                          <span>Updating...</span>
                        </div>
                      ) : (
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.taskId, e.target.value as Task["status"])}
                          className={`text-sm font-medium rounded-full px-3 py-1 border-0 cursor-pointer ${getStatusColor(task.status)}`}
                        >
                          <option value="todo">Todo</option>
                          <option value="inprogress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                      )}
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-4">{task.title}</h3>

                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Assigned to: {task.assignee}</span>
                        <span className="text-xs text-gray-500">Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{formatTimeSpent(task.timeSpent)}</span>
                        </div>
                        <button
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          onClick={() => openTimeLogDialog(task.taskId.toString())}
                        >
                          Log Time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && filteredTasks.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <CheckCircle2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery ? `No tasks match "${searchQuery}"` : "You don't have any tasks yet"}
              </p>
              <button
                onClick={() => setCreateTaskOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </button>
            </div>
          )}
        </div>
      </main>

      {createTaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={createTaskModalRef} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New Task</h3>
              <button onClick={() => setCreateTaskOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <div className="relative">
                  {assigneesLoading ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between">
                      <span className="text-gray-400">Loading assignees...</span>
                      <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <select
                      id="assignee"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Assignee</option>
                      {assignees.map((assignee) => (
                        <option key={assignee} value={assignee}>
                          {assignee}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                {assigneesError && <p className="mt-1 text-sm text-red-500">{assigneesError}</p>}
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Type
                </label>
                <div className="relative" ref={typeDropdownRef}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                  >
                    <span className="capitalize">{newTask.type}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {typeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                      {["lead", "opportunity", "task"].map((type) => (
                        <button
                          key={type}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                          onClick={() => {
                            setNewTask({ ...newTask, type: type as Task["type"] })
                            setTypeDropdownOpen(false)
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setCreateTaskOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                disabled={creatingTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-blue-400 flex items-center justify-center"
              >
                {creatingTask ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {logTimeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={logTimeModalRef} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Log Time</h3>
              <button onClick={() => setLogTimeOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                    Hours
                  </label>
                  <input
                    id="hours"
                    type="number"
                    min="0"
                    value={newTimeLog.hours}
                    onChange={(e) => setNewTimeLog({ ...newTimeLog, hours: Number.parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
                    Minutes
                  </label>
                  <input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={newTimeLog.minutes}
                    onChange={(e) => setNewTimeLog({ ...newTimeLog, minutes: Number.parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTimeLog.description}
                  onChange={(e) => setNewTimeLog({ ...newTimeLog, description: e.target.value })}
                  placeholder="What did you work on?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setLogTimeOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Cancel
              </button>
              <button
                onClick={handleLogTime}
                disabled={loggingTime}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-blue-400 flex items-center justify-center"
              >
                {loggingTime ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging...
                  </>
                ) : (
                  "Log Time"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ChatSupport />
    </div>
  )
}