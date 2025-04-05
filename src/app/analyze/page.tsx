import Image from "next/image";
import { CameraIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function Analyze() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Skin Analysis</h1>
          <p className="text-lg text-gray-600">Get personalized skincare recommendations based on your unique skin profile</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Upload Section */}
          <div className="mb-12">
            <div className="max-w-xl mx-auto">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-400 transition-colors">
                <div className="space-y-1 text-center">
                  <div className="flex flex-col items-center">
                    <CameraIcon className="h-12 w-12 text-primary-400" />
                    <div className="flex text-sm text-gray-600 mt-4">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload a photo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <ArrowUpTrayIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photo</h3>
              <p className="text-sm text-gray-500">Take or upload a clear photo of your face in good lighting</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-500">Our AI analyzes your skin concerns and characteristics</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Get Recommendations</h3>
              <p className="text-sm text-gray-500">Receive personalized product and routine recommendations</p>
            </div>
          </div>

          {/* Results Section (Initially Hidden) */}
          <div className="hidden">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Skin Analysis Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skin Characteristics */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skin Characteristics</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Skin Type</span>
                      <span className="font-medium text-gray-900">Combination</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Hydration Level</span>
                      <span className="font-medium text-gray-900">Moderate</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sensitivity</span>
                      <span className="font-medium text-gray-900">Low</span>
                    </li>
                  </ul>
                </div>

                {/* Concerns */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Concerns</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-primary-600 rounded-full mr-2"></span>
                      <span className="text-gray-600">Uneven Texture</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-primary-600 rounded-full mr-2"></span>
                      <span className="text-gray-600">Dark Spots</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-primary-600 rounded-full mr-2"></span>
                      <span className="text-gray-600">Fine Lines</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recommended Products */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="relative h-48">
                        <Image src={`/product-${item}.jpg`} alt="Product" fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Product Name</h4>
                        <p className="text-sm text-gray-500 mb-2">Brief description</p>
                        <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
