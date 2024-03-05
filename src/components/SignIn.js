import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../reducer";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";
function SignIn() {
  const emailRef = useRef();
  const passRef = useRef();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user.providerData[0];
    } catch (error) {
      setError("Wrong Email or Password !");
      setAdding(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const register = async () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    if (email.length == 0 || pass.length == 0) return;
    setAdding(true);
    let user = await signIn(email, pass);
    setAdding(false);
    dispatch(setUser(user));
    if (user) navigate("/");
  };

  return (
    <div
      className="py-4 w-screen scrollbar-hide  h-screen
    px-4 md:px-16 gap-4 flex justify-center items-center"
    >
      <div
        className="w-[600px] h-[300px] bg-gradient-to-b shadow-lg shadow-gray-300/90
        from-[#232f3e] to-[#131921] rounded-md p-4"
      >
        <p className="text-center text-white text-[20px] font-black tracking-wide py-4">
          SignIn
        </p>
        <div className="flex justify-center items-center w-full flex-col gap-6">
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter The Email"
            className="px-2 py-2 w-full outline-none rounded-md   shadow-sm shadow-gray-500"
          />
          <input
            type="password"
            ref={passRef}
            placeholder="Enter The Password"
            className="px-2 py-2 w-full outline-none rounded-md  shadow-sm shadow-gray-500 "
          />
          {error?.length > 0 ? (
            <div className="text-red-500 -my-4">{error}</div>
          ) : null}
          {adding && (
            <div className="bg-orange-600 px-4 py-2 rounded-md my-4 flex justify-center items-center">
              <ThreeDots height="24" width="152" radius="1" color="#FFFFFF" />
            </div>
          )}
          {!adding && (
            <motion.button
              onClick={register}
              whileTap={{ scale: 0.96 }}
              className="bg-orange-600 px-4 py-2 rounded-md
         text-white my-4"
            >
              Log In
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
