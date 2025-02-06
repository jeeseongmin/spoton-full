import { useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const ArrowIcon = isOpen ? SlArrowUp : SlArrowDown;
  const buttonText = isOpen ? "접기" : "더보기";

  return (
    <div className="flex w-full flex-col gap-1 bg-gray-middle px-4 text-small text-black md:px-12">
      <div
        className={cn(
          "flex flex-col gap-4 pt-4",
          !isOpen && "max-h-[5.5rem] overflow-hidden",
        )}
      >
        <div className="text-base text-primary">예약 규칙</div>
        <ol className="list-inside list-decimal leading-6">
          <li>
            예약 시간은 최대 2시간입니다. 2시간을 넘길 경우 목회지원실로
            연락해주세요.
          </li>
          <li>
            순 / 다락방 / 부서 / 팀 별 모임 시에만 장소를 예약할 수 있습니다.
            (개인적 용무 불가)
          </li>
          <li>
            장소 사용의 우선순위는 예배입니다. 시간이 겹칠 경우 목회지원실에서
            조정 후 다시 연락드립니다.
          </li>
          <li>예약 후 장소를 사용하지 않을 경우, 꼭 예약을 취소해야 합니다.</li>
          <li>장소 사용 후 깨끗하게 정리정돈 부탁드립니다.</li>
          <li>문의 : 목회지원실 (031-651-9680)</li>
        </ol>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="custom"
          className="flex items-center justify-center gap-1.5 py-2 text-small text-black outline-none"
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          <ArrowIcon size={9} />
          <div>{buttonText}</div>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
