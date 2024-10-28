import { createSlice } from '@reduxjs/toolkit';


// Initialize state with items from localStorage
const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new item
            }

            // Update localStorage with user-specific cart
            const userId = action.payload.userId; // Get userId from payload
            localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.items));
        },

        deleteFromCart: (state, action) => {
            const userId = action.payload.userId; // Get userId from payload
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrease quantity
            } else {
                state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item
            }

            // Update localStorage with user-specific cart
            localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.items));
        },

        clearCart: (state, action) => {
            const userId = action.payload; // Get userId from action
            state.items = [];
            localStorage.removeItem(`cartItems_${userId}`); // Clear user-specific cart
        },

        loadCart: (state, action) => {
            const userId = action.payload; // Get userId from action
            const storedCart = localStorage.getItem(`cartItems_${userId}`);
            if (storedCart) {
                state.items = JSON.parse(storedCart); // Load user-specific cart
            }
        },
    },
});

// Exporting actions to be used in components
export const { addToCart, deleteFromCart, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;