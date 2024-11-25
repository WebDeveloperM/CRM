import { Select, Space } from 'antd';

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const options = [
    {
        label: 'Stomatalogiya',
        value: 'stomatalogiya',
        desc: 'Stomatalogiya',
    },
    {
        label: 'Nevralogiya',
        value: 'nevralogiya',
        desc: 'Nevralogiya',
    },
    {
        label: 'Narkalogiya',
        value: 'narkalogiya',
        desc: 'Narkalogiya',
    },
    {
        label: "Tibiiy ko'rik",
        value: 'tibbiyKorik',
        desc: "Tibiiy ko'rik",
    },
    {
        label: "Terapiya",
        value: 'terapiya',
        desc: "Terapiya",
    },
    {
        label: "Laboratoriya",
        value: 'laboratoriya',
        desc: "Laboratoriya",
    },
    {
        label: "Logoped",
        value: 'logoped',
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
            className='mt-1'
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

