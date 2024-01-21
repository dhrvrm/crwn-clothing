import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.items
);

export const isCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

const newCartCount = newCartItems.reduce(
  (total, cartItem) => total + cartItem.quantity,
  0
);
const newCartTotal = newCartItems.reduce(
  (total, cartItem) => total + cartItem.quantity * cartItem.price,
  0
);
