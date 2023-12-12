"use client";

import {
  ArrayHelpers,
  Field,
  FieldArray,
  FormikHelpers,
  useFormikContext,
} from "formik";
import { DragEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateProduct, ProductDragData } from "@/validators/product";
import { Grip, Plus } from "lucide-react";
import AttributeForm from "../Attributes";
import FormikInput from "../../Forms/FormikInput";

const AttributeSections: React.FC = () => {
  let { values, setValues } = useFormikContext<CreateProduct>();

  const [dropContainerIndex, setDropContainerIndex] = useState<number | null>(
    null
  );

  let dropOverIndex = useRef<number | null>(null);

  const onDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dropOverIndex.current = index;
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, data: ProductDragData) => {
    console.log("start");
    e.dataTransfer.setData("application/json", JSON.stringify(data));
    setDropContainerIndex(data.containerIndex);
  };

  const onDrop = (
    e: DragEvent<HTMLDivElement>,
    helpers: FormikHelpers<CreateProduct>["setValues"]
  ) => {
    e.preventDefault();

    let draggedData = JSON.parse(
      e.dataTransfer.getData("application/json")
    ) as ProductDragData;
    let containerIndex = parseInt(
      e.currentTarget.getAttribute("data-drop-container") ?? ""
    );

    if (isNaN(containerIndex) || containerIndex != draggedData.containerIndex) {
      console.log("No container id or invalid id");
      return;
    }

    helpers((prev) => {
      let attributesCopy = [...prev.sections[containerIndex].attributes];
      const temp = attributesCopy[draggedData.draggedIndex];
      attributesCopy[draggedData.draggedIndex] =
        attributesCopy[dropOverIndex.current!];
      attributesCopy[dropOverIndex.current!] = temp;
      prev.sections[containerIndex].attributes = attributesCopy;

      return prev;
    });
  };

  const onDragEnd = () => {
    dropOverIndex.current = null;
    setDropContainerIndex(null);
  };

  const addAttribute = (helper: ArrayHelpers, type: "colors" | "sizes") => {
    helper.push({
      name: `New ${type} set`,
      type: type,
      sizes: [],
    });
  };

  const createNewSection = (helpers: ArrayHelpers) => {
    helpers.push({ name: "New attributes section name", attributes: [] });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Attribute section</h2>
      <FieldArray
        name="sections"
        render={(sectionHelper) => {
          return (
            <div className="flex flex-col gap-5 ">
              {values.sections.map((section, sectionIndex) => {
                return (
                  <div
                    key={`section-${sectionIndex}`}
                    className="flex flex-col gap-2 bg-primary-foreground/25 p-3 rounded-md"
                  >
                    <FormikInput
                      label="Product section name"
                      name={`sections.${sectionIndex}.name`}
                    />
                    <div
                      className={cn("flex flex-col ", {
                        "bg-red-500": dropContainerIndex === sectionIndex,
                      })}
                      data-drop-container={sectionIndex}
                      onDrop={(e) => onDrop(e, setValues)}
                      onDragEnd={onDragEnd}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <FieldArray
                        name={`sections.${sectionIndex}.attributes`}
                        render={(attributesHelpers) => {
                          return (
                            <div className="flex flex-col gap-5 ">
                              {section.attributes.map(
                                (attribute, attributeIndex) => {
                                  return (
                                    <div
                                      key={`attribute-${sectionIndex}-${attributeIndex}`}
                                      className="flex flex-col gap-5"
                                    >
                                      <div className="flex flex-col gap-3">
                                        <div className="flex flex-row items-center gap-2 hover:cursor-move">
                                          <div
                                            draggable
                                            onDragOver={(e) =>
                                              onDragOver(e, attributeIndex)
                                            }
                                            onDragStart={(e) =>
                                              onDragStart(e, {
                                                containerIndex: sectionIndex,
                                                draggedIndex: attributeIndex,
                                              })
                                            }
                                          >
                                            <Grip color="white" />
                                          </div>
                                          <FormikInput
                                            name={`sections.${sectionIndex}.attributes.${attributeIndex}.name`}
                                            id={`sections.${sectionIndex}.attributes.${attributeIndex}.name`}
                                            label="New attributes set name"
                                          />
                                        </div>
                                        <AttributeForm
                                          attributeIndex={attributeIndex}
                                          sectionIndex={sectionIndex}
                                        />
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              <div className="flex flex-row flex-wrap gap-3">
                                <Button
                                  size={"sm"}
                                  type="button"
                                  onClick={() => {
                                    addAttribute(attributesHelpers, "colors");
                                  }}
                                >
                                  Add color attribute
                                </Button>
                                <Button
                                  size={"sm"}
                                  type="button"
                                  onClick={() => {
                                    addAttribute(attributesHelpers, "sizes");
                                  }}
                                >
                                  Add size attribute
                                </Button>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <Button
                size={"icon"}
                className="self-center w-[50px]"
                variant={"outline"}
                type="button"
                onClick={() => {
                  createNewSection(sectionHelper);
                }}
              >
                <Plus />
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default AttributeSections;
