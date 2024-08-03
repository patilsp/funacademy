import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { emails, mobile, note } from "./data"

const complains = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  note: faker.helpers.arrayElement(notes).value,
  mobile: faker.helpers.arrayElement(mobiles).value,
}))

fs.writeFileSync(
  path.join(__dirname, "complaints.json"),
  JSON.stringify(complains, null, 2)
)

console.log("✅ Complaints data generated.")
