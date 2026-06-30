'use client'
import React, {useState} from 'react';
import Nav from "@/components/Nav";
import Button, {ModalButton} from "@/components/Button";
import {useQuery} from "@tanstack/react-query";
import getGlobal from "@/actions/getGlobal";
import getMenu from "@/actions/getMenu";
import Loader from "@/components/Loader";
import Link from "next/link";
import Modal from "@/components/Modal";
import ContactForm from "@/components/ContactForm";
import emptyImg from "@/assets/empty-img.png"
import Image from "next/image";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const{data, error, isLoading} = useQuery({
        queryKey: ["menu"],
        queryFn: () => getMenu()
    });

    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal()
    })

    const logo = global.data?.logo.data?.attributes.url
    const alt = global.data?.logo.data?.attributes.alternativeText
    if(isLoading) return  <Loader />

    if(error) return <p>{error.message}</p>

    return (
        <header className="sticky top-0 bg-white z-[999] border-b border-greyscale-lightest shadow-nav">
            <div className="flex items-center justify-between py-6 relative max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
                <Link className="relative block h-12 w-[200px]" href="/">
                    <Image className="object-contain" src={logo ? backUrl + logo : emptyImg.src} alt={alt ?? ""} fill sizes="200px"/>
                </Link>
                <Nav navItems={data.navItems} isOpen={isOpen} setIsOpen={setIsOpen} />
                <ModalButton label={"Nous contacter"} className="btn btn-accent hidden lg:inline-flex">
                    <ContactForm />
                </ModalButton>
                <Button type="button" label={"Menu"} onClick={() => setIsOpen(true)} className="btn-menu" burger/>
            </div>
        </header>
    );
};

export default Header;
