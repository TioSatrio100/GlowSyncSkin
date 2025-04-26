export default function CategoriesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">Add New Category</button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-600">Category management page coming soon. Here you&apos;ll be able to:</p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>View all categories</li>
            <li>Create new categories</li>
            <li>Edit existing categories</li>
            <li>Delete categories</li>
            <li>Organize products into categories</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
