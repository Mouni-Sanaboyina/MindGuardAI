from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time, logging

from routers import text, audio, image
from core.config import settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("mindguard")

app = FastAPI(title="MindGuardAI API", version="1.0.0", docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def timing_middleware(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    ms = round((time.perf_counter() - start) * 1000, 2)
    response.headers["X-Process-Time-Ms"] = str(ms)
    return response

@app.exception_handler(Exception)
async def global_error(request: Request, exc: Exception):
    logger.error(f"Error: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={"detail": str(exc)})

app.include_router(text.router,  prefix="/analyse/text",  tags=["Text"])
app.include_router(audio.router, prefix="/analyse/audio", tags=["Audio"])
app.include_router(image.router, prefix="/analyse/image", tags=["Image"])


@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}
