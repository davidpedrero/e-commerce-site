import React from 'react';
import './ProductScreen.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

//Actions
import { getProductDetails } from '../redux/actions/productActions'; 
import { AddToCart } from '../redux/actions/cartActions';

const ProductScreen = () => {

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    let params = useParams();
    let navigate = useNavigate();

    const productDetails = useSelector(state => state.getProductDetails);
    const {loading, error, product} = productDetails;
    
    useEffect(() => {
        if(product && params.id !== product._id) {
            dispatch(getProductDetails(params.id))
        }
    }, [dispatch, product, params]);

    const addToCartHandler = () => {
        dispatch(AddToCart(product._id, qty));

        navigate("/cart")
    }

    return (
        <div className='productscreen'>
            {loading ? (
                <h2>Loading...</h2> 
            ): error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <div className='productscreen__left'>
                        <div className='left__image'>
                            <img src={product.imageUrl} alt={product.name}></img>
                        </div>

                        <div className="left__info">
                            <p className="left__name">{product.name}</p>
                            <p>Price: ${product.price} </p>
                            <p> {product.description} </p>
                        </div>
                    </div>
                    <div className='productscreen__right'>
                        <div className='right__info'>
                            <p>
                                Price: <span>${product.price}</span>
                            </p>
                            <p>
                                Status:{""}
                                <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
                            </p>
                            <p>
                                Qty
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type='button' onClick={addToCartHandler}>Add to Cart</button>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductScreen;