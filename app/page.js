import Image from 'next/image'

export default function Home() {
  return (
   <div className="h-screen">
     <h3 className="text-2xl">মডিউল ১৪ এর এসাইনমেন্ট (Next.js Back-End & Securities)</h3>
       <br/>
       <hr/>
       <br/>
       <p>

           <strong>Assignment Title:</strong> Authentication, Token Handling, and Email Integration in a Next.js Application
       </p>
       <br/>
       <p>
           <strong>Assignment Description:</strong> You are tasked with building a secure authentication system for a Next.js application. Additionally, you need to implement token handling, email verification, and redirection for unauthorised users. Below are the tasks you need to accomplish:


       </p>
       <br/>
       <div>

           <strong>User Registration and Email Verification:</strong>
           <br/>
            Implement a user registration system where users provide their email addresses and passwords.
<br/>
           Upon registration, generate a unique verification token for each user.

           <br/>

           Send an email to the user's provided email address containing a link with the verification token. The email should be sent using Nodemailer.
           <br/>
           <br/>

           <strong>Setting Tokens in Headers:</strong>
           <br/>
           Develop a middleware that sets an authentication token in the HTTP headers of requests made by authenticated users. This token should be used to validate user identities.
           <br/>
           <br/>
           <strong>Passing Token with Middleware:</strong>
           <br/>
           Create middleware that intercepts incoming requests to protected routes.
           <br/>

           Verify the presence and validity of the authentication token in the request headers.
           <br/>

           If the token is valid, allow the request to proceed; otherwise, deny access and redirect the user to a login page or display an appropriate error message.
           <br/>
           <br/>

           <strong>Encoding and Decoding Tokens:</strong>

           <br/>
           Implement functions to encode and decode tokens. The encoding function should create a token with user data, and the decoding function should verify and extract user information from a token.

           <br/>
           <br/>

           <strong>Redirect to Homepage if Not Logged In:</strong>
           <br/>
           Set up a mechanism to redirect users to the homepage when they attempt to access protected routes without a valid token or if they haven't completed email verification.

           <br/>
           Unauthorised users should be redirected to the login or registration page.

           <br/>
           Your task is to design, develop, and document these features in a Next.js application, ensuring proper user authentication, token handling, email verification, and redirection.


       </div>
   </div>
  )
}
