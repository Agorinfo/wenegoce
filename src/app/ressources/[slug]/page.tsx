import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import HeroRessource from "@/components/HeroRessource";
import RessourceContent from "@/components/RessourceContent";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async ({params}: { params: { slug: string } }): Promise<Metadata> => {
    const global = await getGlobal();
    const ressource = await getRessource(params.slug);
    const attributes = ressource[0]?.attributes;

    return buildSeoMetadata({
        metas: attributes?.metas,
        path: `/ressources/${params.slug}`,
        title: attributes?.title || "Ressource Wenegoce",
        description: attributes?.shortDescription || "Ressource Wenegoce sur les solutions logicielles metier.",
        siteName: global?.siteName,
        fallbackImage: attributes?.featuredImage?.data?.attributes?.url || attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url,
        favicon: global?.favicon,
        type: "article",
    });
};

const Ressource = async ({params}: { params: { slug: string } }) => {
    const ressource = await getRessource(params.slug);
    const title = ressource[0]?.attributes?.title || "Ressource";
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["ressource", params.slug],
        queryFn: () => Promise.resolve(ressource),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Breadcrumbs items={[
                {label: "Ressources", href: "/ressources"},
                {label: title},
            ]} />
            <HeroRessource/>
            <RessourceContent/>
        </HydrationBoundary>
    );
};

export default Ressource;
