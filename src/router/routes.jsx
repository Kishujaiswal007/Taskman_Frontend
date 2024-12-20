import { Route, Routes,BrowserRouter } from "react-router-dom";
import Sign from "../pages/sign.jsx";
import Card from "../component/navbar.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Protected from "../component/protected.jsx";
import Tasklist from "../pages/tasklist.jsx";

const Routing=()=>{
return(
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Sign/>}></Route>
        <Route path="/navbar" element={<Card/>}></Route>
        <Route path="/task" element={<Protected><Dashboard/></Protected>}></Route> 
        <Route path="/tasklist" element={<Protected><Tasklist/></Protected>}></Route>
        </Routes>
    </BrowserRouter>
    </>
)
}
export default Routing;