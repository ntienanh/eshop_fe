import clsx from 'clsx';
import React from 'react';

interface IJobCardProps {
  img?: any;
  title?: any;
  company?: any;
  address?: any;
  luong?: any[];
  tags?: any[];
  className: {
    root: any;
    img: any;
  };
}

const JobCard = (props: IJobCardProps) => {
  const { luong, tags, address, img, company, title, className } = props;

  return (
    <div className={clsx('flex items-center justify-center gap-4 rounded border-2 border-red-200', className?.root)}>
      <img
        src='https://salt.topdev.vn/LOd1S0aRmaUWMr10dqBCB2x1Gs-HChEY0YQq4H39ARk/fit/256/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDIxLzEwLzExL1RvcERldi1sb2dvVGZNRmpnTjBDNlVtSDlaU1U5M2JacXNPOWtIb0U1NUstMTYzMzkyNjk4Ni5wbmc'
        alt='image'
        className={clsx('h-[122px] w-[160px]', className?.img)}
      />

      <div className='flex flex-1 flex-col py-6'>
        <p className='text-[18px] font-medium'>{title}</p>
        <p>{company?.data?.attributes.name}</p>
        <p>{address}</p>

        <div>Mức lương / ưu đãi</div>
        <div>
          {['1', '2', '3'].map(item => (
            <p key={item}>Tag Skills</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
