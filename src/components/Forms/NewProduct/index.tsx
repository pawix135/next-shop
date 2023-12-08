"use client";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "../FormikInput";
import { Button } from "@/components/ui/button";
import FormController from "./FormController";
import {
  CreateProduct,
  CreateProductSchema,
  ProductColors,
} from "@/validators/product";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ColorsController from "./ColorsController";
import { toFormikValidate, toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

export interface NewProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  sale_price?: number;
  colors: ProductColors[];
  sizes: Sizes[];
}

type Size = {
  value: string;
  text: string;
};

type Sizes = {
  name: string;
  sizes: Size[];
};

interface Props {
  store_slug: string;
}

const NewProductForm: React.FC<Props> = ({ store_slug }) => {
  let { toast } = useToast();
  let nav = useRouter();

  let initialValues: CreateProduct = {
    category: "",
    description: "",
    name: "",
    price: 0.0,
    store_slug,
    colors: [],
  };

  const createProduct = async (
    values: typeof initialValues,
    helpers: FormikHelpers<CreateProduct>
  ) => {
    try {
      let response = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify(values),
      });

      let data = await response.json();
      console.log(data);

      nav.replace(`/dashboard/store/${store_slug}/products/${data.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        action: <ToastAction altText="Goto ">Undo</ToastAction>,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex mt-2">
      <Formik
        initialValues={initialValues}
        onSubmit={createProduct}
        validationSchema={toFormikValidationSchema(CreateProductSchema)}
      >
        {({ values, setFieldValue, ...form }) => {
          return (
            <div className="flex flex-row gap-5 w-full ">
              <FormController />
              <Form className="flex flex-col gap-5 border-secondary border-2 w-full p-2 rounded-md">
                <FormikInput name="name" id="name" type="text" label="Name" />
                <FormikInput
                  name="description"
                  id="description"
                  type="text"
                  label="Description"
                />
                <FormikInput
                  name="price"
                  type="number"
                  min={0}
                  id="price"
                  step={0.01}
                  label="Price"
                />
                <FormikInput name="category" id="category" label="Category" />
                <ColorsController />
                <Button type="submit" className="w-[200px]">
                  Create new product
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewProductForm;
