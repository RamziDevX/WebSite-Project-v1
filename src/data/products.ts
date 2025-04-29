
export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  views: number;
  sold: number;
  reviews: Review[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Traditional Algerian Kaftan",
    description: "Elegant traditional kaftan with intricate embroidery, perfect for special occasions.",
    price: 12500,
    image: "https://i.etsystatic.com/54245815/r/il/f2350f/6519049043/il_fullxfull.6519049043_2a7c.jpg",
    category: "dresses",
    views: 15,
    sold: 7,
    reviews: [
      {
        id: "r1",
        username: "Amina",
        rating: 5,
        comment: "Beautiful craftsmanship! The embroidery is exquisite.",
        date: "2025-03-15"
      },
      {
        id: "r2",
        username: "Leila",
        rating: 4,
        comment: "Lovely design but runs a bit large.",
        date: "2025-02-28"
      }
    ],
    inStock: true
  },
  {
    id: "2",
    name: "Modern Djellaba",
    description: "Contemporary take on the traditional djellaba, made with premium cotton blend for everyday comfort.",
    price: 8500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUXU1b-21H_XJRKyCBJY3I-LF6b4lXue7-w&s",
    category: "casual",
    views: 8,
    sold: 12,
    reviews: [
      {
        id: "r3",
        username: "Karim",
        rating: 5,
        comment: "So comfortable and stylish!",
        date: "2025-04-01"
      }
    ],
    inStock: true
  },
  {
    id: "3",
    name: "Berber-Inspired Jacket",
    description: "Stylish jacket with patterns inspired by Berber culture, perfect for cooler evenings.",
    price: 15000,
    image: "https://i.etsystatic.com/7920777/r/il/a5493f/4209338670/il_fullxfull.4209338670_951h.jpg",
    category: "outerwear",
    views: 22,
    sold: 5,
    reviews: [
      {
        id: "r4",
        username: "Youcef",
        rating: 5,
        comment: "Great quality and unique design ya3tikom Sa7a.",
        date: "2025-03-10"
      },
      {
        id: "r5",
        username: "Samira",
        rating: 5,
        comment: "Receives compliments every time I wear it!",
        date: "2025-03-25"
      }
    ],
    inStock: true
  },
  {
    id: "4",
    name: "Veste impermeable",
    description: "Veste impermeable 100% waterproof.",
    price: 4500,
    image: "https://pbs.twimg.com/media/GfvjMx9WIAAahBD.jpg",
    category: "tops",
    views: 5,
    sold: 3,
    reviews: [ 
    
      {
        id:"r7",
        username:"Yassine",
        rating: 5,
        comment: "vista impermeable hbibi mdkhlch lma.",
        date: "2025-03-25"


      }



    ],
    inStock: true
  },
  {
    id: "5",
    name: "Men's Ceremonial Vest",
    description: "Elegant vest for special occasions, featuring traditional patterns and premium materials.",
    price: 9800,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRkAqd6dEZHFtLlZXc5a0GSEZ-fjBIvinNbQ&s",
    category: "menswear",
    views: 12,
    sold: 6,
    reviews: [
      {
        id: "r6",
        username: "Omar",
        rating: 5,
        comment: "Excellent quality and perfect fit.",
        date: "2025-04-10"
      }
    ],
    inStock: true
  },
  {
    id: "6",
    name: "Algerian Silk Scarf",
    description: "Luxurious silk scarf with patterns inspired by Algerian architecture.",
    price: 3500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMRejrlYVVqLI8ghm0fEZkFmDRpeI3LLLsA&s",
    category: "accessories",
    views: 2,
    sold: 1,
    reviews: [],
    inStock: true
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "dresses", name: "Dresses" },
  { id: "casual", name: "Casual Wear" },
  { id: "outerwear", name: "Outerwear" },
  { id: "tops", name: "Tops" },
  { id: "menswear", name: "Menswear" },
  { id: "accessories", name: "Accessories" }
];
