import React, {useState} from 'react';
import {ModalButton} from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Content from "@/components/Content";
import {HeroArchiveServiceType} from "@/utils/types";
import InformationCard from "@/components/InformationCard";
import {AnimatePresence, motion} from "framer-motion";
import Icon from "@/components/icons/Icon";
import {HorizontalCarousel} from "@/components/HorizontalCarousel";
import {VerticalCarousel} from "@/components/VerticalCarousel";
import SidebarCardService from "@/components/SidebarCardService";

const HeroArchiveService = ({teaser, text, label, url, modules,}: HeroArchiveServiceType) => {
    const [active, setActive] = useState<string | undefined>();
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    const background = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.heroArchive.background.data?.attributes.url);
    const color = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.brandColor);
    console.log(modules)
    const bgStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), linear-gradient(257deg, ${color[0]} 0%, rgba(146, 86, 32, 0.00) 25.01%, ${color[0]} 100%), linear-gradient(0deg, ${color[0]} 0%, ${color[0]} 100%), url(${backUrl! + background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "normal, normal, multiply, luminosity, normal"
    }

    return (
        <AnimatePresence initial={false} mode={"wait"}>
            <div
                className="flex flex-col lg:flex-row items-center gap-8 lg:h-hero text-white pt-8 lg:pt-0 overflow-x-hidden">
                <motion.div
                    key={"services"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.7}}
                    style={active ? bgStyle : undefined}
                    className={`relative flex items-center justify-start ${active ? "p-4 md:p-8 lg:p-12" : "py-14 px-4 lg:pl-32 bg-accent"} w-full lg:w-auto lg:flex-auto lg:h-[40rem] rounded-lg overflow-hidden`}
                >
                    {!active &&
                        <>
                            <img
                                className="absolute inset-0 w-full h-full"
                                src="/fond_wenegoce_site.png"
                                alt=""
                            />
                            <div className="relative z-10">
                                <p className="text-h5 font-bold">{teaser}</p>
                                <Content btn1ClassName="btn btn-accent" content={text} headingStyle={{color: "#B2DFFF"}}
                                         headingClassName="max-w-[34rem]"/>
                                <div className="flex items-center gap-3">
                                    <ModalButton label="Réserver une démo" className="btn btn-accent w-full md:w-auto">
                                        <ContactForm/>
                                    </ModalButton>
                                </div>
                            </div>
                        </>
                    }
                    {active &&
                        modules.filter(module => active === module.attributes.slug).map(item => {
                            const {heroArchive} = item.attributes;
                            return (
                                <motion.div
                                    key={"service-" + item.id}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                    className="w-full"
                                >
                                    <motion.div
                                        key={"icon-" + item.id}
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: 10}}
                                        transition={{duration: 0.7}}
                                        className="lg:hidden pb-8">
                                        <Icon name={heroArchive.icon!} size={48}/>
                                    </motion.div>
                                    <div className="relative z-10 w-full">
                                        <motion.p
                                            key={"teaser-" + item.id}
                                            initial={{opacity: 0, x: -10}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: 10}}
                                            transition={{duration: 0.7}}
                                            className="pb-2"
                                        >
                                            {heroArchive.teaser}
                                        </motion.p>
                                        <div className="flex items-center justify-between pb-8">
                                            <motion.h1
                                                key={"h1-" + item.id}
                                                initial={{opacity: 0, x: -10}}
                                                animate={{opacity: 1, x: 0}}
                                                exit={{opacity: 0, x: 10}}
                                                transition={{duration: 0.7, delay: 0.2}}
                                                className="text-h4 lg:text-h2 font-bold"
                                            >
                                                {heroArchive.title}
                                            </motion.h1>
                                            <motion.div
                                                key={"teaser-" + item.id}
                                                initial={{opacity: 0, x: 10, y: -15}}
                                                animate={{opacity: 1, x: 0, y: 0}}
                                                exit={{opacity: 0, x: 10, y: 15}}
                                                transition={{duration: 0.7}}
                                                className="hidden lg:block"
                                            >
                                                <ModalButton label="Réserver une démo" className="btn btn-gray">
                                                    <ContactForm/>
                                                </ModalButton>
                                            </motion.div>
                                        </div>
                                        <InformationCard
                                            colors={{
                                                base: item.attributes.brandColor,
                                                badge: item.attributes.badgeColor
                                            }}
                                            badge={heroArchive.badge}
                                            icon={heroArchive.icon}
                                            data={heroArchive.informationCard}
                                            modules={heroArchive.moduleList}
                                            logo={heroArchive.logo}
                                        />
                                    </div>
                                    <motion.div
                                        key={"link" + item.id}
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -10}}
                                        transition={{duration: 0.7}}
                                        className="text-right"
                                    >
                                        <a
                                            href={"services/" + active}
                                            className="link-normal-white pt-8 inline-flex items-center gap-2"
                                        >
                                            {label}
                                            <Icon name="arrowRight"/>
                                        </a>
                                    </motion.div>
                                    <motion.div
                                        key={"teaser-" + item.id}
                                        initial={{opacity: 0, x: 10, y: -15}}
                                        animate={{opacity: 1, x: 0, y: 0}}
                                        exit={{opacity: 0, x: 10, y: 15}}
                                        transition={{duration: 0.7}}
                                        className="pt-4"
                                    >
                                        <ModalButton label="Réserver une démo"
                                                     className="btn btn-gray w-full lg:hidden">
                                            <ContactForm/>
                                        </ModalButton>
                                    </motion.div>
                                </motion.div>
                            )
                        })
                    }
                </motion.div>
                {/* Desktop : vertical carousel */}
                <div className="hidden lg:block">
                    <VerticalCarousel>
                        {modules.map((item, index) => (
                            <SidebarCardService
                                key={item.id}
                                active={active}
                                setActive={setActive}
                                service={item.attributes.slug}
                            />
                        ))}
                    </VerticalCarousel>
                </div>
                {/* Mobile : horizontal carousel */}
                <HorizontalCarousel>
                    {modules.map((item) => (
                        <SidebarCardService
                            key={item.id}
                            active={active}
                            setActive={setActive}
                            service={item.attributes.slug}
                        />
                    ))}
                </HorizontalCarousel>
            </div>
        </AnimatePresence>
    );
};

export default HeroArchiveService;