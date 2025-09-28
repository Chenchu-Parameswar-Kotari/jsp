'use client';

export default function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      try {
        const formData = new FormData();
        
        // Create the form JSON data
        const jsonData = {
          constituency: (form.querySelector('[name="constituency"]') as HTMLInputElement)?.value || '',
          mandalTown: (form.querySelector('[name="mandalTown"]') as HTMLSelectElement)?.value || '',
          panchayathiStreet: (form.querySelector('[name="panchayathiStreet"]') as HTMLInputElement)?.value || '',
          villageWard: (form.querySelector('[name="villageWard"]') as HTMLInputElement)?.value || '',
          contactName1: (form.querySelector('[name="contactName1"]') as HTMLInputElement)?.value || '',
          phone1: (form.querySelector('[name="phone1"]') as HTMLInputElement)?.value || '',
          contactName2: (form.querySelector('[name="contactName2"]') as HTMLInputElement)?.value || '',
          phone2: (form.querySelector('[name="phone2"]') as HTMLInputElement)?.value || '',
          memberFullName: (form.querySelector('[name="memberFullName"]') as HTMLInputElement)?.value || '',
          memberGender: (form.querySelector('[name="memberGender"]') as HTMLSelectElement)?.value || '',
          memberQualification: (form.querySelector('[name="memberQualification"]') as HTMLInputElement)?.value || '',
          memberProfession: (form.querySelector('[name="memberProfession"]') as HTMLSelectElement)?.value || '',
          memberReligion: (form.querySelector('[name="memberReligion"]') as HTMLSelectElement)?.value || '',
          memberCaste: (form.querySelector('[name="memberCaste"]') as HTMLSelectElement)?.value || '',
          memberReservation: (form.querySelector('[name="memberReservation"]') as HTMLInputElement)?.value || '',
          memberMobileNumber: (form.querySelector('[name="memberMobileNumber"]') as HTMLInputElement)?.value || '',
          nomineeFullName: (form.querySelector('[name="nomineeFullName"]') as HTMLInputElement)?.value || '',
          nomineeGender: (form.querySelector('[name="nomineeGender"]') as HTMLSelectElement)?.value || '',
          nomineeQualification: (form.querySelector('[name="nomineeQualification"]') as HTMLInputElement)?.value || '',
          nomineeProfession: (form.querySelector('[name="nomineeProfession"]') as HTMLSelectElement)?.value || '',
          nomineeReligion: (form.querySelector('[name="nomineeReligion"]') as HTMLSelectElement)?.value || '',
          nomineeCaste: (form.querySelector('[name="nomineeCaste"]') as HTMLSelectElement)?.value || '',
          nomineeReservation: (form.querySelector('[name="nomineeReservation"]') as HTMLInputElement)?.value || '',
          nomineeMobileNumber: (form.querySelector('[name="nomineeMobileNumber"]') as HTMLInputElement)?.value || ''
        };

        // Add form data as a string with type application/json
        formData.append('form', JSON.stringify(jsonData));

        // Append file inputs
        const memberAadhar = (form.querySelector('[name="memberAadharDocument"]') as HTMLInputElement)?.files?.[0];
        const memberPhoto = (form.querySelector('[name="memberPhoto"]') as HTMLInputElement)?.files?.[0];
        const nomineeAadhar = (form.querySelector('[name="nomineeAadharDocument"]') as HTMLInputElement)?.files?.[0];
        const nomineePhoto = (form.querySelector('[name="nomineePhoto"]') as HTMLInputElement)?.files?.[0];

        if (memberAadhar) formData.append('memberAadharDocument', memberAadhar);
        if (memberPhoto) formData.append('memberPhoto', memberPhoto);
        if (nomineeAadhar) formData.append('nomineeAadharDocument', nomineeAadhar);
        if (nomineePhoto) formData.append('nomineePhoto', nomineePhoto);

        // Submit the form with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
          const response = await fetch('/api/form', {
            method: 'POST',
            body: formData,
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `HTTP error! status: ${response.status}, details: ${errorData.details || 'Unknown error'}`
            );
          }

          const result = await response.json();
          console.log('Form submitted successfully:', result);
          
          // Reset form after successful submission
          form.reset();
          alert(result.message || 'Form submitted successfully!');
        } catch (error: any) {
          console.error('Error submitting form:', error);
          if (error.name === 'AbortError') {
            alert('Request timed out. Please try again.');
          } else {
            alert(`Failed to submit form: ${error.message}`);
          }
        }
      } catch (error) {
        console.error('Error preparing form data:', error);
        alert('Failed to prepare form data. Please try again.');
      }
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
                  name="constituency"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter constituency name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Mandal/Town</label>
                <select 
                  name="mandalTown"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 bg-white"
                  required
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
                  name="panchayathiStreet"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter panchayathi or street name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Village/Ward</label>
                <input 
                  type="text" 
                  name="villageWard"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter village or ward" 
                  required
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
                    name="contactName1"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter contact name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone 1</label>
                  <input 
                    type="tel" 
                    name="phone1"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter phone number" 
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Contact Name 2</label>
                  <input 
                    type="text" 
                    name="contactName2"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter contact name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone 2</label>
                  <input 
                    type="tel" 
                    name="phone2"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter phone number" 
                    pattern="[0-9]{10}"
                    required
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
                        name="memberFullName"
                        placeholder="Enter full name"
                        className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                      <select 
                        name="memberGender"
                        className="w-full sm:w-32 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="memberQualification"
                        placeholder="e.g. 10th / Graduate"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Profession</label>
                      <select
                        name="memberProfession"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="memberReligion"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="memberCaste"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="memberReservation"
                        placeholder="Enter reservation category"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        name="memberMobileNumber"
                        placeholder="Enter mobile number"
                        pattern="[0-9]{10}"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">AADHAR Document</label>
                      <input
                        type="file"
                        name="memberAadharDocument"
                        accept="image/*,.pdf"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <input
                        type="file"
                        name="memberPhoto"
                        accept="image/*"
                        capture="user"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        required
                      />
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
                        name="nomineeFullName"
                        placeholder="Enter full name"
                        className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                      <select 
                        name="nomineeGender"
                        className="w-full sm:w-32 rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="nomineeQualification"
                        placeholder="e.g. 10th / Graduate"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Profession</label>
                      <select
                        name="nomineeProfession"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="nomineeReligion"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="nomineeCaste"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900"
                        required
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
                        name="nomineeReservation"
                        placeholder="Enter reservation category"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        name="nomineeMobileNumber"
                        placeholder="Enter mobile number"
                        pattern="[0-9]{10}"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">AADHAR Document</label>
                      <input
                        type="file"
                        name="nomineeAadharDocument"
                        accept="image/*,.pdf"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <input
                        type="file"
                        name="nomineePhoto"
                        accept="image/*"
                        capture="user"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E31B23]/10 file:text-[#E31B23] hover:file:bg-[#E31B23]/20"
                        required
                      />
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
            Use your phone camera to capture a photo (shoulder-up). Images will be automatically cropped and resized.
          </div>
        </div>
      </div>
    </main>
  );
}