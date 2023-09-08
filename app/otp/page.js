"use client";
import { useState } from "react";
import OtpInput from 'react-otp-input';

const EmailVerification = () => {
  const [otp, setOtp] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verifyResponse = await fetch("api/otp", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
    const jsonVerifyResponse = await verifyResponse.json();
    if (jsonVerifyResponse["status"]) {
      window.location.href = "/login";
    } else {
      setIsVerified(jsonVerifyResponse["status"]);
      setErrorMessage(jsonVerifyResponse["message"]);
    }
  };
  return (
    <div className="">
      <div className="">
        <div className="h-screen">
          <form onSubmit={handleSubmit}>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl w-1/2 mx-auto py-32">
              <div className="flex justify-center">

                <OtpInput
                    inputStyle=" bg-transparent border h-16 text-center otp-input outline-none rounded-xl border border-gray-200"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input className="bg-transparent" {...props} />}
                />
              </div>
              <div className="flex justify-center">
                  <button type="submit" className="w-64 text-white bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 mt-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
              </div>
            </div>
            {isVerified === false ? (
              <div className="text-danger">{errorMessage}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
