"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import StoreSelector from "../StoreSelector";
import CreateNewStoreDialog from "../CreateNewStore";
import { Store } from "@prisma/client";
import Link from "next/link";
import { Route } from "next";

const productRoutes: { title: string; href: string; description: string }[] = [
  {
    title: "All products",
    href: "/products/",
    description: "List of all products.",
  },
  {
    title: "Create new product",
    href: "/products/new",
    description: "Create new product.",
  },
  {
    title: "All attributes",
    href: "/products/attributes",
    description: "List all created attributes.",
  },
  {
    title: "Create new attribute",
    href: "/products/attributes/new",
    description: "Create nwe attribute.",
  },
];

const orderRoutes: { title: string; href: string; description: string }[] = [
  {
    title: "All orders",
    href: "/orders/",
    description: "List of all orders.",
  },
];

interface Props {
  stores: Store[];
}
const Menu: React.FC<Props> = ({ stores }) => {
  let { slug } = useParams<{ slug: string }>();

  let url = useMemo(() => {
    return "/dashboard/store/" + slug;
  }, [slug]);

  return (
    <div className="flex flex-row gap-5">
      {stores.length === 0 && <CreateNewStoreDialog />}
      <StoreSelector stores={stores} />
      {slug && (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {productRoutes.map((route) => (
                      <NavigationMenuLink asChild key={route.title}>
                        <Link
                          href={(url + route.href) as Route}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {route.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {route.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {orderRoutes.map((route) => (
                      <NavigationMenuLink asChild key={route.title}>
                        <Link
                          href={(url + route.href) as Route}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {route.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {route.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      )}
    </div>
  );
};

export default Menu;
