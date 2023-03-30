import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import { useState } from "react";
import { DM } from "./components/DM";
import { Email } from "./components/Email";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Message } from "./components/Message";
import { Sidebar } from "./components/Sidebar";
import { AppRouter } from "../../server";
import { trpc } from "./utils/trpc";
import React from "react";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://127.0.0.1:4001",
    }),
  ],
});

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4001",
        }),
      ],
    })
  );

  const [auth, setAuth] = useState(false);
  const [service, setService] = useState(0);

  if (!auth) {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <div className="h-screen bg-[#473C33]">
            <Login setAuth={setAuth} />
          </div>
        </QueryClientProvider>
      </trpc.Provider>
    );
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen bg-[#473C33] flex">
          <div className="h-full bg-[#FDA769] w-[250px] drop-shadow-2xl">
            <Sidebar setService={setService} />
          </div>
          <div className="w-full overflow-hidden">
            {service === 0 ? <Home /> : null}
            {service === 1 ? <Message /> : null}
            {service === 2 ? <DM /> : null}
            {service === 3 ? <Email /> : null}
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
