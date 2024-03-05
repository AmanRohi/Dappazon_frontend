import React from "react";
import { Products, ActiveProduct, ActiveOrder } from "./";
import { useSelector } from "react-redux";
function Home() {
  const activeProduct = useSelector((state) => state.activeProduct);
  return (
    <>
      <div className="mt-14 md:mt-20  py-4 w-screen scrollbar-hide  px-4 md:px-16 ">
        <Products />
      </div>
      {activeProduct && (
        <div className="fixed mt-9 bg-black/40 top-0 h-screen w-screen flex justify-center items-center">
          <ActiveProduct activeProduct={activeProduct} />
        </div>
      )}
    </>
  );
}

export default Home;
