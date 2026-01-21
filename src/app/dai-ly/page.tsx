'use client'
import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import agencyService from '@/infrastructure/repository/agency/agency.service';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import styles from '@/assets/styles/pages/agency/agency.module.css'
import Image from 'next/image';
import { configImageURL } from '@/infrastructure/helper/helper';
import SelectSearchCommon from '@/infrastructure/common/input/select-search-common';
import ButtonCommon from '@/infrastructure/common/button/button-common';
import { useRecoilValue } from 'recoil';
import { CategoryBlogState } from '@/core/common/atoms/category/categoryState';
import LocationMap from './map';
import districtService from '@/infrastructure/repository/district/district.service';
import InputSearchCommon from '@/infrastructure/common/input/input-search-common';
import SelectSearchProvince from '@/infrastructure/common/input/select-search-province';
import { AgencyInterface, AgencyParams } from '@/infrastructure/interface/agency/agency.interface';
export interface Location {
    id: number;
    name: string;
    address: string;
    lat: number;
    long: number;
    phone_number: string;
    image: string;
    province: string;
    district: string;
}
const AgencyContent = () => {
    const [listAgency, setListAgency] = useState<Array<AgencyInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [provinceSelected, setProvinceSelected] = useState<string>("");
    const [districtSelected, setDistrictSelected] = useState<string>("");
    const [selectedAgency, setSelectedAgency] = useState<Location | any>({});


    const [listProvince, setListProvince] = useState<Array<any>>([])
    const [listDistrict, setListDistrict] = useState<Array<any>>([])

    const categoryBlogState = useRecoilValue(CategoryBlogState).data
    const router = useRouter(); // Từ next/navigation
    const searchParams = useSearchParams(); // Dùng useSearchParams thay vì router.query

    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '10';
    const province = searchParams?.get('province') || '';
    const district = searchParams?.get('district') || '';


    const onGetListAgencyAsync = async ({ name = searchText, limit = pageSize, page = currentPage, province = provinceSelected, district = districtSelected }) => {
        const param: AgencyParams = {
            page: page,
            limit: limit,
            search: name,
            province: province,
            district: district
        }
        try {
            await agencyService.GetAgency(
                param,
                setLoading
            ).then((res) => {
                setListAgency(res.data);
                setTotalElement(res.limit);
                setTotalPage(res.totalPages);
                setTotal(res.total);
                setSelectedAgency(res.data[0])
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = searchText, limit = pageSize, page = 1, province = provinceSelected, district = districtSelected) => {
        await onGetListAgencyAsync({ name: name, limit: limit, page: page, province: province, district: district }).then(_ => { });
    };

    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('province', provinceSelected);
        params.set('district', districtSelected);
        params.set('page', '1'); // Reset về trang 1 khi search
        router.push(`${ROUTE_PATH.AGENCY}?${params.toString()}`);

        await onSearch(searchText, pageSize, 1, provinceSelected, districtSelected).then(_ => { });
    }

    const onChangeSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeProvince = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvinceSelected(e.target.value);
    };

    const onChangeDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrictSelected(e.target.value);
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
        router.push(`${ROUTE_PATH.AGENCY}?${params.toString()}`);

        await onSearch(searchText, pageSize, page, provinceSelected, districtSelected).then(_ => { });
    }


    useEffect(() => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 10;
        const parsedSearch = search || "";
        const parsedProvince = province || "";
        const parsedDistrict = district || "";

        setSearchText(parsedSearch);
        setCurrentPage(parsedPage);
        setPageSize(parsedLimit);
        setProvinceSelected(parsedProvince);

        onSearch(parsedSearch, parsedLimit, parsedPage, parsedProvince, parsedDistrict);
    }, [search, page, limit, province, district]); // Theo dõi các giá trị từ searchParams

    const onSelectAgency = (item: AgencyInterface) => {
        setSelectedAgency(item)
    };

    const onGetListProvinceAsync = async () => {
        const param = {

        }
        try {
            await districtService.getAll(
                param,
                setLoading
            ).then((res) => {
                setListProvince(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onGetListDistrictAsync = async () => {
        if (provinceSelected) {
            try {
                await districtService.getDetail(
                    String(provinceSelected).split('-')[0],
                    setLoading
                ).then((res) => {
                    setListDistrict(res.districts);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        onGetListProvinceAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListDistrictAsync().then(_ => { });
    }, [provinceSelected]);

    return (
        <ClientLayout>
            <div className={styles.agencyContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Đại lý"}
                        redirect={ROUTE_PATH.AGENCY}
                        title={""}
                    />
                    <div className={styles.agencyContent}>
                        <div className="pageHeader">
                            <div className="badge">
                                <span className="badgeText">Đại lý & Chi nhánh</span>
                            </div>
                            <h1 className="headerTitle">
                                <span className="highlight">Danh Sách</span> Đại Lý
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mb-8">
                            {/* Search Input - 5/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-4">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm đại lý'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <SelectSearchProvince
                                    listDataOfItem={listProvince}
                                    onChange={onChangeProvince}
                                    valueName='code'
                                    labelName='name'
                                    label={'Tỉnh/Thành phố'}
                                />
                            </div>

                            {/* Category Select - 4/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-3">
                                <SelectSearchCommon
                                    listDataOfItem={listDistrict}
                                    onChange={onChangeDistrict}
                                    valueName='name'
                                    labelName='name'
                                    label={'Quận/Huyện'} />
                            </div>

                            {/* Search Button - 3/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-2">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>

                        <div className={styles.agencyMain}>
                            <div className={styles.leftSide}>
                                {listAgency.map((item, index) => (
                                    <div className={styles.agencyCard} key={index}
                                        onClick={() => onSelectAgency(item)}
                                    >
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={configImageURL(item.image)}
                                                alt={item.name}
                                                width={300}
                                                height={200}
                                                className={styles.cardImageImg}
                                            />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardName}>{item.name}</h3>

                                            <div className={styles.cardInfo}>
                                                <div className={styles.infoItem}>
                                                    <svg className={styles.infoIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                    <p className={styles.cardAddress}>{item.address}</p>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <svg className={styles.infoIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                    </svg>
                                                    <p className={styles.cardPhone}>{item.phone_number}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className={styles.rightSide}>
                            <LocationMap dataLocation={selectedAgency} />
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

const AgencyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AgencyContent />
        </Suspense>
    );
};

export default AgencyPage