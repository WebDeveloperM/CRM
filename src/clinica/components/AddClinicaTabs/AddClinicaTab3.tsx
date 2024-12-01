
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "src/clinica/types";
// import YandexMap from "../YandexMap";
// import { useEffect, useState } from "react";
// import { useClinica } from "../../context/ClinicaContext";
import YandexMap2 from "../YandexMap2";

type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}

export default function AddClinicaTab3({ onPrevious, onNext }: Props) {
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
  // const { data, setData } = useClinica();

  // const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>();


  // useEffect(() => {
  //   setData({ ...data, geolocationLongitude: coordinates?.lng as number, geolocationLatitude: coordinates?.lat as number })
  // }, [coordinates])


  // const handleSelectPoint = (coords: { lat: number; lng: number }) => {
  //   setCoordinates(coords);
  // };


  return (
    <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll  ">
      <FormProvider {...methods}>

        <form action="" className="mb-7">
          {/* <div className="relative h-[400px] mb-[60px]">
            <YandexMap onSelectPoint={handleSelectPoint} />
          </div> */}

          <YandexMap2 />
          <br />
          <div className="flex gap-2 justify-between">
            <button
              onClick={() => onPrevious(true)}
              type="submit"
              className="w-24 p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Oldingi
            </button>
            <button
              onClick={() => onNext(true)}
              className="w-24 p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Keyingi
            </button>
          </div>

        </form>
      </FormProvider>
    </div>
  )
}
