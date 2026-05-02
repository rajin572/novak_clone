"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cards = [
{
title: "Brand Foundation",
copy: " The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every, interaction.",
img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
},
{
title: "Design Identity",
copy: "Your brand's visual fingerprint. It crafts a distinctive look that sparks recognition and builds emotional connections with your audience.",
img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
},
{
title: "Brand Strategy",
copy: "A roadmap for success. It defines your target audience, market positioning, and growth plan, ensuring your brand's long-term success.",
img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
},
{
title: "Brand Activation",
copy: "Bringing your brand to life. It creates memorable experiences that engage your audience and build lasting connections.",
img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
},
];

const Card = ({
title,
copy,
img,
index,
}: {
title: string;
copy: string;
img: string;
index: number;
}) => {

    const cardStyles = [
        { bg: "#c3abff", text: "#000" },
        { bg: "#f4f4f4", text: "#000" },
        { bg: "#fed35b", text: "#000" },
        { bg: "#1e1e1e", text: "#ffffff" },
    ];

    return (
        <div
            className="card relative min-h-75"
            id={`card-${index + 1}`}
            style={{
                backgroundColor: cardStyles[index].bg,
                color: cardStyles[index].text,
            }}
        >
            <div className="card-inner relative will-change-transform w-full h-full p-10 flex gap-4">
                <div className="card-content flex-3 ">
                    <h1 className="text-6xl font-semibold leading-4 mb-16 lg:mb-10">{title}</h1>
                    <p className="hidden lg:block text-xl font-medium">{copy}</p>
                </div>
                <div className="card-img hidden lg:block flex-1 aspect-video rounded-xl overflow-hidden">
                    <Image
                        src={img}
                        alt={title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );

};

const StackingCards = () => {

    const containerRef = useRef<HTMLDivElement | null>(null);


    useGSAP(
        () => {

            const cards = gsap.utils.toArray(".card") as HTMLElement[];

            ScrollTrigger.create({
                trigger: cards[0],
                start: "top 35%",
                endTrigger: ".outro",
                end: "top 65%",
                pin: ".intro",
                pinSpacing: false,
            });

            cards.forEach((card, index) => {
                const isLastCard = index === cards.length - 1;
                const cardInner = card.querySelector(".card-inner") as HTMLElement;
                const nextCard = cards[index + 1];

                if (!isLastCard && nextCard) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 35%",
                        endTrigger: nextCard,
                        end: "top 35%",
                        pin: true,
                        pinSpacing: false,
                        anticipatePin: 1,
                    });

                    gsap.to(cardInner, {
                        y: `-${(cards.length - index) * 14}vh`,
                        ease: "none",
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top 100%",
                            end: "top 35%",
                            scrub: true,
                        }
                    });
                }

            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };

        }, { scope: containerRef, });

    return (
        <div ref={containerRef}>
            <div className="intro h-screen relative"></div>
            <section className="cards ">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} copy={card.copy} img={card.img} index={index} />
                ))}
            </section>
            <div className="outro h-screen relative"></div>
        </div>
    );

};

export default StackingCards;
