import prisma from "../../../core/models/base.model";

const ItemModel = prisma.$extends({
  model: {
    item: {
      async outOfStockItems() {
        const data = await prisma.item.findMany({
          where: {
            quantity: {
              lte: 0, // `lte` stands for "less than or equal to"
            },
          },
        });

        return data;
      },
    },
  },
});

export default ItemModel;
