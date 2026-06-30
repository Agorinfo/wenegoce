import React from 'react';
import {SolutionCardType} from "@/utils/types";
import Button from "@/components/Button";
import Image from "next/image";

const SolutionCard = ({url, image, alt, category, solution}: SolutionCardType) => {
    return (
        <div>
            <a href={url}
               className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
                <Image
                    src={image}
                    alt={alt}
                    className="object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                />
            </a>

            <div className="flex flex-col">
                <span className="text-grayscale-darker">{category}</span>
                <Button
                    url={url}
                    label={solution}
                   className="link"
                />
            </div>
        </div>
    );
};

export default SolutionCard;
