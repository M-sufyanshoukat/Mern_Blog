import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailVerificationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const requestPasswordReset = async () => {
      try {
        const response = await axios.post('/reset-password-request', {
          email: 'user@example.com', // Pass the user's email here
        });

        // Handle successful response
        console.log(response.data); // Log the response from the server

        // Update state
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error('Error:', error.response.data); // Log the error response from the server
        setError('Error requesting password reset');
        setLoading(false);
      }
    };

    // Call the function to make the request when the component mounts
    requestPasswordReset();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Password reset email sent successfully</p>
      )}
    </div>
  );
};

export default EmailVerificationScreen;
