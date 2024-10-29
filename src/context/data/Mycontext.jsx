import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Mycontext = createContext();

const MycontextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17,24,39)';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    };

    const [loading, setloading] = useState(false);
    const [products, setproducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: '2-digit',
            year: 'numeric',
        }),
    });

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
            return toast.error("All fields are required");
        }

        setloading(true);

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            // console.log(products)
            toast.success('Product Added Successfully');

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        } catch (error) {
            // console.log(error.message);
            toast.error('Error! product not added');
        } finally {
            setloading(false);
        }
    };

    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Use real-time listener for products
    useEffect(() => {
        const productRef = collection(fireDB, 'products');
        const unsubscribe = onSnapshot(productRef, (snapshot) => {
            const dataArray = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProduct(dataArray);
        });

        return () => unsubscribe(); // Clean up the listener
    }, []);

    // Fetch orders and users conditionally
    useEffect(() => {
        if (currentUser) {
            const fetchOrders = async () => {
                setloading(true);
                try {
                    const orderRef = collection(fireDB, 'orders');
                    const querySnapshot = await getDocs(orderRef);
                    const dataArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    setOrder(dataArray);
                } catch (error) {
                    // console.error("Error fetching orders:", error);

                } finally {
                    setloading(false);
                }
            };

            fetchOrders();
        }
    }, [currentUser]); // Fetch orders when currentUser changes

    // Fetch users conditionally
    useEffect(() => {
        const fetchUsers = async () => {
            setloading(true);
            try {
                const userRef = collection(fireDB, 'users');
                const querySnapshot = await getDocs(userRef);
                const dataArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setUser(dataArray);
            } catch (error) {
                // console.error("Error fetching users:", error);
            } finally {
                setloading(false);
            }
        };

        fetchUsers();
    }, []); // Only fetch users once on mount


    // Update product function
    const editHandle = (item) => {
        setproducts(item);
    };
    // Update product
    const updateProduct = async (item) => {

        setloading(true);
        try {
            // console.log(products)
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully");

            // No need to fetch products again since we are using onSnapshot
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } catch (error) {
            // console.error("Error updating product:", error);
            toast.error("Error updating product:"); // Provide more context
        } finally {
            setloading(false);
        }
        setproducts("");
    };

    const deleteProduct = async (item) => {
        setloading(true);
        try {
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success('Product Deleted successfully');
        } catch (error) {
            // console.error("Error deleting product:", error);
            toast.error("An error occurred while deleting the product.")
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                // console.log("user=======>", user);
            } else {
                setCurrentUser(null);
                // console.log("user=======>not available");
            }
        });

        return unsubscribe;
    }, []);

    const addOrder = async (orderData) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            toast.error("Please log in to place an order.");
            return;
        }

        const completeOrderData = {
            ...orderData,
            userId: currentUser.uid, // Attach user ID
            status: "Pending", // Initial order status
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: '2-digit',
                year: 'numeric',
            }),
        };

        setloading(true);
        try {
            const orderRef = collection(fireDB, 'orders');
            const docRef = await addDoc(orderRef, completeOrderData);
            const newOrder = { ...completeOrderData, id: docRef.id }; // Add the document ID

            // Optimistic UI update
            setOrder(prevOrders => [...prevOrders, newOrder]);

            toast.success('Order Added Successfully');
        } catch (error) {
            // console.log(error.message);
            toast.error("error related to Order");
        } finally {
            setloading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        setloading(true);
        try {
            await setDoc(doc(fireDB, "orders", orderId), { status }, { merge: true });
            toast.success(`Order ${status}!`);
        } catch (error) {
            toast.error("Error updating order status.");
        } finally {
            setloading(false);
        }
    };

    const [searchKey, setSearchKey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    return (
        <Mycontext.Provider value={{
            mode, toggleMode, loading, setloading, products, setproducts, addProduct, updateOrderStatus, product, editHandle, updateProduct, deleteProduct, order, user, searchKey, setSearchKey, filterType, setFilterType,
            filterPrice, setFilterPrice, currentUser, addOrder
        }}>
            {children}
        </Mycontext.Provider>
    );
}

export default MycontextProvider;
