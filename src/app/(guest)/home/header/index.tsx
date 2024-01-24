import React from "react";
import { MenuItem } from "@/utils/home";
import { headerLogin, headerMenu } from "@/utils/home";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import Hero from "../../../../../public/hero.png";

const Menu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  return (
    <div className="flex items-center justify-around">
      {menuItems.map((item, index) => (
        <div key={index} className="mr-3 ">
          <a href={item.path}>{item.label}</a>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div className="2xl:w-2xl mx-auto">
        <div className="flex items-center justify-between cursor-pointer p-5">
          <h1 className="text-[30px] font-bold">
            CELLINA
            <span className="text-lg text-[28px] font-normal">GLASSES</span>
          </h1>
          <Menu menuItems={headerLogin} />
        </div>
      </div>
      <div className="2xl:w-2xl mx-auto">
        <div className="flex items-center justify-between cursor-pointer p-5">
          <Menu menuItems={headerMenu} />
          <div className="flex items-center gap-5 mr-3">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[150px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center gap-3">
              <FaRegHeart size={15} />
              <AiOutlineShopping size={25} className="mb-[5px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-secondary">
        <div className="2xl:w-2xl relative flex">
          <div className="mx-auto relative w-[100%]">
            <div className="flex flex-col cursor-pointer absolute top-[150px] 3xl:left-[220px] 2xl:left-[80px] xl:left-[40px] lg:left-[30px] left-[20px]">
              <h1 className="4xl:text-[40px] 3xl:text-[35] 2xl:text-[35px] xl:text-[30px] lg:text-[30px] xs:text-[25px] xs:text-white font-bold text-secondary1">
                Spring Sale
              </h1>
              <p className="text-[30px] font-serif text-secondary1 xs:text-white">
                Up to -40%
              </p>
              <button className="w-[200px] mt-3  bg-secondary1 p-3 text-white rounded-lg hover:bg-orange-300 hover:text-slate-700">
                See offer
              </button>
            </div>
          </div>
        </div>
        <div className="w-2xl bg-secondary">
          <div className="4xl:flex 4xl:justify-end 2xl:flex 2xl:justify-end xl:flex xl:justify-end lg:flex lg:justify-end flex justify-end w-[100%] h-[100%]">
            <img
              src={Hero.src}
              alt="hero"
              className="object-cover w-[50%] xs:w-[100%] h-[500px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
