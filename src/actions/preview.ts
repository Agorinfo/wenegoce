import { draftMode } from 'next/headers';

export async function getArticles() {
    const { isEnabled } = draftMode();
    const state = isEnabled ? 'preview' : 'live';
    const token = isEnabled ? process.env.STRAPI_PREVIEW_TOKEN : '';

    const res = await fetch(`https://strapi.example.com/api/articles?publicationState=${state}&token=${token}`);
    const data = await res.json();

    return data;
}
