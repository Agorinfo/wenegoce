import { Open_Sans} from "next/font/google";
import "./globals.css";
import React from "react";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import UseReactQuery from "@/utils/useReactQuery";
import getMenu from "@/actions/getMenu";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import getFooter from "@/actions/getFooter";
import {Toaster} from "react-hot-toast";
import Modal from "@/components/Modal";
import CookieConsent from "@/components/CookieConsent";
import { draftMode} from "next/headers";
import DisablePreview from "@/components/DisablePreview";

const openSans = Open_Sans({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const {isEnabled} = draftMode();
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["menu"],
        queryFn: () => getMenu(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["footer"],
        queryFn: () => getFooter(),
    })
    return (
        <html lang="fr" className="scroll-smooth overflow-x-clip">
        <body className={`${openSans.className} overflow-x-clip`}>
        <CookieConsent />
        <UseReactQuery>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div id="modal-root"></div>
                {isEnabled &&
                    <div className="fixed z-[9999] top-3 left-1/2 -translate-x-1/2 text-white font-bold bg-black p-2 rounded-xl"> Mode
                    pré-visualisation </div>
                }
                {
                    isEnabled &&
                    <DisablePreview/>
                }
                <Modal/>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Header/>
                <div className="content-grid">
                    {children}
                </div>
                <Footer/>
            </HydrationBoundary>
        </UseReactQuery>
        </body>
        </html>
    );
}
