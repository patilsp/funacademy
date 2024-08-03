import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker"; // Assuming you have faker-js installed

// Example data arrays (you should define these based on your needs)
const categories = ["Electronics", "Clothing", "Home Appliances", "Books"];
const descriptions = ["Advanced water purification system", "Smartphone with AI features", "Fashionable winter coat"];
const prices = [299.99, 799.99, 49.99, 129.99];
const stocks = [50, 100, 200];

// Generate product data
const products = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.commerce.productName(),
  description: faker.helpers.arrayElement(descriptions),
  price: faker.helpers.arrayElement(prices),
  category: faker.helpers.arrayElement(categories),
  stock: faker.helpers.arrayElement(stocks),
}));

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, "products.json"),
  JSON.stringify(products, null, 2)
);

console.log("✅ Products data generated.");
