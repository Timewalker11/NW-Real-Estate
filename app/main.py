from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.database import Base, engine
from app.routers import auth, listings

ROOT_DIR = Path(__file__).resolve().parent.parent

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NW Real Estate and Mortgage")

app.include_router(auth.router)
app.include_router(listings.router)

app.mount("/css", StaticFiles(directory=ROOT_DIR / "css"), name="css")
app.mount("/js", StaticFiles(directory=ROOT_DIR / "js"), name="js")
app.mount("/images", StaticFiles(directory=ROOT_DIR / "images"), name="images")


@app.get("/")
def serve_home():
    return FileResponse(ROOT_DIR / "home.html")


@app.get("/{page_name}.html")
def serve_page(page_name: str):
    file_path = ROOT_DIR / f"{page_name}.html"
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Page not found.")
    return FileResponse(file_path)
