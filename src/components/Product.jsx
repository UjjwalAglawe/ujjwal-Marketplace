import { useDispatch, useSelector } from "react-redux"
import { add, remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const Product = ({ post }) => {
  const {cart} = useSelector((state) => state)

  const dispath=useDispatch();

  const addToCart=()=>{
    dispath(add(post))
    toast.success("Item Added to Cart")
  }

  const removeFromCart=()=>{
    dispath(remove(post.id))
    toast.error("Item Removed From Cart")
  }


  return (
    <div className="flex flex-col items-center justify-between 
    hover:scale-110 transition duration-300 ease-in gap-1 p-4 mt-10 ml-5 rounded-xl outline bg-slate-300 hover:bg-slate-100 ">
      <div>
        <p className="text-gray-800 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
      </div>

      <div>
        <p className="w-40 text-gray-800 font-normal text-[13px] text-left">{post.description}</p>
      </div>

      <div className="h-[180px]">
        <img src={post.image} className="h-full w-full "/>
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <p className="text-green-600 font-semibold">{post.price} ETH</p>
      </div>

      {
        cart.some((p) => p.id == post.id) ?
          (
            <button onClick={removeFromCart} 
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
              text-[12px] p-1 px-3 uppercase 
             hover:bg-gray-700
             hover:text-white transition duration-300 ease-in">
              Remove Item
            </button>
          ) :
          (<button onClick={addToCart}
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-[12px] p-1 px-3 uppercase 
           hover:bg-gray-700
           hover:text-white transition duration-300 ease-in">
            Add to Item
          </button>
          )
      }

    </div>
  )
}

export default Product