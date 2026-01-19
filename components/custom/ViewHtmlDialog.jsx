import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from 'lucide-react'

function ViewHtmlDialog({openDialog,htmlCode,closeDialog}) {
    const copycode=()=>{
        navigator.clipboard.writeText(htmlCode);
    }
  return (
  <Dialog  open ={openDialog} onOpenChange={closeDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle asChild>
        <div className='flex items-center justify-between'>
        <h2>HTML EMAIL TEMPLATE</h2>
        <Copy className='p-2 bg-gray-100 rounded-full h-9 w-9 cursor-pointer' 
        onClick={copycode}/>
        </div>
        </DialogTitle>
      <DialogDescription asChild>
          <div className='max-h-[400px] overflow-auto bg-black text-white rounded-lg p-5'>
            <pre className='whitespace-pre-wrap break-all'>
                <code>
                     {htmlCode}
                </code>
            </pre>
     
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default ViewHtmlDialog