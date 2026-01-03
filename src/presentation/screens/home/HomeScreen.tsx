import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { ProductList } from '../../components/products/ProductList';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { getProductsByPage } from '../../../actions/products/get-products-by.page';

export const HomeScreen = () => {
  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 5,
  //   queryFn: async () => getProductsByPage(0),
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    queryFn: async params => {
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="TesloShop - Productos"
      subtitle="Aplicación Administrativa"
    >
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          products={data?.pages.flat() || []}
          fetchNextPage={fetchNextPage}
        />
      )}
    </MainLayout>
  );
};
