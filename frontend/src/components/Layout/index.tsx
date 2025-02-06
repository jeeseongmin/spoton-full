import { PropsWithChildren } from "react";

import { useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuModal from "@/components/Modal/MenuModal";
import { pageTitle } from "@/constants/common";
import useLoginCheck from "@/hooks/useLoginCheck";
import useModal from "@/hooks/useModal";
import useLoginStore from "@/store/loginStore";

const Layout = ({ children }: PropsWithChildren) => {
  const { kakaoToken } = useLoginStore();
  useLoginCheck(kakaoToken);
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  const mainTitle = pageTitle[pageName].mainTitle;
  const subTitle = pageTitle[pageName].subTitle;

  const menuModal = useModal();

  const MainTitle = ({ children }: PropsWithChildren) => {
    return <h1 className="text-xl font-thin text-primary">{children}</h1>;
  };

  const SubTitle = ({ children }: PropsWithChildren) => {
    return <h2 className="text-[28px] font-semibold">{children}</h2>;
  };

  return (
    <div className="relative h-full min-w-80">
      <Header onOpen={menuModal.onOpen} />
      <div className="px-4 pt-8 sm:px-12 md:px-20 lg:px-32 xl:px-60">
        <div className="mb-10 flex flex-col gap-2">
          <MainTitle>{mainTitle}</MainTitle>
          <SubTitle>{subTitle}</SubTitle>
        </div>

        {children}
      </div>
      <Footer />
      {menuModal.isOpen && <MenuModal onClose={menuModal.onClose} />}
    </div>
  );
};

export default Layout;
