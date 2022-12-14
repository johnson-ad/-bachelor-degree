import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="card mr-2 ml-2 mb-4 mt-10 z-0 hover:z-0 flex flex-col items-center"
    >
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow"
            width={200}
            height={200}
            objectFit="cover"
          />
        </a>
      </Link>

      <div
        className="flex flex-col items-center jutify-center p-2"
        onClick={() => addToCartHandler(product)}
      >
        <Link href={`/product/${product.slug}`}>
          <a className="text-xl font-bold">
            {' '}
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>

        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
}
