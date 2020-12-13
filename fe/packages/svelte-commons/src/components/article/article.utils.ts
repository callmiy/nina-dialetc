export type ArticleValues = {
  id: string;
  specificName: string;
  genericName?: string | null;
  tags: ArticleTag[];
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: ArticleValues) => void;
};

export type ArticleTag = {
  id: string;
  text: string;
};
