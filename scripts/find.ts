import prisma from "@/app/lib/prisma";

async function main() {
    const customers = await prisma.invoices.findFirst({
        where: {
            amount: 666
        },
        include: {
            cusotmer: true
        }
    })

    console.log(customers?.cusotmer.name);
    
}


main().catch(e => console.log(e))