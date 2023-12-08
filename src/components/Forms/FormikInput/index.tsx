"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField } from "formik";

interface Props extends InputProps {
  label?: string;
  selectOptions?: { value: string; text: string }[];
}

const FormikInput: React.FC<Props> = ({ label, selectOptions, ...props }) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.id} className="flex flex-row gap-2">
        {label && label}
        {meta.error && meta.touched && (
          <span className="text-red-500">{meta.error}</span>
        )}
      </Label>
      {props.type == "select" ? (
        <Select
          onValueChange={(v) => {
            helpers.setValue(v);
          }}
        >
          <SelectTrigger id={props.id}>
            <SelectValue placeholder={props.placeholder ?? ""} />
          </SelectTrigger>
          <SelectContent aria-multiselectable>
            {selectOptions?.map((item) => {
              return (
                <SelectItem value={item.value} key={item.value}>
                  {item.text}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ) : (
        <Input {...field} {...props} id={props.id} />
      )}
    </div>
  );
};

export default FormikInput;
