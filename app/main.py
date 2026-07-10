from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, text

from app.database import Base, engine
from app.routers import auth, contact, listings

ROOT_DIR = Path(__file__).resolve().parent.parent

Base.metadata.create_all(bind=engine)

_existing_columns = {col["name"] for col in inspect(engine).get_columns("users")}
if "referral_source" not in _existing_columns:
    with engine.begin() as conn:
        conn.execute(text("ALTER TABLE users ADD COLUMN referral_source VARCHAR(120)"))

app = FastAPI(title="NW Real Estate and Mortgage")

app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(listings.router)

app.mount("/css", StaticFiles(directory=ROOT_DIR / "css"), name="css")
app.mount("/js", StaticFiles(directory=ROOT_DIR / "js"), name="js")
app.mount("/images", StaticFiles(directory=ROOT_DIR / "images"), name="images")
app.mount("/files", StaticFiles(directory=ROOT_DIR / "files"), name="files")


@app.get("/")
def serve_home():
    return FileResponse(ROOT_DIR / "home.html")


@app.get("/{page_name}.html")
def serve_page(page_name: str):
    file_path = ROOT_DIR / f"{page_name}.html"
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Page not found.")
    return FileResponse(file_path)
