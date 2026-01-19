"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { api } from "../../convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

import { useUserDetail } from "@/app/provider";

function GoogleLoginButton({ className }) {
  const createUser = useMutation(api.users.createUser);
  const { setUserDetail } = useUserDetail();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: "Bearer " + tokenResponse?.access_token },
        }
      );

      const user = userInfo.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Save to database
      const result = await createUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      })
      const userDetail = { ...user, _id: result.id ?? result };
      if (typeof window !== "undefined") {
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        setUserDetail(userDetail);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return <Button onClick={googleLogin} className={className}>Get Started</Button>;
}

export default function SignButton({ className }) {
  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <GoogleLoginButton className={className} />
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}
