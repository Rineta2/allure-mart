import { Timestamp } from 'firebase/firestore'

export interface Rating {
  uid: string
  displayName: string
  photoURL: string
  rating: number
  review: string
  createdAt: Timestamp
  productQuality: number
  sellerService: number
  shippingSpeed: number
}

export interface Product {
  id?: string
  category: {
    name: string
  }
  name: string
  content: string
  createdAt: Timestamp
  description: string
  gender: {
    name: string
  }
  imageSlider: string[]
  merek: {
    name: string
  }
  price: number
  slug: string
  stock: number
  thumbnail: string
  title: string
  updatedAt: Timestamp
  ratings?: Rating[]
  averageRating?: number
  totalRatings?: number
}