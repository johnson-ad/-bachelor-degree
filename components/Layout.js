import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer/Footer';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Head>
        <title>{title ? title + ' - AMG' : 'AMG'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="bachelor degree" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">AMG</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2 hover:scale-125 duration-300 hover:text-teal-400">
                  Cart
                  {cart.cartItems.length > 0 ? (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 tet-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  ) : null}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}
