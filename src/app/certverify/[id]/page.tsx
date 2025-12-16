import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface Certificate {
  id: string;
  name: string;
  email: string;
  course: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  status: string;
  certificate_upload?: string;
  [key: string]: any;
}

async function getCertificate(id: string): Promise<Certificate | null> {
  try {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.error('Error: Invalid certificate ID provided:', id);
      return null;
    }

    let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    
    if (!baseUrl) {
      try {
        const hdrs = await headers();
        const host = hdrs.get('host') || 'localhost:3000';
        const proto =
          hdrs.get('x-forwarded-proto') ||
          (host.includes('localhost') ? 'http' : 'https');
        baseUrl = `${proto}://${host}`;
      } catch (headersError) {
        console.warn('Failed to get headers, using fallback URL');
        baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
          : 'http://localhost:3000';
      }
    }

    const apiUrl = `${baseUrl}/api/certverify/${encodeURIComponent(id)}`;
    const res = await fetch(apiUrl, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} - ${errorText}`);
      return null;
    }

    const data = await res.json();
    
    if (data && data.error) {
      console.error('Certificate API returned error:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch certificate:', error);
    return null;
  }
}

const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.error('Invalid certificate ID:', id);
      notFound();
    }

    const certificate = await getCertificate(id);
    
    if (!certificate) {
      console.error('Certificate not found for ID:', id);
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-1 rounded-full">
                    <img 
                      src="/favicon.png" 
                      alt="Nyera Logo" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Certificate Verification
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl">
                Verify the authenticity of your certificate
              </p>
            </div>

            {/* Main Certificate Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
              {/* Certificate Header with Gradient */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 p-8 sm:p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-purple-100 text-sm sm:text-base font-medium mb-2">Certificate ID</p>
                      <p className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">{certificate.id || id}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-8 sm:p-10 lg:p-12">
                {/* Certificate Badge */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-full border-4 border-purple-300 shadow-xl">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                        <img 
                          src="/favicon.png" 
                          alt="Nyera Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="text-center mb-10">
                  <div className="inline-block mb-4">
                    <span className="text-xs sm:text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full uppercase tracking-wider">
                      Certificate of Completion
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    This is to certify that
                  </h2>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                    {certificate.name || 'Student Name'}
                  </h3>
                  <p className="text-xl sm:text-2xl text-gray-600 mb-2">
                    has successfully completed the course
                  </p>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
                    {certificate.course || 'Course Name'}
                  </h4>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-2 text-center">Start Date</p>
                    <p className="text-lg font-bold text-gray-900 text-center">{formatDate(certificate.startDate)}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 mx-auto">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-2 text-center">End Date</p>
                    <p className="text-lg font-bold text-gray-900 text-center">{formatDate(certificate.endDate)}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4 mx-auto">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-2 text-center">Issued On</p>
                    <p className="text-lg font-bold text-gray-900 text-center">{formatDate(certificate.issueDate)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {certificate.certificate_upload && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <a 
                      href={certificate.certificate_upload} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="relative z-10">View Full Certificate</span>
                    </a>
                    <a 
                      href={certificate.certificate_upload} 
                      download 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="relative z-10">Download Certificate</span>
                    </a>
                  </div>
                )}

                {/* Verification Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Verification Information</h3>
                      <p className="text-gray-700 leading-relaxed">
                        This certificate was issued by <span className="font-semibold text-purple-600">Nyeras Edutech and Innovations Pvt Limited</span> and can be verified online using the certificate ID: <span className="font-mono font-bold text-gray-900">{certificate.id || id}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Verified on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Email Address</p>
                      <p className="text-base font-semibold text-gray-900 break-all">{certificate.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {certificate.status || 'Issued'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center text-gray-600 text-sm">
              <p>This certificate is digitally verified and authentic</p>
              <p className="mt-1">© {new Date().getFullYear()} Nyeras Edutech and Innovations Pvt Limited. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in certificate page:', error);
    notFound();
  }
}
