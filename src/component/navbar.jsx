import axios from "axios";
import {useNavigate} from "react-router-dom"
const api=import.meta.env.VITE_BACKEND_API;
const Card = () => {
  const navigate=useNavigate();
  const handleLogout=async(e)=>{
    e.preventDefault();
    const response = await axios.get("https://taskman-backend-8lr2.onrender.com/logout",{
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
      },
      withCredentials:true
  });
    navigate("/");
  }

  const handletask=(e)=>{
    e.preventDefault();
    navigate("/tasklist");
  }
  const handledashboard=(e)=>{
    e.preventDefault();
    navigate("/task");
  }
    return (
      <>
        <div className="card w-72 p-5 shadow-md shadow-purple-200/50 rounded-md flex justify-between">
          <div className="flex">
            <ul className="flex gap-2">
              <li className="flex-center cursor-pointer p-16-semibold">
                <button
                onClick={handledashboard}
                  className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                >
                  <svg
                    stroke="#000000"
                    className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                    id="dashboard-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000000"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                      <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                      <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                    </g>
                  </svg>
                  Dashboard
                </button>
              </li>
              <li className="flex-center cursor-pointer p-16-semibold">
                <button
                onClick={handletask}
                  className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="size-6"
                  >
                    <path
                      className="group-focus:fill-white"
                      fill="#000"
                      d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608Z"
                    />
                  </svg>
                  TaskList
                </button>
              </li>
            </ul>
          </div>
  
         
          <div>
            <button
            onClick={handleLogout}
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Card;
  