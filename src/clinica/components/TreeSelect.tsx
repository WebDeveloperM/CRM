import React, { useMemo, useState } from "react";
import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd";
import { WorkerDataTypeRu, WorkerDataTypeUz } from "@clinica/types";

interface DataNode {
  id: number;
  nameUz: string;
}

export interface WorkerData {
  [key: string]: DataNode[];
}

interface TreeSelectComponentProps {
  data: {
    uz: WorkerDataTypeUz;
    rus: WorkerDataTypeRu;
  }
  language: "uz" | "rus"; // Tanlangan til
  placeholder?: string;   // Tanlov matni
  onChange: (selected: number[]) => void; // Tanlangan IDs
}

const TreeSelectComponent: React.FC<TreeSelectComponentProps> = ({
  data = { uz: {}, rus: {} }, // Default qiymat
  language,
  placeholder,
  onChange,
}) => {
  const treeData = useMemo(() => {
    const workerData = data[language];
    if (!workerData || Object.keys(workerData).length === 0) {
      return []; // Agar ma'lumot bo'lmasa, bo'sh array qaytariladi
    }
    return Object.entries(workerData).map(([category, items]) => ({
      title: category,
      value: category,
      key: category,
      children: items.map((item: any) => ({
        title: item.nameUz, // Tilga qarab nomni tanlash
        value: item.id,
        key: item.id,
      })),
    }));
  }, [data, language]);

  const [value, setValue] = useState<number[]>([]);

  const handleChange: TreeSelectProps<number[]>["onChange"] = (newValue) => {
    setValue(newValue);
    onChange(newValue as number[]);
  };

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={handleChange}
      treeCheckable
      placeholder={placeholder}
      style={{ width: "100%" }}
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
    />
  );
};

export default TreeSelectComponent