export class ProductAdContent {
  applyDate: string;
  content: string;
  id: number;
  image: string;
  permitted: boolean;
  price: number;
  processed: boolean;
  productId: number;
  shopId: number;
  tittle: string;
}

export class ProductAdState {
  message: string;
  status: number;
  data: ProductAdContent[];
}

export class ShopAdContent {
  adType: string;
  content: string;
  endDate: string;
  id: number;
  image: string;
  price: string;
  productId: number;
  shopId: number;
  startDate: string;
  tittle: string;
}

export class ShopAdState {
  message: string;
  status: number;
  data: ShopAdContent[];
}
