'use client'
import React, { useState, useEffect } from "react";
import "@/assets/styles/components/header.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/core/common/appRouter";
import logo from '@/assets/images/logo.png'
import Image from "next/image";
import { useRecoilState } from "recoil";
import { isTokenStoraged } from "@/infrastructure/utils/storage";
import categoryProductService from "@/infrastructure/repository/category/categoryProduct.service";
import categoryBlogService from "@/infrastructure/repository/category/categoryBlog.service";
import brandService from "@/infrastructure/repository/brand/brand.service";
import authService from "@/infrastructure/repository/auth/auth.service";
import productService from "@/infrastructure/repository/product/product.service";
import { convertSlug } from "@/infrastructure/helper/helper";
import { CategoryBlogState, CategoryProductState } from "@/core/common/atoms/category/categoryState";
import { BrandState } from "@/core/common/atoms/brand/brandState";
import { ProfileState } from "@/core/common/atoms/profile/profileState";
import { ProductState } from "@/core/common/atoms/product/productState";
import ButtonCommon from "../button/button-common";
import avatar from "@/assets/images/avatar.png";
import SearchBoxHeader from "./SearchBox";

const HeaderSection = () => {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    const [categoryProductState, setCategoryProductState] = useRecoilState(CategoryProductState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);
    const [, setBrandState] = useRecoilState(BrandState);
    const [, setProfileState] = useRecoilState(ProfileState);
    const [productState, setProductState] = useRecoilState(ProductState);
    const token = isTokenStoraged();
    const router = useRouter();

    // Xác định menu active dựa trên URL
    const getActiveMenu = () => {
        if (pathname === "/") return "home";
        if (pathname.startsWith(ROUTE_PATH.PRODUCT)) return "products";
        if (pathname.startsWith(ROUTE_PATH.BLOG)) return "blog";
        if (pathname.includes(ROUTE_PATH.AGENCY)) return "agency";
        return "";
    };

    const activeMenu = getActiveMenu();

    const onGetListCategoryAsync = async () => {
        try {
            await categoryProductService.GetCategory(
                {},
                () => { }
            ).then((res) => {
                setCategoryProductState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBlogCategoryAsync = async () => {
        try {
            await categoryBlogService.GetBlogCategory(
                {},
                () => { }
            ).then((res) => {
                setCategoryBlogState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetListBrandAsync = async () => {
        try {
            await brandService.GetBrand(
                {},
                () => { }
            ).then((res) => {
                setBrandState({
                    data: res.data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onGetProfileAsync = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((res) => {
                    setProfileState({
                        data: res
                    })
                })
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    const onGetListProductAsync = async () => {
        try {
            await productService.GetProduct(
                {},
                () => { }
            ).then((res) => {
                const data = res.data?.map((item: any) => {
                    const result = {
                        href: `${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`,
                        label: item.name,
                    }
                    return result;
                })

                setProductState({
                    data: data
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCategoryAsync().then(_ => { });
        onGetListBlogCategoryAsync().then(_ => { });
        onGetListBrandAsync().then(_ => { });
        onGetListProductAsync().then(_ => { });
    }, []);

    useEffect(() => {
        if (token) {
            onGetProfileAsync().then(_ => { });
        }
    }, [token]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout(() => { })
                .then(() => {
                    window.location.href = ROUTE_PATH.HOME_PAGE;
                })
        } catch (error) {
            console.error(error);
        }
    };

    const onSearch = () => {
        router.push(`${ROUTE_PATH.SEARCH}?search=${searchText.toString()}`);
    }

    const menuItems = [
        {
            id: "home",
            label: "TRANG CHỦ",
            href: ROUTE_PATH.HOME_PAGE,
        },
        {
            id: "products",
            label: "SẢN PHẨM",
            href: ROUTE_PATH.PRODUCT,
            dropdown: productState.data
        },
        {
            id: "agency",
            label: "ĐẠI Lý",
            href: ROUTE_PATH.AGENCY,
        },
        {
            id: "blog",
            label: "TIN TỨC",
            href: ROUTE_PATH.BLOG,
        },
    ];

    return (
        <>
            {/* Main Header */}
            <header className={`main-header`}>
                <div className="header-container">
                    {/* Logo */}
                    <Link href={ROUTE_PATH.HOME_PAGE} className="logo-container">
                        <div className="logo">
                            <Image src={logo} alt="RIMO" width={80} />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <ul className="nav-menu">
                            {menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={`nav-item ${activeMenu === item.id ? 'active' : ''} ${item.dropdown ? 'has-dropdown' : ''}`}
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.id)}
                                    onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="nav-link"
                                    >
                                        <span className="link-text">{item.label}</span>
                                        {item.dropdown && (
                                            <span className="dropdown-arrow">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </span>
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {
                                        item.dropdown && activeDropdown === item.id && (
                                            <div className="dropdown-menu">
                                                <div className="dropdown-content">
                                                    {item.dropdown.map((subItem, index) => (
                                                        <Link
                                                            key={index}
                                                            href={subItem.href}
                                                            className={`dropdown-item ${pathname === subItem.href ? 'active' : ''}`}
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <span className="dropdown-icon">
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                                </svg>
                                                            </span>
                                                            <span className="dropdown-text">{subItem.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="header-actions">
                        {/* Search Box */}
                        <SearchBoxHeader />
                        {
                            isTokenStoraged() ?
                                <div className="avatar-container">
                                    {/* ... existing avatar code ... */}
                                </div>
                                :
                                <Link href={ROUTE_PATH.LOGIN} className="cta-btn">
                                    <span className="btn-text">Đăng nhập</span>
                                </Link>
                        }
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-header">
                        {
                            isTokenStoraged()
                                ?
                                <div className="dropdown-header">
                                    <img
                                        src={avatar.src}
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className="dropdown-avatar"
                                    />
                                    <div className="user-info">
                                        <p className="user-name">Admin</p>
                                        <p className="user-email">admin@gmail.com</p>
                                    </div>
                                </div>
                                :
                                <div className="mobile-logo">
                                    <Image src={logo} alt="RIMO" width={80} />
                                </div>
                        }

                        <button
                            className="mobile-close-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mobile-nav-content">
                        <SearchBoxHeader />

                        <ul className="mobile-menu">
                            {menuItems.map((item) => (
                                <li key={item.id} className="mobile-nav-item">
                                    <div className="mobile-nav-header-item">
                                        <Link
                                            href={item.href}
                                            className={`mobile-nav-link ${activeMenu === item.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveDropdown(null);
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            <span className="link-text">{item.label}</span>
                                            {item.dropdown && (
                                                <button
                                                    className="mobile-dropdown-toggle"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setActiveDropdown(activeDropdown === item.id ? null : item.id);
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </button>
                                            )}
                                        </Link>
                                    </div>

                                    {/* Mobile Dropdown */}
                                    {item.dropdown && activeDropdown === item.id && (
                                        <div className="mobile-dropdown">

                                            {item.dropdown.map((subItem, index) => (
                                                <Link
                                                    key={index}
                                                    href={subItem.href}
                                                    className={`mobile-dropdown-item ${pathname === subItem.href ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setActiveDropdown(null);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <span className="dropdown-icon">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 8v4l2 2" />
                                                        </svg>
                                                    </span>
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>

                            ))}
                            <li>
                                {
                                    isTokenStoraged()
                                        ?
                                        <li className="mobile-nav-item">
                                            <div className="mobile-nav-header-item">
                                                <Link
                                                    href={""}
                                                    className={`mobile-nav-link`}
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <span className="link-text">Đăng xuất</span>
                                                </Link>
                                            </div>

                                        </li>
                                        :
                                        null
                                }
                            </li>
                        </ul>
                        {
                            isTokenStoraged()
                                ?
                                <div className="avatar-container">
                                    <button
                                        className="avatar-btn"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                    </button>
                                </div>
                                :
                                <div className="mobile-actions">
                                    <ButtonCommon onClick={() => { }} title={"Đăng nhập"} />
                                </div>
                        }

                    </div>
                </div>
            </header >

            {/* Overlay for mobile menu */}
            {
                isMobileMenuOpen && (
                    <div
                        className="mobile-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )
            }
        </>
    );
};

export default HeaderSection;