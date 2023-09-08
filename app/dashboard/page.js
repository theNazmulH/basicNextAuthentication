"use client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    (async () => {
      const result = await fetch("api/dashboard");
      const userResult = await result.json();
      setUserDetails(userResult.userDetails);
    })();
  }, []);

  return (
    <div className="h-screen">
      <h2 className="text-xl">Welcome, {userDetails ? userDetails.name : ""} to Dashboard.</h2>
      <p>Your email <i>{userDetails ? userDetails.email : ""}</i> is your username</p>
<br/>
<br/>
        <h3 className="text-2xl">মডিউল ১৪ এর এসাইনমেন্ট (Next.js Back-End & Securities)</h3>
        <br/>
        <hr/>
        <br/>
        <p>

            <strong className="text-green-500">Assignment Title:</strong>
            <br/>
            Authentication, Token Handling, and Email Integration in a Next.js Application
        </p>
        <br/>
        <p>
            <strong className="text-green-500">Assignment Description:</strong>
            <br/>
            You are tasked with building a secure authentication system for a Next.js application. Additionally, you need to implement token handling, email verification, and redirection for unauthorised users. Below are the tasks you need to accomplish:


        </p>
<br/>
        <h3 className="text-xl text-green-500"><strong>Assessment Criteria:</strong></h3>
        <ul className="flex gap-2 flex-col pl-7 mt-2">
            <li className="list-decimal">Proper implementation of user registration and email verification.</li>
            <li className="list-decimal">Setting tokens in headers and using middleware for authentication.</li>
            <li className="list-decimal">Correct encoding and decoding of tokens.</li>
            <li className="list-decimal">Implementing redirection for unauthorized users.</li>
            <li className="list-decimal">Integration of Nodemailer for email functionality.</li>
            <li className="list-decimal">Clarity and organization of code.</li>
            <li className="list-decimal">Explanation of the code and its functionality.</li>
        </ul>
    </div>
  );
};

export default Dashboard;
