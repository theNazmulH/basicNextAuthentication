"use client";
import { useState } from "react";
import Link from "next/link";

const GenerateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const initialFormData = {
  id: Date.now(),
  name: '',
  email: '',
  password: '',
  verificationCode: GenerateOTP(),
  isVerified: false,
};

const Registration = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, id: Date.now(), verificationCode: GenerateOTP() };

    localStorage.setItem('userInfo', JSON.stringify(updatedFormData));

    const regResponse = await fetch('api/registration', {
      method: 'POST',
      body: JSON.stringify(updatedFormData),
    });

    const jsonRegResponse = await regResponse.json();

    if (jsonRegResponse.status) {
      const mailInfo = {
        email: updatedFormData.email,
        mailSubject: 'Test Email Verification',
        mailText: `Your OTP for email verification is ${updatedFormData.verificationCode}`,
      };

      window.location.href = '/otp';

      await fetch('api/send-email', {
        method: 'POST',
        body: JSON.stringify(mailInfo),
      });
    }
  };
  return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text"
                         id="name"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Your Name" required=""
                         value={formData.name}
                         onChange={(e) => {
                           handleChange("name", e.target.value);
                         }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"
                         id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                         value={formData.email}
                         onChange={(e) => {
                           handleChange("email", e.target.value);
                         }}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password"
                         id="password" placeholder="••••••••"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                         value={formData.password}
                         onChange={(e) => {
                           handleChange("password", e.target.value);
                         }}
                  />
                </div>

                <button type="submit" className="w-full text-white bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet? <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Registration;
