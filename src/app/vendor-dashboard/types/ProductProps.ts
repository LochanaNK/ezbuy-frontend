import { ProductFormData } from "./Product";

export interface ProductProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  buttonText: string;
}
