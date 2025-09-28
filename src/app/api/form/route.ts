import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.formData();
    
    // Log the form data for debugging
    console.log('Received form data:', Object.fromEntries(formData.entries()));

    // Extract files and form data
    const files: { [key: string]: File } = {};
    const formFields: { [key: string]: string } = {};

    // Separate files and form fields
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value;
      } else {
        formFields[key] = value.toString();
      }
    }

    // Create a new FormData object
    const newFormData = new FormData();

    // Add the form fields as a JSON blob named 'form'
    const formJson = new Blob([JSON.stringify(formFields)], {
      type: 'application/json'
    });
    newFormData.append('form', formJson);

    // Add files exactly as they are
    if (files.memberAadharDocument) newFormData.append('memberAadharDocument', files.memberAadharDocument);
    if (files.memberPhoto) newFormData.append('memberPhoto', files.memberPhoto);
    if (files.nomineeAadharDocument) newFormData.append('nomineeAadharDocument', files.nomineeAadharDocument);
    if (files.nomineePhoto) newFormData.append('nomineePhoto', files.nomineePhoto);

    console.log('Sending form data structure:', {
      fields: formFields,
      files: Object.fromEntries(
        Object.entries(files).map(([key, file]) => [key, { name: file.name, type: file.type, size: file.size }])
      )
    });

    // Make the request to the external API
    const response = await fetch('https://jsp-api.onrender.com/api/form', {
      method: 'POST',
      body: newFormData
    });

    // Log the response status and headers
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));

    // Get the response text first
    const responseText = await response.text();
    console.log('API Response:', responseText);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${responseText}`);
    }

    // Try to parse as JSON if possible, otherwise use text
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      // If it's not JSON, create a simple success response object
      result = {
        success: true,
        message: responseText,
        timestamp: new Date().toISOString()
      };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    // Log the detailed error
    console.error('Error in API route:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}