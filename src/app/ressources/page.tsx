import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import HeroRessources from "@/components/HeroRessources";
import RessourceGridItems from "@/components/RessourceGridItems";
import getCategories from "@/actions/getCategories";
import getFaq from "@/actions/getFaq";
import SectionFaq from "@/components/SectionFaq";
import getAllRessources from "@/actions/getAllRessources";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: global?.archiveRessources?.metas,
        path: "/ressources",
        title: "Ressources | Wenegoce",
        description: "Guides, actualites et ressources Wenegoce pour mieux piloter vos solutions logicielles metier.",
        siteName: global?.siteName,
        fallbackImage: global?.archiveRessources?.image?.data?.attributes?.url,
        favicon: global?.favicon,
    });
};

const Ressources = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["ressources"],
        queryFn: () => getAllRessources(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["faq"],
        queryFn: () => getFaq(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroRessources/>
            <RessourceGridItems/>
            <SectionFaq />
        </HydrationBoundary>
    );
};

export default Ressources;
