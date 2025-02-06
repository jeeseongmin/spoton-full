import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { fetchCommunity, fetchGarret, fetchLeaf } from "@/apis/organization";
import { updateUserInfo } from "@/apis/user";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import AlertModal from "@/components/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";
import { UpdateUserInfoRequest } from "@/types/user";

const MyInfo = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { userName, telNo, cmtCd, garCd, leafCd, cmtNm, garNm, leafNm } =
    useUserStore();
  const modal = useModal();
  const { control, register, reset, handleSubmit, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        name: userName,
        phone: telNo,
        cmt: {
          id: cmtCd,
          name: cmtNm,
        },
        gar: {
          id: garCd,
          name: garNm,
        },
        leaf: {
          id: leafCd,
          name: leafNm,
        },
      },
    });
  const { tokenId } = useLoginStore();
  const { email, roleId, saveUserInfo } = useUserStore();
  const [communityList, setCommunityList] = useState([]);
  const [garretList, setGarretList] = useState([]);
  const [leafList, setLeafList] = useState([]);

  // 공동체 리스트 가져오기
  useEffect(() => {
    getCommunity();
  }, []);

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
    // 회원정보 수정 시 조직 정보 reset 설정
    if (!isDisabled) {
      resetList("gar");
      resetList("leaf");
    }
    if (getValues("cmt").id !== "") {
      getGarret(getValues("cmt").id);
    }
  }, [watch("cmt")]);

  // 순 리스트 가져오기
  useEffect(() => {
    // 회원정보 수정 시 조직 정보 reset 설정
    if (!isDisabled) {
      resetList("leaf");
    }
    if (getValues("cmt").id !== "" && getValues("gar").id !== "") {
      getLeaf(getValues("cmt").id, getValues("gar").id);
    }
  }, [watch("gar")]);

  const getCommunity = async () => {
    const list = await fetchCommunity();
    const cp = list.map((item: any) => {
      return {
        id: item.cmtCd,
        name: item.cmtNm,
      };
    });
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

  // 취소
  const cancel = () => {
    setIsDisabled(true);
    reset();
  };

  // 유저 정보를 업데이트
  const updateInfo = async (updateUserInfoRequest: UpdateUserInfoRequest) => {
    try {
      await updateUserInfo(tokenId, updateUserInfoRequest);
      saveUserInfo({
        cmtCd: updateUserInfoRequest.cmtCd, // 공동체 코드
        cpsCd: updateUserInfoRequest.cpsCd, // 캠퍼스 코드
        garCd: updateUserInfoRequest.garCd, // 다락방 코드
        leafCd: updateUserInfoRequest.leafCd, // 순 코드
        email: updateUserInfoRequest.email,
        cmtNm: updateUserInfoRequest.cmtNm, // 공동체명
        garNm: updateUserInfoRequest.garNm, // 다락방명
        leafNm: updateUserInfoRequest.leafNm, //순명
        roleId, // 역할명
        telNo: updateUserInfoRequest.telNo, // 전화번호
        userName: updateUserInfoRequest.userName, // 사용자 이름
      });

      modal.onOpen();
      setIsDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MyPageWrapper>
      <form
        className="flex w-96 flex-col gap-4 px-8 py-24 md:px-0"
        onSubmit={handleSubmit(data => {
          updateInfo({
            provider: "kakao",
            userName: data.name,
            email: email ? email : "123@kakao.com",
            telNo: data.phone,
            cpsCd: "PTK",
            cmtCd: data.cmt.id,
            garCd: data.gar.id,
            leafCd: data.leaf.id,
            cmtNm: data.cmt.name,
            garNm: data.gar.name,
            leafNm: data.leaf.name,
            token: "",
          });
        })}
      >
        <div className="flex flex-col gap-2">
          <InputLabel text="이름" htmlFor="name" isRequired={true} />
          <Input
            id="name"
            type="text"
            className="h-10"
            placeholder="이름을 입력하세요"
            {...register("name")}
            disabled={isDisabled}
            variant="default"
          />
        </div>
        <div className="flex flex-col gap-2">
          <InputLabel text="전화번호" htmlFor="phone" isRequired={true} />
          <Input
            id="phone"
            type="text"
            className="h-10"
            placeholder="전화번호를 입력하세요"
            {...register("phone")}
            disabled={isDisabled}
            variant="default"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <InputLabel
            text="소속 (공동체-다락방-순)"
            htmlFor="belong"
            isRequired={true}
          />
          <div className="grid grid-rows-3 gap-2 md:grid-cols-3">
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
                  disabled={isDisabled || communityList.length === 0}
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
                  disabled={isDisabled || garretList.length === 0}
                  onChangeOption={onChange}
                  selectedOption={value.name}
                />
              )}
            />
            {/* 보여지는 조건 : 수정모드여야 한다. or leafNm이 존재해야한다. */}
            {(!isDisabled || leafNm !== "") && (
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
                    disabled={isDisabled || leafList.length === 0}
                    onChangeOption={onChange}
                    selectedOption={value.name}
                  />
                )}
              />
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          {isDisabled ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => setIsDisabled(false)}
            >
              회원정보 수정
            </Button>
          ) : (
            <div className="flex justify-center gap-12">
              <Button variant="outlined" type="button" onClick={cancel}>
                취소
              </Button>
              <Button variant="primary" type="submit">
                저장
              </Button>
            </div>
          )}
        </div>
      </form>

      {modal.isOpen && (
        <AlertModal onClose={modal.onClose}>
          회원정보가 수정되었습니다.
        </AlertModal>
      )}
    </MyPageWrapper>
  );
};

export default MyInfo;
