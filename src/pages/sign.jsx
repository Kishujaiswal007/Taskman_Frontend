import axios from 'axios';
import { useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
const api=import.meta.env.VITE_BACKEND_API;

const Sign = () => {
  const [message,setmessage]=useState("");
  const navigate=useNavigate();
  const [formdata,setformdata]=useState({
    email:'',
    password:'',
  })
  const handleRegister=async(e)=>{
    e.preventDefault();
   try {
     const response=await axios.post("https://taskman-backend-ii9p.onrender.com/register",formdata);
 
    if(response.status===200){setmessage("user Registered Successfully")}
    else{
     {setmessage("user Registered Successfully")};
    }
   } catch (error) {
     setmessage(error.response.data.message);
    alert("An error occurred while registered. Please try again.");
   }
  }
  const handleSign=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post("https://taskman-backend-ii9p.onrender.com/login",formdata);
      if (response.status == 200) {
        const { accessToken, refreshToken} = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        navigate('/task');
  
    }
    else{
      console.log("error in signin")
      setmessage(response.data.message);
      alert(response.data.message);
    }
    } catch (error) {
      console.log(error);
      setmessage(error.response.data.message);
    alert("An error occurred while signing in. Please try again.");
    }
}
  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

    return (
      <>
      <div className="flex justify-center items-center ">
        <div className="w-[350px] h-[500px] bg-white shadow-md rounded-[10px] p-6 ">
          <p className="text-center font-sans text-lg  font-extrabold my-4 mb-6">
            Welcome to todo App
          </p>
  
          <form className="flex flex-col gap-4 mb-4">
            <input
            name='email'
            value={formdata.email}onChange={handlechange}
              type="email"
              placeholder="Email"
              className="rounded-[20px] border border-gray-300 outline-none px-4 py-3"
            />
            <input
            name='password'
            value={formdata.password}
            onChange={handlechange}
              type="password"
              placeholder="Password"
              className="rounded-[20px] border border-gray-300 outline-none px-4 py-3"
            />
            <p className="text-end text-gray-500 underline cursor-pointer text-xs font-bold hover:text-black">
              Forgot Password?
            </p>
            <button
              onClick={handleSign}
              className="bg-teal-500 text-white rounded-[20px] px-4 py-3 font-bold shadow-md hover:shadow-none active:shadow-none"
            >
              Log in
            </button>

            <p className="text-center text-gray-500 text-xs">
            Don't have an account?{" "}
            <button onClick={handleRegister} className="text-teal-500 underline font-extrabold cursor-pointer ml-1">
              Register Here
            </button>
          </p>
          <p className='text-red-800 font-semibold ml-10'>
            {message}
          </p>
          </form>
  
    
  
        </div>
        </div>
      </>
    );
  };
  
  export default Sign;
  