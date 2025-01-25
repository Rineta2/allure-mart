import React from 'react'

import { homeImg, homeData } from "@/components/section/home/data/home"

import Image from "next/image"

import Link from "next/link"

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

                    <div className="py-6 lg:py-10 flex flex-col gap-6 w-full order-1 lg:order-2 text-center lg:text-left">
                        <h3 className="text-xl md:text-2xl font-bold">{homeData.text}</h3>
                        <h1 className="text-4xl md:text-5xl xl:text-5xl font-bold text-primary">{homeData.title}</h1>
                        <p className="text-base md:text-lg max-w-2xl mx-auto lg:mx-0">{homeData.description}</p>
                        <Link
                            href={homeData.href}
                            className="btn bg-primary text-white w-fit mx-auto lg:mx-0 hover:bg-title transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg px-6 py-3 rounded-lg"
                        >
                            {homeData.name}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
