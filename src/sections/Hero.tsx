"use client";
import AwardButton from "@/components/AwardButton";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef<HTMLVideoElement>(null);
  const srcSource = (index: number) => `videos/hero-${index}.mp4`;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play();
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div
        id='video-frame'
        className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div
              className='origin-center scale-50 opacity-0 transition-all ease-in duration-300 hover:scale-100 hover:opacity-100'
              onClick={handleMiniVdClick}>
              <video
                ref={nextVdRef}
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
                src={srcSource((currentIndex % totalVideos) + 1)}
                loop
                muted
              />
            </div>
          </div>
          <video
            ref={nextVdRef}
            id='next-video'
            src={srcSource(currentIndex)}
            loop
            muted
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
          />
          <video
            src={srcSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
          />
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-40'>
          G<b>A</b>MING
        </h1>
        <div className='absolute inset-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              redefi<b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <AwardButton
              id='watch-trailer'
              title='Watch trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='flex-center gap-1 bg-yellow-300'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
