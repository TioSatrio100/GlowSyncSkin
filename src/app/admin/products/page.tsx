export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">Add New Product</button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-600">Product management page coming soon. Here you'll be able to:</p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>View all products</li>
            <li>Add new products</li>
            <li>Edit existing products</li>
            <li>Delete products</li>
            <li>Manage product inventory</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
