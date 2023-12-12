"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CreateProduct, ProductSizeAttribute } from "@/validators/product";
import { SelectValue } from "@radix-ui/react-select";
import { FieldArray, useFormikContext } from "formik";
import { useMemo, useState } from "react";

interface Props {
  attribute: ProductSizeAttribute;
  sectionIndex: number;
  attributeIndex: number;
}

const clotheSizes = [
  { value: "xxs", name: "XXS" },
  { value: "xs", name: "XS" },
  { value: "s", name: "S" },
  { value: "m", name: "M" },
  { value: "l", name: "L" },
  { value: "xl", name: "XL" },
  { value: "2xl", name: "2XL" },
  { value: "3xl", name: "3XL" },
  { value: "4xl", name: "4XL" },
  { value: "5xl", name: "5XL" },
  { value: "6xl", name: "6XL" },
  { value: "7xl", name: "7XL" },
];

const shoeSizes = [
  { value: "37", name: "37" },
  { value: "38", name: "38" },
  { value: "39", name: "39" },
  { value: "40", name: "40" },
  { value: "41", name: "41" },
  { value: "42", name: "42" },
  { value: "43", name: "43" },
  { value: "44", name: "44" },
  { value: "45", name: "45" },
  { value: "46", name: "46" },
  { value: "47", name: "47" },
];

const SizesController: React.FC<Props> = ({
  attribute,
  attributeIndex,
  sectionIndex,
}) => {
  let { setFieldValue, values, errors } = useFormikContext<CreateProduct>();

  const [type, setType] = useState<"clothes" | "shoes" | "">("");

  let data = useMemo(() => {
    switch (type) {
      case "clothes":
        return clotheSizes;
      case "shoes":
        return shoeSizes;
      default:
        return [];
    }
  }, [type]);

  console.log(errors);

  return (
    <div className="flex flex-row gap-3">
      <FieldArray
        name={`sections.${sectionIndex}.attributes.${attributeIndex}.sizes`}
        render={(sizesHelper) => {
          return (
            <div className="flex flex-row gap-3">
              <Select
                onValueChange={(e) => {
                  setFieldValue(
                    `sections.${sectionIndex}.attributes.${attributeIndex}.sizes`,
                    []
                  );
                  setType(e as any);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type of sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
              {data.map((size, sizeIndex) => {
                return (
                  <Button
                    type="button"
                    variant={
                      attribute.sizes.find((item) => item.value == size.value)
                        ? "secondary"
                        : "outline"
                    }
                    key={`${sizeIndex}-${sectionIndex}`}
                    onClick={() => {
                      let index = attribute.sizes.findIndex(
                        (item) => item.value == size.value
                      );

                      index >= 0
                        ? sizesHelper.remove(index)
                        : sizesHelper.push(size);
                    }}
                  >
                    {size.name}
                  </Button>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};

export default SizesController;

//
