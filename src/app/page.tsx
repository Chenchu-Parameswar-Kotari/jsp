'use client';

import { useState } from 'react';

interface ValidationErrors {
  [key: string]: string;
}

const fieldLabels: { [key: string]: string } = {
  constituency: 'Constituency',
  mandalTown: 'Mandal/Town',
  panchayathiStreet: 'Panchayathi/Street',
  villageWard: 'Village/Ward',
  contactName1: 'Contact Name 1',
  phone1: 'Phone 1',
  contactName2: 'Contact Name 2',
  phone2: 'Phone 2',
  memberFullName: 'Member Full Name',
  memberGender: 'Member Gender',
  memberQualification: 'Member Qualification',
  memberProfession: 'Member Profession',
  memberReligion: 'Member Religion',
  memberCaste: 'Member Caste',
  memberReservation: 'Member Reservation',
  memberMobileNumber: 'Member Mobile Number',
  memberAadharDocument: 'Member AADHAR Document',
  memberPhoto: 'Member Photo',
  nomineeFullName: 'Nominee Full Name',
  nomineeGender: 'Nominee Gender',
  nomineeQualification: 'Nominee Qualification',
  nomineeProfession: 'Nominee Profession',
  nomineeReligion: 'Nominee Religion',
  nomineeCaste: 'Nominee Caste',
  nomineeReservation: 'Nominee Reservation',
  nomineeMobileNumber: 'Nominee Mobile Number',
  nomineeAadharDocument: 'Nominee AADHAR Document',
  nomineePhoto: 'Nominee Photo'
};

