import React from 'react';
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import getPrivacyPolicy from "@/actions/getPrivicyPolicy";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL,FRONT_URL} = process.env;
    const policy = await getPrivacyPolicy();
    const global = await getGlobal();
    const metas = policy.metas

    return {
        metadataBase: new URL(FRONT_URL! + "/politique-de-confidentialite"),
        title: metas.meta_title || "Wenegoce, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
        openGraph: {
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            url: metas.canonicalUrl,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: metas.canonicalUrl,
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

const MentionsLegales = async () => {
    const policy = await getPrivacyPolicy();
    return (
        <>
            <head>
                <meta name="robots" content="noindex, follow"/>
            </head>
            <div className="py-8 md:py-12">
                <RichText content={policy.content}/>
            </div>
        </>
    );
};

export default MentionsLegales;