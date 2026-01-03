import { Formik } from 'formik';
import { useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, ScrollView } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { MainLayout } from '../../layouts/MainLayout';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { RootStackParams } from '../../navigation/StackNavigator';
import { updateCreateProduct } from '../../../actions/products/update-create-product';
import { Gender, Product, Size } from '../../../domain/entities/product';

const sizes  : Size[]   = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

export interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme        = useTheme();
  const queryClient  = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn : async () => getProductById(productIdRef.current),
  });

  const mutation = useMutation(
    {
      mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
      onSuccess(data: Product) {
        productIdRef.current = data.id;

        console.log(data)

        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
        queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      }
    }
  )

  if (!product) {
    return <MainLayout title="Cargando" />;
  }

  return (
    <Formik initialValues={product} onSubmit={(values) => mutation.mutate(values)}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subtitle={`Precio - ${values.price}`}>
          <ScrollView style={{ flex: 1 }}>
            {/* Imágenes del producto */}
            <Layout>
              <FlatList
                data={product.images}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <FadeInImage
                    uri={item}
                    style={{ width: 300, height: 300, marginHorizontal: 7 }}
                  />
                )}
              />
            </Layout>

            {/* Formulario */}
            <Layout style={{ marginHorizontal: 15 }}>
              <Input
                label="Título"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                value={values.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
              />
            </Layout>

            {/* Precio e inventario */}

            <Layout
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
                marginVertical: 5,
              }}
            >
              <Input
                label="Precio"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{ flex: 1 }}
                keyboardType='numeric'
              />
              <Input
                label="Inventario"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{ flex: 1 }}
                keyboardType='numeric'
              />
            </Layout>

            {/* Selectores */}

            <ButtonGroup
              style={{ margin: 2, marginTop: 10, marginHorizontal: 15 }}
              appearance="outline"
            >
              {sizes.map(size => (
                <Button
                  key={size}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            {/* Generos */}

            <ButtonGroup
              style={{ margin: 2, marginTop: 10, marginHorizontal: 15 }}
              appearance="outline"
            >
              {genders.map(gender => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Botón de guardar */}
            <Button
              accessoryLeft={<MyIcon name="save-outline" white />}
              onPress={handleSubmit}
              disabled={mutation.isPending}
              style={{ margin: 15 }}
            >
              Guardar
            </Button>

            <Text>{JSON.stringify(values, null, 2)}</Text>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
