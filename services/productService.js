import { productDao } from '../models';
import _ from 'lodash';

const getProductById = async id => {
  const totalCountOfProducts = await productDao.getTotalCountOfProducts();
  if (id > totalCountOfProducts) {
    throw new Error('해당하는 상품은 없습니다');
  }
  const product = await productDao.getProductById(id);
  return product;
};

const getCommentsById = async (productId, query) => {
  const { orderBy, offset } = query;
  if (
    orderBy !== 'ratingHigh' &&
    orderBy !== 'ratingLow' &&
    orderBy !== 'latest' &&
    orderBy !== 'like'
  ) {
    throw new Error(
      'orderBy의 값은 ratingHigh, ratingLow, latest, like 중 하나입니다.',
    );
  }
  if (!(orderBy && offset)) {
    throw new Error('쿼리 스트링과 오프셋을 입력하세요.');
  }
  return await productDao.getCommentsByIdAndSorted(productId, offset, orderBy);
};

export default { getCommentsById, getProductById };
