"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({error, reset}: {error: Error, reset: () => void}){
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div className="w-full flex h-full items-center justify-center flex-col gap-3">
            <h2 className="text-2xl font-bold text-destructive">Something Went Wrong !</h2>
            <p className="text-sm text-muted-foreground">
                {error.message}
            </p>
            <Button asChild>
                <Link href="/">Go to Home</Link>
            </Button>
        </div>
    )
}