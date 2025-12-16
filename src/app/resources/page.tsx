import Link from 'next/link'
import Topbar from '../components/Topbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function ResourcesPage() {
  return (
    <>
    <Topbar />
    <Header />
    <div className="min-h-screen bg-white pt-20">
    <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <svg
            className="inline-block text-orange-500 mb-4"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Educational Resources</h1>
          <p className="text-xl text-gray-600">Empower your learning journey with our curated tools</p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ResourceCard 
            title="Online Compiler" 
            description="Write, compile, and run code in your browser."
            link="https://www.onlinegdb.com"
          />
          <ResourceCard 
            title="GitHub Repository" 
            description="Access our open-source educational materials."
            link="https://github.com/nyeras1"
          />
          <ResourceCard 
            title="GitHub Commands" 
            description="Essential Git commands for your workflow."
            link="#"
            customContent={
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    git add .{'\n'}
                    git commit -m &quot;Your message&quot;{'\n'}
                    git push
                  </code>
                </pre>
              </div>
            }
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
function ResourceCard({ 
    title, 
    description, 
    link, 
    customContent 
  }: { 
    title: string, 
    description: string, 
    link: string, 
    customContent?: React.ReactNode 
  }) {
    return (
      <div className="bg-orange-50 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {customContent ? (
          customContent
        ) : (
          <Link 
            href={link}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Access {title}
          </Link>
        )}
      </div>
    )
  }
