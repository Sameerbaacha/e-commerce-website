import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { Mycontext } from '../../context/data/Mycontext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { motion } from 'framer-motion';
import { BsBookmarkHeart } from 'react-icons/bs';

function ProductInfo() {
    const context = useContext(Mycontext);
    const { mode, loading, setloading } = context;
    // console.log(loading)
    const [products, setProducts] = useState('');
    const params = useParams();

    const getProductData = async () => {
        setloading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setloading(false);
        } catch (error) {
            // console.log(error);
            setloading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); // Get cart items
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is authenticated
    const user = useSelector((state) => state.auth.user); // Get the logged-in user
    const navigate = useNavigate();

    const addCart = (product) => {
        if (!isAuthenticated) {
            toast.error('Please Signup or Login to add items to the cart.');
            navigate('/signup'); // Redirect to signup if not logged in
            return;
        }

        // Include userId in the product object
        const productWithUserId = { ...product, userId: user.uid }; // Add userId to the product
        dispatch(addToCart(productWithUserId)); // Dispatch with userId
        toast.success(`${product.title} Added to Cart`);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div>
            <motion.section
                className="text-gray-600 body-font overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container px-5 py-10 mx-auto">
                    {products && (
                        <motion.div
                            className="lg:w-4/5 mx-auto flex flex-wrap justify-center"
                            animate={{ scale: [1, 1.2, 1], borderRadius: ['0%', '50%', '0%'] }} // Circular animation
                            transition={{ duration: 0.5, times: [0, 0.5, 1] }} // Keyframes timing
                        >
                            <motion.img
                                alt="ecommerce"
                                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                                src={products.imageUrl}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            />
                            <motion.div
                                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h2 className="text-sm title-font text-gray-500 tracking-widest"
                                    style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                    BRAND NAME
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"
                                    style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                    {products.title}
                                </h1>
                                <div className="flex mb-4">
                                    {/* Rating SVGs here */}
                                    <span className="text-gray-600 ml-3"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}
                                    >4 Reviews</span>
                                </div>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5"
                                    style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                    {products.description}
                                </p>

                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}
                                    >
                                        PKR {products.price}
                                    </span>
                                    <motion.button
                                        onClick={() => addCart(products)}
                                        className="flex ml-auto text-white bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Add To Cart
                                    </motion.button>
                                    <BsBookmarkHeart size={20} style={{ color: mode === 'dark' ? 'white' : '' }} className="rounded w-10 h-8 mt-1 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" />
                                    {/* Wishlist SVG here */}

                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.section >
        </div >
    );
}

export default ProductInfo;
