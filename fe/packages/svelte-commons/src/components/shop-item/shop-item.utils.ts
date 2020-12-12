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

type ShopItemTag = {
  id: string;
  tag: string;
};
