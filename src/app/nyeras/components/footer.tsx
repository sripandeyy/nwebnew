export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">NYERAS</h3>
              <p className="text-gray-300 text-sm">
                Streamline your lead management process with our powerful CRM solution.
              </p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/nyeras/crm" className="hover:text-white transition-colors duration-200">
                    CRM
                  </a>
                </li>
                <li>
                  <a href="/nyeras/salesdashboard" className="hover:text-white transition-colors duration-200">
                    Sales & Leaderboard
                  </a>
                </li>
                <li>
                  <a href="/nyeras/taskmanagement" className="hover:text-white transition-colors duration-200">
                    Task Tracker
                  </a>
                </li>
                <li>
                  <a href="/nyeras/paymentreminder" className="hover:text-white transition-colors duration-200">
                    Payment Reminder
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  support@nyeras.com
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +91 7013586357
                </li>
              </ul>
            </div>
          </div>
  
          <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} NYERAS 2025. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Version 1.0.0 Beta</p>
          </div>
        </div>
      </footer>
    )
  }
  
  