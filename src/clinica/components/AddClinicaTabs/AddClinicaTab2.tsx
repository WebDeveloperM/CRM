import { FormProvider, useForm } from "react-hook-form";
import { CreateClinica } from "src/clinica/types";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { VscRefresh } from "react-icons/vsc";

import { ConfigProvider, Flex, Input, Typography } from 'antd';


type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}

export default function AddClinicaTab2({ onPrevious, onNext }: Props) {
  const methods = useForm<CreateClinica>({ mode: "onBlur" })
  const [file, setFile] = useState("")
  const [_, setFileSuccess] = useState(false)

  async function onSubmit() {

  }
  const theme = {
    token: {
      colorPrimary: '#238781',
    },
  };

  const [image, setImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Foydalanuvchi tanlagan fayl
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Base64 formatdagi tasvirni o'rnatish
      };
      reader.readAsDataURL(file);
    }
  };

  const getCropData = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      setFile(cropper.getCroppedCanvas().toDataURL())
      setFileSuccess(true)
      toast.success("Logotip muvaffaqiyatli qo'shildi")
    }
  };


  return (
    <div className="overflow-x-auto bg-white  rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll  mt-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">
          <div className="grid grid-cols-12 gap-3 px-0.5">
            <div className="2xl:col-span-3 col-span-8">
              {!image ?
                <div className="flex items-center justify-start">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-60 h-48  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">SVG, PNG, JPG or GIF (MAX. 400x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div> : null}



              {image && !file && (
                <Cropper
                  src={image}
                  style={{ height: 200, width: '100%' }}
                  initialAspectRatio={9 / 9}
                  guides={false}
                  ref={cropperRef}
                />

              )}

              {image && !file ?
                <button onClick={getCropData} className="w-24 p-1.5 my-2 mt-4 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200">Yuklash</button>
                :
                null}
            </div>
          </div>


          {file ?
            <>
              <img src={file} alt="" className="w-40 rounded-xl" />
              <button onClick={() => {
                setImage(null)
                setFile("")
              }} className="w- p-1.5  bg-slate-400 mt-2 text-sm text-white rounded-md duration-200 flex items-center gap-2">
                <VscRefresh />
                Rasmni yangilash
              </button>
            </>
            : null
          }

          <br />

          <ConfigProvider theme={theme}>
            <Flex vertical gap={16}>
              <div>
                <Typography.Title level={5}>Logo matni kiriting</Typography.Title>
                <Input
                  count={{
                    show: true,
                    max: 10,
                  }}
                  placeholder="Uzlabs.uz"
                  className="focus:ring-1 focus:ring-secondary focus:outline-none max-w-[60%] sm:max-w-[15%] mx-0.5"
                />
              </div>
            </Flex>
          </ConfigProvider>


          <div className="form-control mt-4">
            <label className="cursor-pointer label sm:max-w-[13.5%] max-w-[55%]">
              <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-secondary" />
              <span className="label-text">Asosiy logo sifatida o'rnatish</span>
            </label>
          </div>

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
              type="submit"
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
