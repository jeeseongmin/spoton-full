import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";

import { join } from "@/apis/login";
import { fetchCommunity, fetchGarret, fetchLeaf } from "@/apis/organization";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { LOGIN_QR_URL } from "@/constants/routes";
// import { LOGIN_QR_URL } from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";

type JoinCheckParam = {
  userName: string;
  telNo: string;
  cmt: string;
  gar: string;
  leaf: string;
};

const LoginSignUp = () => {
  const { register, handleSubmit, control, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        userName: "",
        telNo: "",
        cmt: {
          id: "",
          name: "",
        },
        gar: {
          id: "",
          name: "",
        },
        leaf: {
          id: "",
          name: "",
        },
        isAgree: "off",
      },
    });

  const [communityList, setCommunityList] = useState([]);
  const [garretList, setGarretList] = useState([]);
  const [leafList, setLeafList] = useState([]);
  const [isDetailClick, setIsDetailClick] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getCommunity();
  }, []);

  //
  const resetList = (type: string) => {
    if (type === "cmt") {
      setCommunityList([]);
      setValue("cmt", {
        id: "",
        name: "",
      });
    } else if (type === "gar") {
      setGarretList([]);
      setValue("gar", {
        id: "",
        name: "",
      });
    } else if (type === "leaf") {
      setLeafList([]);
      setValue("leaf", {
        id: "",
        name: "",
      });
    }
  };

  // 다락방 리스트 가져오기
  useEffect(() => {
    resetList("gar");
    resetList("leaf");
    if (getValues("cmt").id !== "") {
      getGarret(getValues("cmt").id);
    }
  }, [watch("cmt")]);

  // 순 리스트 가져오기
  useEffect(() => {
    resetList("leaf");
    if (getValues("cmt").id !== "" && getValues("gar").id !== "") {
      getLeaf(getValues("cmt").id, getValues("gar").id);
    }
  }, [watch("gar")]);

  const getCommunity = async () => {
    const list = await fetchCommunity();
    const cp = list.map((item: any) => ({
      id: item.cmtCd,
      name: item.cmtNm,
    }));
    setCommunityList(cp);
  };

  const getGarret = async (cmtCd: string) => {
    const list = await fetchGarret(cmtCd);
    const cp = list.map((item: any) => ({
      id: item.garCd,
      name: item.garNm,
    }));
    setGarretList(cp);
  };

  const getLeaf = async (cmtCd: string, garCd: string) => {
    const list = await fetchLeaf(cmtCd, garCd);
    const cp = list.map((item: any) => ({
      id: item.leafCd,
      name: item.leafNm,
    }));
    setLeafList(cp);
  };

  const joinCheck = async (data: JoinCheckParam) => {
    const isJoin = await join({
      userName: data.userName,
      telNo: data.telNo,
      token: state,
      provider: "kakao",
      cpsCd: "PTK",
      cmtCd: data.cmt,
      garCd: data.gar,
      leafCd: data.leaf,
    });

    if (isJoin) {
      navigate(LOGIN_QR_URL);
    }
  };

  return (
    <LoginLayout>
      <form
        className="flex h-full w-96 flex-col items-center justify-between py-12 "
        onSubmit={handleSubmit(data => {
          joinCheck({
            ...data,
            cmt: data.cmt.id,
            gar: data.gar.id,
            leaf: data.leaf.id,
          });
        })}
      >
        <div className="mb-4 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-base">회원 정보를 입력해주세요.</p>
        </div>
        <div className="flex h-full w-full flex-col gap-4 ">
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="이름" htmlFor="userName" isRequired={true} />
            <Input
              id="userName"
              type="text"
              placeholder="이름을 입력하세요"
              {...register("userName")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel
              text="전화번호 (- 포함)"
              htmlFor="telNo"
              isRequired={true}
            />
            <Input
              id="telNo"
              type="text"
              placeholder="전화번호를 입력하세요"
              {...register("telNo")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="소속" htmlFor="belong" isRequired={true} />
            <div className="grid grid-cols-3 gap-2">
              <Controller
                control={control}
                name="cmt"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="cmt"
                    options={communityList}
                    disabled={false || communityList.length === 0}
                    onChangeOption={onChange}
                    selectedOption={value.name}
                  />
                )}
              />
              <Controller
                control={control}
                name="gar"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="gar"
                    options={garretList}
                    disabled={false || garretList.length === 0}
                    onChangeOption={onChange}
                    selectedOption={value.name}
                  />
                )}
              />
              <Controller
                control={control}
                name="leaf"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="leaf"
                    options={leafList}
                    disabled={false || leafList.length === 0}
                    onChangeOption={onChange}
                    selectedOption={value.name}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col items-start justify-start">
              <Controller
                control={control}
                name="isAgree"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-row items-start gap-4 text-small">
                    <input
                      type="checkbox"
                      id="private-check"
                      className="mt-1"
                      checked={value === "on"}
                      disabled={!isDetailClick}
                      onChange={() => onChange(value === "on" ? "off" : "on")}
                    />
                    <div>
                      {isDetailClick ? (
                        <div
                          onClick={() => setIsDetailClick(false)}
                          className="flex cursor-pointer flex-row items-start"
                        >
                          <div>
                            <span className="font-bold text-primary">
                              [개인정보 수집과 이용에 대한 동의]{" "}
                            </span>
                            예약자 확인을 위한 개인정보 수집과 이용에
                            동의합니다.
                          </div>
                          <SlArrowUp
                            size={16}
                            className="ml-2 mt-1 py-0 text-xl text-gray-600"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsDetailClick(true)}
                          className="flex cursor-pointer flex-row items-start"
                        >
                          <div>
                            <span className="font-bold text-primary">
                              [개인정보 수집과 이용에 대한 동의]{" "}
                            </span>
                            예약자 확인을 위한 개인정보 수집과 이용에
                            동의합니다.
                          </div>
                          <SlArrowDown
                            size={16}
                            className="ml-2 mt-1 py-0 text-xl text-gray-600"
                          />
                        </div>
                      )}

                      {isDetailClick && (
                        <>
                          <hr className="my-2 mr-5" />
                          <div className="leading-5">
                            - 수집 목적 : 예약자 확인 및 예약 정보 발송
                          </div>
                          <div className="leading-5">
                            - 수집 항목 : 이름, 휴대폰 번호, 소속, 카카오톡
                            프로필 정보
                          </div>
                          <div className="leading-5">
                            - 보유 및 이용 기간 : 회원 탈퇴 시까지
                          </div>
                          <hr className="my-2 mr-5" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={watch("isAgree") === "off"}
        >
          회원가입
        </Button>
      </form>
    </LoginLayout>
  );
};

export default LoginSignUp;
