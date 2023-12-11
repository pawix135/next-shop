"use client";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "../FormikInput";
import { Button } from "@/components/ui/button";
import { CreateProduct, CreateProductSchema } from "@/validators/product";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SectionFrom from "@/components/Forms/AttributeSections";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  store_slug: string;
}

const NewProductForm: React.FC<Props> = ({ store_slug }) => {
  let { toast } = useToast();

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
      // redirect(
      //   `/dashboard/store/${store_slug}/products/${data.slug}`,
      //   "replace" as any
      // );
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
        validationSchema={() => {
          console.log("xd");

          return toFormikValidationSchema(CreateProductSchema);
        }}
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
