/** @format */

// hooks/useCheckboxes.ts
// hooks/useCheckboxes.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";

const fetchCheckboxes = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`/checkboxes?page=${pageParam}&limit=20`);
    return data;
};

export const useCheckboxes = () => {
    return useInfiniteQuery({
        queryKey: ["checkboxes"],
        queryFn: fetchCheckboxes,
        getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
        initialPageParam: 1,
    });
};
