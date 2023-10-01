import React, { useState } from "react";
import { BASE_URL } from "../utils";

export default function PetOwnerProfile({ petOwnerDetails }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const sendBookingRequest = (ownerId) => {
    // Make a POST request to your server to create a booking request
    fetch(`${BASE_URL}/booking-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petOwnerId: ownerId, // Pass the owner's unique identifier
        petRenterId: localStorage.getItem('keeperId'), // Replace with the ID of the logged-in user
      }),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Handle the response, e.g., show a success message
        setBookingSuccess(true);
        console.log('Booking request sent successfully');
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error sending booking request:", error);
      });
  };

  return (
    <div className="flex flex-wrap gap-3 ">
      {petOwnerDetails ? (
        petOwnerDetails.map((owner, index) => (
          <div className="relative flex w-[25rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-[40rem] p-5 " key={index} >
            <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
              <img
                src={owner.petImage}
                alt="Pet"
                className="h-[25rem] w-full"
              />
            </div>
            <div className="p-0">
              <img className="w-20 h-20 rounded-full m-2" src={owner.imageOwner} alt="Rounded avatar" />
              <h4 className=" font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Pet Owner Details
              </h4>
              <p className="mt-1 font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Location:</strong> {owner.location}
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Mobile No:</strong> {owner.mobileNo}
              </p>

              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Available:</strong>{" "}
                <span className={owner.available ? "text-green-500" : "text-red-500"}>
                  {owner.available ? "Yes" : "No"}
                </span>
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Duration:</strong> {owner.duration}
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Expected Rent:</strong> {owner.expectedRent}
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Name:</strong> {owner.username}
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Email:</strong> {owner.email}
              </p>
              <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                <strong>Pet Details:</strong> {owner.petDetails}
              </p>

              <button onClick={() => sendBookingRequest(owner._id)} className="mt-2 y-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800">Book Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading pet owner details...</p>
      )}
    </div>
  );
}
