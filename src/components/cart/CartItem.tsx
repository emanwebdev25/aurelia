"use client";

import type { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

type CartItemProps = {
    item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
   

  const product = products.find(
    (product) => product.id === item.productId
  );

  const maxStock = product?.stock || 1;
    return (
        <article className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
                <p className="product-category">Aurelia Collection</p>
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p className="cart-item-price">
                    PKR {item.price.toLocaleString()}
                </p>

                <div className="cart-item-actions">
                    <div className="quantity-control">
                        <button
                            type="button"
                            onClick={() =>
                                updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.quantity - 1
                                )
                            }
                            disabled={item.quantity === 1}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            type="button"
                            onClick={() =>
                                updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.quantity + 1
                                )
                            }
                            disabled={item.quantity >= maxStock}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                            removeFromCart(item.productId, item.size)
                        }
                    >
                        Remove
                    </button>
                </div>
            </div>
        </article>
    );
}