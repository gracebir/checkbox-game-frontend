/** @format */

// hooks/useUpdateCheckbox.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";

const updateCheckbox = async ({
    checkboxId,
    checked,
    userId,
}: {
    checkboxId: string;
    checked: boolean;
    userId: string;
}) => {
    const response = await axios.put(`/checkboxes/${checkboxId}`, {
        checked,
        userId,
    });
    return response.data;
};

export const useUpdateCheckbox = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCheckbox,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["checkboxes"] });
            const previousData = queryClient.getQueryData(["checkboxes"]);
            queryClient.setQueryData(["checkboxes"], (oldData: any) => {
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        checkboxes: page.checkboxes.map((checkbox: any) =>
                            checkbox.checkboxId === variables.checkboxId
                                ? { ...checkbox, checked: variables.checked }
                                : checkbox
                        ),
                    })),
                };
            });
            return { previousData };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(["checkboxes"], context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["checkboxes"] });
        },
    });
};
