"use client";

import { useUserDetail } from '@/app/provider';
import EmailTemplateList from '@/components/custom/EmailTemplateList';
import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import React from 'react';

export default function Dashboard() {
  const { userDetail, setUserDetail } = useUserDetail();

  return (
    <div>
      {/*<Header /> */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-3xl">Hello, {userDetail?.name}</h2>
          <Link href={'/dashboard/create'}>
            <Button className="font-medium gap-2" variant="default" size="default">
              <Plus className='w-4 h-4' /> Create New
            </Button>
          </Link>
        </div>
        <EmailTemplateList />
      </div>
    </div>
  );
}
