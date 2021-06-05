from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from products.models import *
from products.cart import *
from django.contrib.auth.decorators import login_required
from users.views import UserProfileUpdateForm
from users.models import User

CONTEXT = {
    "categories" :  Category.objects.all(),
    "promo" : Promotion.objects.all(),
    "products" : Product.objects.all(),
    "products_bought" : ProductsBought.objects.all(),
}


@login_required
def homePage(request):
    return render(request, "eshop_ui/ui_ux/index.html", CONTEXT)

@login_required
def checkOut(request, pk):
    queryset = get_object_or_404(User, id=pk)
    form = UserProfileUpdateForm(instance=queryset)
    if request.method == "POST":
        form = UserProfileUpdateForm(request.POST, request.FILES,instance=queryset)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(str(settings.LOGIN_REDIRECT_URL))
   
    return render(request, "eshop_ui/ui_ux/checkout.html", {"form": form})

@login_required
def shopGrid(request):
    return render(request, "eshop_ui/ui_ux/shop-grid.html", CONTEXT)

@login_required
def contact(request):
    return render(request, "eshop_ui/ui_ux/contact.html", {})

@login_required
def cart(request):
    return render(request, "eshop_ui/ui_ux/cart.html", {})
