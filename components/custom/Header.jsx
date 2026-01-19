"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignButton from "./SignButton";
import { useUserDetail } from "@/app/provider";
import Link from "next/link";

import { googleLogout } from "@react-oauth/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

function Header() {
  const { userDetail, setUserDetail } = useUserDetail();

  const onLogOut = () => {
    googleLogout();
    localStorage.clear();
    setUserDetail(null);
    window.location.href = "/";
  }

  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={150} height={100} className="hover:opacity-90 transition-opacity" />
      </Link>
      <div>
        {userDetail?.email ? (
          <div className="flex items-center gap-3">
            <Link href={'/dashboard'}>
              <Button variant="ghost" className="hidden md:inline-flex">Dashboard</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                  <Image
                    src={userDetail?.picture}
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-200"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {userDetail.name && <p className="font-medium text-sm">{userDetail.name}</p>}
                    {userDetail.email && (
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {userDetail.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={onLogOut}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <SignButton />
        )}
      </div>
    </div>
  );
}

export default Header;
