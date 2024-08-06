// pages/your-page.jsx

import { builder } from "@builder.io/sdk";

// TO DO: Replace with your Public API Key.
builder.init("3c7472ca63cd413c80a3ac577142e6c4");

export default async function Home() {
  const products = await builder.getAll("products", {
    prerender: false,
  });

  console.log("🚀 ~ Home ~ products:", products);

  return (
    <>
      <div>
        <h1>Products</h1>
        <div>
          {products.map((product, index) => (
            <div key={index}>{product.id}</div>
          ))}
        </div>
      </div>
      {/* <RestOfYourPage /> */}
    </>
  );
}
