"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}
const ProductsTable: React.FC<Props> = ({ products }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="odd:bg-secondary">
        {products.map((prod) => {
          return (
            <TableRow key={prod.id}>
              <TableCell>{prod.id}</TableCell>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.slug}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
