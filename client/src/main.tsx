import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AppRouter from "./app/router/router.tsx";
import { UserProvider } from "./app/context/user.context.tsx";
import { AuthProvider } from "./app/context/auth.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
