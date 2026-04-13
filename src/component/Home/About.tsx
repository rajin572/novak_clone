"use client";
import { useRef } from 'react';
import Container from '../ui/Container';
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);


    useGSAP(
        () => {
            const textSplit = SplitText.create(".text", {
                type: "lines, words",
                mask: "lines",
                autoSplit: true
            });

            gsap.from(textSplit.words, {
                yPercent: 100,
                ease: "power2.inOut",
                stagger: 0.05,
                smartWrap: true,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "restart pause restart pause",
                },
            })
        },
        { scope: containerRef },
    );



    return (
        <section ref={containerRef} className='pt-20'>
            <Container>
                <div className='max-w-5xl ml-auto'>
                    <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
                        <h1 className='text-lg sm:text-xl lg:text-2xl uppercase text'>About</h1>
                        <h3 className='text-3xl sm:text-4xl lg:text-5xl leading-7 sm:leading-10 lg:leading-12 text'>Kai Novak is an independent</h3>
                    </div>
                    <h3 className='text-3xl sm:text-4xl lg:text-5xl leading-7 sm:leading-10 lg:leading-12 text'>designer focused on crafting immersive
                        digital experiences. They believe every
                        project is an opportunity to deliver a unique
                        and memorable digital experience that
                        delights users and builds brand equity.</h3>
                </div>
            </Container>
        </section>
    );
};

export default About;