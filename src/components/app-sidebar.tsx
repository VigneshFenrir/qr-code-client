// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader />
//       <SidebarContent>
//         <SidebarGroup />
//         <SidebarGroup />
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
//   );
// }

// import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent />
//     </Sidebar>
//   );
// }

import { ShoppingCart, QrCode, ScanQrCode } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Generate QR",
    url: "/",
    icon: QrCode,
  },
  {
    title: "Read QR",
    url: "/readQr",
    icon: ScanQrCode,
  },
  {
    title: "ALL Products",
    url: "/products",
    icon: ShoppingCart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>QR Code Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
