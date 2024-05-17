import React from 'react';

const FooterGuest = () => {
  return (
    <footer className='z-3 w-full bg-[#FFE6D790]'>
      <div className='mx-auto max-w-[1536px] p-4 py-16 text-base text-gray-600'>
        <div className='px-8 md:px-0'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6'>
            <div className='col-span-1 md:col-span-2'>
              <div className='flex flex-col gap-y-3'>
                <img
                  alt='TopDev'
                  loading='lazy'
                  width='152'
                  height='30'
                  decoding='async'
                  data-nimg='1'
                  className='h-[80px] w-[200px]'
                  src='./images/logo.png'
                />

                <p className='cursor-pointer hover:text-red-600'>
                  Dien Bien Phu Street, Ward 21, Binh Thanh, Ho Chi Minh City
                </p>
                <p className='cursor-pointer hover:text-red-600'>Tel: 028 6273 xxxx - contact@xxx.vn</p>

                <p className='font-bold text-black'>Verified By</p>
                <img
                  alt='Bo Cong Thuong Logo'
                  loading='lazy'
                  width='155'
                  height='60'
                  decoding='async'
                  data-nimg='1'
                  className='h-[60px] w-[155px] max-w-full'
                  src='https://accounts.topdev.vn/asset/images/logo_bocongthuong.jpgx'
                />
              </div>
            </div>
            <div className='col-span-1'>
              <p className='mb-2 font-bold text-black lg:mb-4'>About Pexels</p>

              <div className='flex flex-col gap-y-1'>
                <p className='cursor-pointer hover:text-red-600'>About us</p>
                <p className='cursor-pointer hover:text-red-600'>Contact us</p>
                <p className='cursor-pointer hover:text-red-600'>Terms of service</p>
                <p className='cursor-pointer hover:text-red-600'>Career at Pexels</p>
                <p className='cursor-pointer hover:text-red-600'>Privacy policy</p>
                <p className='cursor-pointer hover:text-red-600'>
                  Operation regulation of Pexels e-commerce trading floor
                </p>
                <p className='cursor-pointer hover:text-red-600'>Resolve complaints</p>
              </div>
            </div>
            <div className='col-span-1'>
              <p className='mb-2 font-bold text-black lg:mb-4'>For Jobseekers</p>
              <div className='flex flex-col gap-y-1'>
                <p className='cursor-pointer hover:text-red-600'>Salary calculation Gross-Net</p>
                <p className='cursor-pointer hover:text-red-600'>Create CV</p>
                <p className='cursor-pointer hover:text-red-600'>Browse all IT jobs</p>
                <p className='cursor-pointer hover:text-red-600'>Personality test</p>
              </div>
            </div>
            <div className='col-span-1'>
              <p className='mb-2 font-bold text-black lg:mb-4'>For Employers</p>
              <div className='flex flex-col gap-y-1'>
                <p className='cursor-pointer hover:text-red-600'>Post a job</p>
                <p className='cursor-pointer hover:text-red-600'>Talent solutions</p>
                <p className='cursor-pointer hover:text-red-600'>IT market report</p>
                <p className='cursor-pointer hover:text-red-600'>Create account</p>
              </div>
            </div>
            <div className='col-span-1'>
              <p className='mb-2 font-bold text-black lg:mb-4'>Subscrible us on</p>
              <div className='flex flex-col gap-y-1'>
                <div className='flex justify-start gap-x-5'>
                  <svg
                    className='h-9 w-9 cursor-pointer hover:scale-110'
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 448 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'></path>
                  </svg>
                  <svg
                    className='h-9 w-9 cursor-pointer hover:scale-110'
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 448 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z'></path>
                  </svg>
                  <svg
                    className='h-9 w-9 cursor-pointer hover:scale-110'
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 448 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z'></path>
                  </svg>
                </div>
                <p className='mb-2 font-bold text-black'>Download app here</p>
                <div className='flex justify-start gap-x-2'>
                  <img
                    alt='TopDev in app store'
                    loading='lazy'
                    width='94'
                    height='28'
                    decoding='async'
                    data-nimg='1'
                    className='h-[28px] w-[94px] max-w-full'
                    src='https://cdn.topdev.vn/v4/assets/images/promote_app/app_store_img.png'
                  />
                  <img
                    alt='TopDev in app store'
                    loading='lazy'
                    width='94'
                    height='28'
                    decoding='async'
                    data-nimg='1'
                    className='h-auto max-w-full'
                    src='https://cdn.topdev.vn/v4/assets/images/promote_app/google_play_img.png'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='pt-16 text-center text-gray-400'>
            Copyright © CÔNG TY CỔ PHẦN APPLANCER / Business Registration: 031 303 2338 - Issues on: 27/11/2014
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGuest;
