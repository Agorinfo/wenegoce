import React from "react";
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
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: global?.archiveSolutions?.metas,
        path: "/solutions",
        title: "Solutions logicielles metier | Wenegoce",
        description: "Explorez les solutions logicielles Wenegoce pour piloter vos activites de negoce, distribution et services.",
        siteName: global?.siteName,
        favicon: global?.favicon,
    });
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
            <Breadcrumbs items={[{label: "Solutions"}]} />
            <HeroArchiveSolutions />
            <Strengths />
            <CallToActionNewsletter />
            <div className="">
                <ServiceList />
            </div>
            <ReassuranceArchiveSolution />
        </HydrationBoundary>
    );
};

export default Solutions;
