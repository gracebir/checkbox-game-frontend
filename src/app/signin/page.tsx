/** @format */

"use client";
import Image from "next/image";
import React from "react";
import checkbox from "@/_assets/check-image.png";

export default function Signin() {
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
            <div className='min-h-[25vh] flex items-end'>
                <div className='flex flex-col gap-4 max-w-xs mx-auto'>
                    <div className='flex flex-col gap-2'>
                        <label>Enter your email (ID)</label>
                        <input
                            className='bg-gray-700 text-white px-4 py-2 rounded-md outline-none '
                            type='email'
                            placeholder='e.g. checkbox@gmail.com'
                            name='email'
                        />
                    </div>

                    <div className='flex gap-4 items-center'>
                        <button className='uppercase font-semibold duration-300 hover:bg-blue-500 bg-blue-400 px-8 rounded-md shadow-sm py-2'>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
