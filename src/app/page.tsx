/** @format */
"use client";
import Image from "next/image";
import checkbox from "../_assets/check-image.png";
import Link from "next/link";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/utils/validation";

export default function Home() {
    const router = useRouter();
    const {
        mutateAsync: createUser,
        isPending,
        error: registerError,
    } = useMutation({
        mutationFn: ({ name, email }: { email: string; name: string }) => {
            return axios.post("/users/register", { email, name });
        },
        onError: () => {
            toast.error(registerError?.message);
        },
        onSuccess: () => {
            toast.success("user created successfully", {
                position: "top-right",
            });
            router.push("/signin");
        },
    });

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
        },
        onSubmit: async (value) => {
            try {
                console.log("press");
                const response = await createUser(value);
            } catch (error) {
                toast.error(registerError?.message);
                console.log(error);
            }
        },
        validationSchema: registerSchema,
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
            <div className='min-h-[30vh] flex items-end'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 max-w-xs mx-auto'
                >
                    <div className='flex flex-col gap-2'>
                        <label>Name</label>
                        <input
                            className='bg-gray-700 text-white px-4 py-2 rounded-md outline-none '
                            type='text'
                            placeholder='e.g.John Doe'
                            value={values.name}
                            onChange={handleChange}
                            name='name'
                        />
                        {errors.name && touched.name && (
                            <p className='text-xs text-red-500 italic'>
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Enter your email (ID)</label>
                        <input
                            className='bg-gray-700 text-white px-4 py-2 rounded-md outline-none '
                            type='email'
                            value={values.email}
                            onChange={handleChange}
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
                            {isPending ? "Loading..." : "register"}
                        </button>
                        <Link
                            className='text-blue-400 underline'
                            href={"/signin"}
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
