import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useConvex, useMutation } from 'convex/react';
import { useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { Loader2, Trash2 } from 'lucide-react';

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
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>

      {emailList?.length === 0 ? (
        <div className="flex justify-center mt-7 flex-col items-center">
          <Image src="/email.png" alt="email" height={250} width={250} />
          <Link href="/dashboard/create">
            <Button className="mt-7">+ Create New Email Template</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
          {emailList.map((item) => (
            <div
              key={item.tid}
              className="p-5 rounded-lg shadow-md border relative group"
            >
              <Image
                src="/emailbox.png"
                alt="email"
                width={200}
                height={200}
                className="w-full"
              />

              <h2 className="mt-2 text-sm line-clamp-2">{item?.description}</h2>

              <div className="flex gap-2 mt-3">
                <Link href={`/editor/${item.tid}`} className="flex-1">
                  <Button className="w-full">View / Edit</Button>
                </Link>

                <Button
                  variant="destructive"
                  size="icon"
                  disabled={loading}
                  onClick={() => handleDelete(item.tid)}
                  title="Delete Template"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList;
