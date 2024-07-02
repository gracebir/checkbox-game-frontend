/** @format */
"use client";
import React, { useState, useCallback } from "react";
import { useCheckboxes } from "@/_hooks/useCheckBoxes";
import { useUpdateCheckbox } from "@/_hooks/useUpdateCheckbox";
import CheckBox from "@/_components/CheckBox";

const Game = () => {
    const [checkedCount, setCheckedCount] = useState(0);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useCheckboxes();
    const { mutate: updateCheckbox } = useUpdateCheckbox();

    // const observerElem = useRef<HTMLDivElement | null>(null);

    const handleCheckboxChange = async (
        checkboxId: string,
        checked: boolean
    ) => {
        try {
            await updateCheckbox({
                checkboxId,
                checked,
            }); // Update the checkbox state

            setCheckedCount((prevCount) =>
                checked ? prevCount + 1 : prevCount - 1
            );
        } catch (error) {
            console.error("Error updating checkbox:", error);
        }
    };

    const loadMoreCheckboxes = useCallback(
        (node: HTMLDivElement | null) => {
            if (!node || isFetchingNextPage) return;

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            observer.observe(node);

            return () => {
                observer.disconnect();
            };
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    return (
        <main className='text-white py-12 px-6 flex flex-col gap-4'>
            <div className='bg-gray-700 w-full rounded-md p-4'>
                Player: <span className='font-bold text-gray-300'>@John</span>
                <div className='bg-gray-800 w-full mt-4 rounded-md px-6 py-3 flex flex-col items-center gap-4'>
                    <span className='text-2xl font-bold text-center w-full'>
                        Box Checked
                    </span>
                    <h1 className='text-4xl font-extrabold text-center'>
                        {checkedCount}
                    </h1>
                </div>
            </div>
            <div className='flex gap-1 mt-3'>
                <span>Number of checkboxes:</span>
                <h6>
                    {data?.pages.reduce(
                        (acc, page) =>
                            acc +
                            page.checkboxes.filter(
                                (checkbox: any) => checkbox.checked
                            ).length,
                        0
                    )}
                </h6>
            </div>
            <div className='overflow-y-scroll h-[65vh] '>
                <div className='grid grid-cols-9 gap-8 mx-auto max-w-xl '>
                    {data?.pages.map((page, pageIndex) =>
                        page.checkboxes.map((checkbox: any, index: number) => (
                            <CheckBox
                                checkedValue={checkbox.checked}
                                checkCount={checkbox.checkCount}
                                handleChange={(e) => {
                                    handleCheckboxChange(
                                        checkbox.checkboxId,
                                        e.target.checked
                                    );
                                }}
                                key={`${pageIndex}-${index}`}
                            />
                        ))
                    )}
                </div>
                <div
                    ref={loadMoreCheckboxes}
                    className='mt-4 flex justify-center'
                >
                    {isFetchingNextPage ? <span>Loading more...</span> : null}
                </div>
            </div>
        </main>
    );
};

export default Game;
