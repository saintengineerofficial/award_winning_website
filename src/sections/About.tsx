"use client";
import Image from "next/image";
import React from "react";
import AwardTitle from "@/components/AwardTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id='about' className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <p className='font-general text-sm uppercase md:text-[10px]'>Welcome to Zentry</p>
        <AwardTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass='mt-5 !text-black text-center'
        />
        <div className='about-subtext'>
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className='text-gray-500'>
            Zentry unites every player from countless games and platforms, both digital and
            physical, into a unified Play Economy
          </p>
        </div>
      </div>
      <div id='clip' className='h-dvh w-screen'>
        <div className='mask-clip-path about-image'>
          <Image
            src='/img/about.webp'
            alt='Background'
            fill
            className='object-cover absolute left-0 top-0 '
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default About;
