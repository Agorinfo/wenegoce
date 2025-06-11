"use server"

import {notFound} from "next/navigation";

export default async function getSolution(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/solutions?populate=brandImg,heroArchive.logo,heroArchive.informationCard.image,heroArchive.background,heroArchive.moduleList,reassurance.card,HeroPage.images,HeroPage.logo,HeroPage.content,cta,FeaturesReleased.details,featuresReleasedImg,newsletter,features,modules.features.activities,modules.features.details,modules.features.activities,solutionComp,metas.shareImage&filters%5Bslug%5D%5B%24eq%5D=${slug}`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        return notFound()
    }

    return res.json().then(res => res.data);
}