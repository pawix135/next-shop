import { FieldArray, useFormikContext } from "formik";
import FormikInput from "../../FormikInput";
import { Button } from "@/components/ui/button";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { CreateProduct, ProductColorAttribute } from "@/validators/product";

interface Props {
  attribute: ProductColorAttribute;
  sectionIndex: number;
  attributeIndex: number;
}
const ColorsController: React.FC<Props> = ({
  attributeIndex,
  sectionIndex,
  attribute,
}) => {
  let { setFieldValue } = useFormikContext<CreateProduct>();

  return (
    <FieldArray
      name={`sections.${sectionIndex}.attributes.${attributeIndex}.colors`}
      render={(attributHelpers) => {
        return (
          <div className="">
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              {attribute.colors &&
                attribute.colors.map((color, colorIndex) => {
                  return (
                    <div
                      className="flex flex-row gap-2 items-center"
                      key={`color-${sectionIndex}-${attributeIndex}-${colorIndex}`}
                    >
                      <input
                        type="color"
                        className="appearance-none border-none w-[50px] h-full"
                        name={`sections.${sectionIndex}.attributes.${attributeIndex}.colors.${colorIndex}.value`}
                        onChange={(e) => undefined}
                        onBlur={(e) => {
                          setFieldValue(
                            `sections.${sectionIndex}.attributes.${attributeIndex}.colors.${colorIndex}.value`,
                            e.target.value
                          );
                        }}
                      />
                      <FormikInput
                        id={`sections.${sectionIndex}.attributes.${attributeIndex}.colors.${colorIndex}.name`}
                        name={`sections.${sectionIndex}.attributes.${attributeIndex}.colors.${colorIndex}.name`}
                        label="Color name"
                      />
                    </div>
                  );
                })}
              <Button
                type="button"
                className="self-center"
                size={"icon"}
                onClick={() => {
                  attributHelpers.push({
                    value: "#ffffff",
                    name: "New color name",
                  });
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default ColorsController;
