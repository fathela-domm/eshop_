from django.urls import path
from .eshop_views import *

urlpatterns = [
     path("", homePage, name="homePage"),
     path("checkout/<str:pk>/", checkOut, name="checkOut"),
     path("shopGrid/", shopGrid, name="shopGrid"),
     path("cart/", cart, name="cart"),
     path("contact/", contact, name="contact"),
]