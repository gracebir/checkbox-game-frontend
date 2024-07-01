/** @format */

import * as yup from "yup";

export const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),

    name: yup.string().required("Name is required"),
});

export const signinSchema = yup.object().shape({
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
});
