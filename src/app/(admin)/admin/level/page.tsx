'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Table, Tooltip } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Level = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { id: '', name: '', images: [], product_details: [] },
  });

  const levelsData = useQuery({
    queryKey: ['levels'],
    queryFn: () => axios.get('http://localhost:1337/api/levels?populate=*').then(res => res.data),
  });

  const dataSource = levelsData?.data?.data?.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  // Delete Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`http://localhost:1337/api/levels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });

  // Update Mutations
  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      const { id, ...data } = body;
      return axios.put(`http://localhost:1337/api/levels/${id}`, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });

  // Create Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`http://localhost:1337/api/levels`, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: any) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: any) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <Space size='middle'>
            <Tooltip title='Xem chi tiết Product'>
              <button
                className='text-blue-500'
                onClick={() => {
                  setIsEdit(true);
                  setValue('id', record.id);
                  setValue('name', record.name);
                  setValue('images', record.images);
                  setValue('product_details', record?.product_details);
                  setIsModalOpen(true);
                }}
              >
                Xem chi tiết
              </button>
            </Tooltip>

            <Tooltip title='Xóa Product'>
              <button className='text-red-500' onClick={() => deleteMutation.mutate(record.id)}>
                Delete
              </button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
    setIsEdit(false);
  };

  const onSubmit = (data: any) => {
    delete data.createdAt;
    delete data.updatedAt;
    delete data.createdBy;
    delete data.updatedBy;
    delete data.publishedAt;

    if (data?.id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
    reset();
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-5 p-6'>
      <div className='flex items-center justify-between'>
        <p className='text-[32px] font-medium uppercase'>Cấp bậc</p>

        <Button type='primary' onClick={showModal}>
          Tạo mới
        </Button>

        <Modal
          title={isEdit ? 'Chỉnh sửa cấp bậc' : 'Tạo mới cấp bậc'}
          open={isModalOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <div>
                    <Input
                      placeholder='Tên sản phẩm'
                      value={value}
                      onChange={onChange}
                      status={error ? 'error' : undefined}
                    />
                  </div>
                );
              }}
            />
          </form>
        </Modal>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Level;
