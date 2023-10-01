import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';
import PetRentalProfile from '../reusable Components/ProfileRenter';

export default function PetOwnerDash() {
    const [showRequests, setShowRequests] = useState(false);
    const [bookingRequests, setBookingRequests] = useState([]);
    console.log("requests", showRequests)

    const [petRentalDetails, setPetRentalDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const toggleRequests = () => {
        setShowRequests(!showRequests);
    };
    console.log("booking req", bookingRequests)

    useEffect(() => {
        if (showRequests) {
            // Fetch booking requests from your server
            fetch(`${BASE_URL}/booking-requests`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('authToken'),
                    petOwnerId: localStorage.getItem('OwnerId'), // Send the authentication token in the request header
                },
                // body: JSON.stringify({
                // Pass the owner's email as the identifier
                //     petOwnerId: localStorage.getItem('OwnerId'), // Replace with the ID of the logged-in user
                //   }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {

                    setBookingRequests(data);
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error fetching booking requests:', error);
                });
        }
    }, [showRequests]);
    const acceptRequest = (requestId) => {
        // Send a request to your server to accept the booking request by requestId
        fetch(`${BASE_URL}/booking-request/${requestId}`, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem('authToken'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'accepted' }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Refresh the list of booking requests
                toggleRequests();
            })
            .catch((error) => {
                console.error('Error accepting booking request:', error);
            });
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {


            console.error('Authentication token is missing.');
            return;
        }
        // Fetch pet owner details from your server
        fetch(`${BASE_URL}/petRental-details`, {
            headers: {
                Authorization: authToken, // Send the authentication token in the request header
            },
        })
            // Replace with your API endpoint

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data, data.length);
                if (data.length > 0) {
                    setPetRentalDetails(data);
                }
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching pet owner details:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    console.log("Updated petRentalDetails:", petRentalDetails);

    return (
        <>
            <h1 className="text-3xl font-medium leading-tight text-primary text-center mb-4">
                Pet Owner Dashboard
            </h1>
            <button
                className="mt-2 ml-2 y-2 rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800"
                onClick={toggleRequests}
            >
                {showRequests ? 'Hide Requests' : 'Show Requests'}
            </button>

            {showRequests && (
                <div className="flex flex-wrap gap-3">
                    {bookingRequests ? (
                        bookingRequests.map((bookingRequest, index) => (
                            <div
                                className="relative flex w-[25rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-[10rem] p-5"
                                key={index}
                            >
                                {/* Display booking request details */}
                                <h4 className="font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Booking Request Details
                                </h4>
                                <p className="mt-1  font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                                    Requested By: {bookingRequest.petRenter.name} ({bookingRequest.petRenter.email})
                                </p>

                                {bookingRequest.status == "accepted" ? <p className='text-green-500'>already accepted</p> : <>
                                    {/* Add more details as needed
                                 <p>{console.log(bookingRequest)}</p> */}
                                    <button
                                        className="mt-2 y-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800"
                                        onClick={() => acceptRequest(bookingRequest._id)}
                                    >
                                        Accept
                                    </button>
                                    {/* <button
                                    className="mt-2 y-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800"
                                    onClick={() => rejectRequest(bookingRequest._id)}
                                >
                                    Reject
                                </button></> */}
                                </>

                                }

                            </div>
                        ))
                    ) : (
                        <p>Loading booking requests...</p>
                    )}
                </div>
            )}



            {loading ? (
                <p>Loading pet owner details...</p>
            ) : (
                <PetRentalProfile petRentalDetails={petRentalDetails} />
            )}
        </>
    );
}