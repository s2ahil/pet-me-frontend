import React, { useState } from 'react';
import { BASE_URL } from "../utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPetOwner() {
    const [formData, setFormData] = useState({
        location: '',
        mobileNo: '',
        petImage: '',
        duration: '',
        expectedRent: '',
        available: false,
        username: '',
        email: '',
        password: '',
        petDetails: '',
        imageOwner: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Send the form data to your backend API using fetch or Axios
        try {
            const response = await fetch(`${BASE_URL}/petOwner-register`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle a successful response (e.g., show a success message)
                toast.success('Registration successful', {
                    position: 'top-right',
                    autoClose: 3000, // Toast will automatically close after 3 seconds
                });
               
                console.log('Registration successful');
            } else {
                toast.error('Registration failed', {
                    position: 'top-right',
                    autoClose: 3000,
                  });
                // Handle errors (e.g., display an error message)
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <>
          <ToastContainer />
            <h1 className="mb-2 mt-0 text-3xl font-medium leading-tight text-primary text-center">Pet Owner</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className='section-1 grid  p-4'>
                            <div className="mb-4 bg-">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">
                                    Mobile No
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="mobileNo"
                                    type="text"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    placeholder="Mobile No"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petImage">
                                    Pet Image URL
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="petImage"
                                    type="text"
                                    name="petImage"
                                    value={formData.petImage}
                                    onChange={handleChange}
                                    placeholder="Pet Image URL"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                                    Duration
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="duration"
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="Duration"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expectedRent">
                                    Expected Rent
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="expectedRent"
                                    type="text"
                                    name="expectedRent"
                                    value={formData.expectedRent}
                                    onChange={handleChange}
                                    placeholder="Expected Rent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available">
                                    Available
                                </label>
                                <input
                                    className="form-checkbox h-5 w-5"
                                    id="available"
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petDetails">
                                    Pet Details
                                </label>
                                <textarea
                                    className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="petDetails"
                                    name="petDetails"
                                    value={formData.petDetails}
                                    onChange={handleChange}
                                    placeholder="Additional details about the pet"
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                        <div className="section-2 p-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                         
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageOwner">
                                    Image Owner URL
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="imageOwner"
                                    type="text"
                                    name="imageOwner"
                                    value={formData.imageOwner}
                                    onChange={handleChange}
                                    placeholder="Image Owner URL"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign Up
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
