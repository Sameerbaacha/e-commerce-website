import React from 'react'

import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonials from '../../components/testimonials/Testimonials'
import HeroSection from '../../components/herosection/Herosection'



const Home = () => {

    return (
        <div>

            <HeroSection />
            <Filter />
            <ProductCard />
            <Track />
            <Testimonials />
        </div>
    )
}

export default Home