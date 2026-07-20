import type {Metadata} from "next";

type StrapiImage = {
    data?: {
        attributes?: {
            url?: string;
            alternativeText?: string | null;
            width?: number;
            height?: number;
        };
    } | null;
};

export type SeoMetas = {
    meta_title?: string | null;
    meta_description?: string | null;
    shareImage?: StrapiImage | null;
    canonical?: string | null;
    canonicalUrl?: string | null;
    canonicalURL?: string | null;
    canonical_url?: string | null;
    metaRobots?: string | null;
    robots?: string | null;
    keywords?: string | string[] | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
};

type BuildSeoMetadataOptions = {
    metas?: SeoMetas | null;
    path?: string;
    title: string;
    description: string;
    siteName?: string | null;
    fallbackImage?: string | null;
    favicon?: StrapiImage | null;
    noIndex?: boolean;
    noFollow?: boolean;
    type?: "website" | "article";
};

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

const getFrontUrl = () => trimTrailingSlash(process.env.FRONT_URL || process.env.NEXT_PUBLIC_FRONT_URL || "https://www.wenegoce.fr");

const getBackUrl = () => trimTrailingSlash(process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL || "");

const toAbsoluteUrl = (url?: string | null) => {
    if (!url) return undefined;
    if (/^https?:\/\//i.test(url)) return url;

    const baseUrl = url.startsWith("/") ? getBackUrl() : getFrontUrl();
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

const getImageUrl = (image?: StrapiImage | null) => toAbsoluteUrl(image?.data?.attributes?.url);

const parseRobots = (value?: string | null) => {
    const lowerValue = value?.toLowerCase() || "";

    return {
        index: !lowerValue.includes("noindex"),
        follow: !lowerValue.includes("nofollow"),
    };
};

export function buildSeoMetadata({
    metas,
    path = "",
    title,
    description,
    siteName = "Wenegoce",
    fallbackImage,
    favicon,
    noIndex,
    noFollow,
    type = "website",
}: BuildSeoMetadataOptions): Metadata {
    const pageTitle = metas?.meta_title || title;
    const pageDescription = metas?.meta_description || description;
    const canonicalPath = path ? `/${path.replace(/^\/+/, "")}` : "";
    const canonicalUrl = metas?.canonical || metas?.canonicalUrl || metas?.canonicalURL || metas?.canonical_url || `${getFrontUrl()}${canonicalPath}`;
    const imageUrl = getImageUrl(metas?.shareImage) || toAbsoluteUrl(fallbackImage);
    const robotsFromMeta = parseRobots(metas?.metaRobots || metas?.robots);
    const shouldIndex = !(metas?.noIndex || noIndex) && robotsFromMeta.index;
    const shouldFollow = !(metas?.noFollow || noFollow) && robotsFromMeta.follow;
    const iconUrl = getImageUrl(favicon);
    const images = imageUrl ? [imageUrl] : undefined;
    const keywords = Array.isArray(metas?.keywords)
        ? metas.keywords
        : metas?.keywords?.split(",").map((keyword) => keyword.trim()).filter(Boolean);

    return {
        metadataBase: new URL(getFrontUrl()),
        title: pageTitle,
        description: pageDescription,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: shouldIndex,
            follow: shouldFollow,
            googleBot: {
                index: shouldIndex,
                follow: shouldFollow,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            siteName: siteName || "Wenegoce",
            locale: "fr_FR",
            type,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            images,
        },
        icons: iconUrl
            ? {
                icon: iconUrl,
                apple: iconUrl,
                shortcut: iconUrl,
            }
            : undefined,
    };
}
