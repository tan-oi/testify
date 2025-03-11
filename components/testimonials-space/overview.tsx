"use client"

import { useSpaceModalStore } from "@/lib/store/spaceStore"
import { Button } from "../ui/button"
import { PencilIcon } from "lucide-react"

export function AboutOverview() {
    const { openModal } = useSpaceModalStore()
    return(
        <Button variant={"default"} onClick={() => openModal("create",null, null)}>
            <PencilIcon className="size-4 mr-1"/> 
            Edit Space
        </Button>
    )
}