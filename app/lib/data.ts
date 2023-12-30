import { sql } from '@vercel/postgres';
import {
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  User,
} from './definitions';
import { formatCurrency } from './utils';
import prisma from './prisma';
import { unstable_noStore as noStore } from 'next/cache';
import email from 'next-auth/providers/email';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await prisma.revenues.findMany();
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await prisma.invoices.findMany({
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
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const totalPaid = await prisma.invoices.aggregate({
      where: {
        status: 'paid',
      },
      _sum: {
        amount: true,
      },
    });

    const totalPengding = await prisma.invoices.aggregate({
      where: {
        status: 'pending',
      },
      _sum: {
        amount: true,
      },
    });

    const numberOfInvoices = await prisma.invoices.count();
    const numberOfCustomers = await prisma.customers.count();
    const totalPaidInvoices = formatCurrency(
      Number(totalPaid._sum.amount) ?? '0',
    );
    const totalPendingInvoices = formatCurrency(
      Number(totalPengding._sum.amount) ?? '0',
    );

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await prisma.invoices.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        date: 'desc',
      },
      include: { cusotmer: true },
      where: {
        OR: [
          {
            cusotmer: { name: { contains: query, mode: 'insensitive' } },
          },
          {
            cusotmer: { email: { contains: query, mode: 'insensitive' } },
          },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await prisma.invoices.count({
      where: {
        OR: [
          {
            cusotmer: { name: { contains: query, mode: 'insensitive' } },
          },
          {
            cusotmer: { email: { contains: query, mode: 'insensitive' } },
          },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const totalPages = Math.ceil(Number(count / ITEMS_PER_PAGE));
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoices.findFirst({
      where: {
        id: id,
      },
    });

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customers.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const customers = await prisma.customers.findMany({
      include: { invoices: true },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
        ],
      },
    });

    const res = customers.map((customer) => {
      const total_pending = customer.invoices.reduce((total, invoice) => {
        if (invoice.status == 'pending') {
          total += invoice.amount;
        }
        return total;
      }, 0);

      const total_paid = customer.invoices.reduce((total, invoice) => {
        if (invoice.status == 'paid') {
          total += invoice.amount;
        }
        return total;
      }, 0);

      return {
        ...customer,
        invoices: customer.invoices.length,
        total_paid: formatCurrency(total_paid),
        total_pending: formatCurrency(total_pending),
      };
    });

    return res;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    const count = await prisma.customers.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: 'insensitive' },
          },
          {
            email: { contains: query, mode: 'insensitive' },
          },
        ],
      },
    });

    const totalPages = Math.ceil(Number(count / ITEMS_PER_PAGE));
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
