import React, { useContext } from 'react';
import { Mycontext } from '../../context/data/Mycontext';
import { Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';

const Order = () => {
    const { order, loading, mode } = useContext(Mycontext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress /> {/* Material-UI loading spinner */}
            </div>
        );
    }

    return (
        <div className="order-container p-6 bg-gray-50 min-h-screen" style={{ backgroundColor: mode === 'dark' ? 'grey' : '', color: mode === 'dark' ? 'white' : '' }}>
            <Typography variant="h4" className="mb-6 text-center font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Order List</Typography>
            {order.length === 0 ? (
                <Typography variant="h6" className="text-center text-gray-600" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>No orders found.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {order.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card className="hover:shadow-2xl transition-shadow duration-300  border border-gray-200 mt-8 rounded-lg" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <CardContent className="p-4">
                                    <Typography variant="h6" className="mb-2 text-gray-800  text-center" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}><strong>{item.product}</strong></Typography>
                                    <img
                                        
                                        src={item.imageUrl}
                                        alt={item.product}
                                        className="w-full h-40 object-contain mt-4 mb-4 rounded-lg shadow-sm" // Improved image styling
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <Typography variant="body2" className="text-gray-700"style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}><strong>Name:</strong> {item.name}</Typography>
                                        <Typography variant="body2" className="text-gray-700"style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}><strong>Address:</strong> {item.address}</Typography>
                                        <Typography variant="body2" className="text-gray-700"style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}><strong>Mobile Number:</strong> {item.mobileNumber}</Typography>
                                        <Typography variant="body2" className="text-gray-700"style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}><strong>Pincode:</strong> {item.pincode}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Order;
