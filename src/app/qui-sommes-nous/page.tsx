import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import HeroAbout from "@/sections/HeroAbout";
import Expertises from "@/sections/Expertises";
import Story from "@/sections/Story";
import TestimonialsAbout from "@/sections/TestimonialsAbout";
import {CallToActionNewsletter} from "@/components/CallToAction";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import CtaAbout from "@/sections/CtaAbout";
import StepAbout from "@/sections/StepAbout";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const about = await getAbout();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: about?.metas,
        path: "/qui-sommes-nous",
        title: "Wenegoce, editeur de solutions logicielles metier",
        description: "Decouvrez Wenegoce, editeur de solutions logicielles pour les professionnels du negoce et des services.",
        siteName: global?.siteName,
        favicon: global?.favicon,
    });
};

const About = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Breadcrumbs items={[{label: "Qui sommes-nous"}]} />
            <HeroAbout />
            <Expertises />
            <Story />
            <TestimonialsAbout />
            <StepAbout />
            <CtaAbout />
            <CallToActionNewsletter />
        </HydrationBoundary>
    );
};

export default About;
