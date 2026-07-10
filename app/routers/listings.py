from fastapi import APIRouter, HTTPException

from app import listings_data

router = APIRouter(prefix="/api/listings", tags=["listings"])


@router.get("")
def get_listings(q: str | None = None):
    return {"listings": listings_data.search(q)}


@router.get("/{mls}")
def get_listing(mls: str):
    listing = listings_data.find_by_mls(mls)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found.")
    return {"listing": listing}
