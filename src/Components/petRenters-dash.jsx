import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import PetOwnerProfile from "../reusable Components/ProfilePetOwner";

export default function PetRenterDash() {
  const [showRequests, setShowRequests] = useState(false);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [petOwnerDetails, setPetOwnerDetails] = useState(null);

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };
  useEffect(() => {
    if (showRequests) {
      // Fetch booking requests from your server
      fetch(`${BASE_URL}/booking-requests-see-keeper`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('authToken'),
          petKeeperId: localStorage.getItem('keeperId'), // Send the authentication token in the request header
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


  useEffect(() => {


    // Fetch pet owner details from your server with the authentication token
    const authToken = localStorage.getItem('authToken');
    // console.log("renter dash token",authToken)
    if (!authToken) {
      console.error('Authentication token is missing.');
      return;
    }

    fetch(`${BASE_URL}/petOwner-details`, {
      headers: {
        Authorization: authToken, // Send the authentication token in the request header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data is an array of pet owner details
        // You can modify this part based on your API response structure
        if (data.length > 0) {
          setPetOwnerDetails(data); // Assuming you want to display the first pet owner's details
        }
      })
      .catch((error) => {
        console.error('Error fetching pet owner details:', error);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-medium leading-tight text-primary text-center mb-4">
        Pet keeper dashboard
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
                                className="relative flex w-[25rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-[10rem] p-5 m-3"
                                key={index}
                            >
                                {/* Display booking request details */}
                                <h4 className="font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Booking Request Details
                                </h4>
                                <p className="mt-1  font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                                    Requested By: {bookingRequest.petOwner.name} ({bookingRequest.petOwner.email})
                                </p>

                                {bookingRequest.status == "accepted" ? <p className="text-green-500">already accepted</p> : <p className="text-red-500">
                                 pending
                                </p>

                                }

                            </div>
                        ))
                    ) : (
                        <p>Loading booking requests...</p>
                    )}
                </div>
            )}

      <PetOwnerProfile petOwnerDetails={petOwnerDetails}></PetOwnerProfile>
    </>
  );
}
