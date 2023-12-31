"use client";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "../FormikInput";
import { Button } from "@/components/ui/button";
import { CreateProduct, CreateProductSchema } from "@/validators/product";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SectionFrom from "@/components/Forms/AttributeSections";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Route } from "next";

interface Props {
  store_slug: string;
}

const NewProductForm: React.FC<Props> = ({ store_slug }) => {
  let nav = useRouter();

  let initialValues: CreateProduct = {
    category: "",
    description: "",
    name: "",
    price: 0.0,
    store_slug,
    sections: [],
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
      nav.replace(("/dashboard/store/" + store_slug) as Route);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mt-2">
      <Formik
        initialValues={initialValues}
        onSubmit={createProduct}
        validationSchema={toFormikValidationSchema(CreateProductSchema)}
      >
        {({ values, setFieldValue, handleBlur, handleChange, ...form }) => {
          return (
            <div className="flex flex-row gap-5 w-full ">
              <Form className="flex flex-col gap-5 border-secondary w-full p-2">
                <FormikInput name="name" id="name" type="text" label="Name" />
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="description"
                    id="description"
                  />
                </div>
                <FormikInput
                  name="price"
                  type="number"
                  min={0}
                  id="price"
                  step={0.01}
                  label="Price"
                />
                <FormikInput name="category" id="category" label="Category" />
                <SectionFrom />
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
