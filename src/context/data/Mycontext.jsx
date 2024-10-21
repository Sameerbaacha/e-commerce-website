import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

export const Mycontext = createContext();

const MycontextProvider = ({ children }) => {

    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark')
            document.body.style.backgroundColor = 'rgb(17,24,39)'
        } else {
            setMode('light')
            document.body.style.backgroundColor = 'white'
        }
    }

    const [loading, setloading] = useState(false)

    const [products, setproducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: '2-digit',
                year: 'numeric',
            }
        )
    })

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("ALl fields are required")
        }

        setloading(true)

        try {
            const productRef = collection(fireDB, 'products')
            await addDoc(productRef, products)
            toast.success('Product Added Successfuly')
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
            getProductData()
            setloading(false)

        }
        catch (error) {
            console.log(error.message);
            setloading(false)

        }
    }

    const [product, setproduct] = useState([]);

    const getProductData = async () => {
        setloading(true);
        try {
            const q = query(collection(fireDB, 'products'), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                // console.log("Fetched products:", productArray); // Log the fetched products
                setproduct(productArray);
                setloading(false);
            });
            return () => data();
        } catch (error) {
            console.log(error.message);
            setloading(false);
        }
    };
    useEffect(() => {
        getProductData();
    }, [])

    //update product  function
    const edithandle = (item) => {
        setproducts(item)
    }
    // update product
    const updateProduct = async (item) => {
        setloading(true)
        try {
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully")
            getProductData();
            setloading(false)
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 1000)
        } catch (error) {
            setloading(false)
            console.log(error)
        }
        setproducts("")
    }

    //Delete product  function
    const deleteProduct = async (item) => {

        try {
            setloading(true)
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success('Product Deleted successfully')
            setloading(false)
            getProductData()
        } catch (error) {
            // toast.success('Product Deleted Falied')
            setloading(false)
        }
    }

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setloading(true);
        try {
            const result = await getDocs(collection(fireDB, "orders"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push({ ...doc.data(), id: doc.id });
            });
            setOrder(ordersArray);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    
    useEffect(() => {
        getOrderData();
    }, []);
    

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setloading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setloading(false)
            });
            setUser(usersArray);
            // console.log(usersArray)
            setloading(false);
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <Mycontext.Provider value={{
            mode, toggleMode, loading, setloading, products, setproducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice
        }}>
            {children}
        </Mycontext.Provider>
    )
}

export default MycontextProvider;