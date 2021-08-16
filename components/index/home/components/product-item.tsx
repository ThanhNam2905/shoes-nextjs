import Link from "next/link";

export default function ProductItem(props) {
    const { product } = props;
    const priceSale = product.price*(100 - product.discount)/100;

    return (
        <>
            <Link href={`/product/${product._id}`}>
                <a className="text-14 relative border border-gray-300 hover:border-blue-400 rounded-md overflow-hidden pt-1 pb-2">
                    {
                        product.tagProduct?.includes("New") &&
                            <div className="tag-new absolute z-10 top-3 left-2 w-16">New</div>
                    }
                    
                    { 
                        product.tagProduct?.includes("Sale") &&
                            <div className="tag-sale absolute z-10 top-2 right-2 w-10 ">
                            <p className="text-14 flex items-center justify-center mb-0">{product.discount}%</p>
                        </div>
                    }
                    
                    <div className="overflow-hidden">
                        <img src={product.images[0].url} alt={product.images[0].url}
                            className="object-cover w-full max-w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />  
                    </div>
                    <div className="px-4 pb-4 text-center">
                        <h4 className="mt-3 mb-1 text-20 truncate" title={product.name}>{product.name}</h4>
                        <p className="text-13 text-gray-600 mb-0"># {product.code}</p>
                        {
                            product.discount > 0 ? (
                                <div>
                                    <p className="mt-1 mb-0 text-gray-800 font-semibold">Sale Price: <span className="text-red-500 text-18 font-medium">{new Intl.NumberFormat().format(priceSale)} đ</span></p>
                                    <p className="mt-1 mb-0 text-gray-800 font-semibold">Price: <span className="text-16 font-medium line-through">{new Intl.NumberFormat().format(product.price)} đ</span></p>
                                </div>
                               
                            ) : (
                                <p className="mt-1 text-gray-800 font-semibold">Price: <span className="text-blue-500 text-18 font-medium">{new Intl.NumberFormat().format(product.price)} đ</span></p>
                            )
                        }   
                    </div>
        
                </a>
            </Link>
        </>
    )
}