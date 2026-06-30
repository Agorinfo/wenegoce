import React from "react";
import Loader from "@/components/Loader";
import HeroService from "@/components/HeroService";
import {CallToActionImage, CallToActionNewsletter} from "@/components/CallToAction";
import TestimonialsPage from "@/sections/TestimonialsPage";
import getService from "@/actions/getService";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async ({params}: {params : {slug: string}}): Promise<Metadata> => {
    const global = await getGlobal();
    const service = await getService(params.slug);
    const attributes = service[0]?.attributes;

    return buildSeoMetadata({
        metas: attributes?.metas,
        path: `/services/${params.slug}`,
        title: attributes?.hero?.title || "Service Wenegoce",
        description: attributes?.hero?.teaser || "Service Wenegoce pour accompagner vos projets logiciels metier.",
        siteName: global?.siteName,
        fallbackImage: attributes?.brandImg?.data?.attributes?.url || attributes?.hero?.images?.data?.[0]?.attributes?.url,
        favicon: global?.favicon,
    });
};

const Service = async ({params}: {params : {slug: string}}) => {
    const data = await getService(params.slug);

    if(!data) return <Loader />;

    return (
        <>
            <HeroService
                title={data[0].attributes.hero.title}
                icon={data[0].attributes.hero.icon}
                teaser={data[0].attributes.hero.teaser}
                steps={data[0].attributes.step}
                heroImg={data[0].attributes.hero.images.data}
                stepImg={data[0].attributes.stepImg}
                logo={data[0].attributes.hero.logo}
            />
            {data[0].attributes.cta && <CallToActionImage
                document={data[0].attributes.cta.document?.data?.attributes.url}
                title={data[0].attributes.cta.title}
                text={data[0].attributes.cta.text}
                image={data[0].attributes.cta.image}
                color={data[0].attributes.cta.background}
                position={data[0].attributes.cta.position}
                label={data[0].attributes.cta.label}
                url={data[0].attributes.cta.url}
            />}
            {data[0].attributes.testimonial.length > 0 && <TestimonialsPage testimonials={data[0].attributes.testimonial}/>}
            <CallToActionNewsletter />
        </>
    );
};

export default Service;
