import "@mantine/core/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { ProductsProvider } from "@/data/contexts/ProductsContext";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
  title: "Acme Inc.",
  description: "CapLink Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <ProductsProvider>{children}</ProductsProvider>
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  );
}
