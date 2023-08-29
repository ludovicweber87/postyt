import { ChakraProvider } from "@chakra-ui/react";
import router from "@postyt/lib/router/routes";
import theme from "@postyt/lib/theme";
import { AnimatePresence } from "framer-motion";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
