import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { setActiveProduct, setProducts } from "../reducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
function Products() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    let allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push(doc.data());
    });
    dispatch(setProducts(allProducts));
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="font-black text-[20px] text-black ml-2 self-start mb-2">
          Electronics & Gadgets
        </p>
        <div className="flex gap-12">
          {products.map((product, id) => {
            if (product.category !== "electronics") return null;
            else
              return (
                <div
                  onClick={() => dispatch(setActiveProduct(product))}
                  key={id}
                  className="p-2 hover:cursor-pointer"
                >
                  <img
                    src={product.img}
                    alt="product image"
                    className="w-[200px] h-[170px] mb-3 object-cover"
                  />
                  <p className="font-bold -mb-1">{product.name}</p>
                  <p className="-mb-1">{product.cost} Rupees</p>
                  <StarRatings
                    rating={Number(product.rating)}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension="17"
                    starSpacing="1px"
                  />
                </div>
              );
          })}
        </div>
      </div>
      <div className="border-b-2 border-black/30"></div>
      <div>
        <p className="font-black text-[20px] text-black ml-2 self-start mb-2">
          Clothing & Jwellery
        </p>
        <div className="flex gap-12">
          {products.map((product, id) => {
            if (product.category !== "clothing") return null;
            else
              return (
                <div
                  onClick={() => dispatch(setActiveProduct(product))}
                  key={id}
                  className="p-2 hover:cursor-pointer"
                >
                  <img
                    src={product.img}
                    alt="product image"
                    className="w-[200px] h-[170px] mb-3 object-cover"
                  />
                  <p className="font-bold -mb-1">{product.name}</p>
                  <p className="-mb-1">{product.cost} Rupees</p>
                  <StarRatings
                    rating={Number(product.rating)}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension="17"
                    starSpacing="1px"
                  />
                </div>
              );
          })}
        </div>
      </div>
      <div className="border-b-2 border-black/30"></div>
      <div>
        <p className="font-black text-[20px] text-black ml-2 self-start mb-2">
          Toys & Gamming
        </p>
        <div className="flex gap-12">
          {products.map((product, id) => {
            if (product.category !== "toys") return null;
            else
              return (
                <div
                  onClick={() => dispatch(setActiveProduct(product))}
                  key={id}
                  className="p-2 hover:cursor-pointer"
                >
                  <img
                    src={product.img}
                    alt="product image"
                    className="w-[200px] h-[170px] mb-3 object-cover"
                  />
                  <p className="font-bold -mb-1">{product.name}</p>
                  <p className="-mb-1">{product.cost} Rupees</p>
                  <StarRatings
                    rating={Number(product.rating)}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension="17"
                    starSpacing="1px"
                  />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
