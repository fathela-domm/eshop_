from django.urls import path, include
from .views.api_views import *
from rest_framework import routers
import re

IGNORABLE_404_URLS = [
    re.compile(r"^/favicon\.ico$"),
]

urlpatterns = [
    path("", wholeApi, name="whole api"),

    path("create_product/", CreateProduct.as_view(), name="create_p"),
    path("create_product_bought/", CreateProductBought.as_view(), name="create_pb"),
    path("create_promo/", CreatePromo.as_view(), name="create_promo"),
    path("create_category/", CreateCategory.as_view(), name="create_category"),
    path("create_user/", CreateUser.as_view(), name="create_user"),
    path("create_cart/", CreateViewCart.as_view(), name="create_cart"),

    path("promo/update/<str:pk>/", updateAPromotion, name="update promo api"),
    path("cart/update/<str:pk>/", updateACart, name="update_cart_api"),
    path("products/admin_update/<str:pk>/", adminDataUpdate, name="admin update products api"),
    path("products/admin_update_quantity/<str:pk>/", adminDataUpdateQuantity, name="admin update q products api"),
    path("categories/update/<str:pk>/", updateACategory, name="update category api"),
    path("users/update/<str:pk>/", updateAUser, name="update user api"),

    path("products_bought/del/<str:pk>/", del_product_bought, name="del_product_bought"),
    path("promo/del/<str:pk>/", del_promo, name="del promo api"),
    path("products/del/<str:pk>/", del_product, name="del products api"),
    path("categories/del/<str:pk>/", del_category, name="del category api"),
    path("users/del/<str:pk>/", del_users, name="del users api"),
    path("cart/del/<str:pk>/", del_cart, name="del_cart"),
] 