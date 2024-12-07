// src/contexts/ServiceContext.tsx

import React, { createContext, useContext } from "react";
import { IBadgeService } from "@/interfaces/IBadgeService";
import { BadgeService } from "@/services/badgeService";
import {IProjectService} from "@/interfaces/IProjectService";
import {ProjectService} from "@/services/projectService";
import {ProjectHelper} from "@/services/projectHelper";
import {IProjectHelper} from "@/interfaces/IProjectHelper";

interface ServiceContextType {
    badgeService: IBadgeService;
    projectService: IProjectService;
    projectHelper: IProjectHelper;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
    children: React.ReactNode;
}

// The main ServiceProvider for the entire application
export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
    const badgeService: IBadgeService = new BadgeService();
    const projectService: IProjectService = new ProjectService();
    const projectHelper: IProjectHelper = new ProjectHelper(projectService, badgeService);

    return (
        <ServiceContext.Provider value={{
            badgeService,
            projectService,
            projectHelper
        }}>
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
