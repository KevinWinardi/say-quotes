import { useContext } from "react";
import { OpacityCardContext } from "../contexts/OpacityCardContext";

export default function QuoteCard({ quote, author }) {
    const { opacityCard } = useContext(OpacityCardContext);

    // Ensure tailwind build all class opacity by hard code
    const _ = [
        'bg-primary/0', 'bg-primary/10', 'bg-primary/20',
        'bg-primary/30', 'bg-primary/40', 'bg-primary/50',
        'bg-primary/60', 'bg-primary/70', 'bg-primary/80',
        'bg-primary/90', 'bg-primary/100',
    ]

    return (
        <div className={`card bg-primary/${opacityCard} text-primary-content w-4/5 sm:w-96`}>
            <div className="card-body">
                <h2 className="card-title">{quote}</h2>
                <p className="mt-2 text-right italic">~ {author}</p>
            </div>
        </div>
    );
}