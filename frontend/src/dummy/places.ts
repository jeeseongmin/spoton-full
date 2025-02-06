export interface Place {
  plcCd: string;
  plcNm: string;
}

export interface PlacesByFloor {
  floor: string;
  places: Place[];
}

export interface SelectedPlace extends Place, Omit<PlacesByFloor, "places"> {}

export const placesByFloor = [
  {
    floor: "2층",
    places: [
      {
        plcCd: "1",
        plcNm: "자모실",
      },
      {
        plcCd: "2",
        plcNm: "운영위원회실",
      },
      {
        plcCd: "3",
        plcNm: "203호 / 구)목회지원실",
      },
      {
        plcCd: "4",
        plcNm: "201호",
      },
      {
        plcCd: "5",
        plcNm: "204호",
      },
    ],
  },
  {
    floor: "3층",
    places: [
      {
        plcCd: "6",
        plcNm: "301호 (PW/POEM)",
      },
      {
        plcCd: "7",
        plcNm: "302호 (예꿈)",
      },
      {
        plcCd: "8",
        plcNm: "303호 (꿈땅)",
      },
    ],
  },
  {
    floor: "4층",
    places: [
      {
        plcCd: "9",
        plcNm: "성가대실",
      },
      {
        plcCd: "10",
        plcNm: "키즈방방",
      },
      {
        plcCd: "11",
        plcNm: "회의실",
      },
      {
        plcCd: "12",
        plcNm: "보드게임 카페",
      },
    ],
  },
  {
    floor: "5층",
    places: [
      {
        plcCd: "13",
        plcNm: "샤이닝글로리",
      },
      {
        plcCd: "14",
        plcNm: "태권도장",
      },
    ],
  },
];

export const reservedPlaces = [
  {
    plcCd: "PTK_PTK_0201",
    plcNm: "새가족실",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
  },
];
