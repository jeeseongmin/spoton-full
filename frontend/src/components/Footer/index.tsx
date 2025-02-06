import FooterLogo from "@/assets/images/footer_img.png";

const Footer = () => {
  return (
    <div className="mt-8 flex h-auto flex-col items-center justify-center gap-6 border-t border-gray-middle px-12 py-10 shadow-sm">
      <img src={FooterLogo} />
      <div className="flex flex-col gap-1 text-center text-[12px] font-light text-gray-500">
        <p>경기도 평택시 신흥 1로 2길 61, 2층 | TEL. 031-651-9680</p>
        <p>2024ⓒ 평택 온누리 개발팀 All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
