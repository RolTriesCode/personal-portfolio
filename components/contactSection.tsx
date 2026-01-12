'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import pfp from '@/public/threedblack.png'
import Image from "next/image";
import defaultpfp from '@/public/image.png'

const ContactSection = () => {

    useGSAP(() => {
        gsap.from('.skilltext12', {
            opacity: 0,
            y: 40,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.skilltext12',
                start: 'top 50%',
            }
        });

        gsap.from('.whatiuse12', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.whatiuse12',
                start: 'top 40%',
            }
        });

        document.querySelectorAll('.dives').forEach((el) => {
            gsap.from(el, {
                x: -200,
                opacity: 0,
                duration: 1,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: el,       // each element triggers individually
                    start: 'top 40%',  // animation starts when element enters viewport
                }
            });
        });






    })



    return (
        <section id="contact" className="lg:h-fit flex flex-wrap-reverse items-center mb-50">
            <div className="w-[90%] lg:w-[50%] mx-auto flex flex-col gap-y-10 lg:pt-20 lg:px-20">


                <div className="dives relative flex flex-row items-center gap-0">
                    <Image src={pfp} alt="Me" className="w-20 rounded-sm -rotate-12 z-10" />
                    <svg className="absolute text-white z-20 left-16" xmlns="http://www.w3.org/2000/svg" width={31} height={31} viewBox="0 0 16 16">
                        <path fill="currentColor" d="M14.9 1.1c-1.4-1.4-3.7-1.4-5.1 0L5.4 5.4C4 6.9 4 9.1 5.4 10.6c.1.1.3.2.4.3l1.5-1.5c-.1-.1-.3-.2-.4-.3c-.6-.6-.6-1.6 0-2.2l4.4-4.4c.6-.6 1.6-.6 2.2 0s.6 1.6 0 2.2L12.2 6c.4.8.5 1.7.4 2.5l2.3-2.3c1.5-1.4 1.5-3.7 0-5.1"></path>
                        <path fill="currentColor" d="M10.2 5.1L8.7 6.6s.3.2.4.3c.6.6.6 1.6 0 2.2l-4.4 4.4c-.6.6-1.6.6-2.2 0s-.6-1.6 0-2.2L3.8 10c-.4-.8-.1-1.3-.4-2.5L1.1 9.8c-1.4 1.4-1.4 3.7 0 5.1s3.7 1.4 5.1 0l4.4-4.4c1.4-1.4 1.4-3.7 0-5.1c-.2-.1-.4-.3-.4-.3"></path>
                    </svg>
                    <Image src={defaultpfp} alt="You" className="w-20 rounded-sm rotate-12 -z-0" />
                </div>
                <div className="dives flex flex-row items-center gap-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[16px] md:text-[17px] font-semibold">Address</p>
                        <p className="text-[14px] md:text-[15px]">Vigan City, Ilocos Sur, Philippines 2700</p>
                    </div>
                </div>

                <div className="dives flex flex-row items-center gap-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm3.519 0L12 11.671L18.481 6zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[16px] md:text-[17px] font-semibold">Email</p>
                        <p className="text-[14px] md:text-[15px]">eatabangen@unp.edu.ph</p>
                    </div>
                </div>

                <div className="dives flex flex-row items-center gap-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 20 20">
                            <path fill="currentColor" d="M17.74 2.76a4.32 4.32 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.32 4.32 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.32 4.32 0 0 1-6.1 0a4.32 4.32 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[16px] md:text-[17px] font-semibold">Links</p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/RolTriesCode" className="group">
                                <svg className="cursor-none group-hover:scale-105 duration-150 ease-linear transition-all" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/erroltabangen/" className="group">
                                <svg className="cursor-none group-hover:scale-105 duration-150 ease-linear transition-all" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm1.205 6.91a1.705 1.705 0 1 0 0-3.41a1.705 1.705 0 0 0 0 3.41M7.909 19.5V9.273H4.5V19.5h3.41Zm4.432-10.227H9.273V19.5h3.068v-6.17c.395-.642 1.077-1.33 2.045-1.33c1.364 0 1.705 1.364 1.705 2.046V19.5H19.5v-5.454c0-1.828-.797-4.773-3.75-4.773c-1.878 0-2.92.685-3.41 1.327z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/errol.tabangen/" className="group">
                                <svg className="cursor-none group-hover:scale-105 duration-150 ease-linear transition-all" xmlns="http://www.w3.org/2000/svg" width="29.5" height="29.5" viewBox="0 0 1000 1000">
                                    <path fill="currentColor" d="M182.594 0C81.445 0 0 81.445 0 182.594v634.813c0 101.149 81.445 182.594 182.594 182.594h344.063V609.063H423.282v-140.75h103.375v-120.25c0-94.475 61.079-181.219 201.781-181.219c56.968 0 99.094 5.469 99.094 5.469l-3.313 131.438s-42.963-.406-89.844-.406c-50.739 0-58.875 23.378-58.875 62.188v102.781h152.75l-6.656 140.75H675.5v390.938h141.906c101.149 0 182.594-81.445 182.594-182.594V182.595C1000 81.446 918.555.001 817.406.001H182.593z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>



                <div className="dives flex flex-row items-center gap-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 512 512">
                            <path fill="currentColor" fillRule="evenodd" d="M362.667 128Q384 192 384 256t-21.333 128L244.81 354.536c-3.844 28.68-28.41 50.797-58.143 50.797c-31.2 0-56.713-24.356-58.56-55.093l-.107-3.573v-18.134L42.667 320V192l106.667-10.667zm-192 208v10.667c0 8.836 7.163 16 16 16c8.1 0 14.794-6.02 15.854-13.83l.146-2.17V344zm162.048-156.544l-162.048 40.523v72.04l162.048 40.504l.879-3.783c4.429-20.84 6.952-41.622 7.582-62.369l.158-10.371c0-24.193-2.573-48.426-7.74-72.74zM128 226.346l-42.666 4.267v50.752L128 285.644zm277.334 8.32h64v42.667h-64zm-3.403 72.532l62.36 14.397l-9.598 41.573l-62.36-14.397zm-9.598-143.969l62.36-14.397l9.598 41.573l-62.36 14.397z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[16px] md:text-[17px] font-semibold">Let's Build Amazing Things Together!</p>
                        <p className="text-[14px] md:text-[15px] ">With a passion for both art and technology, I bring creative solutions and a sharp eye for design to every project.</p>
                    </div>
                </div>


            </div>

            <div className="w-[90%] lg:w-[50%] h-fit mb-40 lg:mb-0  mx-auto">
                <div className="flex flex-col items-center">
                    <p className='skilltext12 text-[12px] md:text-[14px] bg-[#DDE1E6] px-5 py-1 w-fit rounded-[3px] dark:text-black'>
                        Contact
                    </p>
                    <h3 className='whatiuse12 font-noto text-[56px] md:text-[66px] font-normal mt-4'>
                        Work with Me
                    </h3>
                </div>


                <div className="px-4 lg:px-20 mt-14 flex flex-col gap-18">

                    <div className="">
                        <div className="flex items-center justify-center">
                            <div className="relative w-full">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder=""
                                    className="border-b cursor-none  border-black/20 dark:border-gray-400 py-1 focus:border-b focus:border-black dark:focus:border-white transition-colors focus:outline-none peer bg-inherit w-full"
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute -top-4 text-xs left-0 text-black/50 dark:text-gray-400 cursor-text peer-focus:text-black dark:peer-focus:text-white peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                                >
                                    Name
                                </label>
                            </div>
                        </div>
                    </div>




                    <div className="">
                        <div className="flex items-center justify-center">
                            <div className="relative w-full">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    className="border-b cursor-none  border-black/20 dark:border-gray-400 py-1 focus:border-b focus:border-black dark:focus:border-white transition-colors focus:outline-none peer bg-inherit w-full"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute  -top-4 text-xs left-0 text-black/50 dark:text-gray-400 cursor-text peer-focus:text-black dark:peer-focus:text-white peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                                >
                                    Email
                                </label>
                            </div>
                        </div>
                    </div>




                    <div className="">
                        <div className="flex items-center justify-center">
                            <div className="relative w-full">
                                <input
                                    id="message"
                                    name="message"
                                    type="text"
                                    placeholder=""
                                    className="border-b cursor-none  border-black/20 dark:border-gray-400 py-1 focus:border-b focus:border-black dark:focus:border-white transition-colors focus:outline-none peer bg-inherit w-full"
                                />
                                <label
                                    htmlFor="message"
                                    className="absolute -top-4 text-xs left-0 text-black/50 dark:text-gray-400 cursor-text peer-focus:text-black dark:peer-focus:text-white peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                                >
                                    Message
                                </label>
                            </div>
                        </div>
                    </div>



                    <button
                        className="cursor-none group relative bg-black text-white dark:bg-white active:scale-85 dark:text-black font-semibold text-sm px-6 py-3 rounded-[5px] transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12"
                    >
                        <div className="relative flex items-center justify-center gap-5 ">
                            <span className="relative inline-block overflow-hidden">
                                <span
                                    className="block transition-transform duration-300 group-hover:-translate-y-full"
                                >
                                    Ready?
                                </span>
                                <span
                                    className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                                >
                                    Submit
                                </span>
                            </span>

                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45 text-black "
                                viewBox="0 0 24 24"
                            >
                                <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                                <path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    stroke="white"
                                    d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                                ></path>
                            </svg>
                        </div>
                    </button>

                </div>
            </div>
        </section>
    )
}

export default ContactSection