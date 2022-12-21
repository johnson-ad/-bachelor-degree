import React from 'react';
import { motion } from 'framer-motion';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <motion.div
            animate={{ opacity: 1, y: 3 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, y: 0 }}
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-indigo-500   text-indigo-500'
           : 'border-gray-400 text-gray-400'
       }
          
       `}
          >
            {step}
          </motion.div>
        )
      )}
    </div>
  );
}
