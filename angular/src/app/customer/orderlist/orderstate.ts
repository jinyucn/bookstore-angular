export class OrderContent {
  id: number;
  customer_id: number;
  deliver_address: string;
  paid: boolean;
  deliver_id: number;
  delivered: boolean;
  create_time: string;
}

export class OrderNowList {
  message: string;
  data: OrderContent[];
  success: boolean;
}
