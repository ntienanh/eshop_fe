'use client';

interface IMediaListProps {
  //   data: IFile[];
  data: any[];
  selectedData: string[];
  onChange: (event: any) => void;
}
import React from 'react';

const MediaList = (props: IMediaListProps) => {
  const { data, onChange, selectedData } = props || {};

  return <div>MediaList</div>;
};

export default MediaList;
