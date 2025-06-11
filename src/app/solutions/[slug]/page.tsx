import React from 'react';
import {notFound} from "next/navigation";
import HeroPage from "@/components/HeroPage";
import {createColorPalette} from "@/lib/createColorPalette";
import {CallToActionNewsletter, CallToActionPage} from "@/components/CallToAction";
import SolutionFeatures from "@/sections/SolutionFeatures";
import FeaturesReleased from "@/sections/FeaturesReleased";
import ReassuranceSolution from "@/sections/ReassuranceSolution";
import RelatedServices from "@/sections/RelatedServices";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import getSolution from "@/actions/getSolution";
import emptyImg from "@/assets/empty-img.png"
import {draftMode} from "next/headers";

async function getData(slug: string) {
    const {API_URL, API_KEY, STRAPI_PREVIEW_TOKEN } = process.env
    const { isEnabled } = draftMode();
    const publicationState = isEnabled ? 'preview' : 'live';
    const token = isEnabled ? STRAPI_PREVIEW_TOKEN : API_KEY;

    const res = await fetch(`${API_URL}/solutions?populate=brandImg,heroArchive.logo,heroArchive.informationCard.image,heroArchive.background,heroArchive.moduleList,reassurance.card,HeroPage.images,HeroPage.logo,HeroPage.content,cta,FeaturesReleased.details,featuresReleasedImg,newsletter,features,modules.features.activities,modules.features.details,modules.features.activities,solutionComp&filters%5Bslug%5D%5B%24eq%5D=${slug}&publicationState=${publicationState}`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        return notFound()
    }

    return res.json().then(res => res.data);
}

export const generateMetadata = async ({params}: { params: { slug: string } }): Promise<Metadata> => {
    const {BACK_URL, FRONT_URL} = process.env;
    const solution = await getSolution(params.slug)
    const global = await getGlobal();
    const metas = solution[0]?.attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/" + params.slug),
        title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
        openGraph: {
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            url: FRONT_URL + "/" + params.slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/" + params.slug,
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

const Solution = async ({params}: { params: { slug: string } }) => {
    const data = await getData(params.slug);
    const colors = createColorPalette(data[0]?.attributes.brandColor ? data[0]?.attributes.brandColor : "#000000");

    return (
        <>
            <HeroPage
                images={data[0]?.attributes.HeroPage?.images}
                teaser={data[0]?.attributes.HeroPage?.content.teaser}
                content={data[0]?.attributes.HeroPage?.content.content}
                label1={data[0]?.attributes.HeroPage?.content.label1}
                url1={data[0]?.attributes.HeroPage?.content.url1}
                label2={data[0]?.attributes.HeroPage?.content.label2}
                url2={data[0]?.attributes.HeroPage?.content.url2}
                background={data[0]?.attributes.brandImg.data ? data[0]?.attributes.brandImg.data?.attributes : emptyImg.src}
                colors={colors}
            />
            <CallToActionPage
                title={data[0]?.attributes.cta?.title}
                text={data[0]?.attributes.cta?.text}
                buttonClassName="text-white outline-none ring-accent-muted focus-visible:ring"
                colors={colors}
            />
            <SolutionFeatures
                icon={data[0]?.attributes?.icon}
                title={data[0]?.attributes?.featureTitle}
                teaser={data[0]?.attributes?.featureTeaser}
                dataModules={data[0]?.attributes?.modules?.data}
                colors={colors}
            />
            <FeaturesReleased
                data={data[0]?.attributes?.FeaturesReleased}
                image={data[0]?.attributes?.featuresReleasedImg}
                colors={colors}
            />
            <ReassuranceSolution data={data[0]?.attributes?.reassurance} colors={colors}/>
            {data[0]?.attributes?.solutionComp.length ?
                <RelatedServices
                    title="En complément"
                    solutions={data[0]?.attributes?.solutionComp.map((solution: any) => solution.solution)}/>
                :
                null
            }
            <CallToActionNewsletter/>
        </>
    );
};

export default Solution;