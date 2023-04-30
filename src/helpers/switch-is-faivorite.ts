import { IListingCard } from '../interfaces/buy/listing-card.interface';

export function switchIsFavorite(listingCards: IListingCard[], id: string): IListingCard[] {
  return listingCards.map((listing: IListingCard) => {
    if (listing.id === id) {
      listing.isFavorite = !listing.isFavorite;
    }
    return listing;
  });
}
