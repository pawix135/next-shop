import NewProductForm from "@/components/Forms/NewProduct";

interface Props {
  params: {
    slug: string;
  };
}

const NewProductPage: React.FC<Props> = ({ params: { slug } }) => {
  return (
    <main className="container mx-auto ">
      <NewProductForm />
    </main>
  );
};

export default NewProductPage;
