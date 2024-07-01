/** @format */
"use client";
import React, { useState } from "react";

type TCheckBox = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    checkCount: number;
    checkedValue: boolean;
};

export default function CheckBox({
    handleChange,
    checkedValue,
    checkCount,
}: TCheckBox) {
    const [checked, setIsChecked] = useState<boolean>(checkedValue || false);
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!checked);
        handleChange(e);
    };
    return (
        <label className='flex items-center'>
            <input
                type='checkbox'
                checked={
                    //@ts-ignore
                    checked
                }
                onChange={handleChecked}
                className='p-6 rounded-2xl'
            />
            <span className='ml-2'>{checkCount}</span>{" "}
            {/* Display checkCount */}
        </label>
    );
}
