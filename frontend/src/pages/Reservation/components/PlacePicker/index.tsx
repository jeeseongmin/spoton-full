import Button from "@/components/Button";
import type { PlacesByFloor, SelectedPlace } from "@/dummy/places";
import { Place } from "@/types/place";
import { cn } from "@/utils/cn";

interface PlacePickerProps {
  placesByFloor: PlacesByFloor[];
  selectedPlace?: SelectedPlace;
  onChange: (value: SelectedPlace) => void;
  reservedPlaces?: Place[];
}

const PlacePicker = ({
  placesByFloor,
  selectedPlace,
  onChange,
  reservedPlaces,
}: PlacePickerProps) => {
  const getIsDisabled = (placeId: string) =>
    reservedPlaces
      ? reservedPlaces.some(({ plcCd }) => plcCd === placeId)
      : false;

  return (
    <div className="h-full overflow-y-scroll rounded-sm bg-white px-4">
      {placesByFloor.map(({ floor, places }, index) => (
        <div
          key={floor}
          className={cn(
            "flex gap-4 py-4",
            index !== placesByFloor.length - 1 &&
              "border-b border-b-gray-light",
          )}
        >
          <div className="whitespace-nowrap text-base font-normal text-primary">
            {floor}
          </div>
          <div className="flex flex-wrap gap-4">
            {places.map(({ plcCd, plcNm }) => (
              <Button
                key={plcCd}
                variant="outlined"
                disabled={getIsDisabled(plcCd)}
                className={cn(
                  "text-small",
                  selectedPlace?.plcCd === plcCd &&
                    "border-primary bg-primary text-white",
                )}
                onClick={() => onChange({ plcCd, plcNm, floor })}
              >
                {plcNm}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacePicker;
