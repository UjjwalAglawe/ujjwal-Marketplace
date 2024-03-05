import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const Cart = ({ posts, loading, checkoutHandler, openMeta, defaultAccount }) => {
  const { cart } = useSelector((state) => state);
  // console.log("Printing Cart");
  // console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [successful, setSuccessful] = useState(false);
  let successfull=false;

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  useEffect(() => {
    openMeta();
  }, []);




  async function sendTransaction() {
    const totalAmountInEther = ethers.parseUnits(totalAmount.toString(), 'ether');
    const transactionObject = {
      from: defaultAccount,
      to: "0xD1F2e52081a1Fb3E79a3Baa166106AdF1B122265",
      value: totalAmountInEther.toString(16),
    };

    try {
      const result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionObject],
      });

      
      let receipt = null;
      while (receipt === null) {
        receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [result],
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }

      
      console.log("Transaction completed");
      // setSuccessful(true);
      successfull=true;
      console.log("setSuccessful set to true");
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }


  

  async function Handlerevery() {
    await sendTransaction(); 
    console.log("if its true ujwjal");
    console.log(successfull); 
    if (successfull) {
      toast.success("Success");
      checkoutHandler();
    }
  }

  return (
    <div>
      {cart.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
          <div className="w-[100%] md:w-[60%] flex flex-col p-2">
            {cart.map((item, index) => {
              return <CartItem key={item.id} item={item} itemIndex={index} />;
            })}
          </div>
          <div className="w-[100%] md:w-[40%] mt-5  flex flex-col">
            <div className="flex flex-col p-5 gap-5 my-14  h-[100%] justify-between">
              <div className="flex flex-col gap-5 ">
                <div className="font-semibold text-xl text-green-800 ">Your Cart</div>
                <div className="font-semibold text-5xl text-green-700  -mt-5">Summary</div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">Total Items: {cart.length}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold"><span className="text-gray-700 font-semibold">Total Amount:</span> {totalAmount} ETH</p>
              <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl" onClick={Handlerevery}>CheckOut Now</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <NavLink to={"/"}>
            <button className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
      {/* <div>
        <span>Address: {defaultAccount}</span>
      </div> */}
      {/* <div>
        <button onClick={sendTransaction}>Send</button>
      </div> */}
    </div>
  );
};

export default Cart;
