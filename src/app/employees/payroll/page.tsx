import React from "react";
export default function PayrollDashboard() {
    return (
        <main className="flex-1 p-6 lg:ml-64 mt-24">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Payroll Summary</h1>
                <div className="mt-4 sm:mt-0">
                    <span className="text-sm font-medium text-gray-500">Total Earnings:</span>
                    <span className="ml-2 text-2xl font-bold text-green-600">₹8,75000000.00</span>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-31</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">May Salary</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,500.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-30</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">April Salary</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,500.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-31</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">March Salary</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,500.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Performance Bonus</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    HR Paid
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-02-28</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">February Salary</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,500.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}