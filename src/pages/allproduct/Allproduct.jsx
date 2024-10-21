import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mycontext } from '../../context/data/Mycontext';
import { addToCart } from '../../redux/cartSlice';
import Filter from '../../components/filter/Filter';
import { toast } from 'react-toastify';

const Allproduct = () => {
  const context = useContext(Mycontext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  
  // Add to cart
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sort products by time (latest first) and then apply filters
  const sortedAndFilteredProducts = product
    .sort((a, b) => b.time.toMillis() - a.time.toMillis()) // Sort by time descending
    .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
    .filter((obj) => obj.price.includes(filterPrice));

  return (
    <div>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-yellow-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {sortedAndFilteredProducts.map((item) => {
              const { title, price, imageUrl, category } = item;
              return (
                <div key={item.id} className="p-4 md:w-1/4 drop-shadow-lg">
                  <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <div onClick={() => window.location.href = `/productinfo/${item.id}`}  className="flex justify-center cursor-pointer">
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Allproduct;
