import { createContext ,useContext,useReducer,useEffect} from "react";
import reducer from "../reducer/cartReducer"
const Cartcontext=createContext();
const getLocalCartData=()=>
{
    let localCartData=localStorage.getItem("amazon")
   
    const parsedData=JSON.parse(localCartData);
    if(!Array.isArray(parsedData))
    return [];
    return parsedData       
}
const initialState = {
    cart:getLocalCartData(),
    total_item:"",
    total_price:"",
    shipping_fee:50000
}

const CartProvider=({children})=>
{
    const [state, dispatch] = useReducer(reducer,initialState);

    const addToCart=(id, color, amount, product)=>
    {
        dispatch({type:"ADD_TO_CART",payload:{id, color, amount, product}})
    }
    const removeItem=(id)=>
    {
        dispatch({type:"REMOVE_ITEM",payload:id})
    }
    //clear cart
    const clearCart=()=>
    {
        dispatch({type:"CLEAR_CART"})
    }
    //increment decrement amount
    const setIncrease=(id)=>
    {
        dispatch({type:"INCREMENT_AMOUNT",payload:id})
    }
    const setDecrease=(id)=>
    {
        dispatch({type:"DECREMENT_AMOUNT",payload:id})
    }
    useEffect(() => {
        dispatch({type:"CART_TOTAL_ITEM"})
        dispatch({type:"CART_TOTAL_PRICE"})

      localStorage.setItem("amazon",JSON.stringify(state.cart))
    
    
    }, [state.cart])
    

return <Cartcontext.Provider value={{...state,addToCart,removeItem,clearCart,setIncrease,setDecrease}}>{children}</Cartcontext.Provider>
}

const useCartContext=()=>
{
    return useContext(Cartcontext)
}



export {CartProvider,useCartContext}