/** @format */
"use client";
import Image from "next/image";
import checkbox from "../_assets/check-image.png";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
export default function Home() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/game");
        }, 5000);
    });

    return (
        <main className='text-white py-12 px-6 flex flex-col gap-10'>
            <h1 className='text-4xl text-center font-extrabold'>
                Welcome to One-M Checkboxes
            </h1>
            <div>
                <Image
                    className='rounded-full mx-auto mt-10'
                    src={checkbox}
                    width={100}
                    height={100}
                    alt='logo'
                />
            </div>
            <div className='min-h-[30vh] flex items-center justify-center'>
                <CircularProgress size={40} style={{ color: "#9ca3af" }} />
            </div>
        </main>
    );
}
