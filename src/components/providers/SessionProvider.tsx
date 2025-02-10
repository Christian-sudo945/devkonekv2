"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { PropsWithChildren } from "react";

export function SessionProvider({ children }: PropsWithChildren) {
  return (
    <Provider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </Provider>
  );
}
