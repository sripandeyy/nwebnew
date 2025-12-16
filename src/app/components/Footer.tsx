import React from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Mail, Twitter, Facebook, Heart } from 'lucide-react'
const Footer = () => {
  return (
    <div>
      <section className="relative bg-white/40 px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/95 shadow-lg border border-black/5 px-6 sm:px-10 py-10">
            <div className="grid gap-y-12 md:gap-y-0 md:gap-x-8 md:grid-cols-5">
              <div className="space-y-5">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">Site Map</p>
                <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">Find all our links here</h3>
                <div className="mt-8 space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">MEET FOR A COFFEE HERE</p>
                  <p>Floor No.2, 1161, AECS Layout Main Rd, AECS Layout - A Block, AECS Layout, Singasandra, Kudlu, Bengaluru, Karnataka 560068</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">Legal</p>
                <ul className="space-y-3 text-sm text-gray-700 leading-6">
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                  <li><Link href="/cancellation-refund-policy">Cancellation & Refund Policy</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">Explore</p>
                <ul className="space-y-3 text-sm text-gray-700 leading-6">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">Programs</p>
                <ul className="space-y-3 text-sm text-gray-700 leading-6">
                  <li><Link href="/domains">All Programs</Link></li>
                  <li><Link href="/plans">Pricing Plans</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">Company</p>
                <ul className="space-y-3 text-sm text-gray-700 leading-6">
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/resources">Blog & Resources</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social media card */}
          <div className="mt-10 rounded-3xl border border-black/5 bg-white/95 shadow-lg px-6 sm:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <span>Find us on</span>
                <Heart className="w-4 h-4 text-rose-500" />
              </p>
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mt-1">social media</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="https://www.linkedin.com/company/nyeras-edutech-innovations/" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </Link>
              <Link href="mailto:contact@nyeras.com" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
                <Mail className="w-4 h-4" />
                <span>Mail</span>
              </Link>
              <Link href="https://x.com" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
                <Twitter className="w-4 h-4" />
                <span>X</span>
              </Link>
              <Link href="https://www.instagram.com/nyeras_app/" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </Link>
              <Link href="https://www.facebook.com" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Bottom legal bar */}
          <div className="mt-4 rounded-2xl border border-black/5 bg-white/95 shadow-sm px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-700">
            <p className="text-center sm:text-left">&copy; Nyeras 2020 - 2025</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href="/user-agreement" className="hover:text-gray-900">User Agreement</Link>
              <Link href="/terms-and-conditions" className="hover:text-gray-900">Terms and Condition</Link>
              <Link href="/privacy-policy" className="hover:text-gray-900">Privacy policy</Link>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <img
              src="/footer%20image.png"
              alt="Footer image"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
