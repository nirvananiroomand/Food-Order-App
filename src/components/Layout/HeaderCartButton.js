import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartcntxt = useContext(CartContext);
    
    const numberOfCartItems = cartcntxt.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    
    useEffect(() => {
        setBtnHighlighted(true);
        setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);
    }, [cartcntxt]);

    const btnclass = `${classes.button} ${btnHighlighted && classes.bump} `;


    return (
        <button className={btnclass} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
