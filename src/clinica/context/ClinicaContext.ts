import React, { createContext, useContext } from "react";

// Form ma'lumotlari uchun interfeys
export interface ClinicaFormData {
    clinicName: string;
    legalAddress: string;
    phoneNumber: string;
    email: string;
    website: string;
    taxpayerIdNumber: string;
    stateRegistrationNumber: string;
    clinicType: string;
    employeeCount: number;
    licenseNumber: string;
    licenseExpiryDate: string;
    bankAccountDetails: string;
    additionalServices: string[];
    accountingSystem: string;
    instagram: string;
    telegram: string;
    facebook: string;
    youtube: string;
    geolocationLatitude: number;
    geolocationLongitude: number;
    description: string;
}

// Kontekst tipi
export interface ClinicaContextType {
    data: ClinicaFormData;
    setData: React.Dispatch<React.SetStateAction<ClinicaFormData>>;
}

// Default qiymat
export const defaultData: ClinicaFormData = {
    clinicName: "",
    legalAddress: "",
    phoneNumber: "",
    email: "",
    website: "",
    taxpayerIdNumber: "",
    stateRegistrationNumber: "",
    clinicType: "",
    employeeCount: 0,
    licenseNumber: "",
    licenseExpiryDate: "",
    bankAccountDetails: "",
    additionalServices: [],
    accountingSystem: "",
    instagram: "",
    telegram: "",
    facebook: "",
    youtube: "",
    geolocationLatitude: 0,
    geolocationLongitude: 0,
    description: "",
};




// Kontekstni yaratish
 export const ClinicaContext = createContext<ClinicaContextType | undefined>(undefined);

// Kontekstni ishlatish uchun maxsus hook
export const useClinica = () => {
    const context = useContext(ClinicaContext);
    if (!context) {
        throw new Error("useClinica must be used within a ClinicaProvider");
    }
    return context;
};
