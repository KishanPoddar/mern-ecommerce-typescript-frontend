import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cartItem";
import {
    addToCart,
    calculatePrice,
    discountApply,
    removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    const { cartItems, subTotal, tax, total, shippingCharges, discount } =
        useSelector((state: RootState) => state.cartReducer);

    const dispatch = useDispatch();

    const incrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity >= cartItem.stock) return;
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity <= 1) return;
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const removeHandler = (productId: string) => {
        dispatch(removeCartItem(productId));
    };

    useEffect(() => {
        const { token, cancel } = axios.CancelToken.source();

        const timeoutId = setTimeout(() => {
            axios
                .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
                    cancelToken: token,
                })
                .then((res) => {
                    dispatch(discountApply(res.data.discount));
                    dispatch(calculatePrice());
                    setIsValidCouponCode(true);
                })
                .catch(() => {
                    dispatch(discountApply(0));
                    dispatch(calculatePrice());
                    setIsValidCouponCode(false);
                });
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            cancel();
            setIsValidCouponCode(false);
        };
    }, [dispatch, couponCode]);

    useEffect(() => {
        dispatch(calculatePrice());
    }, [dispatch, cartItems]);

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? (
                    cartItems.map((i) => (
                        <CartItemCard
                            key={i.productId}
                            cartItem={i}
                            incrementHandler={incrementHandler}
                            decrementHandler={decrementHandler}
                            removeHandler={removeHandler}
                        />
                    ))
                ) : (
                    <h1>No Items in the cart</h1>
                )}
            </main>

            <aside>
                <p>Subtotal: ₹{subTotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: <em className="red"> - ₹{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>
                <input
                    type="text"
                    value={couponCode}
                    placeholder="Coupon Code"
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="green">
                            ₹{discount} off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon Code <VscError />{" "}
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;
