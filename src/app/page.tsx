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
    <main className="min-h-screen bg-white py-4 px-2 sm:py-8">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-2xl border-2 border-red-600 relative overflow-hidden">
        <div className="w-full h-auto py-4 sm:h-20 bg-[#E31B23] flex items-center justify-center rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-lg px-2 text-center">
            Janasena Membership & Accidental Insurance Form
          </h1>
        </div>

        <div className="pt-6 pb-6 px-4 sm:px-6">
          <div className="text-center mb-6">
            <p className="text-gray-900 text-sm sm:text-base font-semibold">
              Fill this form to register for <span className="text-[#E31B23] font-bold">Janasena</span> membership and accidental insurance coverage.
              <br />
              Please provide accurate details for both Member and Nominee
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl shadow p-4 border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Constituency</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter constituency name" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Mandal/Town</label>
                <select 
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                >
                  <option value="">Select Mandal</option>
                  <option value="sri-kalahasti">Sri Kalahasti</option>
                  <option value="yerpedu">Yerpedu</option>
                  <option value="tottambedu">Tottambedu</option>
                  <option value="renigunta">Renigunta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Panchayathi/Street</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter panchayathi or street name" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Village/Ward</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter village or ward" 
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow p-4 border border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Points of Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Contact Name 1</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter contact name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone 1</label>
                  <input 
                    type="tel" 
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter phone number" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Contact Name 2</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter contact name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone 2</label>
                  <input 
                    type="tel" 
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter phone number" 
                  />
                </div>
              </div>
            </div>

            {/* Member and Nominee Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Member Details */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-[#E31B23] overflow-hidden">
                <div className="bg-[#E31B23] py-3 px-4">
                  <h2 className="text-lg font-bold text-white">Member Details</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name & Gender</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                      <select 
                        className="w-full sm:w-32 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Qualification</label>
                      <input
                        type="text"
                        placeholder="e.g. 10th / Graduate"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Profession</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Profession</option>
                        <option value="farmer">Farmer</option>
                        <option value="business">Business</option>
                        <option value="govt-sector">Job - Government Sector</option>
                        <option value="private-sector">Job - Private Sector</option>
                        <option value="software">Software Professional</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Religion</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Religion</option>
                        <option value="hindu">Hindu</option>
                        <option value="muslim">Muslim</option>
                        <option value="christian">Christian</option>
                        <option value="buddhism">Buddhism</option>
                        <option value="jainism">Jainism</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Caste</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Caste Category</option>
                        <option value="oc">OC (Open Category)</option>
                        <option value="bc">BC (Backward Class)</option>
                        <option value="sc">SC (Scheduled Caste)</option>
                        <option value="st">ST (Scheduled Tribe)</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Reservation</label>
                      <input
                        type="text"
                        placeholder="Enter reservation category"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">AADHAR Document</label>
                      <input
                        type="file"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <button
                        type="button"
                        className="w-full bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2.5 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                      >
                        Capture Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nominee Details */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-[#E31B23] overflow-hidden">
                <div className="bg-[#E31B23] py-3 px-4">
                  <h2 className="text-lg font-bold text-white">Nominee Details</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name & Gender</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                      <select 
                        className="w-full sm:w-32 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Qualification</label>
                      <input
                        type="text"
                        placeholder="e.g. 10th / Graduate"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Profession</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Profession</option>
                        <option value="farmer">Farmer</option>
                        <option value="business">Business</option>
                        <option value="govt-sector">Job - Government Sector</option>
                        <option value="private-sector">Job - Private Sector</option>
                        <option value="software">Software Professional</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Religion</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Religion</option>
                        <option value="hindu">Hindu</option>
                        <option value="muslim">Muslim</option>
                        <option value="christian">Christian</option>
                        <option value="buddhism">Buddhism</option>
                        <option value="jainism">Jainism</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Caste</label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                      >
                        <option value="">Select Caste Category</option>
                        <option value="oc">OC (Open Category)</option>
                        <option value="bc">BC (Backward Class)</option>
                        <option value="sc">SC (Scheduled Caste)</option>
                        <option value="st">ST (Scheduled Tribe)</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Reservation</label>
                      <input
                        type="text"
                        placeholder="Enter reservation category"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">AADHAR Document</label>
                      <input
                        type="file"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <button
                        type="button"
                        className="w-full bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2.5 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                      >
                        Capture Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button 
                type="submit" 
                className="bg-[#E31B23] text-white font-bold py-2.5 px-8 rounded-lg shadow hover:bg-[#E31B23]/90 transition"
              >
                Submit
              </button>
              <button 
                type="reset" 
                className="bg-gray-200 text-gray-700 font-bold py-2.5 px-8 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="text-xs text-center text-gray-500 mt-4">
            Use Capture Photo to take a live photo (shoulder-up). Images will be automatically cropped and resized.
          </div>
        </div>
      </div>
    </main>
  );
}