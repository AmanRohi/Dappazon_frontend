import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrders, setActiveOrder } from "../reducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import StarRatings from "react-star-ratings";
function Orders({ getOrders }) {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="mt-14 md:mt-20  py-4 w-screen scrollbar-hide  px-4 md:px-16 flex gap-6 ">
      {orders.map((order) => {
        return (
          <div
            onClick={() => dispatch(setActiveOrder(order))}
            className="p-2 hover:cursor-pointer"
          >
            <img
              src={order.img}
              alt="product image"
              className="w-[200px] h-[170px] mb-3 object-cover"
            />
            <p className="font-bold -mb-1">{order.name}</p>
            <p className="-mb-1">{order.cost} Rupees</p>
            <StarRatings
              rating={Number(order.rating)}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              isSelectable={false}
              starDimension="17"
              starSpacing="1px"
            />
            <p>
              <span className="font-black">Placed</span> :{" "}
              {new Date(order.timeStamp).toDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
