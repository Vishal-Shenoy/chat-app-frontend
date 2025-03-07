import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <SocketContextProvider>
        <NotificationContextProvider>
          <UserContextProvider>
            <BrowserRouter>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </BrowserRouter>
          </UserContextProvider>
        </NotificationContextProvider>
      </SocketContextProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
