export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  verificationCode: string;
  profilePhoto?: string;
  dob?: string;
  gender?: string;
  phoneNumber?: string;
  country?: string;
}


export interface Expenses {
  id: string;
  name: string;
  amount: string; 
  description: string;
  createdAt: string; 
}
