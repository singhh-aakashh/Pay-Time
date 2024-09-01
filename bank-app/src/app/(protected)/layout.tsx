import Navbar from "@/components/app-ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-screen h-screen">
        <Navbar signedIn={true}/>
        <div className="h-[90vh] w-screen">
        {children}
        </div>
      </div>
  );
}
