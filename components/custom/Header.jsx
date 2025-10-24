"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignButton from "./SignButton";
import { useUserDetail } from "@/app/provider";
import  Link  from "next/link";

function Header() {
  
  
  const { userDetail, setUserDetail } = useUserDetail();

  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />
      <div>
        {userDetail?.email ? (
          <div className="flex items-center gap-3">
            <Link href={'/dashboard'}>
            <Button>Dashboard</Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        ) : (
          <SignButton />
        )}
      </div>
    </div>
  );
}

export default Header;
