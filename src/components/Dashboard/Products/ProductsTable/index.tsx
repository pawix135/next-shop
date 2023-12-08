"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { RemoveProductBody } from "@/validators/product";
import { Product } from "@prisma/client";
import { Route } from "next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface Props {
  products: Product[];
}
const ProductsTable: React.FC<Props> = ({ products }) => {
  let path = usePathname();

  let { slug } = useParams<{ slug: string }>();

  const removeProduct = async (prod_id: number) => {
    if (!slug) {
      toast({
        title: "Check if you're on store products page!",
        variant: "destructive",
      });
      return;
    }

    try {
      let response = await fetch("/api/products/remove", {
        method: "POST",
        body: JSON.stringify({
          id: prod_id,
          shop_slug: slug,
        } as RemoveProductBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="odd:bg-secondary">
        {products.map((prod) => {
          return (
            <TableRow key={prod.id}>
              <TableCell>{prod.id}</TableCell>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.slug}</TableCell>
              <TableCell className="flex flex-row gap-2">
                <Link
                  href={`${path}/${prod.slug}/edit` as Route}
                  className={buttonVariants({ variant: "default" })}
                >
                  Edit
                </Link>
                <Button
                  variant={"destructive"}
                  onClick={() => removeProduct(prod.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
