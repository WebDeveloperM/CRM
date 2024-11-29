import { Select, Space } from 'antd';
import { useClinica } from '../context/ClinicaContext';




const options = [
    {
        label: 'Stomatalogiya',
        value: 'Stomatalogiya',
        desc: 'Stomatalogiya',
    },
    {
        label: 'Nevralogiya',
        value: 'Nevralogiya',
        desc: 'Nevralogiya',
    },
    {
        label: 'Narkalogiya',
        value: 'Narkalogiya',
        desc: 'Narkalogiya',
    },
    {
        label: "Tibiiy ko'rik",
        value: 'TibbiyKorik',
        desc: "Tibiiy ko'rik",
    },
    {
        label: "Terapiya",
        value: 'Terapiya',
        desc: "Terapiya",
    },
    {
        label: "Laboratoriya",
        value: 'Laboratoriya',
        desc: "Laboratoriya",
    },
    {
        label: "Logoped",
        value: 'Logoped',
        desc: "Logoped",
    },

];


export default function SelectedData() {
    const { setData } = useClinica();

    const handleChange = (value: string[]) => {
        setData((prevData) => ({
            ...prevData,
            additionalServices: value,
        }));
    };

    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Xizmat turlarini tanlang"
            onChange={handleChange}
            className='mt-1 focus:ring-secondary'
            options={options}
            optionRender={(option) => (
                <Space>
                    <span role="img" aria-label={option.data.label}>
                    </span>
                    {option.data.desc}
                </Space>
            )}
        />

    )
}

