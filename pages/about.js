import Layout from '../components/Layout';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const about = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_mxoz07a',
        'template_3ws8z6p',
        form.current,
        'ukyZpVODk_mwCVj2W'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <Layout title="About">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto max-w-screen-md mt-5 mb-6"
      >
        <form ref={form} onSubmit={sendEmail} className="flex flex-col">
          <label className="font-bold mb-3">Name</label>
          <input type="text" name="user_name" />
          <label className="font-bold mb-3 mt-3">Email</label>
          <input type="email" name="user_email" className="text-gray-900" />
          <label className="font-bold mb-3 mt-3">Message</label>
          <textarea name="message" />
          <input
            type="submit"
            value="Send your message"
            className="primary-button mt-6"
          />
        </form>
      </motion.div>
    </Layout>
  );
};

export default about;
