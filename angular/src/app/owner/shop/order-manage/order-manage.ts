export class Orders{
  success: boolean;
  message:string;
  data:string;
}
export class OrderOne{
customerNick: string;
customerId: string;
paid: boolean;
deliverAddress :string;
deliverServicePic:string;
status: string;
total_price: number;
deliverBillNo;
deliverPhone;
deliverReceiver;
}
export class OrderList{
  id: string;
  customerId: string;
  paid: boolean;
  deliverAddress :string;
  total_price;
}
export class OrderAll{
  success: boolean;
  message:string;
  data;
}
