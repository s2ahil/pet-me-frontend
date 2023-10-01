import React from 'react';

export default function PetRenterProfile({ petRentalDetails }) {
  return (


    <>


      <div className="flex flex-wrap gap-3 ">

        {
          petRentalDetails ? (petRentalDetails.map((petRentalDetails, index) => (

            <div className="relative flex w-[25rem] flex-col roundedue-300-white bg-clip-border text-gray-700 shadow-md h-[40rem] p-5 " key={index} >
              <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
                <img
                  src={petRentalDetails.image}
                  alt="ui/ux review check"
                  className="h-[25rem] w-full"
                />
              </div>
              <div className="p-0">
                {/* <img className="w-20 h-20 rounded-full m-2" src={petRentalDetails.image} alt="Rounded avatar"></img> */}
                <h4 className=" font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Pet keeper Details
                </h4>

                <p className="mt-1  font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  {petRentalDetails.location}
                </p>
                <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  <strong>Mobile No:</strong> {petRentalDetails.mobileNumber}
                </p>

                <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  <strong>Available:</strong>{" "}
                  <span className={petRentalDetails.available ? "text-green-500" : "text-red-500"}>
                    {petRentalDetails.available ? "Yes" : "No"}
                  </span>
                </p>

                <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  <strong>Name:</strong> {petRentalDetails.username}
                </p>
                <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  {petRentalDetails.email}
                </p>
                <p className="mt-1 block font-sans text-2 font-normal leading-relaxed text-gray-700 antialiased">
                  {petRentalDetails.renterInfo}
                </p>

                <p className=" mt-2 y-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800">contact the keeper via phone or email  to send confirmation email </p>

              </div>


            </div>

          ))) : (
            <p>Loading pet rental details...</p>
          )
        }






      </div>
    </>
  );
}
