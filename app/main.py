from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.routes.ai import router as ai_router
from app.routes.auth import router as auth_router

app = FastAPI(title="EduGenie")

# ==========================
# Static Files
# ==========================
app.mount("/static", StaticFiles(directory="static"), name="static")

# ==========================
# Templates
# ==========================
templates = Jinja2Templates(directory="templates")

# ==========================
# Routers
# ==========================
app.include_router(ai_router)
app.include_router(auth_router)

# =====================================================
# Home
# Redirect to Login
# =====================================================
@app.get("/")
async def root():
    return RedirectResponse(url="/login")


# =====================================================
# Dashboard
# =====================================================
@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# =====================================================
# Ask AI Page
# =====================================================
@app.get("/ask-page", response_class=HTMLResponse)
async def ask_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="ask.html"
    )


# =====================================================
# Explain Page
# =====================================================
@app.get("/explain-page", response_class=HTMLResponse)
async def explain_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="explain.html"
    )


# =====================================================
# Quiz Page
# =====================================================
@app.get("/quiz-page", response_class=HTMLResponse)
async def quiz_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="quiz.html"
    )


# =====================================================
# Summary Page
# =====================================================
@app.get("/summary-page", response_class=HTMLResponse)
async def summary_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="summary.html"
    )


# =====================================================
# Learning Roadmap Page
# =====================================================
@app.get("/learn-page", response_class=HTMLResponse)
async def learn_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="learn.html"
    )