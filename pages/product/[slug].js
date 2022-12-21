import axios from 'axios';
import { toast } from 'react-toastify';
import Product from '../../models/Product';
import db from '../../utils/db';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import fr from '../../locales/fr';
import en from '../../locales/en';
import { motion } from 'framer-motion';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : fr;

  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <motion.div>
        <motion.div
          animate={{ y: 5, opacity: 1 }}
          transition={{ delay: 1.2 }}
          initial={{ y: 0, opacity: 0 }}
          className="py-2 flex w-full"
        >
          <Link href="/">
            <a className="flex gap-2 items-center">
              <span className="pt-0">back to products</span>
            </a>
          </Link>
        </motion.div>

        <motion.div className="grid md:grid-cols-5 md:gap-3">
          <motion.div
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.7 }}
            initial={{ scale: 0 }}
            className="md:col-span-2"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, x: -14 }}
            transition={{ type: 'tween', delay: 1.7 }}
            initial={{ opacity: 0, x: 0 }}
            className="flex-col md:col-span-2 p-6"
          >
            <div>
              <ul>
                <li>
                  <h1 className="text-lg font-bold">{product.name}</h1>
                </li>
                <li>
                  <span className="font-bold">Category:</span>{' '}
                  {product.category}
                </li>
                <li>
                  <span className="font-bold">Brand:</span> {product.brand}
                </li>
                <li className="font-bold">
                  {product.rating} of {product.numReviews} reviews
                </li>
                <li>
                  {' '}
                  <span className="font-bold">Description : </span>{' '}
                  {t.description} {' --- ||| --- '} {product.description}
                </li>
              </ul>
            </div>
            <motion.div
              animate={{ opacity: 1, y: -14 }}
              transition={{ type: 'tween', delay: 1.9 }}
              initial={{ opacity: 0, y: 0 }}
              className="card p-5 mt-5"
            >
              <div className="mb-2 flex justify-between">
                <div className="text-lg font-bold">Price</div>
                <div className="text-lg font-bold">${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div className="font-bold">Status</div>
                <div>
                  {' '}
                  {product.countInStock > 0 ? (
                    <span className="text-green-600 text-md font-bold">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 text-md font-bold">
                      Unavaible
                    </span>
                  )}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
