import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {
  const[emailId, setEmailId] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[isLogin, setIsLogin] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin=async()=>{
    try {
      const res = await axios.post(
        BASE_URL+"/signin",
        {
        emailId,
        password
      },
    {withCredentials:true}
  )      
  dispatch(addUser(res.data))
  return navigate("/feed")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong")
      
    }

  }

  const handleSignUp = async()=>{
    try {
      const res = await axios.post( BASE_URL+"/signup",{emailId, password, firstName, lastName},{withCredentials:true})
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch (error) {
      console.log(error?.response?.data || "Something went wrong") 
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
          <h2 className="card-title">{isLogin?"Login":"SignUp"}</h2>

          <div className="space-y-4">
         {
          !isLogin && <> <label className="form-control w-full max-w-xs my-4">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-4">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          </>
          }
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
              <span className="label-text" type="password">Password</span>
            </div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          </div>

          <p className="text-red-500">{error}</p>
          <div className="card-actions display-flex justify-center">
            <button className="btn btn-primary py-2" onClick={isLogin?handleLogin:handleSignUp}>{isLogin?"Login":"SingUp"}</button>
          </div>
          <p className="cursor-pointer py-2" onClick={()=>setIsLogin((value)=>!value)}>{isLogin?"New User? Click Here to SignUp":"Have an account? Click here to Login"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
