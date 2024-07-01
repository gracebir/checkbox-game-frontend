/** @format */

"use client";
import Image from "next/image";
import React from "react";
import checkbox from "@/_assets/check-image.png";
import Link from "next/link";
import { useFormik } from "formik";
import { signinSchema } from "@/utils/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter();
    const { mutateAsync: signin, isPending } = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return axios.post("/users/authenticate", { email });
        },
        onError: () => {
            toast.error("Email must wrong", { position: "top-right" });
        },
        onSuccess: () => {
            toast.success("Login success", { position: "top-right" });
            router.push("/game");
        },
    });

    const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                email: "",
            },
            onSubmit: async (value) => {
                try {
                    const response = await signin(value);
                    if (response.data) {
                        localStorage.setItem("userEmail", response.data.email);
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("userName", response.data.name);
                    }
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            },
            validationSchema: signinSchema,
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
            <div className='min-h-[25vh] flex items-end'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 max-w-xs mx-auto'
                >
                    <div className='flex flex-col gap-2'>
                        <label>Enter your email (ID)</label>
                        <input
                            className='bg-gray-700 text-white px-4 py-2 rounded-md outline-none '
                            type='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='e.g. checkbox@gmail.com'
                            name='email'
                        />
                        {errors.email && touched.email && (
                            <p className='text-xs text-red-500 italic'>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className='flex gap-4 items-center'>
                        <button
                            type='submit'
                            className='uppercase font-semibold duration-300 hover:bg-blue-500 bg-blue-400 px-8 rounded-md shadow-sm py-2'
                        >
                            {isPending ? "Loading..." : "Sign in"}
                        </button>
                        <Link className='text-blue-400 underline' href={"/"}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
