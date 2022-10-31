import { ps } from './ProductService.js';
import { productsData } from './data.js';

const bulkUploadProducts = async (event) => {
  productsData.map(async (product) => {
    product.price = parseFloat(product.price);
    const rs = await ps.addProducts(product);
    console.log('New Product Added Succesfully ', rs?.id);
  });
};

const bulkDeleteProducts = async (event) => {
  const data = await ps.getAllProducts();
  console.log(data.docs);
  // data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  data.docs.map(async (product) => {
    await ps.deleteProduct(product.id);
    console.log('Delete product ', product.id);
  });
};

const loadData = async () => {
  await bulkDeleteProducts();
  await bulkUploadProducts();

  // process.exit();
};

loadData();
// .then(() => process.exit(0));
// bulkUploadProducts();

export const greetings = () => console.log('Firebase DB loader...!');
