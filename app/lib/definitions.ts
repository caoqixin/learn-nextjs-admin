// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { Prisma } from '@prisma/client';

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  amount: number;
  date: Date;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

// 1: Define a type that includes the relation to `customer`
const invoiceWithCustomers = Prisma.validator<Prisma.InvoicesDefaultArgs>()({
  select: {
    amount: true,
    id: true,
    cusotmer: {
      select: {
        name: true,
        image_url: true,
        email: true,
      },
    },
  },
});
// 3: This type will include a invoice and all their customers
export type LatestInvoice = Prisma.InvoicesGetPayload<
  typeof invoiceWithCustomers
>;

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  invoices: number;
  total_paid: string;
  total_pending: string;
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
