import React, { useContext } from 'react';
import { Mycontext } from '../../context/data/Mycontext';
import { Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';

import { useStepperContext } from "@mui/material";

const Order = () => {
    const { order, loading, mode, currentUser } = useContext(Mycontext);
    // console.log("User's Orders:", order);

    // Ensure currentUser is available before filtering orders
    if (!currentUser) {
        return (
            <Typography variant="h6" className="text-center text-gray-600">
                Please log in to view your orders.
            </Typography>
        );
    }

    const userOrders = order.filter((item) => item.userId === currentUser.uid);

    // console.log("User's UID:", currentUser.uid);
    // console.log("User's Orders:", userOrders);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={`order-container p-6 bg-gray-50 min-h-screen ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <Typography variant="h4" className="mb-6 text-center font-bold">
                Order List
            </Typography>
            {userOrders.length === 0 ? (
                <Typography variant="h6" className="text-center text-gray-600">
                    No orders found.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {userOrders.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card
                                className="hover:shadow-2xl transition-shadow duration-300  border border-gray-200 rounded-lg h-full "
                                style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}
                            >
                                <CardContent className="flex flex-col p-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.product}
                                        className="w-full h-32 object-contain rounded-lg mb-4 shadow-sm"
                                    />
                                    <Typography variant="h6" className="mb-2 text-center font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                        {item.product}
                                    </Typography>
                                    <div className="flex flex-col space-y-2 mt-2">
                                        <Typography variant="body2" className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                            <strong>Name:</strong> {item.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                            <strong >Address:</strong> {item.address}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                            <strong>Mobile Number:</strong> {item.mobileNumber}
                                        </Typography>
                                        <Typography variant="body2" className="mt-8 text-gray-700 pb-4" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                            <strong>Pincode:</strong> {item.pincode}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body2"
                                        className={`text-center border-t-4 pt-2 ${item.status === 'Delievered' ? 'text-green-700' : 'text-red-500'}`}
                                    >
                                    <strong style={{ color: mode === 'dark' ? 'white' : 'black' }}>Status:</strong> {item.status}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};
export default Order
