import { Facebook, Instagram, Twitter, Github, Dribbble } from 'lucide-react';
import { siteConfig } from "@/config/site"

export function Footer() {
  return (     
    <footer className="dark:bg-slate-900 dark:text-white md:px-8 md:py-0">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            {/* <img src="#" className="mr-5 h-6 sm:h-9" alt="logo" /> */}
            <p className="mt-4 max-w-xs text-base text-gray-600 dark:text-gray-50">
            Excellent services Chokhale college chowk, Mangalwar peth Kolhapur -416012            
            </p>
            <div className="mt-8 flex space-x-6 text-gray-600">
              <a className="hover:text-bold rounded-full bg-white p-3 shadow hover:text-blue-700 hover:opacity-75" href="#" target="_blank" rel="noreferrer">
                <span className="sr-only"> Facebook </span>
                <Facebook className="size-6" />
              </a>
              <a className="hover:text-bold rounded-full bg-white p-3 shadow hover:text-blue-700 hover:opacity-75" href="#" target="_blank" rel="noreferrer">
                <span className="sr-only"> Instagram </span>
                <Instagram className="size-6" />
              </a>
              <a className="hover:text-bold rounded-full bg-white p-3 shadow hover:text-blue-700 hover:opacity-75" href="#" target="_blank" rel="noreferrer">
                <span className="sr-only"> Twitter </span>
                <Twitter className="size-6" />
              </a>
              <a className="hover:text-bold rounded-full bg-white p-3 shadow hover:text-blue-700 hover:opacity-75" href="#" target="_blank" rel="noreferrer">
                <span className="sr-only"> GitHub </span>
                <Github className="size-6" />
              </a>
            
            </div>
            <p className="mt-8 text-base text-gray-800 dark:text-white">
              © 2024 Excellent Service. All Rights Reserved
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-bold">
                Company
              </p>
              <nav className="mt-4 flex flex-col space-y-2 text-base text-gray-500">
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> About </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Meet the Team </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> History </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Careers </a>
              </nav>
            </div>
            <div>
              <p className="font-bold">
                Services
              </p>
              <nav className="mt-4 flex flex-col space-y-2 text-base text-gray-500">
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Company Review </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Accounts Review </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> HR Consulting </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> SEO Optimization </a>
              </nav>
            </div>
            <div>
              <p className="font-bold">
                Helpful Links
              </p>
              <nav className="mt-4 flex flex-col space-y-2 text-base text-gray-500">
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="/contact-us"> Contact </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="/about-us"> About Us </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> FAQs </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Help</a>
              </nav>
            </div>
            <div>
              <p className="font-bold">
                Legal
              </p>
              <nav className="mt-4 flex flex-col space-y-2 text-base text-gray-500">
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Privacy Policy </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Terms &amp; Conditions </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Notice </a>
                <a className="hover:text-bold font-semibold hover:text-blue-700 hover:opacity-75" href="#"> Disclaimers </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
