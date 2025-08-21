"use client"

import * as React from "react"
import {
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Logo } from "@/components/shared"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Data para Signals Dashboard
const data = {
  user: {
    name: "John Doe",
    email: "john@signals.ai",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Señales",
      url: "/dashboard/signals",
      icon: TrendingUp,
      items: [
        {
          title: "Activas",
          url: "/dashboard/signals/active",
        },
        {
          title: "Historial",
          url: "/dashboard/signals/history",
        },
        {
          title: "Favoritas",
          url: "/dashboard/signals/favorites",
        },
      ],
    },
  ],
}

export function SignalsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <Logo className="px-2 py-2" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
