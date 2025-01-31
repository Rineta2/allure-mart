export interface UserProfile {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  displayName: string;
  email: string;
  isActive: boolean;
  photoURL: string;
  uid: string;
  updatedAt: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: "male" | "female";
}
