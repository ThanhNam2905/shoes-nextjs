import connectDB from '../../../utils/connectDB';
import { getProductDetail } from '../share/getProductDetail';


connectDB();

export default async (request, response) => {
    switch(request.method) {
        case 'GET': 
            await getProductDetail(request, response);
            break;
    }
}

