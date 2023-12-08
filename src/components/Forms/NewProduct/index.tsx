"use client";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "../FormikInput";
import { Button } from "@/components/ui/button";
import FormController from "./FormController";
import { CreateProductSchema, ProductColors } from "@/validators/product";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ColorsController from "./ColorsController";
import { toFormikValidate } from "zod-formik-adapter";

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

const NewProductForm = () => {
  let { toast } = useToast();

  let initialValues: NewProduct = {
    category: "",
    description: "",
    name: "",
    price: 0.0,
    colors: [],
    sizes: [],
  };

  const createProduct = async (
    values: NewProduct,
    helpers: FormikHelpers<NewProduct>
  ) => {
    try {
      let response = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify(values),
      });

      let data = await response.json();
      console.log(data);
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
    <div className="flex">
      <Formik
        initialValues={initialValues}
        onSubmit={createProduct}
        validate={toFormikValidate(CreateProductSchema)}
      >
        {({ values, setFieldValue, ...form }) => {
          return (
            <div className="flex flex-row gap-5 w-full">
              <FormController />
              <Form className="flex flex-col gap-5">
                <FormikInput name="name" id="name" type="text" label="Name" />
                <FormikInput
                  name="description"
                  id="description"
                  type="text"
                  label="Description"
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
