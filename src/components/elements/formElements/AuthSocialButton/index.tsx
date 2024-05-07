import { ActionIcon, Button } from '@mantine/core';
import React from 'react';

interface IAuthSocialButtonProps {
  icon: any;
  onClick: () => void;
  classNames?: any;
}

const AuthSocialButton = (props: IAuthSocialButtonProps) => {
  const { icon: ICon, onClick, classNames } = props || {};

  return (
    <Button fullWidth classNames={classNames} variant='default' onClick={onClick}>
      <ICon style={{ width: '80%', height: '80%' }} stroke={1.5} className={'text-gray-600'} />
    </Button>
  );
};

export default AuthSocialButton;
