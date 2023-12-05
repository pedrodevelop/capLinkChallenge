import "@mantine/core/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { ProductsProvider, CartProvider } from "@/data/contexts";
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
          <ProductsProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ProductsProvider>
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  );
}
