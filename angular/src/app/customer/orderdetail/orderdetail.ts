export class Orderdetail {
  id: number;
  shopId: string;
  price: number;
  picFilename: string;
  title: string;
  deleted: boolean;
  num: number;
}

export class Detailstate {
  success: boolean;
  data: Orderdetail[];
  message: string;
}
