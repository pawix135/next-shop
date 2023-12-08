"use client";
import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  id: string;
  values: { value: string; text: string }[];
}

const FormikSelect: React.FC<Props> = ({
  id,
  label,
  name,
  values,
  placeholder,
}) => {
  let [field, meta, helpers] = useField(name);

  return (
    <div>
      <Select
        onValueChange={(v) => {
          helpers.setValue(v);
        }}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values?.map((item) => {
            return (
              <SelectItem value={item.value} key={`${name}-${item.value}}`}>
                {item.text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormikSelect;
