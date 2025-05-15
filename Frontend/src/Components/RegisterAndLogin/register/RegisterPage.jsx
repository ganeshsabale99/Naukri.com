import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLeftAddon,
  InputGroup,
  Icon,
  Text,
  Flex,
  Checkbox,
  Button,
  Stack,
  Divider,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { FaSuitcase, FaBook } from "react-icons/fa";
// import { GiSchoolBag } from "react-icons/gi";
import { RiWhatsappFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import LeftPane from "./LeftPane";
import { useDispatch, useSelector } from "react-redux";
import { registerAPI } from "../storeRegister/actionsRegister";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const RegisterPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [regCreds, setRegCreds] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    mobile: "",
    description: "",
  });

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegCreds({
      ...regCreds,
      [name]: value,
      email: regCreds.username,
      description: regCreds.name,
    });

    // Update isEmailError state based on email field
    if (name === "username" && value.trim() === "") {
      setIsEmailError(true);
      setIsEmailValid(false);
    } else {
      setIsEmailError(false);
      setIsEmailValid(validateEmail(value));
    }
    if (name === "name" && value.trim() === "") {
      setIsNameError(true);
      console.log("isNameError:", true);
    } else {
      setIsNameError(false);
      console.log("isNameError:", false);
    }
  };

  const handleRegFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAPI(regCreds));
    // console.log(regCreds);
  };

  const { isReg } = useSelector((state) => state.register);

  useEffect(() => {
    if (isReg) {
      navigate("/otp", {
        state: { email: regCreds.username, name: regCreds.name },
      });
    }
  }, [navigate, isReg, regCreds]);

  return (
    <>
      <NavbarRegister />

      <div className={style.contentRegister}>
        <LeftPane />

        {/* Right pane */}
        <div>
          <div className={style.rightRegister}>
            <Box className={style.rightRegisterBox}>
              <Heading size="md" mb="5">
                Create your Naukri profile
                <Text fontSize="xs" color="#8b93af" marginTop="5px">
                  Search & apply to jobs from India's No.1 Job Site
                </Text>
              </Heading>

              <form action="submit" onSubmit={handleRegFormSubmit}>
                <FormControl className={style.rightRegisterForm}>
                  <div>
                    <FormControl isRequired isInvalid={isNameError}>
                      <FormLabel htmlFor="fullName">Full name</FormLabel>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="What is your name?"
                        name="name"
                        value={regCreds.name}
                        onChange={handleRegChange}
                        isRequired
                        borderRadius="10px"
                      />
                      {isNameError && (
                      <FormErrorMessage>
                        Full name is required
                      </FormErrorMessage>
                    )}
                    </FormControl>
                  </div>

                  <div>
                    <FormControl isRequired isInvalid={isEmailError}>
                      <FormLabel htmlFor="email">Email ID</FormLabel>
                      {/* <Input
                        id="email"
                        type="email"
                        placeholder="Tell us your Email ID"
                        name="username"
                        value={regCreds.username}
                        onChange={handleRegChange}
                        isRequired
                        borderRadius="10px"
                      /> */}
                      <InputGroup>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Tell us your Email ID"
                          name="username"
                          value={regCreds.username}
                          onChange={handleRegChange}
                          isRequired
                          borderRadius="10px"
                        />
                        {isEmailValid && (
                          <InputRightElement
                            color="green"
                            children={<Icon as={FaCheck} />}
                          />
                        )}
                      </InputGroup>
                      {!isEmailError ? (
                        <FormHelperText>
                          We'll send relevant jobs and updates to this email
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                  <div>
                    <FormControl isRequired>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="(Minimum of 6 characters)"
                        name="password"
                        value={regCreds.password}
                        onChange={handleRegChange}
                        isRequired
                        borderRadius="10px"
                      />
                      {/* <FormHelperText>
                      Minimum 6 characters required
                    </FormHelperText> */}
                    </FormControl>
                  </div>

                  <div>
                    <FormControl isRequired>
                      <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                      <InputGroup>
                        <InputLeftAddon
                          children="+91"
                          bg="white"
                          borderRight="none"
                          borderRadius="10px"
                        />
                        <Input
                          type="tel"
                          placeholder="Mobile Number"
                          name="mobile"
                          value={regCreds.mobile}
                          onChange={handleRegChange}
                          isRequired
                          borderLeft="none"
                          borderRadius="10px"
                        />
                      </InputGroup>
                      {/* <FormHelperText>
                      Recruiters will call you on this number
                    </FormHelperText> */}
                    </FormControl>
                  </div>

                  <div>
                    <FormControl isRequired>
                      <FormLabel htmlFor="workStatus">Work status</FormLabel>
                      <Flex gap="5">
                        <Flex
                          gap="2"
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="lg"
                          p="2"
                        >
                          <div>
                            <Icon as={FaSuitcase} color="blue" />
                          </div>
                          <div>
                            <Text fontSize="md" color="blue">
                              I'm Experienced
                            </Text>
                            <Text fontSize="sm" color="#8d8aad">
                              I have work experience
                            </Text>
                            <Text fontSize="sm" color="#8d8aad">
                              (excluding internships)
                            </Text>
                          </div>
                        </Flex>

                        <Flex
                          gap="2"
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="lg"
                          p="2"
                        >
                          <div>
                            <Icon as={FaBook} color="blue" />
                          </div>
                          <div>
                            <Text fontSize="md" color="blue">
                              I'm a Fresher
                            </Text>
                            <Text fontSize="sm" color="#8d8aad">
                              I am a student/ Haven't
                            </Text>
                            <Text fontSize="sm" color="#8d8aad">
                              worked after graduation
                            </Text>
                          </div>
                        </Flex>
                      </Flex>
                    </FormControl>
                  </div>

                  <div>
                    <FormLabel htmlFor="resume">Resume</FormLabel>

                    <div className={style.rightRegisterBoxInputDiv}>
                      <label
                        htmlFor="files"
                        className={style.rightRegisterBoxInputBtn}
                      >
                        Upload Resume
                      </label>
                      <input
                        id="files"
                        type="file"
                        className={style.rightRegisterBoxInput}
                      />
                      {/* </div> */}
                      <div>
                        <Text fontSize="xs" p="2" color="#8d8aad">
                          DOC, DOCx, PDF, RTF | Max: 2 MB
                        </Text>
                      </div>
                    </div>
                    <FormHelperText>
                      Recruiters give first preference to candidates who have a
                      resume
                    </FormHelperText>
                  </div>

                  <div>
                    <Checkbox
                      size="sm"
                      colorScheme="orange"
                      defaultChecked
                      color="#8d8aad"
                    >
                      Send me important updates on{" "}
                      <Icon as={RiWhatsappFill} color="green" /> WhatsApp
                    </Checkbox>
                  </div>

                  <div>
                    <Text color="#8d8aad" fontFamily="sm">
                      By clicking Register, you agree to the{" "}
                      <span className={style.endSpan}>
                        Terms and Conditions
                      </span>{" "}
                      & <span className={style.endSpan}>Privacy Policy</span> of
                      Naukri.com
                    </Text>
                  </div>

                  <div>
                    <Button
                      colorScheme="blue"
                      borderRadius="20"
                      type="submit"
                      // onClick={routeChange}
                    >
                      Register Now
                    </Button>
                  </div>
                </FormControl>
              </form>
            </Box>

            <Box>
              <Stack direction="row" h="250px" className={style.orGoogle}>
                <Divider
                  orientation="vertical"
                  className={style.orGoogleDivider}
                />
                <div className={style.orGoogleDividerOR}>OR</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text>Continue with</Text>
                  <Button
                    leftIcon={<FcGoogle />}
                    colorScheme="blue"
                    variant="outline"
                    borderRadius="20px"
                  >
                    Google
                  </Button>
                </div>
              </Stack>
            </Box>
          </div>
          <FooterRegister />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

//Register
