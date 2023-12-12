"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage, useField } from "formik";

interface Props extends InputProps {
  label?: string;
  selectOptions?: { value: string; text: string }[];
}

const FormikInput: React.FC<Props> = ({
  label,
  selectOptions,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.id} className="flex flex-col gap-2">
        {label && label}
        {meta.error && meta.touched && (
          <span className="text-red-500">{meta.error}</span>
        )}
      </Label>
      <Input {...field} {...props} className={cn(className, "w-full")} />
    </div>
  );
};

export default FormikInput;
