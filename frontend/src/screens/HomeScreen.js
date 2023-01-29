import React from 'react'
import './HomeScreen.css';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

//Components
import Product from '../components/Product';

//Actions
import { getProducts as listProducts } from '../redux/actions/productActions';


const HomeScreen = () => {

    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts);
    const { products, loading, error } = getProducts;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])


    return ( 
    <div className='homescreen'> 
        <h2 className='homescreen__title'>Latest Products</h2>
        <div className='homescreen__products'>
            { loading ? (
              <div>
                <h1>Loading...</h1>
                <br/>
                <h3>This may take up to a few minutes...</h3>
                <h3>Thank you for your patience!</h3>
              </div>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                products.map((product) => (
                    <Product 
                        key={product._id} 
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.imageUrl}
                    />
                ))
            )}
        </div>
    </div>
    );
};

export default HomeScreen