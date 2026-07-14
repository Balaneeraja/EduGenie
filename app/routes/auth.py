from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="templates")


# ==========================
# Login Page
# ==========================
@router.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="login.html"
    )


# ==========================
# Signup Page
# ==========================
@router.get("/signup", response_class=HTMLResponse)
async def signup(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="signup.html"
    )