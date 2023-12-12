"use client";

import { CreateProduct } from "@/validators/product";
import { useFormikContext } from "formik";
import ColorsController from "../NewProduct/ColorsController";
import SizesController from "../NewProduct/SizesController";

interface Props {
  sectionIndex: number;
  attributeIndex: number;
}
const AttributeForm: React.FC<Props> = ({ attributeIndex, sectionIndex }) => {
  let { values } = useFormikContext<CreateProduct>();

  let attribute = values.sections[sectionIndex].attributes[attributeIndex];

  switch (attribute.type) {
    case "colors":
      return (
        <ColorsController
          attribute={attribute}
          attributeIndex={attributeIndex}
          sectionIndex={sectionIndex}
        />
      );
    case "sizes":
      return (
        <SizesController
          attribute={attribute}
          attributeIndex={attributeIndex}
          sectionIndex={sectionIndex}
        />
      );
    default:
      return null;
  }
};

export default AttributeForm;
