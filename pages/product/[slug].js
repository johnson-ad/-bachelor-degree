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
      <div className="py-2 flex">
        <Link href="/">
          <a className="flex gap-2 items-center">
            <IoMdArrowRoundBack />
            <span className="pt-0">back to products</span>
          </a>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3 py-2 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          layout="responsive"
        />
      </div>
    </Layout>
  );
}
