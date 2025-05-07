import { JSX } from "react";

export type RecentActivity = {
    id: number;
    type: string;
    date: string;
    time?: string;
    amount?: string;
    message?: string;
};

export type StatisticsData = {
    visits: number;
    transactions: number;
    revenue: string;
    growth: string;
};

export type NavItem = {
    id: string;
    name: string;
    icon: JSX.Element;
};