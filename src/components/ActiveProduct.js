import React from "react";
import StarRatings from "react-star-ratings";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProduct } from "../reducer";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { db } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
function ActiveProduct({ activeProduct }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [buying, setBuying] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white w-[65%] h-[70%] flex gap-4 p-4 relative">
      <div className="w-[30%] flex justify-center items-center">
        <img
          src={activeProduct.img}
          className="w-[200px] h-[200px] object-cover"
        />
      </div>
      <div className="w-[30%] py-4">
        <p className="font-bold text-[20px]">{activeProduct.name}</p>
        <StarRatings
          rating={Number(activeProduct.rating)}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          isSelectable={false}
          starDimension="17"
          starSpacing="1px"
        />
        <div className="border-b-[1px] border-gray-400 my-2"></div>
        <p className="font-bold text-[20px]">{activeProduct.cost}</p>
        <div className="border-b-[1px] border-gray-400 my-2"></div>
        <p className="font-bold text-[20px]">Overview</p>
        <p className="font-thin text-[12px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make.
        </p>
      </div>
      <div className=" border-2 border-gray-400 py-4 px-2 ml-4 w-[22%] ">
        <p className="font-bold text-[20px]">{activeProduct.cost} </p>
        <p className="font-thin text-[15px]">Free Delivery</p>
        <p className="font-thin text-[15px]">In Stock</p>
        {buying && (
          <div className="bg-orange-600 px-4 py-1 rounded-full my-4 flex justify-center items-center">
            <ThreeDots height="22" width="75" radius="1" color="#FFFFFF" />
          </div>
        )}
        {!buying && (
          <motion.button
            onClick={async () => {
              setBuying(true);
              let order = {
                ...activeProduct,
                timeStamp: Date.now(),
                userId: user.uid,
              };
              const docRef = await addDoc(
                collection(db, `${user.uid}-orders`),
                order
              );
              await setDoc(doc(db, "orders", docRef.id), order);
              setBuying(false);
              dispatch(setActiveProduct(null));
              navigate("/order");
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-orange-600 px-12 py-1 rounded-full
         text-white my-4"
          >
            Order
          </motion.button>
        )}
        <p className="font-bold text-[11px] my-1">Ships From Dappazon</p>
        <p className="font-bold text-[11px] ">Sold from Dappazon</p>
      </div>

      <ImCross
        onClick={() => dispatch(setActiveProduct(null))}
        className="absolute right-0 hover:cursor-pointer
       top-0 m-2 text-[20px] font-bold"
      />
    </div>
  );
}

export default ActiveProduct;
