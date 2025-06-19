"use client"
import React from 'react';

interface SidebarCardProps {
    service: string;
    active: string | undefined;
    setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SidebarCardService = ({service, active, setActive}: SidebarCardProps ) => {

    let bgColor;
    let bgHover;
    let icon;
    let label;
    let borderColor;

    switch (service) {
        case "audit":
            bgColor = "bg-featured-shadow"
            borderColor = "border-featured-shadow"
            bgHover = "hover:bg-featured-peps"
            icon = "/stepOne.png"
            label = "Audit"
            break;
        case "projet":
            bgColor = "bg-accent-light"
            borderColor = "border-accent-light"
            bgHover = "hover:bg-accent-peps"
            icon = "stepTwo.png"
            label = "Déploiement"
            break;
        case "formation" :
            bgColor = "bg-featured"
            borderColor = "border-featured"
            bgHover = "hover:bg-featured-peps"
            icon = "stepThree.png"
            label = "Installation et configuration"
            label = "Formation"
            break;
        case "assistance" :
            bgColor = "bg-accent-shadow"
            borderColor = "border-accent-shadow"
            bgHover = "hover:bg-accent"
            icon = "stepFour.png"
            label = "Assistance"
            break;
        case "developpements-adaptatifs" :
            bgColor = "bg-accent-light"
            borderColor = "border-accent-light"
            bgHover = "hover:bg-accent-peps"
            icon = "stepFive.png"
            label = "Développement"
            break;
        case "support-etendu":
            bgColor = "bg-featured"
            borderColor = "border-featured"
            bgHover = "hover:bg-featured-peps"
            icon = "stepSix.png"
            label = "Support"
            break;
        default:
            break;
    }
    return (
        <button
            type={"button"}
            onClick={() => setActive(active === service ? undefined : service)}
            className={`sidebarCard min-w-[7.5rem] w-full lg:w-auto lg:min-w-[230px] ${active === service ? `border-b-4 pb-2 lg:border-b-0 lg:pb-6 lg:pr-4 lg:border-r-8 ${borderColor} bg-white text-black` : ` ${bgColor} ${bgHover}`}`}>
            <img src={icon} alt="icon" className="w-14 h-14"/>
            <span className="flex-auto text-left">{label}</span>
        </button>
    );
};

export default SidebarCardService;