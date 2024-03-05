import { createSlice } from "@reduxjs/toolkit";


export const CartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add:(state,action)=>{
            state.push(action.payload) //jo bhi input parameter store kiya hai use action.payload se access kar sakte hai ....hum use state ke andar push karre hai  ..... here in Product 
        },
        remove:(state,action)=>{
            return state.filter((item)=>item.id!==action.payload)  //state ke andar vo hi value store karna jiski id != action .payload
        },
    }
})

export  const {add,remove} =CartSlice.actions;
export default CartSlice.reducer;