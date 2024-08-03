import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { emails, phones, statuses, addresses } from "./data"

const customers = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  email: faker.helpers.arrayElement(emails).value,
  status: faker.helpers.arrayElement(statuses).value,
  phone: faker.helpers.arrayElement(phones).value,
  address: faker.helpers.arrayElement(addresses).value,
  area: faker.helpers.arrayElement(areaes).value,
  pincode: faker.helpers.arrayElement(pincodees).value,
}))

fs.writeFileSync(
  path.join(__dirname, "customer.json"),
  JSON.stringify(customers, null, 2)
)

console.log("✅ Customers data generated.")
