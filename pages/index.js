import data from '../utils/data';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
// import data from '../utils/data';
import img from '../public/images/cart-MSI.png';

export default function Home() {
  return (
    <Layout title="Home">
      {/* <Carousel>
        <div>
          {/* <Image
            src={data.products.image}
            alt={data.products.name}
            width={640}
            height={640}
            layout="responsive"
            objectFit="cover"
          /> 
          <img src={img} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={img} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={img} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-5 mt-3">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
