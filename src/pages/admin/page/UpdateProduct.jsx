import React, { useContext } from 'react';
import { Mycontext } from '../../../context/data/Mycontext';

function UpdateProduct() {
    const { products, setproducts, updateProduct } = useContext(Mycontext)

    return (
        <div className='flex justify-center items-center min-h-screen px-4'>
            <div className='bg-gray-800 shadow-lg px-10 py-8 rounded-xl max-w-md w-full'>
                <h1 className='text-center text-white text-2xl mb-6 font-bold'>Update Product</h1>

                <input
                    type="text"
                    value={products.title}
                    onChange={(e) => setproducts({ ...products, title: e.target.value })}
                    name='title'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none focus:ring focus:ring-yellow-400'
                    placeholder='Product title'
                    required
                />

                <input
                    type="number"
                    value={products.price}
                    onChange={(e) => setproducts({ ...products, price: e.target.value })}
                    name='price'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none focus:ring focus:ring-yellow-400'
                    placeholder='Product price'
                    required
                />

                <input
                    type="text"
                    value={products.imageUrl}
                    onChange={(e) => setproducts({ ...products, imageUrl: e.target.value })}
                    name='imageurl'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none focus:ring focus:ring-yellow-400'
                    placeholder='Product image URL'
                    required
                />

                <input
                    type="text"
                    value={products.category}
                    onChange={(e) => setproducts({ ...products, category: e.target.value })}
                    name='category'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none focus:ring focus:ring-yellow-400'
                    placeholder='Product category'
                    required
                />

                <textarea
                    cols="30"
                    rows="4"
                    value={products.description}
                    onChange={(e) => setproducts({ ...products, description: e.target.value })}
                    name='description'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none focus:ring focus:ring-yellow-400'
                    placeholder='Product description'
                    required
                ></textarea>

                <div className='flex justify-center mb-3'>
                    <button
                        onClick={updateProduct}
                        className='bg-yellow-400 w-full text-black font-bold px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400'>
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
