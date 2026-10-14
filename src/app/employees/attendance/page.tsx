"use client"

import { useState, useEffect } from "react"
import { Roboto } from "next/font/google"
import {
    Bell,
    Menu,
    LayoutDashboard,
    Clock,
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
    UsersRound,
    FolderKanban,
    CalendarDays,
    Files,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import Image from "next/image"

const menuItems = [
    { title: "Requests & Tasks", icon: ClipboardList },
    { title: "Employees", icon: Users },
    { title: "Vibe", icon: MessageCircle },
    { title: "Reimbursement", icon: DollarSign },
    { title: "Compensation", icon: Wallet },
    { title: "Attendance", icon: Clock4 },
    { title: "Leave", icon: Umbrella },
    { title: "HR Documents", icon: FileText },
    { title: "Recruitment", icon: UserPlus },
    { title: "Calendar", icon: Calendar },
    { title: "Performance", icon: TrendingUp },
    { title: "Project", icon: FolderOpen },
    { title: "Helpdesk", icon: Headphones },
    { title: "Travel", icon: Plane },
    { title: "Recognition", icon: Award },
    { title: "Time Sheets", icon: ClipboardCheck },
    { title: "Reports", icon: BarChart },
    { title: "Reports Builder", icon: FileEdit },
]

const quickLinks = [
    { title: "Dashboard", icon: LayoutDashboard },
    { title: "My Team", icon: UsersRound },
    { title: "Projects", icon: FolderKanban },
    { title: "Calendar", icon: CalendarDays },
    { title: "Documents", icon: Files },
]
const inter = Roboto({ weight: '700', subsets: ['latin'] });
export default function AttendanceDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [days, setDays] = useState<number[]>([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const changeMonth = (value: number) => {
        let newMonth = month + value;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setMonth(newMonth);
        setYear(newYear);
    };

    const changeYear = (value: number) => {
        setYear(year + value);
    };

    useEffect(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = Array(firstDay).fill(null);
        const currentMonthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
        const daysArray = [...prevMonthDays, ...currentMonthDays];

        setDays(daysArray);
    }, [month, year]);
    return (

        <main className="flex-1 p-6 lg:ml-64 mt-24" >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-xl text-gray-600 mb-4 sm:mb-0">
                    Your Attendance for {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
                </h1>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { title: "Leave Days", value: 1 },
                    { title: "Present Days", value: 20 },
                    { title: "Absent Days", value: 0 },
                    { title: "Late By", value: "00:00:00" },
                ].map((stat) => (
                    <div key={stat.title} className="text-center bg-white p-4 rounded-lg shadow">
                        <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.title}</div>
                    </div>
                ))}
            </div>

            {/* Info Cards */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: "CLOCKING PRIORITY", value: "BIOMETRIC" },
                        { title: "SHIFT", value: "Regular Shift", subtext: "(11:00:00 AM - 08:30:00 PM)" },
                        { title: "POLICY", value: "General", isLink: true },
                        { title: "WEEKLY OFF", value: "All Mondays", subtext: "(All Mondays)" },
                    ].map((card) => (
                        <div key={card.title}>
                            <h3 className="font-semibold mb-1">{card.title}</h3>
                            <p className={`text-sm ${card.value === "BIOMETRIC" ? "text-green-600" : card.isLink ? "text-blue-600" : ""}`}>
                                {card.value}
                            </p>

                            {card.subtext && <p className="text-xs text-gray-600">{card.subtext}</p>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Year Navigation */}
                <div className="flex justify-between items-center bg-orange-500 text-white p-4">
                    <button onClick={() => changeYear(-1)} className="p-1 hover:bg-orange-600 rounded">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div className="text-xl font-semibold">{year}</div>
                    <button onClick={() => changeYear(1)} className="p-1 hover:bg-orange-600 rounded">
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Month Navigation */}
                <div className="flex justify-between items-center bg-orange-400 text-white p-3">
                    <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-orange-500 rounded">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="text-lg font-medium">{new Date(year, month).toLocaleString("default", { month: "long" })}</div>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-orange-500 rounded">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                        <div key={day} className={`bg-orange-100 p-2 text-center font-medium ${index === 0 ? "text-red-500" : "text-orange-800"}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {days.map((day, i) => (
                        <div key={i} className={`bg-white p-2 min-h-[80px] ${day ? "" : "bg-gray-50"}`}>
                            {day && (
                                <>
                                    <div className={`text-sm mb-1 font-medium ${i % 7 === 0 ? "text-red-500" : ""}`}>{day}</div>
                                    {i % 7 === 1 ? (
                                        <div className="bg-slate-100 text-slate-800 rounded text-xs p-1 inline-block font-medium">Weekly off</div>
                                    ) : (
                                        // <div className="bg-green-100 text-green-800 text-xs p-1 inline-block">Present</div>
                                        <div className="bg-gray-100 text-black text-xs p-1 inline-block">NA</div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">10:00 - 19:00</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </main>
    )
}

