import React, { useState } from "react";
import axios from "axios";

const Login = () => {

  const[emailId, setEmailId] = useState(" ");
  const[password, setPassword] = useState(" ");

  const handleSubmit=async()=>{
    try {
      const res = await axios.post("http://localhost:3000/signin",{
        emailId,
        password
      },
    {withCredentials:true}
  )      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    //     <div role="alert" className="alert alert-success">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6 shrink-0 stroke-current"
    //       fill="none"
    //       viewBox="0 0 24 24">
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //     </svg>
    //     <span>This is the login Page!</span>
    //   </div>
    <div className="flex items-center justify-center p-4">
      <div className="card bg-base-300 w-96 shadow-xl " data-theme="dark">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>

          <div className="space-y-4">
          <label className="form-control w-full max-w-xs my-4">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-4">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          </div>


          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
