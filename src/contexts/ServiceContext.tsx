// src/contexts/ServiceContext.tsx

import React, { createContext, useContext } from "react";
import { IBadgeService } from "@/interfaces/IBadgeService";
import { BadgeService } from "@/services/badgeService";
import {IProjectService} from "@/interfaces/IProjectService";
import {ProjectService} from "@/services/projectService";

interface ServiceContextType {
    badgeService: IBadgeService;
    projectService: IProjectService;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
    children: React.ReactNode;
}

// The main ServiceProvider for the entire application
export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
    const badgeService = new BadgeService();
    const projectService = new ProjectService();

    return (
        <ServiceContext.Provider value={{ badgeService, projectService }}>
            {children}
        </ServiceContext.Provider>
    );
};

// Custom hook to use services
export const useServices = (): ServiceContextType => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }
    return context;
};
