import React from "react";
import type {Metadata} from "next";
import getLegalNotices from "@/actions/getLegalNotices";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const legal = await getLegalNotices();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: legal?.metas,
        path: "/mentions-legales",
        title: "Mentions legales | Wenegoce",
        description: "Mentions legales du site Wenegoce.",
        siteName: global?.siteName,
        favicon: global?.favicon,
        noIndex: true,
    });
};

const MentionsLegales = async () => {
    const legal = await getLegalNotices();
    return (
        <div className="py-8 md:py-12">
            <RichText content={legal.content} />
        </div>
    );
};

export default MentionsLegales;
