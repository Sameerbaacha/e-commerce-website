import { useContext, useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { Mycontext } from '../../context/data/Mycontext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, clearCart, loadCart } from '../../redux/cartSlice'; // Import clearCart action
import { toast } from 'react-toastify';


function Cart() {
  const context = useContext(Mycontext);
  const { mode } = context;


  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from auth state
  const cartItems = useSelector((state) => state.cart.items || []);


  useEffect(() => {
    if (user) {
      dispatch(loadCart(user.uid)); // Load the cart for the logged-in user
    }
  }, [user, dispatch]);

  // Manually delete function
  function deleteCart(item, clearAll = false) {
    if (clearAll) {
      dispatch(clearCart(user.uid)); // Pass user ID to clear cart
    } else {
      dispatch(deleteFromCart({ id: item.id, userId: user.uid })); // Pass user ID with item ID
      toast.error(`${item.title} deleted Successfully`);
    }
  }



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price) * cartItem.quantity; // Calculate total based on quantity
    });
    setTotalAmount(temp);
  }, [cartItems]);


  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;


  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 pt-28" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
      <div className="flex-1 overflow-auto">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, price, imageUrl, quantity } = item; // Include quantity
              return (
                <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="flex flex-col justify-evenly pt-4 flex-grow h-full">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      
                      {/* Desktop and Medium Devices: PKR line and delete button */}
                      <div className="hidden sm:flex items-center justify-between mt-4">
                        <p className="text-xl text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                          PKR {price} x  <b> {quantity}</b>  = PKR <b>{price * quantity}</b>
                        </p>

                        {/* Delete button on the right */}
                        <div onClick={() => deleteCart(item)} className="flex justify-end">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" ></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Mobile View: Existing layout for PKR line and delete button */}
                    <div className="flex items-center justify-between mt-4 sm:hidden">
                      <p className="text-[90%]  text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        PKR {price}  x <b> {quantity}</b> = PKR <b>{price * quantity}</b>
                      </p>

                      <div onClick={() => deleteCart(item)} className="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>PKR {totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>PKR {shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>PKR {grandTotal}</p>
              </div>
            </div>
            <Modal deleteCart={deleteCart} ></Modal>
          </div>
        </div>
      </div>
    </div>

  );
}


export default Cart;

