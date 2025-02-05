"use client";
import AwardTitle from "@/components/AwardTitle";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AwardButton from "@/components/AwardButton";
const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <div id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
      <div className='flex flex-col items-center size-full py-10 pb-24'>
        <p className='font-general text-sm uppercase md:text-[10px]'>the multiversal ip world</p>
        <div className='relative size-full'>
          <AwardTitle
            title='the st<b>o</b>ry of <br /> a hidden real<b>m</b>'
            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
          />

          <div className='story-img-container'>
            <div className='story-img-mask'>
              <div className='story-img-content'>
                <Image
                  ref={frameRef}
                  src='/img/entrance.webp'
                  alt='entrance.webp'
                  fill
                  className='object-contain'
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                />
              </div>
            </div>
            <svg className='invisible absolute size-0' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <filter id='flt_tag'>
                  <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
                  <feColorMatrix
                    in='blur'
                    mode='matrix'
                    values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
                    result='flt_tag'
                  />
                  <feComposite in='SourceGraphic' in2='flt_tag' operator='atop' />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
          <div className='flex h-full w-fit flex-col items-center md:items-start'>
            <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
              Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and
              shape your fate amidst infinite opportunities.
            </p>

            <AwardButton id='realm-btn' title='discover prologue' containerClass='mt-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
