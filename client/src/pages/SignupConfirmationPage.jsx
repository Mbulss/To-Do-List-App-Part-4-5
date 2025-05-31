import React from 'react';

const SignupConfirmationPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                <h1 className="text-2xl font-bold text-green-800 mb-4">Signup Successful!</h1>
                <p className="text-lg text-gray-700">
                    Thank you for signing up. Please check your email inbox for an activation link.
                </p>
                <p className="text-md text-gray-600 mt-2">
                    Click the link in the email to activate your account and log in.
                </p>
            </div>
        </>
    );
};

export default SignupConfirmationPage; 