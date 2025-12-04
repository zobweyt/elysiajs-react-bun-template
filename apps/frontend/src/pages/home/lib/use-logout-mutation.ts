import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@acme/frontend/shared/config/api";

import { usersMeQueryOptions } from "./users-me-query-options";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.auth.logout.post();

      await queryClient.invalidateQueries({
        queryKey: usersMeQueryOptions.queryKey,
      });
    },
  });
};
