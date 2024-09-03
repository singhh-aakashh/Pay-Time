import SideNavbar from "@/components/app-ui/side-navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-screen h-screen flex">
          <div className="w-[20%] h-screen">
          <SideNavbar/>
          </div>
          <div className="w-[80%] h-screen">
          <div className='p-4 w-full h-full'>
          {children}
          </div>
          </div>
          <Toaster/>
        </div>             
    );
  }
  