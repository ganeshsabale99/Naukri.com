import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../src/Components/RegisterAndLogin/login/LoginPage";
import RegisterPage from "../src/Components/RegisterAndLogin/register/RegisterPage";
import OtpPage from "../src/Components/RegisterAndLogin/otp/OtpPage";
import Employement from "../src/Components/RegisterAndLogin/employement/Employement";
import Education from "../src/Components/RegisterAndLogin/education/Education";
import Navbar from "./Components/LandingPage/Navbar";
import Body from "./Components/HomePage/HomePageBody/Body";
import RequiredAuth from "./ReqAuth/RequiredAuth";

function App() {
	return (
		<div className="App">
			<Routes>
				
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/otp" element={<OtpPage />} />
				<Route path="/employement" element={<Employement />} />
				<Route path="/education" element={<Education />} />				
				<Route path="/" element={<Navbar />}></Route>
				<Route
					path="/home"
					element={
						<RequiredAuth>
							<Body />
						</RequiredAuth>
					}
				/>
				
			</Routes>
		</div>
	);
}

export default App;
