export interface DebtorType {
  id: string;
  name: string;
  address: string;
  sellerId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleDebtorType {
  id: string;
  name: string;
  address: string;
  sellerId: string;
  note: string | null;
  star: boolean;
  createdAt: string;
  updatedAt: string;
  Debt: Array<{
    id: string;
    productName: string;
    date: string;
    term: number;
    note: string | null;
    amount: number;
    debtorId: string;
    sellerId: string;
    createdAt: string;
    updatedAt: string;
    Payment: [
      {
        id: string;
        debtId: string;
        amount: number;
        month: number;
        date: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
      }
    ];
    nextPayment: {
      id: string;
      debtId: string;
      amount: number;
      month: number;
      date: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    totalPayments: number;
  }>;

  ImgOfDebtor: Array<{
    id: string;
    name: string;
    debtorId: string;
    createdAt: string;
    updatedAt: string;
  }>;
  Phone: [
    {
      id: string;
      phoneNumber: string;
      debtorId: string;
      createdAt: string;
      updatedAt: string;
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
  totalAmount: number;
}
