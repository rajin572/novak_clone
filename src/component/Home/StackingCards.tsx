"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
    {
        title: "Brand Foundation",
        copy: "The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every interaction.",
        img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
        bg: "#c3abff",
        color: "#000",
    },
    {
        title: "Design Identity",
        copy: "Your brand's visual fingerprint. It crafts a distinctive look that sparks recognition and builds emotional connections with your audience.",
        img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
        bg: "#f4f4f4",
        color: "#000",
    },
    {
        title: "Brand Strategy",
        copy: "A roadmap for success. It defines your target audience, market positioning, and growth plan, ensuring your brand's long-term success.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        bg: "#fed35b",
        color: "#000",
    },
    {
        title: "Brand Activation",
        copy: "Bringing your brand to life. It creates memorable experiences that engage your audience and build lasting connections.",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        bg: "#1e1e1e",
        color: "#fff",
    },
];

export default function StackingCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".card");

            cards.forEach((card, index) => {
                if (index === cards.length - 1) return;

                // Pin each card at the top of the viewport
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: cards[cards.length - 1],
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                // Scale down as the next card covers it
                gsap.to(card, {
                    scale: 1 - (cards.length - 1 - index) * 0.025,
                    transformOrigin: "top center",
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",
                        endTrigger: cards[cards.length - 1],
                        end: "bottom bottom",
                        scrub: true,
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            {CARDS.map((card, index) => (
                <div
                    key={index}
                    className="card"
                    style={{
                        position: "relative",
                        height: "100vh",
                        width: "100%",
                        backgroundColor: card.bg,
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                        padding: "40px",
                        gap: "40px",
                        zIndex: index + 1,
                        borderRadius: index === 0 ? "0" : "20px 20px 0 0",
                        marginTop: index === 0 ? "0" : "-20px",
                    }}
                >
                    {/* Text */}
                    <div style={{ flex: 3 }}>
                        <h1
                            style={{
                                fontSize: "clamp(3rem, 6vw, 5rem)",
                                fontWeight: 700,
                                lineHeight: 1.05,
                                marginBottom: "1.5rem",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {card.title}
                        </h1>
                        <p
                            style={{
                                fontSize: "1.1rem",
                                lineHeight: 1.6,
                                maxWidth: "460px",
                                opacity: 0.85,
                            }}
                        >
                            {card.copy}
                        </p>
                    </div>

                    {/* Image */}
                    <div
                        style={{
                            flex: 1,
                            minWidth: "220px",
                            aspectRatio: "4/3",
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src={card.img}
                            alt={card.title}
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}