export default function Home() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  console.log('Form submission started');
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    
    // Clear previous validation errors
    setValidationErrors({});

    // Collect validation errors
    const errors: ValidationErrors = {};
    const formElements = form.elements;
    
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement | HTMLSelectElement;
      if (element.name && !element.checkValidity()) {
        let message = element.validationMessage;
        
        // Custom validation messages based on error type
        if (element.type === 'tel' && element.validity.patternMismatch) {
          message = 'Please enter a valid 10-digit phone number';
        } else if (element.validity.valueMissing) {
          message = `${fieldLabels[element.name]} is required`;
        } else if (element.type === 'file' && element.files?.length === 0) {
          message = `Please select a file for ${fieldLabels[element.name]}`;
        }
        
        errors[element.name] = message;

      }
    }

    // Update validation errors state
    setValidationErrors(errors);
    console.log('Validation errors:', errors);

    // Check file inputs before starting submission
    const memberAadharInput = document.getElementById('memberAadharDocument') as HTMLInputElement;
    const memberPhotoInput = document.getElementById('memberPhoto') as HTMLInputElement;
    // For nominee, check both possible file input ids for each field
    const nomineeAadharInputCamera = document.getElementById('nomineeAadharCamera') as HTMLInputElement;
    const nomineeAadharInputFile = document.getElementById('nomineeAadharFile') as HTMLInputElement;
    const nomineePhotoInputCamera = document.getElementById('nomineePhotoCamera') as HTMLInputElement;
    const nomineePhotoInputFile = document.getElementById('nomineePhotoFile') as HTMLInputElement;

    if (!memberAadharInput?.files?.length) {
      errors.memberAadharDocument = 'Member AADHAR Document is required';
    }
    if (!memberPhotoInput?.files?.length) {
      errors.memberPhoto = 'Member Photo is required';
    }
    // Nominee Aadhar: at least one of the two inputs must have a file
    if (!(nomineeAadharInputCamera?.files?.length || nomineeAadharInputFile?.files?.length)) {
      errors.nomineeAadharDocument = 'Nominee AADHAR Document is required';
    }
    // Nominee Photo: at least one of the two inputs must have a file
    if (!(nomineePhotoInputCamera?.files?.length || nomineePhotoInputFile?.files?.length)) {
      errors.nomineePhoto = 'Nominee Photo is required';
    }


    // Update validation errors with any file errors
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear any previous success message
    setSuccessMessage(null);

    if (Object.keys(errors).length === 0) {
  console.log('Form is valid, starting submission');
  setIsSubmitting(true);
      try {
        // Collect all non-file fields into a JSON object
        const formFields = [
          'constituency', 'mandalTown', 'panchayathiStreet', 'villageWard',
          'contactName1', 'phone1', 'contactName2', 'phone2',
          'memberFullName', 'memberGender', 'memberQualification', 'memberProfession',
          'memberReligion', 'memberCaste', 'memberReservation', 'memberMobileNumber',
          'nomineeFullName', 'nomineeGender', 'nomineeQualification', 'nomineeProfession',
          'nomineeReligion', 'nomineeCaste', 'nomineeReservation', 'nomineeMobileNumber'
        ];
        const formJsonObj: { [key: string]: string } = {};
        for (const field of formFields) {
          const el = form.querySelector(`[name="${field}"]`) as HTMLInputElement | HTMLSelectElement | null;
          if (el) {
            formJsonObj[field] = el.value;
          }
        }
        // Create FormData and append the JSON blob
        const formData = new FormData();
        const formJson = new Blob([JSON.stringify(formJsonObj)], { type: 'application/json' });
        formData.append('form', formJson);

        // Append files to form data
        if (memberAadharInput?.files?.[0]) formData.append('memberAadharDocument', memberAadharInput.files[0]);
        if (memberPhotoInput?.files?.[0]) formData.append('memberPhoto', memberPhotoInput.files[0]);
        // Nominee Aadhar: use first available file from either input
        if (nomineeAadharInputCamera?.files?.[0]) {
          formData.append('nomineeAadharDocument', nomineeAadharInputCamera.files[0]);
        } else if (nomineeAadharInputFile?.files?.[0]) {
          formData.append('nomineeAadharDocument', nomineeAadharInputFile.files[0]);
        }
        // Nominee Photo: use first available file from either input
        if (nomineePhotoInputCamera?.files?.[0]) {
          formData.append('nomineePhoto', nomineePhotoInputCamera.files[0]);
        } else if (nomineePhotoInputFile?.files?.[0]) {
          formData.append('nomineePhoto', nomineePhotoInputFile.files[0]);
        }

        // Submit the form with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
          console.log('Sending form data to server...');
          const response = await fetch('https://jsp-api.onrender.com/api/form', {
            method: 'POST',
            body: formData,
            signal: controller.signal,
            headers: {
              // Don't set Content-Type header - browser will set it with boundary for FormData
            }
          });

          clearTimeout(timeoutId);
          console.log('Server response status:', response.status);

          if (!response.ok) {
            let errorDetails = 'Unknown error';
            try {
              const errorData = await response.json();
              errorDetails = errorData.details || errorDetails;
            } catch (jsonErr) {
              // If not JSON, try to get text
              try {
                errorDetails = await response.text();
              } catch (textErr) {
                // ignore
              }
            }
            throw new Error(
              `HTTP error! status: ${response.status}, details: ${errorDetails}`
            );
          }
          let resultMessage = 'Form submitted successfully!';
          try {
            const result = await response.json();
            resultMessage = result.message || JSON.stringify(result);
          } catch (jsonErr) {
            // If not JSON, try to get text
            try {
              resultMessage = await response.text();
            } catch (textErr) {
              // ignore
            }
          }
          console.log('Form submitted successfully:', resultMessage);
          // Reset form after successful submission
          form.reset();
          setSuccessMessage(resultMessage);
          setShowSuccessModal(true);
        } catch (error) {
          console.error('Error submitting form:', error);
          // Optionally, display error in UI here
        } finally {
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Error preparing form data:', error);
        alert('Failed to prepare form data. Please try again.');
        setIsSubmitting(false);
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

          <form 
            onSubmit={(e) => {
              console.log('Form submit event triggered');
              handleSubmit(e);
            }} 
            noValidate 
            className="space-y-6">
            {/* Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl shadow p-4 border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Constituency</label>
                                <div className="space-y-1">
                  <input 
                    type="text" 
                    name="constituency"
                    className={`w-full rounded-lg border ${validationErrors.constituency ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500`}
                    placeholder="Enter constituency name"
                    required
                  />
                  {validationErrors.constituency && (
                    <p className="text-red-500 text-xs">{validationErrors.constituency}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Mandal/Town</label>
                                <select 
                  name="mandalTown"
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
                  name="panchayathiStreet"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                  placeholder="Enter panchayathi or street name" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Village/Ward</label>
                                <input 
                  type="text" 
                  name="villageWard"
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
                    name="contactName1"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500" 
                    placeholder="Enter contact name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone 1</label>
                  <div className="space-y-1">
                    <input 
                      type="tel" 
                      name="phone1"
                      className={`w-full rounded-lg border ${validationErrors.phone1 ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm focus:border-[#E31B23] focus:ring-[#E31B23] text-gray-900 placeholder-gray-500`}
                      placeholder="Enter phone number" 
                      pattern="[0-9]{10}"
                      required
                    />
                    {validationErrors.phone1 && (
                      <p className="text-red-500 text-xs">{validationErrors.phone1}</p>
                    )}
                  </div>
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
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('memberAadharDocument') as HTMLInputElement;
                              if (input) {
                                input.accept = "image/*";
                                input.setAttribute('capture', 'environment');
                                input.click();
                              }
                            }}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Take Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('memberAadharDocument') as HTMLInputElement;
                              if (input) {
                                input.accept = "image/*,.pdf";
                                input.removeAttribute('capture');
                                input.click();
                              }
                            }}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Choose File
                          </button>
                        </div>
                        <input
                          id="memberAadharDocument"
                          type="file"
                          name="memberAadharDocument"
                          accept="image/*,.pdf"
                          className="hidden"
                          required
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('memberAadharLabel')!.textContent = e.target.files[0].name;
                              setValidationErrors(prev => ({ ...prev, memberAadharDocument: '' }));
                            }
                          }}
                        />
                        <div>
                          <p id="memberAadharLabel" className={`text-sm ${validationErrors.memberAadharDocument ? 'text-red-500' : 'text-gray-600'} truncate`}>
                            No file chosen
                          </p>
                          {validationErrors.memberAadharDocument && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.memberAadharDocument}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('memberPhoto') as HTMLInputElement;
                              if (input) {
                                input.accept = "image/*";
                                input.setAttribute('capture', 'user');
                                input.click();
                              }
                            }}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Take Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('memberPhoto') as HTMLInputElement;
                              if (input) {
                                input.accept = "image/*";
                                input.removeAttribute('capture');
                                input.click();
                              }
                            }}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Choose File
                          </button>
                        </div>
                        <input
                          id="memberPhoto"
                          type="file"
                          name="memberPhoto"
                          accept="image/*"
                          className="hidden"
                          required
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('memberPhotoLabel')!.textContent = e.target.files[0].name;
                              setValidationErrors(prev => ({ ...prev, memberPhoto: '' }));
                            }
                          }}
                        />
                        <div>
                          <p id="memberPhotoLabel" className={`text-sm ${validationErrors.memberPhoto ? 'text-red-500' : 'text-gray-600'} truncate`}>
                            No file chosen
                          </p>
                          {validationErrors.memberPhoto && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.memberPhoto}</p>
                          )}
                        </div>
                      </div>
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
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => document.getElementById('nomineeAadharCamera')?.click()}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Take Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => document.getElementById('nomineeAadharFile')?.click()}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Choose File
                          </button>
                        </div>
                        <input
                          id="nomineeAadharCamera"
                          type="file"
                          name="nomineeAadharDocument"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('nomineeAadharLabel')!.textContent = e.target.files[0].name;
                            }
                          }}
                        />
                        <input
                          id="nomineeAadharFile"
                          type="file"
                          name="nomineeAadharDocument"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('nomineeAadharLabel')!.textContent = e.target.files[0].name;
                            }
                          }}
                        />
                        <p id="nomineeAadharLabel" className="text-sm text-gray-600 truncate">No file chosen</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Photo</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => document.getElementById('nomineePhotoCamera')?.click()}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Take Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => document.getElementById('nomineePhotoFile')?.click()}
                            className="flex-1 bg-[#E31B23]/10 text-[#E31B23] rounded-lg px-4 py-2 text-sm font-semibold border-2 border-[#E31B23] shadow hover:bg-[#E31B23]/20 transition"
                          >
                            Choose File
                          </button>
                        </div>
                        <input
                          id="nomineePhotoCamera"
                          type="file"
                          name="nomineePhoto"
                          accept="image/*"
                          capture="user"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('nomineePhotoLabel')!.textContent = e.target.files[0].name;
                            }
                          }}
                        />
                        <input
                          id="nomineePhotoFile"
                          type="file"
                          name="nomineePhoto"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              document.getElementById('nomineePhotoLabel')!.textContent = e.target.files[0].name;
                            }
                          }}
                        />
                        <p id="nomineePhotoLabel" className="text-sm text-gray-600 truncate">No file chosen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`${
                  isSubmitting 
                    ? 'bg-[#E31B23]/70 cursor-not-allowed' 
                    : 'bg-[#E31B23] hover:bg-[#E31B23]/90'
                } text-white font-bold py-2.5 px-8 rounded-lg shadow transition inline-flex items-center justify-center min-w-[120px]`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              <button 
                type="reset"
                disabled={isSubmitting}
                className={`${
                  isSubmitting 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } font-bold py-2.5 px-8 rounded-lg shadow transition`}
              >
                Reset
              </button>
            </div>

            {isSubmitting && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
                  <svg className="animate-spin h-10 w-10 text-[#E31B23]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-700 text-lg font-semibold">Submitting Form...</p>
                  <p className="text-gray-500 text-sm text-center">Please wait while we process your submission</p>
                </div>
              </div>
            )}
          </form>

          {showSuccessModal && successMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center border-2 border-green-500">
                <h2 className="text-xl font-bold text-green-700 mb-2">Success</h2>
                <p className="text-green-700 text-base mb-4">{successMessage}</p>
                <button
                  className="mt-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="text-xs text-center text-gray-500 mt-4">
            Use your phone camera to capture a photo (shoulder-up). Images will be automatically cropped and resized.
          </div>
        </div>
      </div>
    </main>
  );
}