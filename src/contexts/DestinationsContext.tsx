
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface Destination {
  id: number;
  name: string;
  location: {
    city: string;
    province: string;
  };
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hours: {
    open: string;
    close: string;
  };
  duration: number;
  description: string;
  image: string;
  price: number;
  rating: number;
  transportation: string[];
}

interface DestinationsContextType {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  getDestinationById: (id: number) => Destination | undefined;
}

const DestinationsContext = createContext<DestinationsContextType | undefined>(undefined);

export const useDestinations = () => {
  const context = useContext(DestinationsContext);
  if (context === undefined) {
    throw new Error("useDestinations must be used within a DestinationsProvider");
  }
  return context;
};

const destinationsData: Destination[] = [
  {
    id: 1,
    name: "Candi Prambanan",
    location: {
      city: "Sleman",
      province: "DI Yogyakarta"
    },
    type: "Arsitektur & Warisan Sejarah",
    coordinates: {
      latitude: -7.7522,
      longitude: 110.4917
    },
    hours: {
      open: "06:00",
      close: "17:00"
    },
    duration: 90,
    description: "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9. Candi ini didedikasikan untuk Trimurti: Brahma, Vishnu, dan Shiva. Prambanan telah ditetapkan sebagai Situs Warisan Dunia UNESCO.",
    image: "/culture-uploads/Candi Prambanan.jpg",
    price: 50000,
    rating: 4.7,
    transportation: ["Bus", "Taksi", "Rental Mobil"]
  },
  {
    id: 2,
    name: "Desa Adat Penglipuran",
    location: {
      city: "Bangli",
      province: "Bali"
    },
    type: "Kehidupan Adat & Arsitektur",
    coordinates: {
      latitude: -8.4095,
      longitude: 115.3660
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 60,
    description: "Desa Adat Penglipuran adalah salah satu desa tradisional di Bali yang masih mempertahankan gaya arsitektur dan tata ruang khas Bali. Desa ini terkenal dengan jalan utamanya yang bersih dan tertata rapi, serta rumah-rumah tradisional yang seragam.",
    image: "/culture-uploads/Desa Adat Penglipuran.jpeg",
    price: 30000,
    rating: 4.5,
    transportation: ["Motor", "Rental Mobil", "Tour Guide"]
  },
  {
    id: 3,
    name: "Tana Toraja",
    location: {
      city: "Tana Toraja",
      province: "Sulawesi Selatan"
    },
    type: "Tradisi Kematian & Arsitektur",
    coordinates: {
      latitude: -3.0000,
      longitude: 120.0000
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 180,
    description: "Tana Toraja terkenal dengan upacara pemakaman yang elaborate dan rumah-rumah tradisional berbentuk perahu (Tongkonan). Tradisi dan budaya Toraja menawarkan pengalaman budaya yang unik dan mendalam bagi pengunjung.",
    image: "/culture-uploads/Tana Toraja.png",
    price: 25000,
    rating: 4.8,
    transportation: ["Bus", "Rental Mobil", "Pesawat ke Makassar"]
  },
  {
    id: 4,
    name: "Kampung Batik Trusmi",
    location: {
      city: "Cirebon",
      province: "Jawa Barat"
    },
    type: "Kerajinan Tradisional",
    coordinates: {
      latitude: -6.7333,
      longitude: 108.5667
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 60,
    description: "Kampung Batik Trusmi adalah pusat kerajinan batik di Cirebon. Pengunjung dapat melihat proses pembuatan batik secara langsung dan berbelanja berbagai produk batik khas Cirebon dengan motif yang unik.",
    image: "/culture-uploads/Batik Trusmi.png",
    price: 10000,
    rating: 4.3,
    transportation: ["Angkot", "Taksi", "Kereta ke Cirebon"]
  },
  {
    id: 5,
    name: "Keraton Yogyakarta",
    location: {
      city: "Yogyakarta",
      province: "DI Yogyakarta"
    },
    type: "Warisan Kerajaan & Seni Pertunjukan",
    coordinates: {
      latitude: -7.8056,
      longitude: 110.3647
    },
    hours: {
      open: "08:30",
      close: "14:00"
    },
    duration: 60,
    description: "Keraton Yogyakarta adalah istana resmi Kesultanan Ngayogyakarta Hadiningrat. Kompleks keraton ini menampilkan arsitektur Jawa tradisional dan menyimpan berbagai benda bersejarah. Pada waktu tertentu, pengunjung dapat menyaksikan pertunjukan tari dan musik tradisional.",
    image: "/culture-uploads/Keraton Yogyakarta.jpg",
    price: 15000,
    rating: 4.6,
    transportation: ["Becak", "Andong", "Bus Trans Jogja"]
  },
  {
    id: 6,
    name: "Desa Adat Wae Rebo",
    location: {
      city: "Manggarai",
      province: "Nusa Tenggara Timur"
    },
    type: "Kehidupan Adat & Arsitektur",
    coordinates: {
      latitude: -8.7680,
      longitude: 120.2838
    },
    hours: {
      open: "24 jam",
      close: "24 jam"
    },
    duration: 720,
    description: "Desa Wae Rebo terletak di ketinggian 1.200 meter di atas permukaan laut dan terkenal dengan rumah adat berbentuk kerucut 'Mbaru Niang'. Untuk mencapai desa ini, pengunjung harus melakukan hiking selama 3-4 jam.",
    image: "/culture-uploads/Desa Adat Wae Rebo.jpg",
    price: 350000,
    rating: 4.9,
    transportation: ["Rental Mobil", "Pemandu Trek"]
  },
  {
    id: 7,
    name: "Candi Borobudur",
    location: {
      city: "Magelang",
      province: "Jawa Tengah"
    },
    type: "Arsitektur & Warisan Sejarah",
    coordinates: {
      latitude: -7.6079,
      longitude: 110.2038
    },
    hours: {
      open: "06:00",
      close: "17:00"
    },
    duration: 90,
    description: "Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-9. Monumen ini memiliki 2.672 panel relief dan 504 patung Buddha. Borobudur adalah Situs Warisan Dunia UNESCO dan menjadi salah satu tujuan wisata paling populer di Indonesia.",
    image: "/culture-uploads/Candi Borobudur.png",
    price: 50000,
    rating: 4.8,
    transportation: ["Bus", "Taksi", "Tour"]
  },
  {
    id: 8,
    name: "Kampung Naga",
    location: {
      city: "Tasikmalaya",
      province: "Jawa Barat"
    },
    type: "Kehidupan Adat & Arsitektur",
    coordinates: {
      latitude: -7.3510,
      longitude: 107.9560
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 60,
    description: "Kampung Naga adalah desa adat yang masyarakatnya masih mempertahankan adat istiadat dan tradisi leluhur. Rumah-rumah di desa ini semuanya menghadap ke utara atau selatan dan terbuat dari bahan-bahan alami.",
    image: "/culture-uploads/Kampung Naga.jpg",
    price: 15000,
    rating: 4.4,
    transportation: ["Angkot", "Ojek"]
  },
  {
    id: 9,
    name: "Istana Maimun",
    location: {
      city: "Medan",
      province: "Sumatera Utara"
    },
    type: "Warisan Kerajaan & Arsitektur",
    coordinates: {
      latitude: 3.5753,
      longitude: 98.6839
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 45,
    description: "Istana Maimun adalah istana Kesultanan Deli yang dibangun pada tahun 1888. Arsitektur istana menggabungkan gaya Melayu, Islam, Spanyol, India, dan Italia. Di dalam istana terdapat pajangan benda-benda bersejarah peninggalan Kesultanan Deli.",
    image: "/culture-uploads/Istana Maimun.jpg",
    price: 10000,
    rating: 4.2,
    transportation: ["Becak", "Taksi", "Bus Kota"]
  },
  {
    id: 10,
    name: "Desa Tenganan Pegringsingan",
    location: {
      city: "Karangasem",
      province: "Bali"
    },
    type: "Kehidupan Adat & Kerajinan",
    coordinates: {
      latitude: -8.5000,
      longitude: 115.5833
    },
    hours: {
      open: "08:00",
      close: "17:00"
    },
    duration: 60,
    description: "Desa Tenganan Pegringsingan adalah salah satu desa Bali Aga (Bali asli) yang masih mempertahankan tradisi dan gaya hidup kuno. Desa ini terkenal dengan kerajinan kain gringsing double ikat yang sangat langka dan berharga.",
    image: "/culture-uploads/Desa Tenganan Pegringsingan.jpg",
    price: 20000,
    rating: 4.5,
    transportation: ["Rental Motor", "Taksi", "Tour"]
  }
];

export const DestinationsProvider = ({ children }: { children: ReactNode }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setDestinations(destinationsData);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data destinasi");
        setLoading(false);
        toast.error("Gagal memuat data destinasi");
      }
    };

    fetchDestinations();
  }, []);

  const getDestinationById = (id: number) => {
    return destinations.find(dest => dest.id === id);
  };

  const value = {
    destinations,
    loading,
    error,
    getDestinationById
  };

  return <DestinationsContext.Provider value={value}>{children}</DestinationsContext.Provider>;
};
