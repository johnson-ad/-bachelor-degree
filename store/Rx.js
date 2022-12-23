import { BehaviorSubject } from 'rxjs';
import data from '../utils/data';

//cart$ est un observable
const cart$ = new BehaviorSubject(data);

const addCart = (item) => {
  data.product.push({
    name: item,
    slug: 'paris-shirt',
    catgory: 'Shirts',
    image: '/images/johnson&johnson.png',
    price: '70',
    brand: 'Jason',
    rating: 4.4,
    numReviews: 8,
    countInStock: 7,
    description: 'A popular shirt from Jason.',
  });
};
