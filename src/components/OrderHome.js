import React from "react";
import { Orders, ActiveOrder } from "./";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../reducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
function OrderHome() {
  const activeOrder = useSelector((state) => state.activeOrder);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getOrders = async () => {
    dispatch(setOrders([]));
    const querySnapshot = await getDocs(collection(db, `${user.uid}-orders`));
    let allOrders = [];
    querySnapshot.forEach((docc) => {
      let order = docc.data();
      allOrders.push({ ...order, id: docc.id });
    });
    dispatch(setOrders(allOrders));
  };
  return (
    <>
      <div className=" py-4 w-screen scrollbar-hide  px-4  ">
        <Orders getOrders={getOrders} />
      </div>
      {activeOrder && (
        <div className="absolute mt-9 bg-black/40 top-0 h-screen w-screen flex justify-center items-center">
          <ActiveOrder activeOrder={activeOrder} getOrders={getOrders} />
        </div>
      )}
    </>
  );
}

export default OrderHome;
