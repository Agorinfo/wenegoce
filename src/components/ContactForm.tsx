"use client"
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import getGlobal from "@/actions/getGlobal";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import {sendMail} from "@/utils/sendEmail";
import send from "@/actions/SendEmail";

const ContactForm = () => {
    const url = process.env.NEXT_PUBLIC_FRONT_URL;
    const [active, setActive] = useState("formulaire");
    const [contact, setContact] = useState({
        firstname: "",
        name: "",
        company:"",
        email: "",
        tel: "",
        object: "",
        message: ""
    });

    const handleChange = (e: any) => {
        const {name, value, type, checked} = e.target;
        setContact({
            ...contact,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(contact)
    };

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`${url}/api/send-contact`, options)
    //             .then((res) => res.json());
    //         toast.success("Message envoyé !")
    //     } catch (error) {
    //         toast.error("Une erreur est survenu, réessayez ultérieurement...")
    //     } finally {
    //         setContact({
    //             firstname: "",
    //             name: "",
    //             company:"",
    //             email: "",
    //             tel: "",
    //             object: "",
    //             message: ""
    //         });
    //     }
    // };

    // async function handleSubmit(event: any) {
    //
    //     event.preventDefault();
    //     const formData = new FormData(event.target)
    //     try {
    //
    //         const response = await fetch('/api/send-contact', {
    //             method: 'post',
    //             body: formData,
    //         });
    //
    //         if (!response.ok) {
    //             console.log("falling over")
    //             throw new Error(`response status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData['message'])
    //         toast.success("Message envoyé !")
    //         // alert('Message successfully sent');
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Une erreur est survenue")
    //         // alert("Error, please try resubmitting the form");
    //     } finally {
    //         event.target.reset();
    //     }
    // };
     const handleSubmit = (e: any) => {
         send("Test Mail", `
        <h1>Hello World</h1>
    `)
     }

    const {data, isLoading, error} = useQuery({
        queryKey: ["global"],
        queryFn: getGlobal
    })

    const {siteName, street, adressComp, zipCode, city, tel, email} = data;

    const telUrl= tel.replaceAll(" ", "").substring(1);

    if(isLoading) return <Loader />

    if(error) return <p>{error.message}</p>

    return (
        <div className="flex flex-col lg:flex-row bg-white">
            <h2 className="text-h3 font-bold capitalize pt-8 px-8 pb-6 lg:hidden">Contacter {siteName}</h2>
            <div className="lg:hidden px-8 flex">
                <div className="flex justify-start items-start gap-1 rounded-lg border overflow-clip">
                    <button
                        onClick={() => setActive('formulaire')}
                        className={`px-4 py-3 w-[9.25rem] ${active === "formulaire" ? "text-accent bg-accent-shine" : "text-grayscale-darker"}`}
                    >
                        Formulaire
                    </button>
                    <button
                        onClick={() => setActive('coordonnees')}
                        className={`px-4 py-3 w-[9.25rem] ${active === "coordonnees" ? "text-accent bg-accent-shine" : "text-grayscale-darker"}`}
                    >
                        Coordonnées
                    </button>
                </div>
            </div>
            <div
                className={`p-8 flex flex-col justify-between items-start lg:border-r lg:border-grayscale-lighter lg:w-[33.333vw] max-w-[32rem] lg:block ${active === "coordonnees" ? "block" : "hidden lg:block"}`}>
                <div className="">
                    <div className="pb-6 hidden lg:block">
                        <img src="/logotype.webp" alt="Agorinfo"/>
                    </div>
                    <div className="flex flex-col gap-2 pb-6">
                        <h3 className="text-h4 font-bold">{siteName}</h3>
                        <div className="flex flex-col items-start">
                        <span>{street}</span>
                            <span>{adressComp}</span>
                            <span>{zipCode} {city}</span>
                        </div>
                        <a className="link-normal" href={"tel:+33" + telUrl}>{tel}</a>
                        <a className="link-normal" href={"mailto:" + email}>{email}</a>
                    </div>
                </div>
                <div className="pb-8">
                    <h4 className="text-h4 font-bold">Besoin d&apos;assistance ? </h4>
                    <p className="text-grayscale-darkest pb-6">Envoyez votre demande au support technique</p>
                    <Button label="Créer un ticket" url={"https://agorinfo.atlassian.net/servicedesk/customer/portals"} className="btn btn-gray"/>
                </div>
            </div>
            <div className={`p-8 lg:w-[50vw] max-w-[48rem] ${active === "formulaire" ? "block" : "hidden lg:block"}`}>
                <h2 className="text-h3 font-bold capitalize pb-6 hidden lg:block">Contacter {siteName}</h2>
                <form className="grid sm:grid-cols-2 gap-4">
                    <label className="label-style" htmlFor="firstname">
                        Prénom *
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={contact.firstname}
                            className="input-style"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="label-style" htmlFor="name">
                        Nom *
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={contact.name}
                            className="input-style"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="label-style sm:col-span-full" htmlFor="company">
                        Société
                        <input
                            type="text"
                            name="company"
                            id="company"
                            value={contact.company}
                            className="input-style"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="label-style" htmlFor="email">
                        Email *
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={contact.email}
                            className="input-style"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="label-style" htmlFor="tel">
                        Téléphone *
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            value={contact.tel}
                            className="input-style"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="flex flex-col col-span-full">
                        <p className="pb-4 text-featured">Objet</p>
                        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12">
                            <label htmlFor="contact" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="contact"
                                    name="civility"
                                    value="Être recontacté"
                                    className="radio-style"
                                    defaultChecked
                                    onChange={handleChange}
                                />
                                Être recontacté
                            </label>
                            <label htmlFor="demo" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="demo"
                                    name="civility"
                                    value="Réserver une démo"
                                    className="radio-style"
                                    onChange={handleChange}
                                />
                                Réserver une démo
                            </label>
                            <label htmlFor="other" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="other"
                                    name="civility"
                                    value="Autre demande"
                                    className="radio-style"
                                    onChange={handleChange}
                                />
                                Autre demande
                            </label>
                        </div>
                    </div>
                    <label className="label-style col-span-full" htmlFor="message">
                        Message *
                        <textarea
                            className="input-style resize-none h-32"
                            name="message"
                            id="message"
                            value={contact.message}
                            onChange={handleChange}
                            required
                        >
                            </textarea>
                    </label>
                    <div className="flex items-center justify-between col-span-full">
                        <button className="btn btn-accent mb-4" type={"submit"} formAction={handleSubmit}>Envoyer</button>
                        <span className={"text-sm text-grayscale-darker"}>* Obligatoire</span>
                    </div>
                    <p className="text-sm text-grayscale-darker col-span-full">En envoyant ce message, vous acceptez
                        la <a href="/politique-de-confidentialité">Politique de confidentialité</a>.</p>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;