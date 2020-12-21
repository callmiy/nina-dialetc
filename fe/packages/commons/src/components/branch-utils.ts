export type BranchValues = {
  id: string;
  postCode: string;
  street: string;
  city: string;
  branchAlias?: string | null;
  phone?: string | null;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BranchValues) => void;
};
