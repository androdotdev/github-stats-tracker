import Link from "next/link"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/db"


export async function AppSidebar() {

  
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) return null
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { username: true, name: true, image: true }
  })
  const image = user?.image || ""
  const items = [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Profile", url: `/u/${user?.username}` },
    { title: "Settings", url: "/settings" },
  ]
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-3 px-2 border-gray-600">
        <h1 className="text-2xl font-bold">GitHub Stats Tracker</h1>
      </SidebarHeader>      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-white">
            <div className="flex items-center  mt-6 mr-2">
              <img src={image} alt="User Avatar" className="w-14 h-14 rounded-lg mr-2  border border-neutral-600" />
              <div>
                <p className="text-lg font-semibold">{user?.username}</p>
                <p className="text-sm text-gray-400">{user?.name}</p>
              </div>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>
        <div className="border-b my-4 p-1.5 border-gray-600" />
        <SidebarGroup className="mt-2 text-2xl">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} >
                <SidebarMenuButton asChild className="text-xl p-4 mb-2">
                  <Link href={item.url} className=" font-medium text-white hover:bg-gray-600">{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}