'use client'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"



const AnimationSection = () => {


    useGSAP(() => {

        
        gsap.fromTo('.anime', {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            width: '70%',
        }, {
            y: -100,
            duration: 1,
            ease: 'sine.out',
            width: '100%',
            pin: true,
            height: '100vh',
            scrub: true,
            scrollTrigger: {
                trigger: '.anime',
                start: 'top 70%',
            }
        });

        const traitsText = new SplitText('.traits', {type: 'words'})

        gsap.fromTo(traitsText.words, {
            opacity:0,
            scale: 0.55,
            y: 500,
        }, {
            opacity:1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            ease: 'sine.out',
            duration:1,
            scrub: true,
            scrollTrigger: {
                trigger:'.anime',
                start: 'top 60%',

            }
        })




    })

  return (
    <div className="anime bg-black  translate-y-10 dark:bg-white dark:text-black text-white -gap-y-10 w-[70%] h-[500px] mx-auto perspective-top flex items-center justify-center flex-col">
        <p className="traits font-bebas text-[96px] md:text-[128px]">
            CREATIVE
        </p>
        <p className="traits font-bebas text-[96px] md:text-[128px]">
            PASSIONATE
        </p>
        <p className="traits font-bebas text-[96px] md:text-[128px]">
            DISCIPLINED
        </p>
    </div>  
  )
}

export default AnimationSection