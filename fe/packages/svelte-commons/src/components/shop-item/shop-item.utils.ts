export type ShopItemValues = {
  id: string;
  specificName: string;
  genericName?: string | null;
  tags: ShopItemTag[]
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: ShopItemValues) => void;
};

export type ShopItemTag = {
  id: string;
  text: string;
};
