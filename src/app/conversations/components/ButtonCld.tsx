'use client';
import ActionIconBadge from '@/components/elements/ActionIconBadge';
import { IconPhotoPlus } from '@tabler/icons-react';
import { CldUploadButton } from 'next-cloudinary';
import React from 'react';

const ButtonCld = (props:any) => {

  return (
    <CldUploadButton onUpload={props.handleUpload} options={{ maxFiles: 1 }} uploadPreset='r2sctec2'>
      <ActionIconBadge icon={IconPhotoPlus} />
    </CldUploadButton>
  );
};

export default ButtonCld;
