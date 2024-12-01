import React, { useEffect, useRef, useState } from "react";

const YandexMap2: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [_, setMapInstance] = useState<any>(null);
    const [__, setPlacemark] = useState<any>(null);
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



    return (
        <div className="h-[400px] overflow-hidden ">
            {/* Chap qism */}
            <div className="pb-4 bg-white">
                <p className="text-lg ">{address || "Manzil tanlanmagan"}</p>
            </div>

            {/* O'ng qism */}
            <div ref={mapContainer} style={{ height: "100%", width: "100%" }}></div>
        </div>
    );
};

export default YandexMap2;
