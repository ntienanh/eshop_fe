"use client";
import SharedForm from "@/components/sections/admin/Form/SharedForm";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { HTTPMethod, ServiceName } from "@/types/enum";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
  useNProgress();
  const queryClient = useQueryClient();
  const router = useNProgressRouter();
  const params = useParams();
  const { slug } = params || {};
  const isCreate = slug === "create";

  const productQuery = useQuery({
    queryKey: [ServiceName.Product, params],
    queryFn: () =>
      serviceProcessor({
        serviceName: ServiceName.Product,
        options: { params: { slug }, querystring: "?populate=*" },
      }),
    staleTime: 10 * 1000,
    enabled: !isCreate,
  }) as any;

  const productData = productQuery?.data?.data || {};

  const createMutation = useMutation({
    mutationKey: [ServiceName.Product, slug],
    mutationFn: async (body: any) =>
      serviceProcessor({
        serviceName: ServiceName.Product,
        method: HTTPMethod.Post,
        body,
      }),
    onSuccess: (data) => {
      notifications.show({
        message: `Product created successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
      router.back();
    },
  });

  const updateMutation = useMutation({
    mutationKey: [ServiceName.Product, slug],
    mutationFn: async (body: any) =>
      serviceProcessor({
        serviceName: ServiceName.Product,
        method: HTTPMethod.Put,
        body,
        options: { params: { slug } },
      }),
    onSuccess: (data) => {
      notifications.show({
        message: `Updated successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [ServiceName.Product, slug],
    mutationFn: async () =>
      serviceProcessor({
        serviceName: ServiceName.Product,
        method: HTTPMethod.Delete,
        options: { params: { slug } },
      }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [ServiceName.Product] });
      notifications.show({
        message: `${id} Deleted successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
      router.back();
    },
  });

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [ServiceName.Product] });
    console.log("deleteMutationisSuccess");
  }, [
    createMutation.isSuccess,
    updateMutation.isSuccess,
    deleteMutation.isSuccess,
  ]);

  // api call nhanh dẫn đến data und và form không lấy được value trước khi render UI
  if (!isCreate && productData.isLoading) {
    return null;
  }

  return (
    <SharedForm
      data={productData?.attributes}
      onUpdate={updateMutation.mutate}
      onCreate={createMutation.mutate}
      onDelete={deleteMutation.mutate}
      isLoading={updateMutation.isPending || createMutation.isPending}
    />
  );
};

export default ProductPage;
