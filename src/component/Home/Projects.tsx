"use client";
import { useRef } from "react";
import Container from "../ui/Container";
import { projectItems } from "@/data/data";
import Image from "next/image";
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";

const Projects = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const projectRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const textSplit = SplitText.create(".text", {
                type: "lines words",
                mask: "lines",
                autoSplit: true
            });

            gsap.from(textSplit.words, {
                yPercent: 100,
                ease: "power2.inOut",
                stagger: 0.1,
                smartWrap: true,
                scrollTrigger: {
                    trigger: ".project-header",
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "restart pause restart pause",
                },
            });

            projectRef.current.forEach((item) => {
                if (!item) return;

                const imageWraper = item.querySelector<HTMLElement>(".project-image");

                if (!imageWraper) return;

                const xTo = gsap.quickTo(imageWraper, "x", { duration: 0.2, ease: "power3" });
                const yTo = gsap.quickTo(imageWraper, "y", { duration: 0.2, ease: "power3" });

                const onMove = (e: MouseEvent) => {
                    const rect = item.getBoundingClientRect();

                    const x = (e.clientX - rect.left) - 125;
                    const y = (e.clientY - rect.top) - 100;

                    xTo(x);
                    yTo(y);
                };
                const onEnter = () => {
                    gsap.to(imageWraper, {
                        autoAlpha: 1,
                        scale: 1.5,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                };
                const onLeave = () => {
                    gsap.to(imageWraper, {
                        autoAlpha: 0,
                        scale: 0.5,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                };

                item.addEventListener("mousemove", onMove);
                item.addEventListener("mouseenter", onEnter);
                item.addEventListener("mouseleave", onLeave);

            });
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} className="py-20 lg:py-24">
            <Container>
                <div className="project-header space-y-4 uppercase">
                    <p className="text-sm sm:text-base lg:text-lg font-medium text">
                        Recent Projects
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium max-w-4xl text">
                        Selected works that demonstrate our approach to digital craft
                    </h2>
                </div>

                <div className="mt-10 sm:mt-14 lg:mt-18 divide-y divide-neutral-300 border-t border-neutral-300 flex-1">
                    {projectItems.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => {
                                projectRef.current[index] = el;
                            }}
                            className="p-8 hover:bg-neutral-50 focus:bg-neutral-50 transition-all hover:pl-12 cursor-pointer relative"
                        >
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium ">
                                {item.title}
                            </h3>
                            <div className="absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20! max-w-50 w-full h-34 project-image mt-4">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="w-full h-full object-cover  z-20!"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Projects;
