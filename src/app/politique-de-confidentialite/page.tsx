import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import getPrivacyPolicy from "@/actions/getPrivicyPolicy";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const policy = await getPrivacyPolicy();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: policy?.metas,
        path: "/politique-de-confidentialite",
        title: "Politique de confidentialite | Wenegoce",
        description: "Politique de confidentialite du site Wenegoce.",
        siteName: global?.siteName,
        favicon: global?.favicon,
        noIndex: true,
    });
};

const PolitiqueDeConfidentialite = async () => {
    const policy = await getPrivacyPolicy();
    return (
        <div className="py-8 md:py-12">
            <Breadcrumbs items={[{label: "Politique de confidentialite"}]} />
            <RichText content={policy.content}/>
        </div>
    );
};

export default PolitiqueDeConfidentialite;
