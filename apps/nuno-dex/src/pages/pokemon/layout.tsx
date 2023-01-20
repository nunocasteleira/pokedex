import { FavoritesBar } from "@/components/favorites-bar";
import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <Header />
      <main className="flex-[1_1_100%] overflow-hidden">{children}</main>
      <FavoritesBar />
    </div>
  );
};

export default Layout;
