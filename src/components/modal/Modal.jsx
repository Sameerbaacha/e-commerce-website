import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import { addDoc, collection } from 'firebase/firestore'; // Firebase imports
import { fireDB } from '../../firebase/FirebaseConfig';


export default function Modal() {
    let [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        mobileNumber: '',
    });

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, address, pincode, mobileNumber } = formData;

        if (name && address && pincode && mobileNumber) {
            try {
                const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

                if (cartItems.length === 0) {
                    toast.error('No items in the cart.');
                    return;
                }

                for (let item of cartItems) {
                    await addDoc(collection(fireDB,'orders'), {
                        name,
                        address,
                        pincode,
                        mobileNumber,
                        date: new Date().toLocaleString(),
                        product: item.title, // Use product title from cart
                        imageUrl: item.imageUrl // Use product image from cart
                    });
                }
                toast.success('Order Placed Successfully!');
                setFormData({ name: '', address: '', pincode: '', mobileNumber: '' });
                closeModal();
            } catch (error) {
                toast.error('Order failed!');
                console.error("Error placing order: ", error);
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    return (
        <>
            <div className="text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-600 py-2 text-center rounded-lg text-white font-bold"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50 mt-20">
                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
                                            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                    <form className="space-y-4 md:space-y-6">
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                id="address"
                                                                value={formData.address}
                                                                onChange={handleChange}
                                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input
                                                                type="text"
                                                                name="pincode"
                                                                id="pincode"
                                                                value={formData.pincode}
                                                                onChange={handleChange}
                                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input
                                                                type="text"
                                                                name="mobileNumber"
                                                                id="mobileNumber"
                                                                value={formData.mobileNumber}
                                                                onChange={handleChange}
                                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                                required
                                                            />
                                                        </div>
                                                    </form>
                                                    <button
                                                        type="button" // Change to 'button' type to avoid form submit conflict
                                                        className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                                                        onClick={handleSubmit}
                                                    >
                                                        Order Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
