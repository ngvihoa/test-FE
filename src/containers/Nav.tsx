import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import NavIcon from '../components/NavIcon';
import { DocSearch, ProfileCircled, Scanning } from 'iconoir-react';
import { Link } from 'react-router-dom';
import useOnClickOutside from 'use-onclickoutside';
import useAuthStore from '../stores/authStore';

const Nav = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const logout = useAuthStore((state) => state.logoutUser);
    const userMenuRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(userMenuRef, () => setShowUserMenu(false));

    return (
        <nav className="flex h-full flex-col rounded-tr-md rounded-br-md bg-slate-800">
            <div className="no-scrollbar flex flex-1 flex-col space-y-3 overflow-y-auto overscroll-contain scroll-smooth p-3 pb-0">
                <Link to="/">
                    <NavIcon tooltip="Quét tài liệu">
                        <Scanning className="text-white" />
                    </NavIcon>
                </Link>
                {/* <Link to="/search">
                    <NavIcon tooltip="Tìm kiếm tài liệu">
                        <DocSearch className="text-white" />
                    </NavIcon>
                </Link> */}
            </div>
            <div className="relative p-3" ref={userMenuRef}>
                <button onClick={() => setShowUserMenu((state) => !state)}>
                    <NavIcon>
                        <ProfileCircled className="text-white" />
                    </NavIcon>
                </button>
                {showUserMenu && (
                    <>
                        <div className="absolute left-full bottom-0 ml-3 mb-3 w-max space-y-2 rounded-md border bg-white p-3 text-center shadow-2xl z-50" >
                            <h2 className="font-medium">Chào User</h2>
                            <button
                                onClick={logout}
                                className="rounded-md bg-slate-800 px-6 py-2 text-white"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
