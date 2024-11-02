import { redirect } from "next/navigation"
import { Appointment } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { AppointmentCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

export default async function Appointments() {
  const user = await getCurrentUser()
  if (!user || !user.id) return redirect("/login")

  const { appointments } = (await db.patient.findFirst({
    where: { userId: user.id },
    include: {
      appointments: {},
    },
  })) ?? { appointments: [] as Appointment[] }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Appointments"
        text="Create and manage your appointments."
      >
        <AppointmentCreateButton />
      </DashboardHeader>
      <div>
        {appointments?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {appointments.map((app) => (
              <li className="w-full rounded-lg border p-4">{app.doctorId}</li>
            ))}
          </div>
        ) : (
          <div>empty</div>
        )}
      </div>
    </DashboardShell>
  )
}
