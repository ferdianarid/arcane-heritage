import { FoodItem } from "@/types";

export const foodData: Array<FoodItem> = [
  {
    id: "1",
    name: "Rendang Sapi",
    image: "/assets/images/foods/rendang.jpg",
    location: "Sumatera Barat",
    description:
      "Masakan daging sapi yang dimasak dalam bumbu rempah dan santan, dimasak hingga kering dan berwarna cokelat kehitaman.",
    rating: 4.8,
    reviews: 125,
    category: "Main Course",
    foodSections: [
      {
        title: "Asal Usul dan Filosofi",
        content:
          "Rendang berasal dari Minangkabau dan telah menjadi simbol masakan tradisional Indonesia. Proses memasaknya yang lama mencerminkan kesabaran, kebijaksanaan, dan ketekunan. Rendang juga melambangkan persatuan karena rempah yang beragam disatukan dalam satu masakan.",
      },
      {
        title: "Bumbu dan Proses Memasak",
        content:
          "Bumbu rendang kaya akan rempah seperti cabai, lengkuas, serai, kunyit, jahe, bawang merah, dan bawang putih. Daging sapi dimasak perlahan dalam santan hingga kering, membuat bumbu meresap sempurna dan daging menjadi empuk.",
      },
    ],
  },
  {
    id: "2",
    name: "Gudeg Jogja",
    image: "/assets/images/foods/gudeg.png",
    location: "Yogyakarta",
    description:
      "Hidangan khas Yogyakarta yang terbuat dari nangka muda dimasak dengan santan dan gula aren.",
    rating: 4.5,
    reviews: 90,
    category: "Main Course",
    foodSections: [
      {
        title: "Cita Rasa Manis dan Gurih",
        content:
          "Gudeg memiliki cita rasa manis yang khas, berasal dari gula aren. Hidangan ini biasanya disajikan dengan nasi, ayam opor, telur pindang, tahu, dan sambal goreng krecek untuk menyeimbangkan rasanya.",
      },
      {
        title: "Proses Memasak yang Unik",
        content:
          "Proses memasak gudeg memakan waktu berjam-jam (slow-cooked) hingga nangka muda menjadi sangat lembut dan bumbu meresap. Inilah yang membuat tekstur gudeg sangat istimewa dan berbeda dari hidangan lain.",
      },
    ],
  },
  {
    id: "3",
    name: "Pempek Ayam",
    image: "/assets/images/foods/pempek.jpg",
    location: "Palembang",
    description:
      "Makanan tradisional Palembang yang terbuat dari olahan ikan yang digoreng, disajikan dengan kuah cuko asam pedas.",
    rating: 4.6,
    reviews: 110,
    category: "Snack",
    foodSections: [
      {
        title: "Jenis-jenis Pempek",
        content:
          "Pempek hadir dalam berbagai varian seperti kapal selam (diisi telur), lenjer, adaan (bulat kecil), kulit, dan masih banyak lagi. Semuanya disajikan dengan kuah cuko yang terbuat dari cuka, gula merah, dan cabai.",
      },
      {
        title: "Cuko yang Autentik",
        content:
          "Kuah cuko adalah kunci dari kenikmatan pempek. Kuah ini memiliki perpaduan rasa asam, manis, dan pedas yang sangat kompleks, melengkapi rasa gurih dari pempek itu sendiri.",
      },
    ],
  },
  {
    id: "4",
    name: "Soto Betawi",
    image: "/assets/images/foods/soto-betawi.jpg",
    location: "Jakarta",
    description:
      "Soto khas Jakarta yang kaya akan rempah, disajikan dengan kuah santan atau susu.",
    rating: 4.3,
    reviews: 85,
    category: "Soup",
    foodSections: [
      {
        title: "Kelezatan Kuah Santan",
        content:
          "Soto Betawi dikenal dengan kuahnya yang kental dan gurih, terbuat dari santan atau susu. Isiannya terdiri dari potongan daging sapi, jeroan, dan emping yang membuat hidangan ini sangat mengenyangkan.",
      },
      {
        title: "Rempah yang Kuat",
        content:
          "Aroma soto Betawi berasal dari bumbu yang kuat seperti serai, daun salam, dan cengkeh. Tambahan tomat dan bawang goreng menambah kesegaran dan rasa yang kompleks.",
      },
    ],
  },
  {
    id: "5",
    name: "Nasi Goreng",
    image: "/assets/images/foods/nasi-goreng.jpg",
    location: "Jakarta",
    description:
      "Nasi yang digoreng dengan bumbu khas dan berbagai isian, menjadi hidangan favorit di Indonesia.",
    rating: 4.9,
    reviews: 200,
    category: "Main Course",
    foodSections: [
      {
        title: "Variasi Nasi Goreng",
        content:
          "Nasi goreng memiliki banyak variasi, mulai dari nasi goreng kampung, nasi goreng seafood, hingga nasi goreng gila. Setiap daerah memiliki versi uniknya sendiri dengan bumbu dan isian yang berbeda.",
      },
      {
        title: "Rahasia Kelezatan",
        content:
          "Rahasia nasi goreng yang enak terletak pada bumbu yang pas, seperti bawang merah, bawang putih, dan cabai. Ditambah kecap manis dan telur, hidangan ini menjadi menu andalan yang mudah dibuat.",
      },
    ],
  },
  {
    id: "6",
    name: "Bakso Malang",
    image: "/assets/images/foods/bakso.webp",
    location: "Malang",
    description:
      "Satu porsi bakso yang lengkap dengan siomay, gorengan, dan mie, disajikan dengan kuah kaldu yang gurih.",
    rating: 4.7,
    reviews: 150,
    category: "Soup",
    foodSections: [
      {
        title: "Kompleksitas dalam Satu Mangkuk",
        content:
          "Bakso Malang berbeda dari bakso pada umumnya karena penyajiannya yang lebih beragam. Dalam satu mangkuk, Anda akan menemukan bakso, tahu, siomay basah dan goreng, serta mie, menciptakan kombinasi tekstur dan rasa yang kaya.",
      },
      {
        title: "Ciri Khas Kuah Kaldu",
        content:
          "Kuah bakso Malang terkenal dengan rasanya yang bening namun gurih, dibuat dari kaldu tulang sapi yang dimasak lama. Tambahan bawang goreng dan seledri memperkaya aroma hidangan ini.",
      },
    ],
  },
  {
    id: "7",
    name: "Sate Ayam",
    image: "/assets/images/foods/sate-ayam.jpg",
    location: "Ponorogo",
    description:
      "Potongan daging ayam yang ditusuk dan dibakar, disajikan dengan saus kacang yang lezat.",
    rating: 4.4,
    reviews: 95,
    category: "Grill",
    foodSections: [
      {
        title: "Saos Kacang yang Khas",
        content:
          "Saus kacang adalah elemen terpenting dari sate ayam. Saus ini terbuat dari kacang tanah yang dihaluskan, dicampur dengan cabai, bawang putih, dan kecap manis, menciptakan rasa gurih, manis, dan sedikit pedas.",
      },
      {
        title: "Pilihan Cara Memasak",
        content:
          "Sate ayam dapat dibakar dengan arang untuk memberikan aroma smoky yang kuat atau menggunakan teflon untuk cara yang lebih praktis. Sate Ponorogo, khususnya, memiliki ciri khas potongan dagingnya yang memanjang.",
      },
    ],
  },
  {
    id: "8",
    name: "Ketoprak",
    image: "/assets/images/foods/ketoprak.jpg",
    location: "Jakarta",
    description:
      "Hidangan vegetarian yang terdiri dari ketupat, tahu, bihun, dan tauge, disajikan dengan saus kacang.",
    rating: 4.2,
    reviews: 70,
    category: "Salad",
    foodSections: [
      {
        title: "Hidangan Sederhana Penuh Rasa",
        content:
          "Ketoprak adalah bukti bahwa hidangan sederhana bisa sangat lezat. Kombinasi ketupat yang kenyal, tahu goreng, tauge, dan bihun, disiram saus kacang, membuat hidangan ini favorit di kalangan masyarakat Jakarta.",
      },
      {
        title: "Tambahan yang Menyegarkan",
        content:
          "Ketoprak disajikan dengan irisan mentimun, kerupuk, dan bawang goreng. Beberapa penjual juga menambahkan irisan telur rebus untuk menambah nutrisi dan rasa.",
      },
    ],
  },
  {
    id: "9",
    name: "Nasi Rawon",
    image: "/assets/images/foods/rawon.jpg",
    location: "Jawa Timur",
    description:
      "Sup daging sapi dengan kuah berwarna hitam yang berasal dari kluwek, disajikan dengan nasi.",
    rating: 4.5,
    reviews: 80,
    category: "Soup",
    foodSections: [
      {
        title: "Rahasia Warna Hitam",
        content:
          "Warna hitam legam dari rawon berasal dari kluwek, yaitu biji buah pohon pangium edule yang telah difermentasi. Biji ini memberikan rasa gurih dan sedikit pahit yang unik.",
      },
      {
        title: "Penyajian dan Pelengkap",
        content:
          "Rawon biasanya disajikan dengan nasi putih, tauge, kerupuk udang, dan sambal. Potongan daging sapi yang empuk dan kuah yang hangat menjadikan rawon hidangan yang sempurna untuk disantap kapan saja.",
      },
    ],
  },
  {
    id: "10",
    name: "Lontong Sayur",
    image: "/assets/images/foods/lontong-sayur.jpeg",
    location: "Medan",
    description:
      "Potongan lontong disajikan dengan kuah santan yang kaya, dengan isian nangka, kacang panjang, dan protein.",
    rating: 4.1,
    reviews: 65,
    category: "Main Course",
    foodSections: [
      {
        title: "Perpaduan Rasa yang Khas",
        content:
          "Lontong sayur Medan memiliki rasa yang sangat kaya dan gurih berkat penggunaan santan yang kental dan bumbu yang melimpah. Hidangan ini sering disajikan dengan telur rebus atau rendang.",
      },
      {
        title: "Hidangan untuk Sarapan",
        content:
          "Lontong sayur adalah pilihan sarapan yang populer dan mengenyangkan. Kombinasi karbohidrat dari lontong dan protein dari isian membuat hidangan ini menjadi sumber energi yang baik untuk memulai hari.",
      },
    ],
  },
];
