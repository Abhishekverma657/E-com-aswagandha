import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ id, title, price, image }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <Link to={`/product/${id}`} className="w-full relative overflow-hidden aspect-[4/5] bg-white mb-4 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-primary/30">
            <ShoppingBag className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-secondary text-primary font-bold py-3 px-6 uppercase text-sm tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </span>
        </div>
      </Link>
      <Link to={`/product/${id}`}>
        <h3 className="font-serif text-lg text-primary hover:text-accent transition-colors">{title}</h3>
      </Link>
      <p className="text-accent font-medium mt-2">Rs. {price.toFixed(2)}</p>
    </div>
  );
}
