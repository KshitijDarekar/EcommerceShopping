import React,{useState,useEffect} from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card.js'
import { loadCart } from './helper/cartHelper'
import Payment from './Payment'


function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

     //method to load everything into product
     useEffect(() => {
        setProducts(loadCart());
     }, [reload])

    const loadProducts=(products)=>{
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product,index)=>{
                    return (
                        <Card
                            key={index}
                            product={product}
                            removeFromCart={true}
                            addToCart={false}
                            setReload={setReload}
                            reload= {reload}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Welcome to the Cart">
            <div className="row text-center">
                <div className="col-6">
                    {products.length>0 ? loadProducts(products) : (<h3>No products in the cart</h3>) }
                </div>
                <div className="col-6">
                    <Payment products = {products} setReload={setReload}/>
                </div>
            </div>
            
        </Base>
    )
}


export default Cart
