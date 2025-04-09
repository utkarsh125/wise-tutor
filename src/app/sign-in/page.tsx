"use client"

import { useSignIn, useSignUp } from "@clerk/nextjs"

import ParticlesBackground from "@/components/SignInParticlesBackground"
import React from "react"
import { motion } from "framer-motion"

const SignIn: React.FC = () => {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const signUpWithGoogle = async () => {
   try {
      // Try signing in first (for existing users)
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      // If user doesn't exist, try signing them up
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FBE4D6]">
      <ParticlesBackground
        particleCount={2000}
        noiseIntensity={0.003}
        particleSize={{ min: 0.5, max: 2 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col gap-4 h-full items-center justify-center z-10"
      >
        <h1 className="text-4xl font-semibold">Login via OAuth 2.0</h1>
        <p>
            Enrich your students with what matters over what is trending.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={signUpWithGoogle}
          className="w-64 bg-[#261FB3] text-[#FBE4D6] py-3 px-6 text-lg rounded cursor-pointer focus:outline-none"
        >
          Sign in with Google
        </motion.button>
        <div id="clerk-captcha" />
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn("facebook")}
          className="w-64 bg-[#161179] text-[#FBE4D6] py-3 px-6 text-lg rounded cursor-pointer focus:outline-none"
        >
          Sign in with Facebook
        </motion.button> */}
      </motion.div>
    </div>
  )
}

export default SignIn
