"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="border-stroke dark:border-strokedark dark:bg-blacksection border-t bg-white">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-10 lg:py-20">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-full lg:w-1/4"
              >
                <a href="/" className="absolute">
                  <Image
                    width={60}
                    height={60}
                    src="/images/sideperson.png"
                    alt="Logo"
                    className="dark:hidden"
                  />
        
                </a>
                <div className="ml-12">
                  <p className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Address: 20tn Main, Marenahalli, Vijayanagar, Bengaluru, Karnataka 560040
                  </p>

                  <p className="text-section title mb-1.5 text-sm uppercase tracking-[2px] text-gray-800 dark:text-gray-400">
                    Contact
                  </p>
                  <a
                    href="mailto:hello@solid.com"
                    className="text-item title font-medium text-gray-700 hover:text-indigo-500 dark:text-white"
                  >
                    funacademy@gmail.com
                  </a>
                </div>
              </motion.div>

              <div className="flex w-full flex-row gap-8 md:justify-between md:gap-4 lg:w-2/3 xl:w-7/12">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-6 text-lg font-medium text-black dark:text-white">
                    Quick Links
                  </h4>

                  <ul>
                    {["Home", "Product", "Careers", "Pricing"].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="mb-3 inline-block text-sm font-semibold text-gray-700 hover:text-indigo-500 dark:text-gray-300"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-6 text-lg font-medium text-black dark:text-white">
                    Support
                  </h4>

                  <ul>
                    {["Company", "Press media", "Our Blog", "Contact Us"].map(
                      (link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="mb-3 inline-block text-sm font-semibold text-gray-700 hover:text-indigo-500 dark:text-gray-300"
                          >
                            {link}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-6 text-lg font-medium text-black dark:text-white">
                    Newsletter
                  </h4>
                  <p className="mb-4 w-[90%] text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Subscribe to receive future updates
                  </p>

                  <form action="#">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Email address"
                        className="border-stroke shadow-solid-11 dark:border-stroke dark w-full rounded-full border px-6 py-3 focus:border-primary focus:outline-none dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />

                      <button
                        aria-label="signup to newsletter"
                        className="absolute right-0 p-4"
                      >
                        <svg
                          className="fill-[#757693] hover:fill-primary dark:fill-white"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_48_1487)">
                            <path
                              d="M3.1175 1.17318L18.5025 9.63484C18.5678 9.67081 18.6223 9.72365 18.6602 9.78786C18.6982 9.85206 18.7182 9.92527 18.7182 9.99984C18.7182 10.0744 18.6982 10.1476 18.6602 10.2118C18.6223 10.276 18.5678 10.3289 18.5025 10.3648L3.1175 18.8265C3.05406 18.8614 2.98262 18.8792 2.91023 18.8781C2.83783 18.8769 2.76698 18.857 2.70465 18.8201C2.64232 18.7833 2.59066 18.7308 2.55478 18.6679C2.51889 18.6051 2.50001 18.5339 2.5 18.4615V1.53818C2.50001 1.46577 2.51889 1.39462 2.55478 1.33174C2.59066 1.26885 2.64232 1.2164 2.70465 1.17956C2.76698 1.14272 2.83783 1.12275 2.91023 1.12163C2.98262 1.12051 3.05406 1.13828 3.1175 1.17318ZM4.16667 10.8332V16.3473L15.7083 9.99984L4.16667 3.65234V9.16651H8.33333V10.8332H4.16667Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_48_1487">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="border-stroke dark:border-strokedark flex flex-col items-center justify-center gap-5 border-t py-5 lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            >
              <ul className="flex items-center gap-5 text-sm font-semibold text-gray-800 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    English
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    Legal
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top flex items-center gap-4"
            >
              <a href="#" className="hover:text-indigo-500">
                <Facebook className="size-8 rounded-full bg-gray-100 p-2 text-slate-600 hover:fill-black hover:text-white dark:text-gray-300" />
              </a>
              <a href="#" className="hover:text-indigo-500">
                <Twitter className="size-8 rounded-full bg-gray-100 p-2 text-slate-600 hover:fill-black hover:text-white dark:text-gray-300" />
              </a>
              <a href="#" className="hover:text-indigo-500">
                <Instagram className="size-8 rounded-full bg-gray-100 p-2 text-slate-600 hover:fill-black hover:text-white dark:text-gray-300" />
              </a>
              <a href="#" className="hover:text-indigo-500">
                <Github className="size-8 rounded-full bg-gray-100 p-2 text-slate-600 hover:fill-black hover:text-white dark:text-gray-300" />
              </a>
            </motion.div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
