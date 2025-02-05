import React from 'react'

import { homeImg, homeData } from "@/components/section/home/data/home"

import Image from "next/image"

import Link from "next/link"

import imgScroll from "@/components/assets/home/scroll.png"

import { LuArrowDown } from "react-icons/lu";

export default function Home() {
    return (
        <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
            </div>

            <div className="container relative">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 place-items-center">
                    <div className="w-full lg:w-[80%] h-full order-2 lg:order-1">
                        <Image
                            src={homeImg.img}
                            className="rounded-xl w-full h-full object-cover shadow-lg"
                            alt="home"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>

                    <div className="py-4 sm:py-6 lg:py-10 flex flex-col gap-4 sm:gap-6 w-full order-1 lg:order-2 text-center lg:text-left z-10">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{homeData.text}</h3>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">{homeData.title}</h1>
                        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0">{homeData.description}</p>
                        <Link
                            href={homeData.href}
                            className="btn bg-primary text-white w-fit mx-auto lg:mx-0 hover:bg-title transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
                        >
                            {homeData.name}
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-[-50%] sm:bottom-[-40%] md:bottom-[-50%] left-[42%] sm:left-[46%] w-full h-full flex items-center justify-center">
                    <a href="#populer" className="relative">
                        <Image
                            src={imgScroll}
                            alt="scroll"
                            className="object-cover animate-spin infinite ease-in-out w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 [filter:sepia(100%)_saturate(10000%)_hue-rotate(230deg)]"
                            style={{ animationDuration: '3000ms' }}
                            width={500}
                            height={500}
                        />
                        <LuArrowDown className="absolute bottom-[32%] left-[38%] transform -translate-x-1/2 text-3xl sm:text-4xl animate-bounce text-text" />
                    </a>
                </div>
            </div>
        </section>
    )
}
