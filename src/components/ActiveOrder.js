import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setActiveOrder } from "../reducer";
import { getLogs } from "../utils";
import "react-vertical-timeline-component/style.min.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";

function ActiveOrder({ activeOrder, getOrders }) {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getAllLogs = async () => {
    let loggs = await getLogs(activeOrder.timeStamp);
    setLogs(loggs);
  };
  useEffect(() => {
    getAllLogs();
  }, []);
  return (
    <div className="bg-white w-[65%] h-[70%] flex gap-4 p-4 relative">
      <div className="w-[30%] flex justify-center items-center">
        <img
          src={activeOrder.img}
          className="w-[200px] h-[200px] object-cover"
        />
      </div>
      <div className="w-[30%] py-4">
        <p className="font-bold text-[20px]">{activeOrder.name}</p>
        <StarRatings
          rating={Number(activeOrder.rating)}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          isSelectable={false}
          starDimension="17"
          starSpacing="1px"
        />
        <div className="border-b-[1px] border-gray-400 my-2"></div>
        <p className="font-bold text-[20px]">{activeOrder.cost}</p>
        <div className="border-b-[1px] border-gray-400 my-2"></div>
        <p className="font-bold text-[20px]">Overview</p>
        <p className="font-thin text-[12px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make.
        </p>
        <button
          onClick={async () => {
            console.log(user.uid, activeOrder);
            await deleteDoc(doc(db, `${user.uid}-orders`, activeOrder.id));
            await deleteDoc(doc(db, `orders`, activeOrder.id));
            dispatch(setActiveOrder(null));
            getOrders();
            navigate("/order");
          }}
          className="mt-16 bg-orange-400 text-white px-4 py-2 rounded-md"
        >
          Cancel Order
        </button>
      </div>
      <div className=" border-2 border-gray-400 py-4 px-2 ml-4 w-[25%]">
        <p>Shipping Details</p>
        <div className="mt-4 flex flex-col gap-4">
          <div className="bg-orange-400 p-2 text-white text[12px] rounded-lg">
            <p className="text-black font-semibold">Shipped</p>
            <p>{new Date(activeOrder.timeStamp).toDateString()}</p>
          </div>
          {logs.map((log) => {
            return (
              <div className="bg-orange-400 p-2 text-white text[12px] rounded-lg">
                <p className="text-black font-semibold">{log.place}</p>
                <p>{new Date(log.timeStamp * 1000).toDateString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ImCross
        onClick={() => dispatch(setActiveOrder(null))}
        className="absolute right-0 hover:cursor-pointer
       top-0 m-2 text-[20px] font-bold"
      />
    </div>
  );
}

export default ActiveOrder;
