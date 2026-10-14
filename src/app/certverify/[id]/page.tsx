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
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="relative bg-slate-900 dark:bg-slate-800 p-1 rounded-full border border-slate-700">
                    <img 
                      src="/favicon.png" 
                      alt="Nyera Logo" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-3">
                Certificate Verification
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl">
                Verify the authenticity of your certificate
              </p>
            </div>

            {/* Main Certificate Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
              {/* Certificate Header with Rich Slate Grey */}
              <div className="bg-slate-900 dark:bg-slate-850 p-8 sm:p-10 text-white relative overflow-hidden border-b border-slate-800">
                <div className="relative z-10">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-slate-400 text-sm sm:text-base font-medium mb-1">Certificate ID</p>
                      <p className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">{certificate.id || id}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-sm">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-8 sm:p-10 lg:p-12">
                {/* Certificate Badge */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="relative bg-slate-100 dark:bg-slate-800 p-6 rounded-full border-4 border-slate-300 dark:border-slate-700 shadow-xl">
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
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full uppercase tracking-wider">
                      Certificate of Completion
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    This is to certify that
                  </h2>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
                    {certificate.name || 'Student Name'}
                  </h3>
                  <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-2">
                    has successfully completed the course
                  </p>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 mt-4">
                    {certificate.course || 'Course Name'}
                  </h4>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 mx-auto text-slate-700 dark:text-slate-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 text-center">Start Date</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white text-center">{formatDate(certificate.startDate)}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 mx-auto text-slate-700 dark:text-slate-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 text-center">End Date</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white text-center">{formatDate(certificate.endDate)}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 mx-auto text-slate-700 dark:text-slate-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 text-center">Issued On</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white text-center">{formatDate(certificate.issueDate)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {certificate.certificate_upload && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <a 
                      href={certificate.certificate_upload} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl shadow-lg border border-slate-700/50 hover-lift transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Full Certificate</span>
                    </a>
                    <a 
                      href={certificate.certificate_upload} 
                      download 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shadow-md border border-slate-300 dark:border-slate-700 hover-lift transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Certificate</span>
                    </a>
                  </div>
                )}

                {/* Verification Info */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Verification Information</h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        This certificate was issued by <span className="font-semibold text-slate-900 dark:text-white">Nyeras Edutech and Innovations Pvt Limited</span> and can be verified online using the certificate ID: <span className="font-mono font-bold text-slate-900 dark:text-white">{certificate.id || id}</span>
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Verified on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Email Address</p>
                      <p className="text-base font-semibold text-slate-900 dark:text-white break-all">{certificate.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
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
            <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
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
