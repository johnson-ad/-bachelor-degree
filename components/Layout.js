import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer/Footer';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  // const logoutClickHandler = () => {
  //   Cookies.remove('cart');
  //   dispatch({ type: 'CART_RESET' });
  //   signOut({ callbackUrl: '/login' });
  // };

  // const [query, setQuery] = useState('');

  // const router = useRouter();
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   router.push(`/search?query=${query}`);
  // };
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
              <Link href="/product">
                <a className="p-2 hover:scale-125 duration-300 hover:text-teal-400">
                  Product
                </a>
              </Link>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
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
