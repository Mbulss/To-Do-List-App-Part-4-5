import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        personal_id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone_number: '',
    });

    const { personal_id, name, email, password, confirmPassword, address, phone_number } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            // toast.success('Signup successful! Please check your email for the activation link.');
            navigate('/user/activate', { replace: true });
        }

    }, [isError, isSuccess, message, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            personal_id,
            name,
            email,
            password,
            confirmPassword,
            address,
            phone_number,
        };

        dispatch(signup(userData));
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-lg text-green-800 font-semibold mb-4">
                    Create an account
                </h1>
                <form className="flex flex-col gap-3 w-80" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="personal_id"
                        value={personal_id}
                        onChange={onChange}
                        placeholder="Personal ID"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        placeholder="Confirm Password"
                        className="border p-2 rounded-md"
                        required
                    />
                     <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={onChange}
                        placeholder="Address"
                        className="border p-2 rounded-md"
                    />
                     <input
                        type="text"
                        name="phone_number"
                        value={phone_number}
                        onChange={onChange}
                        placeholder="Phone Number"
                        className="border p-2 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link to="/signin" className="text-green-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </>
    );
};

export default SignupPage; 