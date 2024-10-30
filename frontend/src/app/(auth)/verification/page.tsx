import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

import { RoleSelect } from "./select-role"

export default async function Component() {
  const user = await getCurrentUser()
  if (!user || !user.id) return redirect("/login")

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-center text-3xl font-bold text-primary">
          Why Are yoy here?
        </h1>
        <RoleSelect />
      </div>
    </div>
  )
}
