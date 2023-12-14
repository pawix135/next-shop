import { ProductAttributeSection } from "@/validators/product";

export const sectionToPrismaCreate = (sections: ProductAttributeSection[]) => {
  return sections.map((section) => {
    return {
      create: [
        {
          name: section.name,
          attributes: {
            create: [
              ...section.attributes.map((attribute) => {
                if (attribute.type == "colors") {
                  return {
                    name: attribute.name,
                    type: attribute.type,
                    color_attributes: {
                      createMany: {
                        data: attribute.colors,
                      },
                    },
                  };
                } else if (attribute.type == "sizes") {
                  return {
                    name: attribute.name,
                    type: attribute.type,
                    size_attributes: {
                      createMany: {
                        data: attribute.sizes,
                      },
                    },
                  };
                }
              }),
            ],
          },
        },
      ],
    };
  });
};
