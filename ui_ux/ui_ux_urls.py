from django.urls import path, include
from ui_ux.views.admin_dashboard.admin_view import (
    chart, tables, index, update_product, update_user, add_users, add_products, add_promo,add_categories,update_category,
    add_products_bought, update_products_bought, issue_products, receive_products,
    del_categories, del_product_bought, del_users, del_categories, del_products, del_promo
)

urlpatterns = [
    path("", include("ui_ux.views.eshop_ui.eshop_urls")),
    
    path("admin/", index, name="admin_dashboard"),
    path("tables/", tables, name="tables"),
    path("chart/", chart, name="charts"),

    path("update_products/<str:pk>", update_product, name="update_pdct"),
    path("update_users/<str:pk>", update_user, name="update_pdct"),
    path("update_category/<str:pk>", update_category, name="update_category"),
    path("update_ordered/<str:pk>", update_products_bought, name="update_products_bought"),
    path("issue_products/<str:pk>", issue_products, name="issue_products"),
    path("receive_products/<str:pk>", receive_products, name="receive_products"),

    path("del_products/<str:pk>", del_products, name="del_products"),
    path("del_categories/<str:pk>", del_categories, name="del_categories"),
    path("del_product_bought/<str:pk>", del_product_bought, name="del_product_bought"),
    path("del_users/<str:pk>", del_users, name="del_users"),
    path("del_promo/<str:pk>", del_promo, name="del_promo"),

    path("add_category/", add_categories, name="add_categories"),
    path("add_products/", add_products, name="add_products"),
    path("add_promo/", add_promo, name="add_promo"),
    path("add_users/", add_users, name="add_users"),
    path("add_ordered/", add_products_bought, name="add_products_bought"),
]