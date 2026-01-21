export interface AgencyInterface {
    id?: number;
    name: string;
    address: string;
    lat: string;
    long: string;
    phone_number: string;
    image: string;
    province: string;
    district: string;
}

export interface AgencyParams {
    page: number;
    limit: number;
    search: string;
    province: string;
    district: string;
}