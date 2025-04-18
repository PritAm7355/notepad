import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import { Calendar } from "@/components/ui/calendar"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border bg-transparent font-mono"
  />
    </SidebarProvider>
  )
}
