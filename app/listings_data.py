# NW Real Estate and Mortgage — sample property listings
# Static sample data for demonstration until this is connected to a licensed MLS/IDX feed.

RAW_LISTINGS = [
    {"mls": "NWR-10234", "address": "142 Maple Street", "city": "Rivergrove", "zip": "98201", "price": 425000, "beds": 3, "baths": 2, "sqft": 1620, "yearBuilt": 1998, "lotSize": "0.18 acres", "garage": "2-car attached", "listedDate": "2026-05-12"},
    {"mls": "NWR-10891", "address": "88 Cedar Avenue", "city": "Fairview Heights", "zip": "98332", "price": 389000, "beds": 3, "baths": 2, "sqft": 1480, "yearBuilt": 2004, "lotSize": "0.15 acres", "garage": "2-car attached", "listedDate": "2026-05-18"},
    {"mls": "NWR-11045", "address": "2210 Harborview Drive", "city": "Lakeside", "zip": "98115", "price": 610000, "beds": 4, "baths": 3, "sqft": 2340, "yearBuilt": 2012, "lotSize": "0.22 acres", "garage": "2-car attached", "listedDate": "2026-04-30"},
    {"mls": "NWR-11302", "address": "76 Brookhaven Lane", "city": "Cedar Falls", "zip": "98290", "price": 349900, "beds": 2, "baths": 1, "sqft": 1120, "yearBuilt": 1985, "lotSize": "0.12 acres", "garage": "1-car attached", "listedDate": "2026-06-02"},
    {"mls": "NWR-11458", "address": "514 Elm Crossing Road", "city": "Maple Hollow", "zip": "98056", "price": 475000, "beds": 3, "baths": 2, "sqft": 1780, "yearBuilt": 2001, "lotSize": "0.19 acres", "garage": "2-car attached", "listedDate": "2026-05-22"},
    {"mls": "NWR-11579", "address": "19 Willow Court", "city": "Rivergrove", "zip": "98203", "price": 519000, "beds": 4, "baths": 2, "sqft": 2020, "yearBuilt": 2007, "lotSize": "0.21 acres", "garage": "2-car attached", "listedDate": "2026-05-05"},
    {"mls": "NWR-11683", "address": "365 Sunset Ridge", "city": "Bridgeport", "zip": "98374", "price": 299500, "beds": 2, "baths": 1, "sqft": 980, "yearBuilt": 1978, "lotSize": "0.10 acres", "garage": "Carport", "listedDate": "2026-06-10"},
    {"mls": "NWR-11724", "address": "4021 Aspen Way", "city": "Fairview Heights", "zip": "98338", "price": 555000, "beds": 4, "baths": 3, "sqft": 2260, "yearBuilt": 2015, "lotSize": "0.24 acres", "garage": "3-car attached", "listedDate": "2026-04-21"},
    {"mls": "NWR-11809", "address": "58 Pinecrest Circle", "city": "Lakeside", "zip": "98119", "price": 720000, "beds": 5, "baths": 3, "sqft": 2890, "yearBuilt": 2018, "lotSize": "0.27 acres", "garage": "3-car attached", "listedDate": "2026-04-14"},
    {"mls": "NWR-11876", "address": "900 Meadowbrook Ave", "city": "Cedar Falls", "zip": "98275", "price": 410000, "beds": 3, "baths": 2, "sqft": 1590, "yearBuilt": 1995, "lotSize": "0.17 acres", "garage": "2-car attached", "listedDate": "2026-05-29"},
    {"mls": "NWR-11930", "address": "27 Orchard Street", "city": "Maple Hollow", "zip": "98052", "price": 465000, "beds": 3, "baths": 2, "sqft": 1710, "yearBuilt": 2000, "lotSize": "0.16 acres", "garage": "2-car attached", "listedDate": "2026-05-16"},
    {"mls": "NWR-12004", "address": "1188 Timber Ridge Road", "city": "Bridgeport", "zip": "98391", "price": 335000, "beds": 2, "baths": 2, "sqft": 1240, "yearBuilt": 1990, "lotSize": "0.13 acres", "garage": "1-car attached", "listedDate": "2026-06-06"},
    {"mls": "NWR-12071", "address": "63 Hillcrest Drive", "city": "Rivergrove", "zip": "98204", "price": 495000, "beds": 3, "baths": 2, "sqft": 1860, "yearBuilt": 2005, "lotSize": "0.20 acres", "garage": "2-car attached", "listedDate": "2026-05-09"},
    {"mls": "NWR-12138", "address": "742 Foxglove Lane", "city": "Fairview Heights", "zip": "98327", "price": 379000, "beds": 3, "baths": 1, "sqft": 1350, "yearBuilt": 1988, "lotSize": "0.14 acres", "garage": "1-car attached", "listedDate": "2026-05-25"},
    {"mls": "NWR-12205", "address": "15 Lighthouse Point", "city": "Lakeside", "zip": "98107", "price": 845000, "beds": 5, "baths": 4, "sqft": 3120, "yearBuilt": 2020, "lotSize": "0.31 acres", "garage": "3-car attached", "listedDate": "2026-04-08"},
    {"mls": "NWR-12279", "address": "308 Cascade Court", "city": "Cedar Falls", "zip": "98284", "price": 429900, "beds": 3, "baths": 2, "sqft": 1640, "yearBuilt": 1999, "lotSize": "0.18 acres", "garage": "2-car attached", "listedDate": "2026-05-31"},
    {"mls": "NWR-12341", "address": "92 Birchwood Terrace", "city": "Maple Hollow", "zip": "98059", "price": 512000, "beds": 4, "baths": 2, "sqft": 1980, "yearBuilt": 2009, "lotSize": "0.20 acres", "garage": "2-car attached", "listedDate": "2026-05-02"},
    {"mls": "NWR-12406", "address": "441 Harvest Moon Drive", "city": "Bridgeport", "zip": "98387", "price": 289000, "beds": 2, "baths": 1, "sqft": 940, "yearBuilt": 1975, "lotSize": "0.09 acres", "garage": "Carport", "listedDate": "2026-06-13"},
    {"mls": "NWR-12470", "address": "77 Stonebridge Way", "city": "Rivergrove", "zip": "98208", "price": 449500, "beds": 3, "baths": 2, "sqft": 1700, "yearBuilt": 2002, "lotSize": "0.17 acres", "garage": "2-car attached", "listedDate": "2026-05-14"},
    {"mls": "NWR-12538", "address": "2601 Windsong Avenue", "city": "Fairview Heights", "zip": "98354", "price": 599000, "beds": 4, "baths": 3, "sqft": 2410, "yearBuilt": 2016, "lotSize": "0.25 acres", "garage": "3-car attached", "listedDate": "2026-04-25"},
    {"mls": "NWR-12602", "address": "13 Driftwood Lane", "city": "Lakeside", "zip": "98177", "price": 675000, "beds": 4, "baths": 3, "sqft": 2560, "yearBuilt": 2013, "lotSize": "0.23 acres", "garage": "2-car attached", "listedDate": "2026-04-18"},
    {"mls": "NWR-12669", "address": "860 Copperfield Road", "city": "Cedar Falls", "zip": "98296", "price": 359900, "beds": 3, "baths": 2, "sqft": 1460, "yearBuilt": 1993, "lotSize": "0.15 acres", "garage": "2-car attached", "listedDate": "2026-06-01"},
    {"mls": "NWR-12735", "address": "45 Sagebrush Circle", "city": "Maple Hollow", "zip": "98065", "price": 489000, "beds": 3, "baths": 2, "sqft": 1820, "yearBuilt": 2006, "lotSize": "0.19 acres", "garage": "2-car attached", "listedDate": "2026-05-07"},
    {"mls": "NWR-12801", "address": "221 Whitfield Street", "city": "Bridgeport", "zip": "98398", "price": 314500, "beds": 2, "baths": 2, "sqft": 1180, "yearBuilt": 1992, "lotSize": "0.12 acres", "garage": "1-car attached", "listedDate": "2026-06-08"},
    {"mls": "NWR-12866", "address": "9 Millstone Place", "city": "Rivergrove", "zip": "98223", "price": 539000, "beds": 4, "baths": 3, "sqft": 2140, "yearBuilt": 2011, "lotSize": "0.21 acres", "garage": "2-car attached", "listedDate": "2026-04-27"},
    {"mls": "NWR-12930", "address": "378 Golden Meadow Drive", "city": "Fairview Heights", "zip": "98371", "price": 402000, "beds": 3, "baths": 2, "sqft": 1560, "yearBuilt": 1997, "lotSize": "0.16 acres", "garage": "2-car attached", "listedDate": "2026-05-20"},
]

