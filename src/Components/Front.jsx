import Dog from "../Images/dog.jpg"
import { Link } from "react-router-dom"
import BackG from "../Images/background.jpg"
export default function FrontPage() {
    return (
        <>
            <div className=" ">

                <div className="grid md:grid-cols-2">


                    <div>
                        <img src={Dog} className="h-[]" />
                        <div className=" bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                            <h3 className=" text-white font-bold text-center text-2xl">
                                Wanna <span className="text-[#22C55E]">rent a pet</span> or  <span className="text-[#22C55E]">get paid</span> for renting pet.  </h3>

                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-5 m-5" >

                        <h1 className="text-center  text-2xl font-extrabold leading-none tracking-tight text-[#1F2937] md:text-5xl lg:text-6xl ">Get the right renter for your pet <br></br>or <br></br> Get paid for being good keeper</h1>
                        <div className="flex justify-center align-middle items-center gap-5" >
                            <Link to="/petOwner-register"><button className="y-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800">Pet Owner</button></Link>
                            <Link to="/petKeeper-register"><button className="y-2 rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-[#1F2937] focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800">Pet keeper</button></Link>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}