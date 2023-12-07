"use client";
import FormikInput from "@/components/Forms/FormikInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewStoreInputType, newStoreSchema } from "@/validators/store";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type FormikSubmitHandler<V> = (
  values: V,
  helpers: FormikHelpers<V>
) => Promise<void>;

const NewStorePage = () => {
  let router = useRouter();
  const newStoreInitialValues: NewStoreInputType = {
    name: "",
  };

  const submit: FormikSubmitHandler<NewStoreInputType> = async (
    values,
    helpers
  ) => {
    console.log("xd");

    try {
      let response = await fetch("/api/store/new", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (data.redirect_uri) {
        router.replace(data.redirect_uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center mx-auto h-full md:h-screen w-full">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create new store</CardTitle>
          <CardDescription>Adds new store to your account!</CardDescription>
          <CardContent className="px-0 pt-5">
            <Formik
              initialValues={newStoreInitialValues}
              validationSchema={toFormikValidationSchema(newStoreSchema)}
              onSubmit={submit}
            >
              <Form className="flex flex-col gap-5">
                <FormikInput name="name" label="Name" />
                <Button type="submit">Create new store</Button>
              </Form>
            </Formik>
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
};

export default NewStorePage;
