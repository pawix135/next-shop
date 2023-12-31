"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Route } from "next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  stores: { name: string; slug: string }[];
}

const StoreSelector: React.FC<Props> = ({ stores }) => {
  let nav = useRouter();
  let { slug } = useParams<{ slug: string }>();
  let path = usePathname();

  const changeStore = (slug: string) => {
    nav.push(("/dashboard/store/" + slug) as Route);
  };

  let selectedStore = useMemo(() => {
    return slug ?? "";
  }, [slug, path]);

  return (
    <>
      <Select onValueChange={changeStore} value={selectedStore}>
        <SelectTrigger className={cn("w-[150px]")}>
          <SelectValue placeholder="Select store" />
        </SelectTrigger>
        <SelectContent>
          {stores.map((store) => {
            return (
              <SelectItem key={store.slug} value={store.slug}>
                {store.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default StoreSelector;
