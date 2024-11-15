
import prisma from "../../../../core/models/base.model";
const blacklistTokenModel = prisma.$extends({
  model: {
    blacklistToken: {
        async gpBlackListToken(this: any, token: string, userId: string) {
          const result = await this.create({
            data: {
              token,
              userId,
              createdAt: new Date(),
            },
          });
          return result;
        },
        async isTokenBlacklisted(this: any, token: string): Promise<boolean> {
          const result = await this.findUnique({
            where: {
              token,
            },
          });
          return !!result;
        },
  
        async gpDeleteTokenBlackListed(yesterday:Date,sixMonth:Date){
          // console.log("deleting yesterday :" ,yesterday.toLocaleString());
          await prisma.blacklistToken.deleteMany({
            where: {
              rememberMe:false,
              createdAt: {
                lt: yesterday,
              },
            },
          });
          // console.log("deleting 6 month :" ,sixMonth.toLocaleString());

          await prisma.blacklistToken.deleteMany({
            where: {
              rememberMe:true,
              createdAt: {
                lt: sixMonth,
              },
            },
          });
        }
      },
  },
});

export default blacklistTokenModel;
