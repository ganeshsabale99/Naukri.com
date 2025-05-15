import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import LeftPane from "../register/LeftPane";
import style from "./OtpPage.module.css";
import {
  Heading,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendOtpAPI } from "../storeRegister/sendOtpAPI";

const OtpPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  // Get the email and name from the location state
  const { email: locationEmail, name: locationName } = location.state || {};

  useEffect(() => {
    if (locationEmail) {
      setEmail(locationEmail);
      setName(locationName);
    }
  }, [locationEmail, locationName]);

  useEffect(() => {
    if (timer > 0 && timerActive) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setTimerActive(false);
    }
  }, [timer, timerActive]);

  let navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);
  };

  const verifyOtp = () => {
    const otp = otpValues.join("");

    if (otp.length !== 4) {
      // Show error message or handle incomplete OTP
      return;
    }

    setLoading(true);

    fetch("http://localhost:8080/api/otp/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-otp": otp,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to verify OTP");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Handle success, navigate to next page or show success message
        navigate("/employement");
      })
      .catch((error) => {
        console.error(error);
        // Handle error, show error message
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendOtp = () => {
    setTimer(300); // Reset timer to 5 minutes
    setTimerActive(true);
    // Dispatch the sendOtpAPI action
    dispatch(sendOtpAPI(email, name));
  };

  return (
    <div>
      <NavbarRegister />
      <div className={style.otpPanes}>
        <LeftPane />

        <div className={style.otpRightPane}>
          <div className={style.otpRightPaneDiv}>
            <Heading size="xl" mb="10">
              Email Verification
            </Heading>

            <Text fontSize="md" mb="5">
              Please enter the OTP sent to email <br />
              <Text as="span" color="blue">
                {email}
              </Text>
            </Text>

            <PinInput size="lg" marginBottom="1rem">
              {otpValues.map((value, index) => (
                <PinInputField
                  key={index}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  placeholder="•"
                  style={{ marginRight: "5px" }}
                />
              ))}
            </PinInput>

            {/* <Text fontSize="md" mb="5">
              Didn't receive an OTP?{" "}
              <button
                onClick={resendOtp}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Resend
              </button>
            </Text> */}

            {timerActive ? (
              <Text fontSize="md" mb="5">
                Resend OTP in {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes
              </Text>
            ) : (
              <Text fontSize="md" mb="5">
                Didn't receive an OTP?{" "}
                <Button
                  onClick={resendOtp}
                  colorScheme="blue"
                  variant="link"
                  size="sm"
                >
                  Resend OTP
                </Button>
              </Text>
            )}

            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                borderRadius="20px"
                p="5"
                onClick={verifyOtp}
                isLoading={loading}
              >
                {loading ? <Spinner size="sm" /> : "Verify"}
              </Button>
              <Button colorScheme="blue" variant="link">
                Skip
              </Button>
            </HStack>
          </div>
          <FooterRegister />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
