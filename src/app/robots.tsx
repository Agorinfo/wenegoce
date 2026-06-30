import type {MetadataRoute} from "next";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
    const baseUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_FRONT_URL || process.env.FRONT_URL || "https://www.wenegoce.fr");

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/icones"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
