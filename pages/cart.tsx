import CartPage from "../components/index/cart/cart-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Cart(props) {

    return (
        <>
            <CartPage/>
        </>
    )
}

Cart.Layout = DefaultLayout;