import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import notfound from '../public/images/notfound.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  return (
    <Layout title="Shopping Cart">
      <motion.h1
        animate={{ opacity: 1, y: 14 }}
        transition={{ type: 'spring', delay: 0.8 }}
        initial={{ opacity: 0, y: 0 }}
        className="mb-4 text-xl"
      >
        Shopping Cart
      </motion.h1>
      {cartItems.length === 0 ? (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', delay: 1 }}
          initial={{ opacity: 0 }}
          className=" bg-green-500 flex-col justify-items-center items-center"
        >
          <div className="bg-red-500 md:3">
            <Image
              src={notfound}
              alt="404"
              width={200}
              height={200}
              objectFit="cover"
            />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500 font-oswald mb-10">
              Cart is empty.
            </h1>
            <Link href="/">
              <a className="flex gap-2 items-center">
                <span className="pt-0">Go Shopping</span>
              </a>
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', delay: 0.4 }}
          initial={{ opacity: 0 }}
          className="grid md:grid-cols-4 md:gap-4"
        >
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <th className="px-5 text-left">Item</th>
                <th className="p-5 text-right text-green-700">Quantity</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5">Action</th>
              </thead>
              <motion.tbody
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', delay: 0.6 }}
                initial={{ opacity: 0 }}
              >
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href="/product/`${item.slug}`">
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            objectFit="cover"
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right font-bold">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right font-bold">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </motion.tbody>
            </table>
          </div>
          <motion.div
            animate={{ opacity: 1, x: -14 }}
            transition={{ type: 'spring', delay: 0.8 }}
            initial={{ opacity: 0, x: 0 }}
            className="card p-5 mt-1 mr-1 "
          >
            <ul>
              <li>
                <div className="pb-3 text-xl font-bold">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full font-bold"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
