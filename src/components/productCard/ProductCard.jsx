import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { Mycontext } from '../../context/data/Mycontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard() {
    const context = useContext(Mycontext);
    const { mode, product, searchKey, filterType, filterPrice } = context;
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user); // Get the logged-in user
    const navigate = useNavigate();

    const addCart = (product) => {
        if (!isAuthenticated) {
            toast.error('Please Sign Up or Login to add items to the cart.');
            navigate('/signup'); // Redirect to signup if not logged in
            return;
        }

        // Include userId in the product object
        const productWithUserId = { ...product, userId: user.uid }; // Add userId to the product
        // console.log(productWithUserId)
        dispatch(addToCart(productWithUserId)); // Dispatch with userId
        toast(`${product.title} Added to Cart`); // Confirm addition
    };

    const filteredProducts = product
        .filter((obj) =>
            searchKey ? obj.title.toLowerCase().includes(searchKey.toLowerCase()) : true
        )
        .filter((obj) =>
            filterType ? obj.title === filterType : true
        )
        .filter((obj) =>
            filterPrice ? obj.price.toString().includes(filterPrice) : true
        )
        .sort((a, b) => (b.time?.toMillis() || 0) - (a.time?.toMillis() || 0))
        .slice(0, 4); // Get the latest 4 products

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Our Latest Collection
                    </h1>
                    <div className="h-1 w-20 bg-yellow-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {filteredProducts.map((item, index) => {
                        const { title, price, category, imageUrl } = item;
                        return (
                            <motion.div
                                className="p-4 md:w-1/4 drop-shadow-lg w-full sm:w-1/2"
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }} // Start slightly below
                                whileInView={{ opacity: 1, y: 0 }} // Animate to original position
                                transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.2 }} // Use a smoother easing function
                                layout // Enables layout transitions
                                viewport={{ once: false, amount: 0.2 }} // Trigger animation when 20% is visible
                            >
                                <div
                                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                >
                                    <div onClick={() => navigate(`/productinfo/${item.id}`)} className="flex justify-center cursor-pointer">
                                        <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt={title} />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {category}
                                        </h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {title}
                                        </h1>
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>PKR {price}</p>
                                        <div className="flex justify-center">
                                            <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ProductCard;
