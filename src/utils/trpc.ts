import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import { httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "server/routers/_app";

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              return {
                cookie: ctx.req.headers.cookie,
              };
            }

            return {};
          },
        }),
      ],
    };
  },
  ssr: true,
});

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_NEXTAUTH_URL) {
    return process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}
