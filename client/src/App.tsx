import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import { useState } from "react";
import { Email } from "./components/Email";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Message } from "./components/Message";
import { Sidebar } from "./components/Sidebar";
import type { AppRouter } from "../../server";
import { trpc } from "./utils/trpc";
import React from "react";

const backendURL = "http://localhost:4001";
// const backendURL = "https://capb.hop.sh";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: backendURL,
    }),
  ],
});

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: backendURL,
        }),
      ],
    })
  );

  const [hold, setHold] = useState(false);
  const holdCallback = (e: BeforeUnloadEvent) => {
    e.preventDefault(), (e.returnValue = "");
  };

  if (hold) {
    window.addEventListener("beforeunload", holdCallback);
  } else {
    window.removeEventListener("beforeunload", holdCallback);
  }

  const [auth, setAuth] = useState(false);
  const [service, setService] = useState(0);

  if (!auth) {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <div className="h-screen bg-offWhite">
            <Login setAuth={setAuth} />
          </div>
        </QueryClientProvider>
      </trpc.Provider>
    );
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen bg-offWhite flex">
          <div className="h-full bg-darkBlue w-[250px] drop-shadow-2xl">
            <Sidebar setService={setService} />
          </div>
          <div className="w-full overflow-hidden">
            {service === 0 ? <Home /> : null}
            {service === 1 ? <Message /> : null}
            {service === 2 ? <Email setHold={setHold} /> : null}
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
