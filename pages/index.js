import data from '../utils/data';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

export default function Home() {
  return (
    <Layout title="Home">
      <h1 className="text-red-500 font-bold">Ajouter cool page ici</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-5 mt-3">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
