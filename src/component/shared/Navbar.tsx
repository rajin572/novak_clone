/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap-util";
import Container from "../ui/Container";
import { navItems } from "@/data/data";

const Navbar = () => {
    const path = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [height, setHeight] = useState(0);
    const navbarRef = useRef<HTMLDivElement>(null);
    const navWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const show = gsap.to(navWrapperRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "power2.inOut",
                paused: true,
            });

            ScrollTrigger.create({
                trigger: navWrapperRef.current,
                start: "top top",
                end: "max",
                pin: false,
                onUpdate: (self) => {
                    if (!mobileMenuOpen && self.scroll() === 0 && self.direction === -1) {
                        show.reverse();
                        setTimeout(() => setScrolled(false), 1000);
                        return;
                    }
                    if (!mobileMenuOpen && self.direction === 1) {
                        show.play();
                        setTimeout(() => setScrolled(false), 100);
                    } else {
                        show.reverse();
                        setScrolled(true);
                    }
                },
            });
        },
        { scope: navWrapperRef },
    );

    // Mobile menu height animation
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (mobileMenuOpen) {
            // measure after the element has been rendered
            timer = setTimeout(() => {
                setHeight(navbarRef.current?.scrollHeight ?? 0);
            }, 0);
        } else {
            // schedule the collapse instead of doing it synchronously
            timer = setTimeout(() => {
                setHeight(0);
            }, 0);
        }

        return () => clearTimeout(timer);
    }, [mobileMenuOpen]);

    // const changeLanguage = (lng: string) => {
    //     Cookies.set("dealrLang", lng);
    //     window.location.reload();
    // };

    // const languageItems = [
    //     { key: "en", label: "English", onClick: () => changeLanguage("en") },
    //     { key: "de", label: "Deutsch", onClick: () => changeLanguage("de") },
    // ];

    return (
        <div
            ref={navWrapperRef}
            className={`z-99999! shadow-none py-2 text-base-color ${scrolled && "backdrop-blur-md"}`}
        >
            <Container>
                <header className="text-base flex justify-between items-center z-99999 ">
                    {/* Logo */}
                    <div>
                        <Link
                            data-cursor="link"
                            href="/"
                            className="cursor-pointer flex justify-center items-end gap-1 text-2xl font-bold text-base-color"
                        >
                            Novak
                        </Link>
                    </div>

                    {/* Nav links */}
                    <nav>
                        {/* Desktop */}
                        <div className="hidden lg:block">
                            <ul className="flex justify-center items-center gap-8 uppercase">
                                {navItems.map((navItem: any, i: number) => (
                                    <li
                                        data-cursor="hide"
                                        key={i}
                                        className={`cursor-pointer text-lg hover:text-secondary transition-colors duration-300 ${path === navItem.route
                                            ? "text-secondary font-bold underline underline-offset-4"
                                            : ""
                                            }`}
                                    >
                                        <Link href={navItem.route}>{navItem.name}</Link>
                                    </li>
                                ))}
                                <li
                                    className={`cursor-pointer text-lg hover:text-secondary transition-colors duration-300`}
                                >
                                    <Link
                                        href="/learning"
                                        className="px-3 py-2 rounded bg-base-color text-primary-color  transition-colors duration-200"
                                    >
                                        Watch Tutorial
                                    </Link>{" "}
                                </li>
                            </ul>
                        </div>

                        {/* Mobile */}
                        <div
                            style={{
                                height: `${height}px`,
                                overflow: "hidden",
                                transition: "height 0.3s ease",
                            }}
                            ref={navbarRef}
                            className="block lg:hidden bg-[#FEFEFE] w-full absolute -top-2 left-0 shadow-md -z-9999"
                        >
                            <ul className="flex justify-end items-center gap-5 flex-col py-5 mt-16">
                                {navItems.map((navItem: any, i: number) => (
                                    <li
                                        data-cursor="hide"
                                        key={i}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`cursor-pointer hover:text-secondary transition-colors duration-300 ${path === navItem.route
                                            ? "text-secondary font-bold underline underline-offset-4"
                                            : ""
                                            }`}
                                    >
                                        <Link href={navItem.route}>{navItem.name}</Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        data-cursor="hide"
                                        onClick={() => setMobileMenuOpen(false)}
                                        href="/learning"
                                        className="px-3 py-1 rounded-full border-2 border-secondary bg-secondary text-background font-semibold"
                                    >
                                        Learn
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Desktop right actions */}
                    {/* <div className="hidden lg:flex items-center gap-3">
                        <Link data-cursor="hide"
                            href="/learning"
                            className="px-3 py-1 rounded-full border-2 border-secondary bg-secondary text-background font-semibold transition-colors duration-200"
                        >
                            Learn
                        </Link>

                        <Dropdown items={languageItems} trigger="click" placement="bottomRight">
                            <Button variant="outline" size="sm" className="border-gray-300 rounded-full p-1.5">
                                <LuLanguages className="text-xl text-secondary" />
                            </Button>
                        </Dropdown>
                    </div> */}

                    {/* Mobile icons */}
                    <div className="lg:hidden select-none flex items-center gap-3">
                        {/* <Dropdown items={languageItems} trigger="click" placement="bottomRight">
                            <Button variant="ghost" size="sm" className="p-1">
                                <LuLanguages className="text-xl text-[#185dde]" />
                            </Button>
                        </Dropdown> */}

                        <button
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#185dde"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#185dde"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </header>
            </Container>
        </div>
    );
};

export default Navbar;
