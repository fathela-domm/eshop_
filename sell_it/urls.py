from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/", include("products.urls")),
    path("accounts/", include("users.urls")),
    path("", include("ui_ux.ui_ux_urls")),
]

urlpatterns += static(settings.MEDIA_URL ,document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL ,document_root=settings.STATIC_ROOT)