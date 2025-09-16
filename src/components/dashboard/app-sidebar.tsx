"use client";

import * as React from "react";
import {
  Building2,
  Cast,
  LayoutDashboard,
  MessageCircleQuestionMark,
  Paperclip,
  Search,
  Settings,
  Soup,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bangunan",
    url: "/dashboard/bangunan",
    icon: Building2,
  },
  {
    title: "Makanan",
    url: "/dashboard/makanan",
    icon: Soup,
  },
  {
    title: "Kesenian",
    url: "/dashboard/kesenian",
    icon: Cast,
  },
  {
    title: "Quiz",
    url: "/dashboard/quiz",
    icon: MessageCircleQuestionMark,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const data = {
  user: {
    name: "Ferdian Ahmad R",
    email: "ferdianarid@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        {state === "collapsed" ? (
          <Paperclip size={20} />
        ) : (
          <Link
            href="/"
            className="text-[40px] font-italianno font-medium text-white/80 transition-all duration-300 hover:text-white"
          >
            ArcaneHeritage
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} passHref>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
