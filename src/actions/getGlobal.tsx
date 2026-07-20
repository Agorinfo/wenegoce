"use server"

export default async function getGlobal() {
    const {API_URL, API_KEY} = process.env
    const query = new URLSearchParams({
        "populate[favicon]": "true",
        "populate[logo]": "true",
        "populate[metas][populate]": "shareImage",
        "populate[archiveSolutions][populate][reassuranceSolution]": "true",
        "populate[archiveSolutions][populate][cta]": "true",
        "populate[archiveSolutions][populate][images]": "true",
        "populate[archiveSolutions][populate][metas][populate]": "shareImage",
        "populate[archiveServices][populate][reassuranceSolution]": "true",
        "populate[archiveServices][populate][cta]": "true",
        "populate[archiveServices][populate][images]": "true",
        "populate[archiveServices][populate][metas][populate]": "shareImage",
        "populate[archiveRessources][populate][image]": "true",
        "populate[archiveRessources][populate][metas][populate]": "shareImage",
        "populate[archiveRessources][populate][cta][populate]": "image",
        "populate[addressComp]": "true",
    });

    const res = await fetch(`${API_URL}/global?${query.toString()}`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json().then(res => res.data.attributes);
}
