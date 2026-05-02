'use client'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-util'
import { useLenis } from 'lenis/react'
import Image from 'next/image'

const images = [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', top: '5vh', left: '10%', width: '26%', mLeft: '5%', mWidth: '55%', z: 300 },
    { src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', top: '25vh', left: '78%', width: '24%', mLeft: '45%', mWidth: '50%', z: -400 },
    { src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80', top: '50vh', left: '05%', width: '30%', mLeft: '0%', mWidth: '60%', z: -800 },
    { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', top: '80vh', left: '55%', width: '28%', mLeft: '35%', mWidth: '60%', z: 150 },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', top: '110vh', left: '2%', width: '22%', mLeft: '2%', mWidth: '45%', z: -600 },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', top: '140vh', left: '0%', width: '40%', mLeft: '0%', mWidth: '70%', z: -200 },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', top: '160vh', left: '80%', width: '45%', mLeft: '30%', mWidth: '65%', z: -1000 },
    { src: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80', top: '180vh', left: '20%', width: '18%', mLeft: '10%', mWidth: '40%', z: 400 },
    { src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80', top: '210vh', left: '60%', width: '25%', mLeft: '40%', mWidth: '55%', z: -500 },
    { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', top: '270vh', left: '10%', width: '24%', mLeft: '5%', mWidth: '50%', z: -800 },
    { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', top: '280vh', left: '70%', width: '22%', mLeft: '45%', mWidth: '50%', z: 200 },
    { src: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80', top: '330vh', left: '5%', width: '20%', mLeft: '0%', mWidth: '45%', z: -350 },
    { src: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80', top: '350vh', left: '70%', width: '26%', mLeft: '40%', mWidth: '55%', z: 100 },
    { src: 'https://images.unsplash.com/photo-1481253127861-534498168948?w=800&q=80', top: '380vh', left: '38%', width: '24%', mLeft: '20%', mWidth: '50%', z: -600 },
]

const targetImage = {
    src: 'https://images.unsplash.com/photo-1443527394413-4b820fd08dde?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    left: '40%',
    width: '20%',
    mLeft: '15%',
    mWidth: '70%',
}

const visionData = [
    {
        heading: 'Design',
        desc: 'Our design aesthetic is established through a consistent process and a detailed concept brief, which considers client needs, site context, and the future occupiers.',
    },
    {
        heading: 'Innovation',
        desc: 'We combine and test these elements to create a singular design vision concealing many influencing layers. This singular vision, like a piece of artwork, is unique and individual.',
    },
    {
        heading: 'Enhancement',
        desc: 'We believe the principles of design quality should always be present no matter the project brief or building scale. Every detail is meticulously refined to exceed expectations.',
    },
]

const duration = 0.8
const pause = 0.5
const stagger = 0.05
const easeLine = 'none'
const easeHead = 'power1.inOut'

const Stickygrid = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const pinWrapperRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    useLenis(() => ScrollTrigger.update())

    useLayoutEffect(() => {
        // using GSAP context
        const ctx = gsap.context(() => {
            const dim = 'rgba(255,255,255,0.2)'
            const bright = 'rgba(255,255,255,1)'

            const getHeadingX = (i: number) => {
                const items = gsap.utils.toArray<HTMLElement>('.heading-item')
                return items[i] ? -items[i].offsetLeft : 0
            }

            const splits = visionData.map((_, idx) =>
                SplitText.create(`.desc-block-${idx}`, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
            )
            splits.forEach(s => gsap.set(s.lines, { yPercent: 100 }))
            gsap.set('.heading-item', { color: dim })
            gsap.set('.heading-item-0', { color: bright })
            gsap.set('.moving-heading', { force3D: true, transformOrigin: '0% 50%' })

            gsap.utils.toArray<HTMLElement>('.grid-image').forEach(el => {
                gsap.to(el, {
                    yPercent: parseFloat(el.dataset.speed ?? '0') * 50,
                    ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
                })
            })

            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinWrapperRef.current,
                    start: 'center center',
                    end: () => {
                        const container = containerRef.current
                        const pin = pinWrapperRef.current
                        if (!container || !pin) return `+=${window.innerHeight * 6}`
                        return `+=${container.scrollHeight - window.innerHeight - pin.offsetTop}`
                    },
                    scrub: 0.55,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            })

            pinTl
                .to(targetRef.current, { width: '100vw', height: '100vh', marginLeft: 0, borderRadius: 0, ease: 'none', duration: 1 })
                .to('.center-text', { opacity: 0, duration: 1 }, '<')
                .to('.target-overlay', { opacity: 1, duration: 0.2 })
                .to(splits[0].lines, { yPercent: 0, stagger, duration: duration, ease: easeLine })
                .to({}, { duration: pause })

            for (let s = 0; s < visionData.length - 1; s++) {
                const next = s + 1
                const label = `slide${next + 1}`
                pinTl.addLabel(label)
                pinTl
                    .to('.moving-heading', { x: () => getHeadingX(next), duration: duration, ease: easeHead }, label)
                    .to(splits[s].lines, { yPercent: -100, stagger, duration: duration, ease: easeLine }, label)
                    .to(`.heading-item-${s}`, { color: dim, duration: duration }, label)
                    .to(`.heading-item-${next}`, { color: bright, duration: duration }, label)
                    .to(splits[next].lines, { yPercent: 0, stagger, duration: duration, ease: easeLine }, label)
                pinTl.to({}, { duration: pause })
            }

            return () => {
                splits.forEach(s => s.revert())
            }

        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative w-full h-[900vh] overflow-x-clip bg-[#fdfdfd]">

            <div className="center-text sticky top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-100 mix-blend-multiply">
                <h1 className="text-black text-[8vw] max-md:text-[13vw] font-medium tracking-tighter">
                    All Work
                </h1>
            </div>

            <div className="absolute inset-0 w-full h-full">
                {images.map((img, i) => (
                    <div
                        key={i}
                        data-speed={img.z / 500}
                        className="grid-image absolute shadow-[0_0.8vw_2.5vw_rgba(0,0,0,0.15)] group top-(--top) left-(--left) w-(--width) max-md:left-(--m-left) max-md:w-(--m-width)"
                        style={{ '--top': img.top, '--left': img.left, '--width': img.width, '--m-left': img.mLeft, '--m-width': img.mWidth, transform: `perspective(1200px) translateZ(${img.z}px)` } as React.CSSProperties}
                    >
                        <Image
                            width={1000}
                            height={1000}
                            src={img.src}
                            alt={`Architecture ${i}`}
                            className="w-full h-auto object-cover block grayscale-25 group-hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                    </div>
                ))}
            </div>

            <div
                ref={pinWrapperRef}
                className="absolute z-99 w-full h-screen flex justify-start items-center pointer-events-none overflow-hidden"
                style={{ top: '200vh', left: 0 }}
            >
                <div
                    ref={targetRef}
                    className="shadow-[0_0.8vw_2.5vw_rgba(0,0,0,0.15)] overflow-hidden pointer-events-auto relative ml-(--left) w-(--width) h-[40vh] max-md:ml-(--m-left) max-md:w-(--m-width) max-md:h-[50vh]"
                    style={{ '--left': targetImage.left, '--width': targetImage.width, '--m-left': targetImage.mLeft, '--m-width': targetImage.mWidth } as React.CSSProperties}
                >
                    <Image
                        width={1000}
                        height={1000}
                        src={targetImage.src}
                        alt="Featured Architecture"
                        className="w-full h-full object-cover block absolute inset-0 z-0"
                    />

                    <div className="target-overlay absolute inset-0 z-10 p-[3vw] max-md:p-[2vw] flex flex-col justify-between opacity-0 text-white pointer-events-none">

                        <div className="flex items-center text-[1vw] max-md:text-[3.2vw] font-medium tracking-widest">
                            <span className="mr-[1.25vw] max-md:mr-[1vw]">00</span>
                            <div className="grow h-[0.05vw] min-h-px bg-white/30" />
                            <span className="ml-[1.25vw] max-md:ml-[1vw]">VISION</span>
                        </div>

                        <div className="relative w-full min-w-0 grow overflow-hidden">
                            <div className="absolute top-1/2 -translate-y-1/2 w-full z-0 min-w-0 max-w-full left-[2.5vw] max-md:left-[1.5vw]">
                                <h2 className="moving-heading will-change-transform text-[7vw] max-md:text-[16vw] font-medium tracking-tighter whitespace-nowrap flex gap-[6vw] max-md:gap-[8.5vw] items-center w-max max-w-full">
                                    {visionData.map((data, idx) => (
                                        <span key={idx} className={`heading-item heading-item-${idx}`}>{data.heading}</span>
                                    ))}
                                </h2>
                            </div>

                            <div className="vision-desc-wrap absolute z-10 w-[30vw] max-md:w-[80vw] right-[1.5vw] bottom-[1.5vw] max-md:right-[1vw] max-md:bottom-0">
                                <div className="relative w-full min-h-[12vw] h-[16vw] max-md:min-h-[25vw] max-md:h-[30vw]">
                                    {visionData.map((data, idx) => (
                                        <p
                                            key={idx}
                                            className={`desc-block desc-block-${idx} absolute inset-0 m-0 w-full text-[1.1vw] max-md:text-[3.7vw] leading-[1.4] font-medium`}
                                        >
                                            {data.desc}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Stickygrid