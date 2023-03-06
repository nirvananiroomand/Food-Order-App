import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCntxt = useContext(CartContext);
    const totalAmount = `$${cartCntxt.totalAmount.toFixed(2)}`;
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const hasItems = cartCntxt.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCntxt.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCntxt.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch(
            "https://food-order-app-5e0a1-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCntxt.items,
                }),
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCntxt.clearCart();
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCntxt.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {hasItems && (
                    <button className={classes.button} onClick={orderHandler}>
                        Order
                    </button>
                )}
            </div>
        </Fragment>
    );

    const isSubmitingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmitingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
