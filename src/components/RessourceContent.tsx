"use client";
import React from 'react';
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import Loader from "@/components/Loader";
import {ArrowLeft} from "@phosphor-icons/react";
import RelatedRessources from "@/components/RelatedRessources";
import ImageWithDecoration from "@/components/ImageWithDecoration";
import CallToAction, {CallToActionRessource} from "@/components/CallToAction";
import getGlobal from "@/actions/getGlobal";

const RessourceContent = () => {
    const {slug} = useParams();
    const imageRenderCount = React.useRef(0);
    const {data, error, isLoading} = useQuery({
        queryKey: ["ressource", slug],
        queryFn: () => getRessource(slug as string),
    });
    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    });
    const ressource = data[0]?.attributes;

    React.useEffect(() => {
        imageRenderCount.current = 0;
    }, [ressource?.content, slug]);

    if (isLoading || global.isLoading) return <Loader/>

    if (error || global.error) return <p>{error?.message}</p>
    return (
        <>
            <div className="py-16">
                <div>
                    <button
                        className="text-featured mb-16"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={24}/>
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="max-w-[45rem] w-full">
                        {ressource?.content &&
                            <BlocksRenderer
                                content={typeof ressource.content === "string" ? JSON.stringify(ressource.content) : ressource?.content}
                                blocks={{
                                    paragraph: ({children}) =>
                                        <p className="mb-8 text-gray-600 [&>strong]:text-accent">{children}</p>,
                                    list: ({children}) =>
                                        <ul className="list-disc list-inside pb-12 text-gray-600">{children}</ul>,
                                    "list-item": ({children}) => (
                                        <li
                                            className={`flex items-center gap-2 pb-4 text-[1rem]`}
                                        >
                                            {children}
                                        </li>
                                    ),
                                    heading: ({children, level}) => {
                                        switch (level) {
                                            case 1:
                                                return <h1
                                                    className={"mb-8 font-bold text-h1 md:mb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}</h1>
                                            case 2:
                                                return <>
                                                    <h2
                                                        className={"pb-8 text-h2 font-bold md:pb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}
                                                    </h2>
                                                </>
                                            case 3:
                                            case 4:
                                            case 5:
                                            case 6:
                                                return <h3 className="text-h3 pb-4">{children}</h3>
                                            default:
                                                return <h1 className="text-h1 pb-4">{children}</h1>
                                        }
                                    },
                                    image: ({image}) => {
                                        const index = imageRenderCount.current;
                                        imageRenderCount.current += 1;

                                        const isEven = index % 2 === 1;

                                        return (
                                            <ImageWithDecoration
                                                src={image.url}
                                                alt={image.alternativeText || ""}
                                                legend={image.caption}
                                                layout="landscape"
                                                decorationPosition={isEven ? "landscapeTwo" : "landscapeOne"}
                                                squareSize="large"
                                                rotation={isEven ? 2 : 1}
                                            />
                                        );
                                    }
                                }}
                            />
                        }
                    </div>
                    <div className="max-w-[22.5rem] w-full">
                        <RelatedRessources
                            ressourceId={data[0]?.id}
                        />
                    </div>
                </div>
            </div>
            {ressource?.ctaTitle && ressource?.ctaText && ressource?.ctaLabelButton && ressource?.ctaLink &&
                <CallToActionRessource
                    title={ressource?.ctaTitle}
                    text={ressource?.ctaText}
                    headingClassName="text-accent"
                    buttonClassName={"btn-accent"}
                    buttonLabel={ressource?.ctaLabelButton}
                    url={ressource?.ctaLink}
                    noBg
                />}
            <div>
                <button
                    className="text-featured pb-8"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={24}/>
                </button>
            </div>
        </>
    );
};

export default RessourceContent;