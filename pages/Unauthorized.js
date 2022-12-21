import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <motion.h1
        animate={{ opacity: 1, y: 14 }}
        transition={{ type: 'spring', delay: 0.8 }}
        initial={{ opacity: 0, y: 0 }}
        className="text-xl"
      >
        Access Denied
      </motion.h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
