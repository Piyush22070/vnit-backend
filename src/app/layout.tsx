import '@/app/global.css'
export const metadata = {
  title: "Ycce - DashBoard",
  description: "Ycce Construction Site Managment Tool",
};

// Define the type for the props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/logo.png" type="/images/png" sizes="32x32" />
      <body>
        {children}
      </body>
    </html>
  );
}


    