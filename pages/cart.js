import Image from 'next/image';
import Link from 'next/link';
// import { XCircleIcon } from '@heroicons/react/outline';
import {
  FaBoxTissue,
  FaExclamationCircle,
  FaCircle,
  FaCircleNotch,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaTiktok,
} from 'react-icons/fa';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          {' '}
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-4 bg-green-400">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <th className="px-5 text-left text-xl">Item</th>
                <th className="p-5 text-right text-green-700   font-bold">
                  Quantity
                </th>
                <th className="p-5 text-right   ">Price</th>
                <th className="p-5   ">Action</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="'border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
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
                    <td className="text-right bg-green-400">
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
                    {/* <tr className=" text-right">{item.quantity}</tr> */}
                    <td className=" text-right p-5 bg-yellow-400">
                      {item.price}
                    </td>
                    <td className=" text-right bg-yellow-400">
                      <button onClick={() => removeItemHandler(item)}>
                        {/* <XCircleIcon className="h-5 w-5" /> */}
                        {/* <FaBoxTissue /> */}
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
              </tbody>
            </table>
          </div>
          <div className="card p-5 mt-2 bg-green-400 ">
            <ul>
              <li>
                <div className="">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : ${' '}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
