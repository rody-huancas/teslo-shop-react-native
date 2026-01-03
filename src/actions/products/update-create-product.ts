import { isAxiosError } from 'axios';
import { Product } from '../../domain/entities/product';
import { tesloApi } from '../../config/api/tesloApi';

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id) {

    console.log(product)

    return updateProduct(product);
  }

  throw new Error('Creación no implementada');
};

// TODO: revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    console.log(error);
    throw new Error(`Error al actualizar el producto ${id}`);
  }
};

const prepareImages = (images: string[]) => {
  // TODO: revisar los FILES

  return images.map(image => image.split('/').pop());
};
