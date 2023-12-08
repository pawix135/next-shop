import { CreateProductSchema } from "@/validators/product";

export const POST = async (req: Request) => {
  let body = await req.json();

  try {
    let validate = CreateProductSchema.parse(body);
    console.log(validate);

    return Response.json(validate);
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
