"use client"

import { useEffect, useId, useState } from "react"
import { CircleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeleteModal } from "@/lib/store/spaceStore"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export  function DeleteModal() {
  const queryClient = useQueryClient();
  const id = useId()
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

 
  const {isOpen,closeModal, deleteAction, values, metaData }  = useDeleteModal();
   if(!deleteAction) return;

   const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteAction(values);
      if(result.success) {
        queryClient.invalidateQueries({
          queryKey : ["space","overview"]
        })
        toast.success("Space deleted successfully!")
      }
      else toast.error("Something went wrong, please try again!")
    }
    catch(err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
    finally{
      setLoading(false);
      closeModal()
    }
   

  }
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
     
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Final confirmation
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the {`${metaData?.entityType} `} 
              name <span className="text-foreground">{`${values?.name}`}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4">
          <div className="*:not-first:mt-2 space-y-2">
            <Label htmlFor={id}>{`${metaData?.entityType} name`}</Label>
            <Input
              id={id}
              type="text"
              placeholder={`Type ${values?.name} to confirm`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter className="max-w-md:space-y-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1"
              disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== values?.name || loading}
              onClick={handleDelete}
            >
              {!loading? "Delete" : "Deleting"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
