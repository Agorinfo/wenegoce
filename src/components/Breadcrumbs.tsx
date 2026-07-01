import Link from "next/link";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

const getFrontUrl = () => (process.env.FRONT_URL || process.env.NEXT_PUBLIC_FRONT_URL || "https://www.wenegoce.fr").replace(/\/+$/, "");

const getItemUrl = (href?: string) => {
    if (!href) return undefined;
    if (/^https?:\/\//i.test(href)) return href;
    return `${getFrontUrl()}${href.startsWith("/") ? href : `/${href}`}`;
};

const Breadcrumbs = ({items}: BreadcrumbsProps) => {
    const breadcrumbItems: BreadcrumbItem[] = [
        {label: "Accueil", href: "/"},
        ...items,
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(getItemUrl(item.href) ? {item: getItemUrl(item.href)} : {}),
        })),
    };

    return (
        <>
            <nav aria-label="Fil d'Ariane" className="py-4 text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-grayscale-darker">
                    {breadcrumbItems.map((item, index) => {
                        const isLast = index === breadcrumbItems.length - 1;

                        return (
                            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                                {index > 0 && <span className="text-accent-muted">/</span>}
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="font-semibold transition-colors duration-300 hover:text-accent"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="font-semibold text-featured" aria-current={isLast ? "page" : undefined}>
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            />
        </>
    );
};

export default Breadcrumbs;
