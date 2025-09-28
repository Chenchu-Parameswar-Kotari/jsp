
'use client';

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Form is valid, proceed with submission
      console.log('Form is valid, submitting...');
    } else {
      // Form has validation errors
      form.reportValidity();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-4 px-2 sm:py-8">
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-red-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-auto py-4 sm:h-20 bg-[#E31B23] flex items-center justify-center z-10 rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-lg px-2 text-center">
            Janasena Membership & Accidental Insurance Form
          </h1>
        </div>
        <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-3 sm:px-8">
          <div className="text-center mb-8">
            <p className="mt-2 text-gray-900 text-base font-semibold">
              Fill this form to register for <span className="text-[#E31B23] font-bold">JANASENA</span> membership and accidental insurance coverage.
              <br />
              Please provide accurate details for both Member and Nominee
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900">Constituency</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter constituency name" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Mandal(Rural)/ Town (Urban)</label>
                <select 
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                >
                  <option value="">Select Mandal</option>
                  <option value="sri-kalahasti">Sri Kalahasti</option>
                  <option value="yerpedu">Yerpedu</option>
                  <option value="tottambedu">Tottambedu</option>
                  <option value="renigunta">Renigunta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Panchayathi(Rural) / Street (Urban)</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                  placeholder="Enter panchayathi or street name" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Village (Rural) / Ward (Urban)</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                  placeholder="Enter village name or ward number" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Point of Contact(s) for Coordination</label>
                <div className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900">Name1:</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                        placeholder="Enter contact name" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900">Phone:</label>
                      <input 
                        type="tel" 
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                        placeholder="Enter phone number" 
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900">Name2:</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                        placeholder="Enter contact name" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900">Phone:</label>
                      <input 
                        type="tel" 
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white" 
                        placeholder="Enter phone number" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Point(s) of Contact for Coordination</h2>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full border-2 border-[#E31B23] text-sm rounded-xl shadow-lg overflow-hidden table-fixed">
                  <thead className="bg-[#E31B23] text-white">
                    <tr>
                      <th className="w-1/4 px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-lg">Key Element</th>
                      <th className="w-[37.5%] px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-lg">Member</th>
                      <th className="w-[37.5%] px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-lg">Nominee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Member Name</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3" colSpan={2}>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                          <input
                            type="text"
                            placeholder="Enter member's full name"
                            className="w-full flex-1 rounded-lg border border-gray-300 p-1.5 sm:p-2.5 text-xs sm:text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                          />
                          <select 
                            className="w-full sm:w-40 rounded-lg border border-gray-300 p-1.5 sm:p-2.5 text-xs sm:text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white mt-1 sm:mt-0"
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Nominee Name</td>
                      <td className="px-3 sm:px-4 py-3" colSpan={2}>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <input
                            type="text"
                            placeholder="Enter nominee's full name"
                            className="w-full flex-1 rounded-lg border border-gray-300 p-2 sm:p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                          />
                          <select 
                            className="w-full sm:w-40 rounded-lg border border-gray-300 p-2 sm:p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white mt-2 sm:mt-0"
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">Qualification / Education</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <input
                          type="text"
                          placeholder="e.g. 10th / Graduate"
                          className="w-full rounded-lg border border-gray-300 p-1.5 sm:p-2.5 text-xs sm:text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <input
                          type="text"
                          placeholder="e.g. 10th / Graduate"
                          className="w-full rounded-lg border border-gray-300 p-1.5 sm:p-2.5 text-xs sm:text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Profession</td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Profession</option>
                          <option value="farmer">Farmer</option>
                          <option value="business">Business</option>
                          <option value="govt-sector">Job - Government Sector</option>
                          <option value="private-sector">Job - Private Sector</option>
                          <option value="software">Software Professional</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Profession</option>
                          <option value="farmer">Farmer</option>
                          <option value="business">Business</option>
                          <option value="govt-sector">Job - Government Sector</option>
                          <option value="private-sector">Job - Private Sector</option>
                          <option value="software">Software Professional</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Religion</td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Religion</option>
                          <option value="hindu">Hindu</option>
                          <option value="muslim">Muslim</option>
                          <option value="christian">Christian</option>
                          <option value="buddhism">Buddhism</option>
                          <option value="jainism">Jainism</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Religion</option>
                          <option value="hindu">Hindu</option>
                          <option value="muslim">Muslim</option>
                          <option value="christian">Christian</option>
                          <option value="buddhism">Buddhism</option>
                          <option value="jainism">Jainism</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Reservation</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter member's reservation"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter nominee's reservation"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Caste</td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Caste Category</option>
                          <option value="oc">OC (Open Category)</option>
                          <option value="bc">BC (Backward Class)</option>
                          <option value="sc">SC (Scheduled Caste)</option>
                          <option value="st">ST (Scheduled Tribe)</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                        >
                          <option value="">Select Caste Category</option>
                          <option value="oc">OC (Open Category)</option>
                          <option value="bc">BC (Backward Class)</option>
                          <option value="sc">SC (Scheduled Caste)</option>
                          <option value="st">ST (Scheduled Tribe)</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">Mobile Number</td>
                      <td className="px-4 py-3">
                        <input
                          type="tel"
                          placeholder="Enter member's mobile number"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="tel"
                          placeholder="Enter nominee's mobile number"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500 bg-white"
                        />
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">AADHAR (upload)</td>
                      <td className="px-4 py-3">
                        <input
                          type="file"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="file"
                          className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">Photo (upload / camera)</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          className="w-full bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-3 py-2 font-bold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                        >
                          Capture Member Photo
                        </button>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          className="w-full bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-3 py-2 font-bold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                        >
                          Capture Nominee Photo
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-xs text-gray-500 mt-2">
                  Use Capture to take live <span className="italic">photo</span> (shoulder-up), Cropping/resizing done client-side.
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button type="submit" className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-red-600 transition">
                Submit
              </button>
              <button type="reset" className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
