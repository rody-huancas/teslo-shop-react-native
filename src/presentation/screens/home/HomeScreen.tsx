import { Button } from '@ui-kitten/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { ProductList } from '../../components/products/ProductList';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { getProductsByPage } from '../../../actions/products/get-products-by.page';

export const HomeScreen = () => {
  const { logout } = useAuthStore()

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 5,
  //   queryFn: async () => getProductsByPage(0),
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey        : ['products', 'infinite'],
    staleTime       : 1000 * 60 * 5,
    initialPageParam: 0,
    queryFn: async params => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="TesloShop - Productos"
      subtitle="Aplicación Administrativa"
    >
      <Button onPress={logout} style={{ marginBottom: 20 }}>Cerrar Sesión</Button>

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
