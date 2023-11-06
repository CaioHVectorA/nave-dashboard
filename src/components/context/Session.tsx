"use client"
import { Children } from "@/util/types";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: Children) {
    return (
        <>
            <SessionProvider>
                { children }
            </SessionProvider>
        </>
    )
}