"use client";
import FormikInput from "@/components/Forms/FormikInput";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewStoreInputType, newStoreSchema } from "@/validators/store";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";

type FormikSubmitHandler<V> = (
  values: V,
  helpers: FormikHelpers<V>
) => Promise<void>;

const CreateNewStoreDialog = () => {
  let router = useRouter();

  const newStoreInitialValues: NewStoreInputType = {
    name: "",
  };
  const submit: FormikSubmitHandler<NewStoreInputType> = async (
    values,
    _helpers
  ) => {
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
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Create store
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new store</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewStoreDialog;
