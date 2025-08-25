import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const sha256 = require('crypto-js/sha256');

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding Synthus Core Database...");
  // // API User Creation
  // if (!!process.env.API_EMAIL && !!process.env.API_PASS) {
  //   // Hash the password
  //   const passHash = crypto.createHash('sha256').update(process.env.API_PASS as string).digest('base64');

  //   await prisma.user.upsert({
  //       where: { email: process.env.API_EMAIL },
  //       update: {},
  //       create: {
  //           uuid: uuidv4(),
  //           email: process.env.API_EMAIL,
  //           password: passHash,
  //           username: 'API_USER',
  //           description: "Internal Use User",
  //           name: "API_USER",
  //           roles: 'ADMIN;SYNTH_API'
  //       }
  //   });
  // }

  // Admin User Creation
//   if (!!process.env.ADMIN_EMAIL && !!process.env.ADMIN_PASS) {
//     // Hash the password
//     const passHash = sha256(process.env.ADMIN_PASS as string).toString();

//     await prisma.user.upsert({
//         where: { email: process.env.ADMIN_EMAIL },
//         update: {},
//         create: {
//             uuid: uuidv4(),
//             email: process.env.ADMIN_EMAIL,
//             password: passHash,
//             username: 'admin',
//             description: "Synthus Administrator",
//             name: "Synthus Administrator",
//             roles: 'admin;user'
//         }
//     });
//   }

  console.log("Seeding Finished!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

