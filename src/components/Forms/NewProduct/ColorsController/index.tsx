import { FieldArray, useFormikContext } from "formik";
import { NewProduct } from "..";
import FormikInput from "../../FormikInput";
import { Button } from "@/components/ui/button";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";

const ColorsController: React.FC = () => {
  let { values, setFieldValue } = useFormikContext<NewProduct>();

  if (values.colors.length < 1) return null;

  return (
    <div className="flex flex-col gap-5">
      <p>Color attributes</p>
      <FieldArray
        name="colors"
        render={(colorsArrHelpers) => {
          return (
            <div className="flex flex-col gap-5">
              {values.colors.map((colorSection, colorSectionI) => {
                return (
                  <div
                    key={`color-section-${colorSectionI}`}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <FormikInput
                        name={`colors.${colorSectionI}.name`}
                        id={`color-${colorSectionI}`}
                        type="text"
                      />
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        type="button"
                        onClick={() => {
                          colorsArrHelpers.remove(colorSectionI);
                        }}
                      >
                        <Cross1Icon />
                      </Button>
                    </div>
                    <FieldArray
                      name={`colors.${colorSectionI}.colors`}
                      render={(arrHelpers) => {
                        return (
                          <div className="grid grid-flow-row grid-cols-3 gap-5 flex-wrap border-2 p-2 shadow-sm shadow-primary-foreground">
                            {colorSection.colors.map((color, colorI) => {
                              return (
                                <div
                                  key={`${colorSection.name}-${colorI}`}
                                  className="flex flex-row gap-5 items-center"
                                >
                                  <input
                                    type="color"
                                    className="appearance-none border-none w-[50px] h-full"
                                    name={`colors.${colorSectionI}.colors.${colorI}.value`}
                                    onChange={() => {
                                      return;
                                    }}
                                    onBlur={(e: any) => {
                                      console.log(
                                        `colors.${colorSectionI}.colors.${colorI}.value`,
                                        e.target.value
                                      );

                                      setFieldValue(
                                        `colors.${colorSectionI}.colors.${colorI}.value`,
                                        e.target.value
                                      );
                                    }}
                                  />
                                  <FormikInput
                                    name={`colors.${colorSectionI}.colors.${colorI}.name`}
                                    id={`colors-${colorSectionI}-input-${colorI}`}
                                  />
                                  <Button
                                    type="button"
                                    variant={"destructive"}
                                    size={"icon"}
                                    onClick={() => {
                                      arrHelpers.remove(colorI);
                                    }}
                                  >
                                    <Cross1Icon />
                                  </Button>
                                </div>
                              );
                            })}
                            <Button
                              className="w-[50px]"
                              type="button"
                              onClick={() => {
                                arrHelpers.push({
                                  name: "",
                                  value: "#000000",
                                });
                              }}
                            >
                              <PlusIcon />
                            </Button>
                          </div>
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ColorsController;
