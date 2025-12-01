import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@acme/frontend/shared/config/api";

import { usersMeQueryOptions } from "./usersMeQueryOptions";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.auth.login.post({
        username: "username",
        password: "password",
      });

      await queryClient.invalidateQueries({
        queryKey: usersMeQueryOptions.queryKey,
      });
    },
  });
};
