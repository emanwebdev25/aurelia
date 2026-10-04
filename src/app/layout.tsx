import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
    title: "Aurelia | Modern Luxury",
    description: "A modern fashion and lifestyle store.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <WishlistProvider>
                    <CartProvider>
                        <StoreProvider>
                            {children}
                        </StoreProvider>
                    </CartProvider>
                </WishlistProvider>
            </body>
        </html>
    );
}