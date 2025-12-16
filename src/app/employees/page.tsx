"use client"

import Link from "next/link"
import {
  Bell,
  Clock,
  Menu,
  ClipboardList,
  Users,
  MessageCircle,
  DollarSign,
  Wallet,
  Clock4,
  Umbrella,
  FileText,
  UserPlus,
  Calendar,
  TrendingUp,
  FolderOpen,
  Headphones,
  Plane,
  Award,
  ClipboardCheck,
  BarChart,
  FileEdit,
  Settings,
  LayoutDashboard,
  UsersRound,
  FolderKanban,
  CalendarDays,
  Files,
} from "lucide-react"

export default function EmployeePortal() {
  const menuItems = [
    { title: "Requests & Tasks", icon: ClipboardList, link: "/requests-tasks" },
    { title: "Employees", icon: Users, link: "/employees" },
    { title: "Vibe", icon: MessageCircle, link: "/vibe" },
    { title: "Reimbursement", icon: DollarSign, link: "/reimbursement" },
    { title: "Compensation", icon: Wallet, link: "/compensation" },
    { title: "Attendance", icon: Clock4, link: "/employees/attendance" },
    { title: "Leave", icon: Umbrella, link: "/employees/leaves" },
    { title: "HR Documents", icon: FileText, link: "/employees/documents" },
    { title: "Recruitment", icon: UserPlus, link: "/recruitment" },
    { title: "Calendar", icon: Calendar, link: "/calendar" },
    { title: "Performance", icon: TrendingUp, link: "/performance" },
    { title: "Project", icon: FolderOpen, link: "/project" },
    { title: "Helpdesk", icon: Headphones, link: "/helpdesk" },
    { title: "Travel", icon: Plane, link: "/travel" },
    { title: "Recognition", icon: Award, link: "/recognition" },
    { title: "Time Sheets", icon: ClipboardCheck, link: "/timesheets" },
    { title: "Reports", icon: BarChart, link: "/reports" },
    { title: "Reports Builder", icon: FileEdit, link: "/reports-builder" },
  ]

  return (
    <main className="min-h-screen pt-16 lg:pl-64 ">
      <div className="p-4">
        <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
          Employee Daily Health Check || Kindly Sign Off the COVID-19 Guideline Policies{" "}
          <button className="font-medium text-blue-700 hover:underline">Click here</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {menuItems.map((item) => (
            <Link href={item.link} key={item.title} className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all hover:shadow-md hover:bg-orange-50">
              <item.icon className="mb-2 h-8 w-8 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
