
// import React, { useEffect, useRef, useState } from "react";

// const YandexMap2: React.FC = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const [mapInstance, setMapInstance] = useState<any>(null);
//   const [placemark, setPlacemark] = useState<any>(null);
//   const [address, setAddress] = useState<string>("");

//   useEffect(() => {
//     const ymaps = (window as any).ymaps;

//     ymaps.ready(() => {
//       // Kartani yaratish
//       const map = new ymaps.Map(mapContainer.current, {
//         center: [41.311081, 69.24056], // Moskva markazi
//         zoom: 10,
//       });

//       setMapInstance(map);

//       // Markerni yaratish
//       const newPlacemark = new ymaps.Placemark(
//         [55.751244, 37.618423],
//         {},
//         { draggable: true }
//       );

//       map.geoObjects.add(newPlacemark);
//       setPlacemark(newPlacemark);

//       // Markerni sudraganda hodisa qo'shish
//       newPlacemark.events.add("dragend", () => {
//         const coords = newPlacemark.geometry.getCoordinates();
//         fetchAddress(coords);
//       });

//       // Kartani bosganda marker qo'shish
//       map.events.add("click", (e: any) => {
//         const coords = e.get("coords");
//         newPlacemark.geometry.setCoordinates(coords);
//         fetchAddress(coords);
//       });
//     });
//   }, []);

//   // Manzilni topish
//   const fetchAddress = (coords: number[]) => {
//     const ymaps = (window as any).ymaps;

//     ymaps.geocode(coords).then((res: any) => {
//       const firstGeoObject = res.geoObjects.get(0);
//       setAddress(firstGeoObject.getAddressLine());
//     });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Chap qism */}
//       <div className="w-1/4 p-4 bg-gray-100">
//         <h3 className="font-bold mb-4">Tanlangan Manzil:</h3>
//         <p>{address || "Manzil tanlanmagan"}</p>
//       </div>

//       {/* O'ng qism */}
//       <div className="w-3/4" ref={mapContainer} style={{ height: "100%" }}></div>
//     </div>
//   );
// };

// export default YandexMap2;

import React, { useEffect, useRef, useState } from "react";

const YandexMap2: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [placemark, setPlacemark] = useState<any>(null);
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const ymaps = (window as any).ymaps;

        ymaps.ready(() => {
            // Yandex kartani o'rnatish
            const map = new ymaps.Map(mapContainer.current, {
                center: [41.311081, 69.24056], // Toshkent markazi
                zoom: 10,
            });

            setMapInstance(map);

            // Markerni yaratish
            const newPlacemark = new ymaps.Placemark(
                [41.311081, 69.24056],
                {},
                { draggable: true }
            );

            map.geoObjects.add(newPlacemark);
            setPlacemark(newPlacemark);

            // Markerni sudraganda manzilni yangilash
            newPlacemark.events.add("dragend", () => {
                const coords = newPlacemark.geometry.getCoordinates();
                fetchAddress(coords);
            });

            // Kartani bosganda markerni harakatlantirish
            map.events.add("click", (e: any) => {
                const coords = e.get("coords");
                newPlacemark.geometry.setCoordinates(coords);
                fetchAddress(coords);
            });
        });
    }, []);

    // Koordinatalar asosida manzilni olish
    const fetchAddress = (coords: number[]) => {
        const ymaps = (window as any).ymaps;

        ymaps.geocode(coords).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0);
            setAddress(firstGeoObject.getAddressLine());
        });
    };

    // Foydalanuvchining joylashuvini aniqlash
    const locateUser = () => {
        if (!navigator.geolocation) {
            alert("Geolokatsiya sizning brauzeringizda qo'llab-quvvatlanmaydi.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const coords = [latitude, longitude];

                if (mapInstance && placemark) {
                    mapInstance.setCenter(coords, 25);
                    placemark.geometry.setCoordinates(coords);
                    fetchAddress(coords);
                }
            },
            () => {
                alert("Joylashuvni aniqlash muvaffaqiyatsiz tugadi.");
            }
        );
    };

    return (
        <div className="flex h-[400px] overflow-hidden">
            {/* Chap qism */}
            <div className="w-1/4 p-4 bg-white">
                <h4 className="font-bold mb-4">Manzil:</h4>
                <p>{address || "Manzil tanlanmagan"}</p>
                <button
                    type="button"
                    className="w-full p-2 bg-secondary hover:bg-secondary/80 duration-200 text-white rounded mt-4"
                    onClick={locateUser}
                >
                    Joylashuvni aniqlash
                </button>
            </div>

            {/* O'ng qism */}
            <div className="w-[80%]" ref={mapContainer} style={{ height: "100%" }}></div>
        </div>
    );
};

export default YandexMap2;
