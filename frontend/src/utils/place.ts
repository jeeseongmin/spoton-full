// 받아온 장소 정보 데이터를 화면에 나타내기 위해 가공하는 함수
export const classifyingPlace = (placeList: any) => {
  const floors = [
    ...new Set(
      placeList.map((item: any) => {
        return item.plcF;
      }),
    ),
  ];

  floors.sort();

  const classiFiedList = floors.map(floor => {
    const dataList = placeList.filter((data: any) => {
      return data.plcF === floor;
    });

    return {
      floor: `${floor}층`,
      places: dataList.map((data: any) => ({
        plcCd: data.plcCd,
        plcNm: data.plcNm,
      })),
    };
  });

  return classiFiedList;
};
