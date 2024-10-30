import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DoctorForm } from "@/components/doctor-form"

export default async function DoctorRegister() {
  const user = await getCurrentUser()
  if (!user || !user.id) redirect("/login")

  return (
    <section className="flex h-screen">
      <div className="hidden flex-1 bg-secondary md:block"></div>
      <DoctorForm userId={user.id} />
    </section>
  )
}
