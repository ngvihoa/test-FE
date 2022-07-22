import { createReactQueryHooks } from "@trpc/react";
// import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "api";

export const trpc = createReactQueryHooks<AppRouter>();
// export const trpcClient = createTRPCClient<AppRouter>({
//     url: 'http://localhost:8000/trpc'
// });