import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { motion } from 'framer-motion';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <motion.h1
        animate={{ opacity: 1, y: 14 }}
        transition={{ delay: 0.8 }}
        initial={{ opacity: 0, y: 0 }}
        className="mb-4 text-xl"
      >
        Order History
      </motion.h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <motion.div
          animate={{ opacity: 1, y: 14 }}
          transition={{ type: 'spring', delay: 0.8 }}
          initial={{ opacity: 0, y: 0 }}
          className="overflow-x-auto mb-6 mt-4"
        >
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <motion.tr
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  key={order._id}
                  className="border-b"
                >
                  <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                  <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                  <td className=" p-5 ">${order.totalPrice}</td>
                  <td className=" p-5 ">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'not paid'}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'not delivered'}
                  </td>
                  <td className=" p-5 ">
                    <Link href={`/order/${order._id}`} passHref>
                      <a>Details</a>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
