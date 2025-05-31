import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateEmail } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const ActivationPage = () => {
    const [manualToken, setManualToken] = useState('');
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

    }, [isError, isSuccess, message]);

    const handleActivateClick = () => {
        if (manualToken) {
            dispatch(activateEmail(manualToken));
        } else {
            toast.error('Please enter an activation token.');
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-lg text-green-800 font-semibold mb-4">
                    Email Activation
                </h1>
                <div className="flex flex-col gap-3 w-80">
                    <input
                        type="text"
                        value={manualToken}
                        onChange={(e) => setManualToken(e.target.value)}
                        placeholder="Enter activation token"
                        className="border p-2 rounded-md"
                    />
                    <button
                        onClick={handleActivateClick}
                        className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Activating...' : 'Activate Account'}
                    </button>
                </div>

                {isLoading && <p className="mt-4">Activating your account...</p>}
                {isError && <p className="mt-4 text-red-500">Activation failed: {message}</p>}
                {isSuccess && <p className="mt-4 text-green-500">Activation successful: {message}</p>}
            </div>
        </>
    );
};

export default ActivationPage; 