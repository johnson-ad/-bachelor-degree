import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer/index';
import Cookies from 'js-cookie';
import { useContext, useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { TfiSearch } from 'react-icons/tfi';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const { locale } = router;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title : 'PAJ'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="bachelor degree" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <motion.nav
            animate={{ opacity: 1, y: 4 }}
            transition={{ delay: 0.3 }}
            initial={{ opacity: 0, y: 0 }}
            className="flex h-12 items-center px-5 justify-between shadow-md "
          >
            <div>
              <Link href="/">
                <a className="text-lg font-bold flex">
                  <span className="text-3xl text-indigo-600">
                    <ion-icon name="logo-ionic"></ion-icon>
                  </span>
                  PAJ
                </a>
              </Link>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl absolute right-8 top-2 cursor-pointer lg:hidden md:hidden"
            >
              <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </div>
            <div
              className={`md:flex md:items-center md:pb-0 h-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                open ? 'top-10 bg-white z-50 h-80' : 'top-[-490px]'
              }`}
            >
              <form
                onSubmit={submitHandler}
                className="mx-auto  hidden  justify-center md:flex mr-3"
              >
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="rounded-tr-none rounded-br-none p-1 text-sm  focus:ring-0"
                  placeholder="Search products"
                />
                <button
                  className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                  type="submit"
                  id="button-addon2"
                >
                  <TfiSearch className="h-4 w-5" />
                </button>
              </form>
              <div
                className={` ${
                  open
                    ? ' sm:flex sm:flex-col sm:items-center'
                    : 'font-bold md:flex'
                }`}
              >
                <Link href="/">
                  <a className="p-2 hover:scale-125 duration-300 hover:text-teal-400">
                    Home
                  </a>
                </Link>
                <Link href="/product">
                  <a className="p-2 hover:scale-125 duration-300 hover:text-teal-400">
                    Product
                  </a>
                </Link>
                <Link href="/about">
                  <a className="p-2 hover:scale-125 duration-300 hover:text-teal-400">
                    About
                  </a>
                </Link>
                <Link href="/cart">
                  <a className="p-2 mr-1 hover:scale-125 duration-300 hover:text-teal-400">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </a>
                </Link>
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu
                    as="div"
                    className={` ${
                      open ? 'relative inline-block' : 'font-bold md:flex'
                    }`}
                  >
                    <Menu.Button className="text-blue-600 mr-2">
                      <motion.span
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        initial={{ opacity: 0 }}
                      >
                        {session.user.name}
                      </motion.span>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 t-10 hover:z-40  bg-white shadow-lg ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className="p-2">Login</a>
                  </Link>
                )}
                <select
                  onChange={changeLanguage}
                  defaultValue={locale}
                  className="text-blue-700 text-shadow-sm ml-5"
                >
                  <option className="text-black" value="fr">
                    FR
                  </option>
                  <option className="text-black" value="en">
                    EN
                  </option>
                </select>
              </div>
            </div>
          </motion.nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </>
  );
}
