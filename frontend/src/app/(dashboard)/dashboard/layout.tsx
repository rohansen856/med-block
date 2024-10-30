import { notFound, redirect } from "next/navigation"
import { User } from "@prisma/client"

import { dashboardConfig } from "@/config/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/shared/main-nav"
import { DashboardNav } from "@/components/shared/nav"
import { SiteFooter } from "@/components/shared/site-footer"
import { DashboardSidebar } from "@/components/sidebar"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const { role } = (await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      role: true,
    },
  })) ?? { role: null }

  if (!role || role == "unset") return redirect("/verification")

  return (
    <div className="flex min-h-screen">
      <aside>
        <DashboardSidebar user={user as User} />
      </aside>
      <div className="w-full">
        <header className="sticky top-0 z-40 border-b bg-background py-2">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </header>

        <main className="px-4">{children}</main>
      </div>
    </div>
  )
}
