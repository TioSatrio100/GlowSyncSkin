"use client";
import { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfjsConverter from "@tensorflow/tfjs-converter";

export default function SkinAnalysis() {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ className: string; probability: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize the model
  useEffect(() => {
    async function loadModel() {
      try {
        setIsLoading(true);
        await tf.ready(); // Wait for TensorFlow.js to be ready

        // Load the model from public/model directory
        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadModel();

    // Cleanup function
    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
    e.currentTarget.style.borderColor = "#e0e0e0";
    e.currentTarget.style.backgroundColor = "#fff";
  };

  const processFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target?.result as string);
      analyzeImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const preprocessImage = (image: HTMLImageElement) => {
    // Adjust these values based on your model's expected input
    const width = 224;
    const height = 224;

    return tf.tidy(() => {
      // Read the image as a tensor
      const tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([width, height]) // Resize
        .toFloat() // Convert to float
        .div(255.0) // Normalize to [0,1]
        .expandDims(); // Add batch dimension
      return tensor;
    });
  };

  const analyzeImage = async (imageSrc: string) => {
    if (!model) return;

    setIsLoading(true);
    setResults([]);

    try {
      const img = new Image();
      img.src = imageSrc;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Preprocess the image
      const tensor = preprocessImage(img);

      // Make prediction
      const prediction = model.predict(tensor) as tf.Tensor;
      const data = await prediction.data();

      // Convert prediction to readable results
      // Adjust this part based on your model's output format
      const classNames = ["Acne", "Eczema", "Normal", "Psoriasis"]; // Example class names
      const probabilities = Array.from(data).map((prob, index) => ({
        className: classNames[index] || `Class ${index}`,
        probability: prob,
      }));

      setResults(probabilities);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-center bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">AI Skin Analysis</h1>
      <p className="text-lg text-gray-600 mb-10">Get personalized skincare recommendations based on your unique skin profile</p>

      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-16 mb-10 cursor-pointer transition-all hover:border-pink-500 hover:bg-gray-50"
        onClick={handleUploadClick}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = "#3b82f6";
          e.currentTarget.style.backgroundColor = "#f8fafc";
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = "#e0e0e0";
          e.currentTarget.style.backgroundColor = "#fff";
        }}
        onDrop={handleDrop}
      >
        <div className="text-2xl text-gray-600 mb-6">Upload a photo or drag and drop</div>
        <div className="text-gray-500">PNG, JPG, GIF up to 10MB</div>
      </div>

      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />

      {previewSrc && (
        <div className="flex justify-center my-10">
          <img src={previewSrc} alt="Preview" className="max-w-full max-h-[500px] rounded-xl shadow-lg border border-gray-200" />
        </div>
      )}

      {isLoading && <div className="text-lg text-gray-600 my-8">Analyzing your skin... Please wait</div>}

      {results.length > 0 && (
        <div className="mt-12 text-left bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Analysis Results</h2>
          <div className="space-y-6">
            {results.map((result, index) => {
              const percentage = Math.round(result.probability * 100);
              return (
                <div key={index} className="pb-6 border-b border-gray-100 last:border-0">
                  <div className="text-xl font-medium text-gray-700 mb-2">{result.className}</div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 transition-all duration-700 ease-out" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="text-lg font-semibold text-pink-600 mt-2">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