IMAGE_COUNT = 6
SUMMARY_FIELDS = ["mls", "address", "city", "zip", "price", "beds", "baths", "sqft", "image"]


def _build_listing(raw, index):
    listing = dict(raw)
    listing["image"] = f"images/listings/house-{(index % IMAGE_COUNT) + 1}.svg"
    listing["description"] = (
        f"A {listing['beds']}-bedroom, {listing['baths']}-bathroom home in {listing['city']}, "
        f"built in {listing['yearBuilt']} with {listing['sqft']:,} square feet of living space "
        f"on a {listing['lotSize']} lot. Sample listing for demonstration purposes."
    )
    return listing


LISTINGS = [_build_listing(raw, i) for i, raw in enumerate(RAW_LISTINGS)]


def _to_summary(listing):
    return {field: listing[field] for field in SUMMARY_FIELDS}


def search(query: str | None):
    q = (query or "").strip().lower()
    if q:
        results = [
            listing for listing in LISTINGS
            if q in listing["zip"].lower() or q in listing["city"].lower() or q in listing["mls"].lower()
        ]
    else:
        results = list(LISTINGS)
    return [_to_summary(listing) for listing in results]


def find_by_mls(mls: str):
    target = (mls or "").strip().lower()
    for listing in LISTINGS:
        if listing["mls"].lower() == target:
            return listing
    return None
