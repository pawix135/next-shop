import { useFormikContext } from "formik";
import { NewProduct } from "..";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FormController = () => {
  let formik = useFormikContext<NewProduct>();

  const addColorsAttribute = () => {
    let colors = [...formik.values.colors];
    colors.push({ name: "", colors: [] });
    formik.setFieldValue("colors", colors);
  };

  const addSizeAttribute = () => {
    let sizes = [...formik.values.sizes];
    sizes.push({ name: "String", sizes: [{ text: "XL", value: "XL" }] });
    formik.setFieldValue("sizes", sizes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add to your product</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Button onClick={addColorsAttribute}>Add colors attribute</Button>
        <Button onClick={addSizeAttribute}>Add size attribute</Button>
      </CardContent>
    </Card>
  );
};

export default FormController;
