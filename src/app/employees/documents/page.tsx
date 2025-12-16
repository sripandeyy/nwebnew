"use client"

import type { FormEvent } from "react"

export default function DocumentUploadForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/emp_portal/documents", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed.")
      }

      const result = await response.json()
      console.log("Success:", result)
      alert("Documents uploaded successfully!")

      // Optionally reset the form, navigate, etc.
      // form.reset();
    } catch (error) {
      console.error("Error uploading:", error)
      alert("Failed to upload documents. See console for details.")
    }
  }

  return (
    <main className="flex-1 p-6 lg:ml-64 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-orange-500 text-white py-5 px-6">
            <h2 className="text-2xl font-bold">Documents Upload</h2>
          </div>
          <form className="p-6 space-y-8" encType="multipart/form-data" onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                    Recent Profile Photo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="aadharName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name as per Aadhar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="aadharName"
                    name="aadharName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Document Uploads Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Document Uploads</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="aadharFront" className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Front <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="aadharFront"
                    name="aadharFront"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="aadharBack" className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Back <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="aadharBack"
                    name="aadharBack"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="panFront" className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Front <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="panFront"
                    name="panFront"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Education Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Education Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="studyMode" className="block text-sm font-medium text-gray-700 mb-1">
                      Study Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="studyMode"
                      name="studyMode"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    >
                      <option value="">Select</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
                      College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="degreeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Degree Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="degreeLevel"
                      name="degreeLevel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    >
                      <option value="">Select</option>
                      <option value="bachelors">Bachelors</option>
                      <option value="masters">Masters</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="grade"
                      name="grade"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="educationDocuments" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Educational Documents (PDF) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="educationDocuments"
                    name="educationDocuments"
                    accept=".pdf"
                    multiple
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Bank Information Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Bank Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="passbookOrCheque" className="block text-sm font-medium text-gray-700 mb-1">
                    Passbook First Page / Cancelled Cheque <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="passbookOrCheque"
                    name="passbookOrCheque"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-5">
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

