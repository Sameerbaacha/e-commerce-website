import React, { useContext } from 'react';
import { Mycontext } from '../../context/data/Mycontext';
import { motion } from 'framer-motion';

function Testimonials() {
  const context = useContext(Mycontext);
  const { mode } = context;

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1 className="text-center text-3xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
          <h2 className="text-center text-2xl font-semibold mb-10" style={{ color: mode === 'dark' ? 'white' : '' }}>
            What our <span className="text-yellow-600">customers</span> are saying
          </h2>
          <div className="flex flex-wrap -m-4">
            {[{ name: 'Sameer Khan', role: 'Full Stack Developer', img: 'https://avatars.githubusercontent.com/u/153771689?v=4' },
              { name: 'M.Waqas', role: 'Full Stack Developer', img: 'https://avatars.githubusercontent.com/u/153609017?v=4' },
              { name: 'Bilal Attari', role: 'CEO Senior Developer', img: 'https://avatars.githubusercontent.com/u/26040872?v=4' }]
              .map((testimonial, index) => (
                <motion.div
                  className="lg:w-1/3 lg:mb-0 mb-6 p-4"
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.3 }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <div className="h-full text-center">
                    <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={testimonial.img} />
                    <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                      Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk.
                    </p>
                    <span className="inline-block h-1 w-10 rounded bg-yellow-600 mt-6 mb-4" />
                    <h2 style={{ color: mode === 'dark' ? '#ff6453' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                      {testimonial.name}
                    </h2>
                    <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
