import SingleProduct from "@/components/SingleProduct";

export default function SingleProductPage({ params }: { params: { id: string } }) {
    return <SingleProduct productId={params.id} />;
}
