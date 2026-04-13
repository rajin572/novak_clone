"use client";
import Container from "../ui/Container";
import { workSecItems } from "@/data/data";
import Image from "next/image";
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";
import { useRef } from "react";

const Works = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const textSplit = SplitText.create(".text", {
                type: "lines words",
                mask: "lines",
            });

            gsap.from(textSplit.words, {
                yPercent: 100,
                ease: "power2.inOut",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".works-header",
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "restart pause restart pause",
                },
            });

            gsap.utils.toArray(".img-container").forEach((item) => {
                const el = item as HTMLElement;
                const image = el.querySelector<HTMLElement>(".img");
                gsap.fromTo(
                    image,
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "restart reverse restart reverse",
                        },
                    },
                );
            });

        },
        { scope: containerRef },
    );

    return (
        <section className="py-16 lg:py-20">
            <Container>
                <div ref={containerRef}>
                    <div
                        className="works-header flex flex-col lg:flex-row justify-between lg:items-center gap-5 py-16 lg:py-20"
                    >
                        <div className="flex flex-col gap-4">
                            <h1 className="section-title text">selected</h1>
                            <h1 className="section-title text">Work</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium uppercase text">
                                Selected{" "}
                            </h1>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium uppercase text">
                                Works and Projects
                            </h1>
                        </div>
                    </div>
                    <div className="space-y-20">
                        {workSecItems.map((item) => (
                            <div
                                key={item.id}
                                className="img-container flex flex-col lg:flex-row justify-between items-center gap-5 sm:gap-10 lg:gap-20 py-16 lg:py-20 group"
                            >
                                <div className="flex flex-col gap-4 lg:w-1/2">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
                                        {item.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl lg:text-2xl">{item.text}</p>
                                </div>
                                <div className="lg:group-nth-[2]:order-first lg:w-1/2">
                                    <Image
                                        style={{
                                            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                                        }}
                                        src={item.img}
                                        alt={item.title}
                                        width={1000}
                                        height={1000}
                                        className="img w-full h-full object-cover "
                                        priority
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Works;
