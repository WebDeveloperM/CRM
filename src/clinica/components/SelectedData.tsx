// import { Select, Space } from 'antd';
// import { useClinica } from '../context/ClinicaContext';




// const options = [
//     {
//         id: 1,
//         label: 'Stomatalogiya',
//         value: 'Stomatalogiya',
//         desc: 'Stomatalogiya',
//     },
//     {
//         id: 2,
//         label: 'Nevralogiya',
//         value: 'Nevralogiya',
//         desc: 'Nevralogiya',
//     },
//     {
//         id: 3,
//         label: 'Narkalogiya',
//         value: 'Narkalogiya',
//         desc: 'Narkalogiya',
//     },
//     {
//         id: 4,
//         label: "Tibiiy ko'rik",
//         value: 'TibbiyKorik',
//         desc: "Tibiiy ko'rik",
//     },
//     {
//         id: 5,
//         label: "Terapiya",
//         value: 'Terapiya',
//         desc: "Terapiya",
//     },
//     {
//         id: 6,
//         label: "Laboratoriya",
//         value: 'Laboratoriya',
//         desc: "Laboratoriya",
//     },
//     {
//         id: 7,
//         label: "Logoped",
//         value: 'Logoped',
//         desc: "Logoped",
//     },

// ];


// export default function SelectedData() {
//     const { setData } = useClinica();


//     const handleChange = (value: number[]) => {
//         console.log(value);

//         // setData((prevData) => ({
//         //     ...prevData,
//         //     additionalServices: value,
//         // }));
//     };

//     return (
//         <Select
//             mode="multiple"
//             style={{ width: '100%' }}
//             placeholder="Xizmat turlarini tanlang"
//             onChange={handleChange}
//             className='mt-1 focus:ring-secondary'
//             options={options}
//             optionRender={(option) => (
//                 <Space>

//                     {option.data.desc}
//                 </Space>
//             )}
//         />

//     )
// }



import { Select } from 'antd';
import { useClinica } from '../context/ClinicaContext';

const options = [
    { id: 1, label: 'Stomatalogiya', value: 'Stomatalogiya', desc: 'Stomatalogiya' },
    { id: 2, label: 'Nevralogiya', value: 'Nevralogiya', desc: 'Nevralogiya' },
    { id: 3, label: 'Narkalogiya', value: 'Narkalogiya', desc: 'Narkalogiya' },
    { id: 4, label: "Tibiiy ko'rik", value: 'TibbiyKorik', desc: "Tibiiy ko'rik" },
    { id: 5, label: "Terapiya", value: 'Terapiya', desc: "Terapiya" },
    { id: 6, label: "Laboratoriya", value: 'Laboratoriya', desc: "Laboratoriya" },
    { id: 7, label: "Logoped", value: 'Logoped', desc: "Logoped" },
];

export default function SelectedData() {
    const { setData } = useClinica();

    const handleChange = (selectedValues: string[]) => {
        // Tanlangan obyektlarning id ro'yxatini tuzish
        const selectedIds = options
            .filter(option => selectedValues.includes(option.value))
            .map(option => option.id);

        setData((prevData) => ({ ...prevData, additionalServices: selectedIds }))

        // setData funksiyasiga id ro'yxatini jo'natish
        // setData((prevData) => ({
        //     ...prevData,
        //     additionalServices: selectedIds,
        // }));
    };

    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Xizmat turlarini tanlang"
            onChange={handleChange}
            className="mt-1 focus:ring-secondary"
            options={options.map(({ value, label }) => ({
                value,
                label,
            }))}
        />
    );
}
