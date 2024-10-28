import { useContext } from 'react'
import { Mycontext } from '../../context/data/Mycontext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  const context = useContext(Mycontext)
  const { toggleMode, mode } = context

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          {/* Categories Section */}
          <motion.div
            className="lg:w-1/4 md:w-1/2 w-full px-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="uppercase text-sm tracking-widest mb-3">Categories</h2>
            <nav className="list-none mb-10">
              <li><Link to="/" className="text-gray-400 hover:text-gray-200">Home</Link></li>
              <li><Link to="/order" className="text-gray-400 hover:text-gray-200">Order</Link></li>
              <li><Link to="/localforvocal" className="text-gray-400 hover:text-gray-200">Local For Vocal</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-gray-200">Khushbo Mehal</Link></li>
            </nav>
          </motion.div>

          {/* Customer Service Section */}
          <motion.div
            className="lg:w-1/4 md:w-1/2 w-full px-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="uppercase text-sm tracking-widest mb-3">Customer Service</h2>
            <nav className="list-none mb-10">
              <li><Link to="/returnpolicy" className="text-gray-400 hover:text-gray-200">Return Policy</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gray-200">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gray-200">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-400 hover:text-gray-200">FAQs</Link></li>
            </nav>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="lg:w-1/4 md:w-1/2 w-full px-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="uppercase text-sm tracking-widest mb-3">Services</h2>
            <nav className="list-none mb-10">
              <li><Link to="/privacypolicy" className="text-gray-400 hover:text-gray-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-gray-200">Terms of Service</Link></li>
            </nav>
          </motion.div>

          {/* Stay Connected Section */}
          <motion.div
            className="lg:w-1/4 md:w-1/2 w-full px-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="uppercase text-sm tracking-widest mb-3">Stay Connected</h2>
            <nav className="list-none mb-10">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">Facebook</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">Instagram</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">Twitter</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">LinkedIn</a></li>
            </nav>
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4">
  <Link to="/" className="text-white font-bold text-xl mb-2 md:mb-0 text-center md:text-left">Khushboo Mehal</Link>

  <p className="text-gray-500 text-sm text-center md:text-left mb-2 md:mb-0">
    © 2024 Khushboo Mehal —
    <a href="https://www.khushoo-mehal.com" className="hover:text-gray-400 ml-1">
      www.khushoo-mehal.com
    </a>
  </p>

  <span className="inline-flex justify-center md:justify-start space-x-3">
    <a href="https://www.facebook.com" className="text-gray-500" target="_blank" rel="noopener noreferrer">
      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
      </svg>
    </a>
    <a href="https://www.instagram.com" className="text-gray-500" target="_blank" rel="noopener noreferrer">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
        <rect width={20} height={20} x={2} y={2} rx={5} ry={5}></rect>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
      </svg>
    </a>
    <a href="https://www.linkedin.com" className="text-gray-500" target="_blank" rel="noopener noreferrer">
      <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
        <circle cx={4} cy={4} r={2} stroke="none"></circle>
      </svg>
    </a>
  </span>
</div>

      </div>
    </footer>
  )
}
