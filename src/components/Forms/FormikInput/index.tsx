"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

interface Props extends InputProps {
  label: string;
}

const FormikInput: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name} className="flex flex-row gap-2">
        {label}
        {meta.error && meta.touched && (
          <span className="text-red-500">{meta.error}</span>
        )}
      </Label>
      <Input {...field} {...props} id={props.name} />
    </div>
  );
};

export default FormikInput;
