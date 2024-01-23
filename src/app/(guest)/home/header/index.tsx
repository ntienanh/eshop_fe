import React from 'react';
import { MenuItem } from '@/utils/home';
import { headerLogin, headerMenu } from '@/utils/home';
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";

const Menu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
    return (
        <div>
            {menuItems.map((item, index) => (
                <div key={index} className='2xl:inline-block xl:inline-block lg:inline-block md:inline-block sm:inline-block xs:hidden mr-3 '>
                    <a href={item.path}>{item.label}</a>
                </div>
            ))}
        </div>
    );
};

const Header = () => {
    return (
        <>
            <div className='2xl:w-2xl xl:w-xl mx-auto'>
                <div className='flex items-center justify-between cursor-pointer p-5'>
                    <div>CELLINA GLASSES</div>
                    <Menu menuItems={headerLogin} />
                </div>
            </div>
            <div className='2xl:w-2xl xl:w-xl mx-auto'>
                <div className='flex items-center justify-between m cursor-pointer p-5'>
                    <Menu menuItems={headerMenu} />
                    <div className='flex items-center gap-5 mr-3'>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-[150px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaRegHeart size={15} />
                            <AiOutlineShopping size={25} className='mb-[5px]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;