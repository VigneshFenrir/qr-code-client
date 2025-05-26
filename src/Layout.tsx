import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "./components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <div className="flex items-center gap-4  mb-2">
          <SidebarTrigger />
          <h5 className="text-center w-full">QR APP</h5>
        </div>
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
