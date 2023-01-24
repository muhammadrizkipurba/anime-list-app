import Header from "@/components/layout/header";

interface LayoutProps {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout