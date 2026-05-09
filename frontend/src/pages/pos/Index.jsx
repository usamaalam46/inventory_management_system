import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPosProducts,
  checkoutSale,
} from "../../services/posService";

import Receipt
  from "../../components/Receipt";

export default function POSPage() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [cart, setCart] =
    useState([]);

  const [sale, setSale] =
    useState(null);

  useEffect(() => {

    const loadProducts =
      async () => {

        try {

          const data =
            await getPosProducts();

          setProducts(data);

        } catch (error) {

          console.log(error);
        }
      };

    loadProducts();

  }, []);

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [products, search]);

  const addToCart = (product) => {

    const exists = cart.find(
      (item) =>
        item.id === product.id
    );

    if (exists) {

      setCart(

        cart.map((item) =>

          item.id === product.id

            ? {
              ...item,
              quantity:
                item.quantity + 1,
            }

            : item
        )
      );

    } else {

      setCart([

        ...cart,

        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {

    setCart(

      cart.map((item) =>

        item.id === id

          ? {
            ...item,
            quantity:
              item.quantity + 1,
          }

          : item
      )
    );
  };

  const decreaseQty = (id) => {

    setCart(

      cart

        .map((item) =>

          item.id === id

            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }

            : item
        )

        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const removeItem = (id) => {

    setCart(

      cart.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  const total = cart.reduce(

    (sum, item) =>

      sum +

      Number(item.price) *

      Number(item.quantity),

    0
  );

  const handleCheckout =
    async () => {

      try {

        const response =
          await checkoutSale({
            cart,
          });

        setSale(response);

        setCart([]);

        const data =
          await getPosProducts();

        setProducts(data);

      } catch (error) {

        alert(
          error.response?.data?.message
        );
      }
    };

  if (sale) {

    return (
      <Receipt sale={sale} />
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">

      <div className="col-span-8 bg-white rounded-2xl border border-gray-100 p-6 overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              POS System
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer sales
            </p>

          </div>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search products..."
            className="border border-gray-200 rounded-2xl px-4 py-3 w-72 outline-none focus:border-black"
          />

        </div>

        <div className="grid grid-cols-3 gap-5">

          {filteredProducts.map(
            (product) => (

              <div
                key={product.id}
                className="border border-gray-100 rounded-2xl p-5"
              >

                <div className="h-36 bg-gray-100 rounded-xl mb-4"></div>

                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {product.category?.name}
                </p>

                <div className="flex items-center justify-between mt-5">

                  <div>

                    <h4 className="font-bold">

                      Rs {product.price}

                    </h4>

                    <p className="text-xs text-gray-500 mt-1">

                      Stock:
                      {" "}
                      {product.quantity}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    className="bg-black text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Add
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      <div className="col-span-4 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Cart
          </h2>

          <p className="text-gray-500 text-sm mt-1">

            Selected products

          </p>

        </div>

        <div className="flex-1 overflow-y-auto space-y-4">

          {cart.map((item) => (

            <div
              key={item.id}
              className="border border-gray-100 rounded-2xl p-4"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-medium">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">

                    Rs {item.price}

                  </p>

                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>

              </div>

              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                  className="w-8 h-8 rounded-full border border-gray-300"
                >
                  -
                </button>

                <span className="font-medium">

                  {item.quantity}

                </span>

                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                  className="w-8 h-8 rounded-full border border-gray-300"
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="border-t border-gray-100 pt-5 mt-5 space-y-4">

          <div className="flex items-center justify-between text-lg font-bold">

            <span>
              Total
            </span>

            <span>
              Rs {total}
            </span>

          </div>

          <button
            disabled={
              cart.length === 0
            }
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium disabled:opacity-50"
          >
            Complete Sale
          </button>

        </div>

      </div>

    </div>
  );
}