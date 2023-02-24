import React, { createContext, useReducer, useEffect, useContext } from "react";
import { BrowserRouter, Route, useNavigate, Routes } from "react-router-dom";
import AllBoocamps from "./modules/AllBoocamps";
import SingleBootcamp from "./modules/SingleBootcamp";
import CreateBootcamp from "./modules/CreateBootcamp";
import UpdateBootcamp from "./modules/UpdateBootcamp";
import "./assets/css/global.css";
import "./assets/css/bootstrap.css";
import LandingPage from "./modules/LandingPage";
import ManageBootcamp from "./modules/ManageBootcamp";
import Login from "./modules/Login";
import Register from "./modules/Register";
import { userReducer, initialState } from "./reducers/index";
import Navbar from "./components/NavBar/NavBar";
import ManageCourse from "./modules/ManageCourse";
import CreateCourse from "./modules/CreateCourse";
import UpdateCourse from "./modules/UpdateCourse";
import ManageReviews from "./modules/ManageReviews";
import CreateReview from "./modules/CreateReview";
import UpdateReview from "./modules/UpdateReview";
import AllReviews from "./modules/AllReviews";
import ResetPassword from "./modules/ResetPassword";
import UpdatePassword from "./modules/UpdatePassword";
import ManageAccount from "./modules/ManageAccount";

export const UserContext = createContext();

const RoutingComponents = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });

      const url = window.location.pathname.split("/");

      if (url[url.length - 1] === "login") {
        navigate("/");
      }
      if (url[url.length - 1] === "register") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route path="/updatePassword" element={<UpdatePassword />} />

        <Route path="/manageAccount" element={<ManageAccount />} />

        <Route path="/bootcamps" element={<AllBoocamps />} />

        <Route path="/bootcamps/:id" element={<SingleBootcamp />} />

        <Route path="/createBootcamp" element={<CreateBootcamp />} />

        <Route path="/updateBootcamp" element={<UpdateBootcamp />} />

        <Route path="/manageBootcamp" element={<ManageBootcamp />} />

        <Route path="/manageCourse" element={<ManageCourse />} />

        <Route path="/createCourse" element={<CreateCourse />} />

        <Route path="/updateCourse" element={<UpdateCourse />} />

        <Route path="/manageReview" element={<ManageReviews/> } />
     
      <Route  path="/reviews" element={<AllReviews/>}/>
     

      <Route exact path="/createReview" element={<CreateReview/>} />
   

      <Route exact path="/updateReview"  element={<UpdateReview/>} />
 
    </Routes>
    </React.Fragment>
  );
};


const App = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <RoutingComponents />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
