import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.name}>
      <div className="py-2 flex w-full">
        <Link href="/">
          <a className="flex gap-2 items-center">
            <IoMdArrowRoundBack />
            <span className="pt-0">back to products</span>
          </a>
        </Link>
      </div>
      <div className="grid md:grid-cols-5 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div className="flex-col md:col-span-2 p-6">
          <div>
            <ul>
              <li>
                <h1 className="text-lg font-bold">{product.name}</h1>
              </li>
              <li>
                <span className="font-bold">Category:</span> {product.category}
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
                {product.description}
              </li>
            </ul>
          </div>
          <div className="card p-5 mt-5">
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
            <button className="primary-button w-full">Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
