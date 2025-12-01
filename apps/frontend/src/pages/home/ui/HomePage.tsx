import { useQuery } from "@tanstack/react-query";

import { useLoginMutation } from "../lib/useLoginMutation";
import { useLogoutMutation } from "../lib/useLogoutMutation";
import { usersMeQueryOptions } from "../lib/usersMeQueryOptions";

export function HomePage() {
  const { data } = useQuery(usersMeQueryOptions);
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <div>
      <code>{JSON.stringify(data)}</code>

      <br />

      <button
        type="button"
        onClick={() => loginMutation.mutate()}
        disabled={loginMutation.isPending || logoutMutation.isPending || !!data}
      >
        Login
      </button>

      <br />

      <button
        type="button"
        onClick={() => logoutMutation.mutate()}
        disabled={loginMutation.isPending || logoutMutation.isPending || !data}
      >
        Logout
      </button>
    </div>
  );
}
