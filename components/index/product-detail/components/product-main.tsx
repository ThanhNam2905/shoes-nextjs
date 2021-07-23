import ProductImage from "./product-image";
import ProductInfo from "./product-info";

type PropsType = {
    product: any
}

export default function ProductMain({ product }: PropsType) {

    return (
        <>
            <div className="grid grid-cols-10 gap-4 relative px-20 pt-6 pb-20">
                {/* Product Image */}
                <div className="col-span-4">
                    <ProductImage product={product}/>
                </div>
                
                    
                {/* Product Info */}
                <div className="col-span-6">
                    <ProductInfo product={product}/>
                </div>
            </div>
        </>
    )
}