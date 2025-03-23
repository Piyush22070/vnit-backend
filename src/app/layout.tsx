import '@/app/global.css'
import NavBar from './Components/NavBar'
export const metadata = {
  title: "Blog Karo ",
  description: "Blog Karo ",
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
        <NavBar/>
        {children}
      </body>
    </html>
  );
}


    