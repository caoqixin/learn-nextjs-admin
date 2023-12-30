// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { Customer, Invoice, Revenue, User } from './definitions';

// https://nextjs.org/learn/dashboard-app/fetching-data
const users: User[] = [
  {
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers: Customer[] = [
  {
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices: Invoice[] = [
  {
    amount: 15795,
    status: 'pending',
    date: new Date('2022-12-06'),
  },
  {
    amount: 20348,
    status: 'pending',
    date: new Date('2022-11-14'),
  },
  {
    amount: 3040,
    status: 'paid',
    date: new Date('2022-10-29'),
  },
  {
    amount: 44800,
    status: 'paid',
    date: new Date('2023-09-10'),
  },
  {
    amount: 34577,
    status: 'pending',
    date: new Date('2023-08-05'),
  },
  {
    amount: 54246,
    status: 'pending',
    date: new Date('2023-07-16'),
  },
  {
    amount: 666,
    status: 'pending',
    date: new Date('2023-06-27'),
  },
  {
    amount: 32545,
    status: 'paid',
    date: new Date('2023-06-09'),
  },
  {
    amount: 1250,
    status: 'paid',
    date: new Date('2023-06-17'),
  },
  {
    amount: 8546,
    status: 'paid',
    date: new Date('2023-06-07'),
  },
  {
    amount: 500,
    status: 'paid',
    date: new Date('2023-08-19'),
  },
  {
    amount: 8945,
    status: 'paid',
    date: new Date('2023-06-03'),
  },
  {
    amount: 8945,
    status: 'paid',
    date: new Date('2023-06-18'),
  },
  {
    amount: 8945,
    status: 'paid',
    date: new Date('2023-10-04'),
  },
  {
    amount: 1000,
    status: 'paid',
    date: new Date('2022-06-05'),
  },
];

const revenue: Revenue[] = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, customers, invoices, revenue };
