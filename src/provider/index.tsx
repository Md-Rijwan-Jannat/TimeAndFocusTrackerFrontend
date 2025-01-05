"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "./themeProvider";
import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/toaster";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <Toaster />
    </Provider>
  );
}
