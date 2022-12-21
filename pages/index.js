import data from '../utils/data';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function Home() {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-5 mt-3">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
