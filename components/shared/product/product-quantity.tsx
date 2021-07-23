import { useContext, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { DataContext } from "../../../store/GlobalState";

type PropsType = {
    [x: string]: any;
    quantity?: number;
    setQuantity?: Function;
    cart?: any;
    idCart?: string;
    inStock?: number;
}

export default function ProductQuantity({ quantity, setQuantity, cart, idCart, inStock }: PropsType) {

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
        await setQuantity(value);
    }

    const decrease = (data, id) => {
        const newCart = [...data];
        newCart.forEach(item => {
            if(item.idCart === id) {
                item.qty -= 1;
            }
        })
        return ({ type: 'ADD_CART', payload: newCart})
    }
    const increase = (data, id) => {
        const newCart = [...data];
        newCart.forEach(item => {
            if(item.idCart === id) {
                item.qty += 1;
            }
        })
        return ({ type: 'ADD_CART', payload: newCart})
    }

    return (
        <>  
            {   
                (cart && idCart) ? (
                    <div className="flex items-center justify-between border border-gray-400 text-gray-400 rounded-sm px-2 py-1">
                        <button className="focus:outline-none" 
                                disabled={quantity === 1 ? true : false }
                                onClick={() => dispatch(decrease(cart, idCart))}>
                            <FaMinus className="text-12 hover:text-gray-700 " />
                        </button>
                        <input type="text" className="w-4 text-gray-900 text-center font-semibold" value={quantity} onChange={(e) => handleSetQuantity2(Number(e.target.value))} />
                        <button className="focus:outline-none" 
                                disabled={quantity === inStock? true : false }
                                onClick={() => dispatch(increase(cart, idCart))}>
                            <FaPlus className="text-12 hover:text-gray-700 " />
                        </button>
                    </div>
                ): (
                    <div className="flex items-center space-x-2 border border-gray-400 text-gray-400 rounded-md">
                        <button className="focus:outline-none border border-r-2 border-gray-400 hover:bg-gray-500 hover:text-gray-900 p-3.5 rounded-tl-md rounded-bl-md"
                                disabled={quantity === 1 ? true : false } 
                                onClick={() => handleSetQuantity(quantity - 1)}>
                            <FaMinus className="text-12  " />
                        </button>
                        <input type="text" className="w-10 text-gray-900 font-semibold text-center" value={quantity} onChange={(e) => handleSetQuantity(Number(e.target.value))} />
                        <button className="focus:outline-none border border-l-2 border-gray-400 hover:bg-gray-500 hover:text-gray-900 p-3.5 rounded-tr-md rounded-br-md"
                                disabled={quantity === inStock? true : false } 
                                onClick={() => handleSetQuantity(quantity + 1)}>
                            <FaPlus className="text-12  " />
                        </button>
                    </div>
                )
            }
        </>
    )
}