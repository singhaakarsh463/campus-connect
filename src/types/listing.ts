export type PropertyType = 'pg' | 'flat' | 'hostel';
export type GenderPreference = 'boys' | 'girls' | 'coed';
export type ListingSource = 'owner' | 'tenant';

export interface Listing {
  id: string;
  title: string;
  type: PropertyType;
  genderPreference: GenderPreference;
  rent: number;
  deposit: number;
  location: string;
  distanceFromCollege: number; // in km
  college: string;
  images: string[];
  facilities: string[];
  availableFrom: string;
  description: string;
  source: ListingSource;
  contact: {
    name: string;
    phone: string;
    whatsapp?: string;
  };
  postedBy: {
    name: string;
    isVerified: boolean;
    type: 'owner' | 'student';
  };
  createdAt: string;
  isMovingOut?: boolean; // For students who are vacating
}

export interface SearchFilters {
  location?: string;
  college?: string;
  type?: PropertyType | 'all';
  genderPreference?: GenderPreference | 'all';
  minRent?: number;
  maxRent?: number;
  maxDistance?: number;
  facilities?: string[];
}
