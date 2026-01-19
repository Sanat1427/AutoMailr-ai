import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useConvex, useMutation } from 'convex/react';
import { useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { Loader2, Trash2, Plus, Edit, MoreVertical, ShieldCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function EmailTemplateList() {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const { userDetail } = useUserDetail();

  const deleteTemplate = useMutation(api.emailTemplate.DeleteTemplate);

  useEffect(() => {
    if (userDetail) {
      GetTemplateList();
    }
  }, [userDetail]);

  const GetTemplateList = async () => {
    const result = await convex.query(api.emailTemplate.GetAllUserTemplate, {
      email: userDetail?.email,
    });
    setEmailList(result);
  };

  const handleDelete = async (tid) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      setLoading(true);
      await deleteTemplate({ tid });
      setEmailList((prev) => prev.filter((t) => t.tid !== tid));
    } catch (err) {
      console.error("❌ Error deleting template:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <Link href="/dashboard/create">
          <div className="h-full min-h-[250px] bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group">
            <div className="bg-white p-4 rounded-full border border-gray-200 group-hover:border-purple-200 shadow-sm mb-4">
              <Plus className="h-8 w-8 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <span className="font-semibold text-gray-500 group-hover:text-purple-700">Create New Project</span>
          </div>
        </Link>

        {/* Audit Tool Card */}
        <Link href="/dashboard/audit">
          <div className="h-full min-h-[250px] bg-white border border-gray-100 rounded-xl flex flex-col justify-center items-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">New</div>
            <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
              <ShieldCheck className="h-8 w-8 text-blue-500" />
            </div>
            <span className="font-semibold text-gray-700">AI Email Inspector</span>
            <span className="text-xs text-gray-400 mt-2">Audit text & spam score</span>
          </div>
        </Link>

        {/* Template List */}
        {emailList?.length > 0 && emailList.map((item) => (
          <div key={item.tid} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-200 flex flex-col overflow-hidden relative group">
            <div className='relative h-[180px] w-full bg-gray-100 flex items-center justify-center overflow-hidden'>
              <Image
                src="/emailbox.png"
                alt="email preview"
                width={200}
                height={200}
                className="object-contain transform group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <Link href={`/editor/${item.tid}`}>
                  <Button className="bg-white text-black hover:bg-gray-100 h-9 px-4">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 line-clamp-1 mb-1">{item?.description || "Untitled Project"}</h3>
                <p className="text-xs text-gray-500">Last edited just now</p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">Draft</span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={() => handleDelete(item.tid)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {emailList?.length === 0 && (
        <div className="mt-10 p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-500">No layout templates found. Start your first legacy project!</p>
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList;
