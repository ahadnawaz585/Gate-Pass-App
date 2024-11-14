import prisma from "../../../../core/models/base.model";

const customerModel = prisma.$extends({
  model: {
    customer: {
      async getCustomersWithMostGatePasses() {
        const limit = 10;
        const result = await prisma.customer.findMany({
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                gatePasses: true,
              },
            },
          },
          orderBy: {
            gatePasses: {
              _count: "desc",
            },
          },
          take: limit,
        });
        return result;
      },
    },
  },
});

export default customerModel;
