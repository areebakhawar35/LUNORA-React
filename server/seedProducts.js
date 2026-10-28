
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./Product");

const products = [
  {
    id: "aurelia",
    name: "Aurelia",
    fullName: "The Aurelia Bed",
    price: 185000,
    badge: "BESTSELLER",
    type: "UPHOLSTERED COLLECTION",
    color: "Soft beige · King / Queen",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "oakwood",
    name: "Oakwood",
    fullName: "The Oakwood Bed",
    price: 159000,
    badge: "TIMELESS CLASSIC",
    type: "WOODEN COLLECTION",
    color: "Natural walnut · King / Queen",
    image: "https://furnitureworldpk.com/cdn/shop/files/king-size-luxury-bed-full-interior.png?v=1790650878&width=3840",
  },
  {
    id: "solace",
    name: "Solace",
    fullName: "The Solace Bed",
    price: 142000,
    badge: "CUSTOMER FAVOURITE",
    type: "MINIMAL COLLECTION",
    color: "Warm ivory · Queen / King",
    image: "https://furnitureworldpk.com/cdn/shop/files/modern-boucle-luxury-bed-furniture-world.jpg?v=1788792925&width=3840",
  },
  {
    id: "haven",
    name: "Haven",
    fullName: "The Haven Bed",
    price: 198000,
    badge: "SMART LIVING",
    type: "STORAGE COLLECTION",
    color: "Sand beige · King / Queen",
    image: "https://pinewood.pk/wp-content/uploads/2026/01/864k5qyk-1.webp",
  },
  {
    id: "celeste",
    name: "Celeste",
    fullName: "The Celeste Bed",
    price: 172000,
    badge: "NEW ARRIVAL",
    type: "SIGNATURE COLLECTION",
    color: "Classic white · King / Queen",
    image: "https://images.unsplash.com/photo-1740446565643-fe07baa1317e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "willow",
    name: "Willow",
    fullName: "The Willow Bed",
    price: 164000,
    badge: "NATURAL LIVING",
    type: "WOODEN COLLECTION",
    color: "Warm wood · King / Queen",
    image: "https://images.unsplash.com/photo-1723111568816-48c31eca8132?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ivory",
    name: "Ivory",
    fullName: "The Ivory Bed",
    price: 176000,
    badge: "SOFT & SERENE",
    type: "UPHOLSTERED COLLECTION",
    color: "Ivory cream · King / Queen",
    image: "https://renome.pk/wp-content/uploads/2026/07/Calrune-Fabric-Bed-1024x872.jpg",
  },
  {
    id: "monroe",
    name: "Monroe",
    fullName: "The Monroe Bed",
    price: 189000,
    badge: "MODERN CLASSIC",
    type: "CONTEMPORARY COLLECTION",
    color: "Neutral taupe · King / Queen",
    image: "https://renome.pk/wp-content/uploads/2025/11/Zenvoro-Double-Bed-1-scaled-1200x900.jpg",
  },
  {
    id: "elara",
    name: "Elara",
    fullName: "The Elara Bed",
    price: 151000,
    badge: "ELEGANT DESIGN",
    type: "MINIMAL COLLECTION",
    color: "Soft white · King / Queen",
    image: "https://bestbed.co.uk/cdn/shop/files/Bournemouth_Luxury_cloud_bed_frame_With_Ottoman_Storage_3FT_to_6FT_2.png?v=1764157889",
  },
  {
    id: "serene",
    name: "Serene",
    fullName: "The Serene Bed",
    price: 168000,
    badge: "RELAXED LUXURY",
    type: "COMFORT COLLECTION",
    color: "Natural linen · King / Queen",
    image: "https://images.unsplash.com/photo-1721742607571-c32867de0921?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "freya",
    name: "Freya",
    fullName: "The Freya Bed",
    price: 193000,
    badge: "TIMELESS COMFORT",
    type: "LUXURY COLLECTION",
    color: "Warm beige · King / Queen",
    image: "https://uberdecor.in/cdn/shop/files/870f475b-425e-4412-bb40-5a9220125c2a.jpg?crop=center&height=645&v=1787480649&width=645",
  },
  {
    id: "everly",
    name: "Everly",
    fullName: "The Everly Bed",
    price: 205000,
    badge: "LUNORA EXCLUSIVE",
    type: "SIGNATURE COLLECTION",
    color: "Soft neutral · King / Queen",
    image: "https://thehome.ae/wp-content/uploads/2026/08/Upholstered-Bed-1.webp",
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const product of products) {
      await Product.updateOne(
        { id: product.id },
        {
          $set: {
            ...product,
            category: "Beds",
            description: product.fullName,
          },
        },
        { upsert: true }
      );
    }

    console.log("Success! All 12 LUNORA beds are saved in MongoDB.");
  } catch (error) {
    console.error("Failed to save products:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
