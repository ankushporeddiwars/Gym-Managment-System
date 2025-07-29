export interface MasterDPs {
    id: string;
    parentId?: string;
    displayName: string;
}

export interface Masters {
    key: string;
    values: MasterDPs[];
}

export interface MenuModel {
    menuId: number;
    displayName: string;
    route?: string;
    children?: MenuModel[]
}

export interface configurationParameterModel {
    Name?: string;
    value?: string;
    save?: string;
}