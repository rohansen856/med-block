import { db } from "@/lib/db"

export default async function BookAppointmnets() {
  const doctors = await db.doctor.findMany({
    take: 10,
  })
  return <div>{JSON.stringify(doctors)}</div>
}
