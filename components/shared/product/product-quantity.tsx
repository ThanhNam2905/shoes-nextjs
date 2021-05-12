import { useContext, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { DataContext } from "../../../store/GlobalState";

type PropsType = {
    [x: string]: any;
    quantity?: number;
    setQuantity?: Function;
    cart?: any;
    productId?: string;
    inStock?: number;
}

export default function ProductQuantity({ quantity, setQuantity, cart, productId, inStock }: PropsType) {

    const { dispatch } = useContext(DataContext);

    const handleSetQuantity = async (value) => {
        if(value < 0) {
            await setQuantity(0);
        }
        else {
            await setQuantity(value);
        }
    }
    const handleSetQuantity2 = async (value) => {
        if(value < 0) {
            await setQuantity(0);
        }
        else {
            await setQuantity(value);
        }
    }

    const decrease = (data, id) => {
        const newCart = [...data];
        newCart.forEach(item => {
            if(item.productId === id) {
                item.qty -= 1;
            }
        })
        return ({ type: 'ADD_CART', payload: newCart})
    }
    const increase = (data, id) => {
        const newCart = [...data];
        newCart.forEach(item => {
            if(item.productId === id) {
                item.qty += 1;
            }
        })
        return ({ type: 'ADD_CART', payload: newCart})
    }

    return (
        <>  
            {   
                (cart && productId) ? (
                    <div className="flex items-center justify-between border border-gray-400 text-gray-400 rounded-sm px-2 py-1">
                        <button className="focus:outline-none" 
                                disabled={quantity === 0 ? true : false }
                                onClick={() => dispatch(decrease(cart, productId))}>
                            <FaMinus className="text-12 hover:text-gray-700v " />
                        </button>
                        <input type="text" className="w-4 text-gray-800" value={quantity} onChange={(e) => handleSetQuantity2(Number(e.target.value))} />
                        <button className="focus:outline-none" 
                                disabled={quantity === inStock? true : false }
                                onClick={() => dispatch(increase(cart, productId))}>
                            <FaPlus className="text-12 hover:text-gray-700 " />
                        </button>
                    </div>
                ): (
                    <div className="flex items-center space-x-5 border border-gray-400 text-gray-400 rounded-sm px-2 py-1">
                        <button className="focus:outline-none" onClick={() => handleSetQuantity(quantity - 1)}>
                            <FaMinus className="text-12 hover:text-gray-700v " />
                        </button>
                        <input type="text" className="w-10 text-gray-800" value={quantity} onChange={(e) => handleSetQuantity(Number(e.target.value))} />
                        <button className="focus:outline-none" onClick={() => handleSetQuantity(quantity + 1)}>
                            <FaPlus className="text-12 hover:text-gray-700 " />
                        </button>
                    </div>
            )}  
        </>
    )
}