import { Select, Space } from 'antd';

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

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

