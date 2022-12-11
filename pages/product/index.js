import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import data from '../../utils/data';

export default function HomeProduct() {
  return (
    <Layout title="Home product">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-5 mt-3">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
