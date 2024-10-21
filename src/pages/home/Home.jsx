import React from 'react'
import HeroSection from '../../components/herosection/herosection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonials from '../../components/testimonials/Testimonials'


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