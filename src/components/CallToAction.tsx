"use client"
import React, {useState} from 'react';
import Button, {ModalButton} from "@/components/Button";
import {CallToActionPageType, CallToActionType} from "@/utils/types";
import ContactForm from "@/components/ContactForm";
import clsx from "clsx";
import emptyImg from "@/assets/empty-img.png"
import toast from "react-hot-toast";

const CallToAction = ({title, text, headingClassName, buttonClassName, noBg}: CallToActionType) => {
    return (
        <section
            className={`${noBg ? "" : "bg-gradient-to-b from-accent-shadow"} from-50% to-white to-50% py-12 full-width -mt-px`}>
            <div
                className="flex flex-col lg:flex-row items-center justify-between w-full bg-grayscale-lighter p-8 rounded-lg gap-8">
                <div className="flex-[3] pb-6 lg:pb-0">
                    <h3 className={"text-h3 font-bold pb-2 " + headingClassName}>{title}</h3>
                    <p className="paragraph">{text}</p>
                </div>
                <ModalButton label={"Être recontacté par un conseiller"} className={"flex-1 btn " + buttonClassName}>
                    <ContactForm/>
                </ModalButton>
            </div>
        </section>
    );
};
export default CallToAction;

export const CallToActionRessource = ({
                                          title,
                                          text,
                                          headingClassName,
                                          buttonClassName,
                                          noBg,
                                          buttonLabel,
                                          url
                                      }: CallToActionType) => {
    return (
        <section
            className={`${noBg ? "" : "bg-gradient-to-b from-accent-shadow"} from-50% to-white to-50% py-12 full-width -mt-px`}>
            <div
                className="flex flex-col lg:flex-row items-center justify-between w-full bg-grayscale-lighter p-8 rounded-lg gap-8">
                <div className="flex-[3] pb-6 lg:pb-0">
                    <h3 className={"text-h3 font-bold pb-2 " + headingClassName}>{title}</h3>
                    <p className="paragraph">{text}</p>
                </div>

                {url === "#" ?
                    <ModalButton label={buttonLabel} className={"flex-1 btn " + buttonClassName}>
                        <ContactForm/>
                    </ModalButton>
                    :
                    <Button url={url} label={buttonLabel} className={"flex-1 btn " + buttonClassName}/>
                }
            </div>
        </section>
    );
};

export const CallToActionNewsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({
                    email: email
                })
            })
            toast.success("Email bien enregistré !")
            e.target.reset();
        } catch (err) {
            console.error(err)
            toast.error('Une erreur est survenue, ressayez ultérieurement.')
        }
    }

    return (
        <section className="pt-12 pb-24 full-width">
            <div
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24 w-full bg-grayscale-lightest p-8 rounded-lg">
                <div>
                    <h3 className="text-h3 text-accent font-bold pb-2">Restez informé sur nos évolutions
                        logicielles</h3>
                    <p className="paragraph">Recevez les dernières mises à jour.</p>
                </div>
                <div className="flex-auto">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 pb-2 h-[2.625rem]">
                        <input
                            className="flex-auto border-grayscale-medium rounded placeholder:text-grayscale-medium"
                            type="email"
                            name="email"
                            id="name"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn-medium btn-accent"
                        >
                            S&apos;inscrire
                        </button>
                    </form>
                    <p className="text-badge text-grayscale-darker md:text-right items-center gap-1">En vous inscrivant,
                        vous acceptez notre
                        <a className=" inline-block md:pl-0.5 hover:text-accent-peps transition-all duration-300"
                           href="/politique-de-confidentialite">Politique de confidentialité</a>.</p>
                </div>
            </div>
        </section>
    );
};

interface CallToActionImageType {
    title: string;
    text: string;
    label?: string;
    url?: string;
    image: {
        data: {
            attributes: {
                url: string;
                alternativeText: string;
            }
        }
    };
    document?: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
    position?: "image à gauche" | "image à droite";
    color: "bleu" | "gris" | "bleu clair";
    background?: boolean;
}

export const CallToActionImage = ({
                                      title,
                                      text,
                                      label,
                                      url,
                                      image,
                                      position = 'image à gauche',
                                      color,
                                      document,
                                      background
                                  }: CallToActionImageType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    return (
        <section className={clsx(`py-6 sm:py-8 lg:py-12 full-width`,
            color === "bleu" && "text-white",
            color === "bleu clair" && "text-white",
            background && "bg-gradient-to-b from-40% from-accent-shine to-40% to-white",
        )}
        >
            <div
                className={clsx("grid sm:grid-cols-2 lg:grid-cols-5 w-full rounded-lg overflow-clip md:h-[22rem]", color === "gris" && "border border-grayscale-medium")}>
                <div className={clsx("flex flex-col items-start p-8",
                    position === 'image à droite' && "lg:col-span-2",
                    position === 'image à gauche' && "order-1 lg:col-span-3",
                    color === "bleu" && "bg-featured-shadow",
                    color === "bleu clair" && "bg-featured",
                    color === "gris" && "bg-grayscale-lightest"
                )}
                >
                    <h3 className={clsx("text-h3 font-bold pb-4", color === "gris" && "text-featured")}>{title}</h3>
                    <p className={clsx("pb-8", color === "gris" && "paragraph max-w-[28rem]")}>{text}</p>
                    {url &&
                        <Button
                            className={clsx("btn btn-white mt-auto",
                                color === "bleu" && "btn-white",
                                color === "gris" && "btn-gray"
                            )}
                            label={label}
                            url={url}
                        />
                    }
                    {document &&
                        <Button
                            className={clsx("btn btn-white mt-auto",
                                color === "bleu" && "btn-white",
                                color === "gris" && "btn-gray"
                            )}
                            label={label}
                            url={backUrl! + document}
                        />
                    }
                </div>
                <div className={clsx("h-48 sm:h-auto md:h-[22rem] w-full object-cover",
                    position === 'image à droite' && "lg:col-span-3",
                    position === 'image à gauche' && "lg:col-span-2"
                )}
                >
                    <img
                        className="h-full w-full object-cover object-center"
                        src={image && image.data ? backUrl + image.data.attributes.url : emptyImg.src}
                        alt={image && image.data ? image.data.attributes.alternativeText : ""}
                    />
                </div>
            </div>
        </section>
    );
};

export const CallToActionPage = ({title, text, headingClassName, buttonClassName, colors}: CallToActionPageType) => {
    const [hover, setHover] = React.useState(false);
    const btnStyle = {
        backgroundColor: hover ? colors?.hover : colors?.base,
    };
    return (
        <section className=" relative full-width md:-mt-[88px] lg:-mt-[120px] py-6 md:py-8 lg:py-12">
            <div
                className="flex flex-col lg:flex-row items-center justify-between w-full bg-grayscale-lighter p-8 rounded-lg">
                <div className="lg:w-3/5 2xl:w-auto">
                    <h3 style={{color: colors?.base}}
                        className={clsx("text-h3 font-bold pb-2 text-center lg:text-left", headingClassName)}>{title}</h3>
                    <p className="paragraph pb-6 lg:pb-0">{text}</p>
                </div>
                <ModalButton onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={btnStyle}
                             label="Être recontacté par un conseiller" className={clsx("btn ", buttonClassName)}>
                    <ContactForm/>
                </ModalButton>
            </div>
        </section>
    );
};


