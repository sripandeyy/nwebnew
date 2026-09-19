'use client';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
const inter = Roboto({ weight: '700', subsets: ['latin'] });
import {
    Bell,
    Menu,
    Users,
    Settings,
    LayoutDashboard,
    FolderKanban,
    CalendarDays,
    Files,
} from "lucide-react"
import { useState } from "react"

export default function EmployeesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const quickLinks = [
        { title: "Leaves", icon: FolderKanban, url: "/employees/leaves" },
        { title: "Payroll", icon: LayoutDashboard, url: "/employees/payroll" },
        { title: "Attendance", icon: CalendarDays, url: "/employees/attendance" },
        { title: "Documents", icon: Files, url: "/employees/documents" },
    ];
    // Nested under root layout — do not render another <html>/<body>
    return (
                <>
                <NextTopLoader
                    color="orange"
                    showSpinner={false}
                    showAtBottom={false}
                    crawlSpeed={200}
                />
                <div className={`${inter.className} min-h-screen bg-white`}>
                    <header className="fixed top-0 z-30 w-full bg-orange-500 shadow-md">
                        <div className="flex h-16 items-center justify-between px-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                                    className="rounded-lg p-2 text-white hover:bg-orange-600 lg:hidden"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                                <img src="/footerlogo.png" alt="Nyeras" className="h-10 w-auto" />
                                <h1 className="text-xl font-semibold text-black p-5 bg-white">NYERAS</h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="rounded-lg p-2 text-white hover:bg-orange-600 relative">
                                    <Bell className="h-6 w-6" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        0
                                    </span>
                                </button>
                                <img
                                    src="https://media.licdn.com/dms/image/v2/D5603AQH3UZi94jSORw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1683746049973?e=1744243200&v=beta&t=stlNU2Jjjhu0NxnUyMaYuSl2Al7592uTY9XmTt1gfss"
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full border-2 border-white"
                                />
                            </div>
                        </div>
                    </header>

                    <aside
                        className={`fixed left-0 top-0 z-20 h-full w-64 transform bg-orange-50 pt-16 transition-transform duration-200 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="flex flex-col items-center p-4">
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQH3UZi94jSORw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1683746049973?e=1744243200&v=beta&t=stlNU2Jjjhu0NxnUyMaYuSl2Al7592uTY9XmTt1gfss"
                                alt="Employee"
                                className="h-28 w-28 rounded-full border-4 border-white shadow-lg"
                            />
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">Vijay Sathya Prakash</h2>
                            <p className="text-sm text-gray-600">Founders Office</p>

                            <div className="mt-6 w-full space-y-2">
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                                    <Users className="h-4 w-4" />
                                    <span>View Profile</span>
                                </button>
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-orange-500 shadow-sm hover:bg-orange-50">
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 px-4">
                            <h3 className="mb-2 text-sm font-semibold text-gray-600">Quick Links</h3>
                            <div className="space-y-1">
                                {quickLinks.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.url}
                                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-gray-700 hover:bg-orange-100"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* <main className="min-h-screen pt-16 lg:pl-64">
                        <div className="p-4"> */}
                    {children}
                    {/* </div>
                    </main> */}

                </div>
                </>
    );
}