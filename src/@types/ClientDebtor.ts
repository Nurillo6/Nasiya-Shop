export interface ClientDebtor {
  id: string;
  name: string;
  address: string;
  sellerId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  star:boolean,
  Debt: [
    {
      id: string;
      productName: string;
      date: string;
      term: number;
      note: string;
      amount: number;
      debtorId: string;
      sellerId: string;
      createdAt: string;
      updatedAt: string;
      Payment: Array<{ amount: number }>;
    }
  ];
  Seller: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    img: string;
    wallet: number;
    login: string;
    password: string;
    status: string;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
  };
  Phone: Array<{
    createdAt: string;
    debtorId: string;
    id: string;
    phoneNumber: string;
    updatedAt: string;
  }>;
  totalDebt: number;
}
