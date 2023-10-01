import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { Route,useNavigate} from 'react-router-dom';
import { BASE_URL } from '../utils'; // Replace with your API URL


export default function PetOwnerLogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Send a POST request to your login endpoint
            const response = await fetch(`${BASE_URL}/loginOwner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token, userId } = await response.json();
                console.log(token);
                console.log("userId", userId);
                // Save the token in local storage or a secure place (e.g., cookies)
                localStorage.setItem('authToken', token);
                localStorage.setItem('OwnerId',userId);
                // Show a success toast
                toast.success('Login successful!', {
                    position: 'top-right',
                    autoClose: 2000, // Time in milliseconds, set as you prefer
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                console.log(response)
                
            navigate("/petOwner-Dash")
              
            } else {
                console.error('Login failed');

                // Show an error toast
                toast.error('Login failed. Please check your credentials.', {
                    position: 'top-right',
                    autoClose: 5000, // Time in milliseconds, set as you prefer
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Error during login:', error);

            // Show an error toast for unexpected errors
            toast.error('An unexpected error occurred. Please try again later.', {
                position: 'top-right',
                autoClose: 5000, // Time in milliseconds, set as you prefer
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Pet Owner Login</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email:
                </label>
                <input
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password:
                </label>
                <input
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={handleLogin}
            >
                Login
            </button>

            {/* Add the ToastContainer component to your component */}
            <ToastContainer />
        </div>
    )
}