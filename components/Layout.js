import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer/Footer';

export default function Layout({ title, children }) {
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
