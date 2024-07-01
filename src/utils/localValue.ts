/** @format */

export const getUsername = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userName");
    }
    return null;
};

export const getUserId = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userId");
    }
    return null;
};
