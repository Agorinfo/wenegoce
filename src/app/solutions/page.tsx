import React from 'react';
import Strengths from "@/sections/Strengths";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {CallToActionNewsletter} from "@/components/CallToAction";
import getSolution from "@/actions/getSolutions";
import getHome from "@/actions/getHome";
import HeroArchiveSolutions from "@/sections/HeroArchiveSolutions";
import ServiceList from "@/sections/ServiceList";
import getServices from "@/actions/getServices";
import ReassuranceArchiveSolution from "@/sections/ReassuranceArchiveSolution";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL,FRONT_URL} = process.env;
    const global = await getGlobal();
    const metas = global.archiveSolutions.metas

    return {
        metadataBase: new URL(FRONT_URL + "/solutions"),
        title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
        openGraph: {
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            url: FRONT_URL + "/solutions",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/solutions",
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

const Solutions = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["solutions"],
        queryFn: () => getSolution(),
    });
    await queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });
    await queryClient.prefetchQuery({
        queryKey: ["services"],
        queryFn: () => getServices(),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroArchiveSolutions />
            <Strengths />
            <CallToActionNewsletter />
            <div className="overflow-x-hidden">
                <ServiceList />
            </div>
            <ReassuranceArchiveSolution />
        </HydrationBoundary>
    );
};

export default Solutions;