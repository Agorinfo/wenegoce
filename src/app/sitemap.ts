import {MetadataRoute} from "next";
import getServices from "@/actions/getServices";
import getSolutions from "@/actions/getSolutions";
import getRessources from "@/actions/getRessources";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_FRONT_URL || process.env.FRONT_URL || "https://www.wenegoce.fr");
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        {url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1},
        {url: `${baseUrl}/qui-sommes-nous`, lastModified: now, changeFrequency: "monthly", priority: 0.8},
        {url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9},
        {url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9},
        {url: `${baseUrl}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.8},
        {url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2},
        {url: `${baseUrl}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2},
        {url: `${baseUrl}/rgpd`, lastModified: now, changeFrequency: "yearly", priority: 0.2},
    ];

    const serviceSlugs = await getServices();
    const solutionSlugs = await getSolutions();
    const ressourceSlugs = await getRessources();

    const dynamicServicePages = serviceSlugs.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/services/${data.attributes.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const dynamicSolutionPages = solutionSlugs.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/solutions/${data.attributes.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const dynamicRessourcePages = ressourceSlugs.data.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/ressources/${data.attributes.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        ...staticPages,
        ...dynamicServicePages,
        ...dynamicSolutionPages,
        ...dynamicRessourcePages,
    ];
}
