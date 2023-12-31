"use client";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFailed, setIsFailed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const jsonLoginResponse = await loginResponse.json();

    if (jsonLoginResponse["status"]) {
      window.location.href = "/dashboard";
    } else {
      setIsFailed(jsonLoginResponse["status"]);
      setErrorMessage(jsonLoginResponse["message"]);
      setErrorType(jsonLoginResponse["type"]);
    }
  };

  let errorTypeResponse = "";
  if(errorType==="not-verified"){
    errorTypeResponse= <Link className="bg-green-500 py-2 px-10 block rounded mt-4 text-center" href="/otp">Verify OTP</Link>;
  }
  else if(errorType==="not-registered"){
    errorTypeResponse= <Link className="bg-green-500 py-2 px-10 block rounded mt-4 text-center" href="/registration">Register</Link>;
  }
  else if(errorType==="not-matched"){
    errorTypeResponse="";
  }

  return (
   <>
     <section className="bg-gray-50 dark:bg-gray-900">
       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               Sign in to your account
             </h1>
             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
               <div>
                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                 <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                        value={formData.email}
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                        }}
                 />
               </div>
               <div>
                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                 <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                        value={formData.password}
                        onChange={(e) => {
                          handleChange("password", e.target.value);
                        }}
                 />
               </div>

               <p>
                 {isFailed === false ? (
                     <div>
                       <i  className="text-red-600">
                       {errorMessage}
                       </i>
                       <br/>

                       <strong>
                         {errorTypeResponse}
                       </strong>

                     </div>
                 ) : (
                     ""
                 )}
               </p>
               <button type="submit" className="w-full text-white bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                 Don’t have an account yet? <Link href="/registration" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
               </p>
             </form>
           </div>
         </div>
       </div>
     </section>
   </>
  );
};

export default Login;
