import SideNavbar from "@/components/app-ui/side-navbar";

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
          {children}
          </div>
        </div>             
    );
  }
  