"use client";
import { useRef } from "react";
import Container from "../ui/Container";
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";
const Banner = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const textSplit = SplitText.create(".text", {
                type: "words",
                mask: "words",
                autoSplit: true
            });

            gsap.from(textSplit.words, {
                yPercent: 100,
                ease: "power2.inOut",
                duration: 1,
                stagger: 0.03,
                smartWrap: true,
                scrollTrigger: {
                    trigger: ".hero-wrapper",
                    start: "top center",
                    toggleActions: "restart pause restart pause",
                },
            })
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="min-h-screen py-16 lg:py-20 flex items-center justify-center"
        >
            <Container>
                <div className="hero-wrapper">
                    <h1 className="hero-title text">building</h1>
                    <h1 className="hero-title text">impactful</h1>
                    <div className="flex items-center gap-5">
                        <h1 className="hero-title text">digital</h1>
                        <div className="font-medium tracking-wider uppercase space-y-1 sm:text-2xl text-base-color/80 hidden sm:block">
                            <h1 className="text">freelancer</h1>
                            <h1 className="text">digital designer</h1>
                            <h1 className="text">webflow expert</h1>
                        </div>
                    </div>
                    <h1 className="hero-title mb-3 text">presence</h1>
                    <div className="font-medium tracking-wider uppercase -space-y-1 sm:text-2xl text-base-color/80 block sm:hidden">
                        <h1 className="text">freelancer</h1>
                        <h1 className="text">digital designer</h1>
                        <h1 className="text">webflow expert</h1>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Banner;
