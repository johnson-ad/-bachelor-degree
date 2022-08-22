import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 shadow-inner">
          <div className="p-5">
            <ul className="text-gray-800 font-bold text-3xl pb-6">
              <p>
                stream<span className="text-blue-600">line</span>
              </p>
              <div className="flex gap-6 pb-5"></div>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
