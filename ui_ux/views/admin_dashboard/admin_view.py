from django.shortcuts import render
from users.models import User
from .forms import *
from products.models import Product, Category, ProductsBought
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    if request.user.is_staff: 
        users = User.objects.all()
        product = Product.objects.all()
        context = {
            "users" : users,
            "products": product,
        }
            
        return render(
            request, "admin_templates/ui_ux/dashboard.html", context
        )

    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def chart(request):
    if request.user.is_staff:
        return render(
            request, "admin_templates/ui_ux/charts.html", {}
        )
    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def tables(request):
    if request.user.is_staff:
        products_bought = ProductsBought.objects.all()
        queryset = Product.objects.all()
        form = ProductsForm
        return render(
            request, "admin_templates/ui_ux/tables.html", {"queryset": queryset, "form":form, "title": "Tables"}
        )
    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


USERS_HTTP_REDIRECT = "/tables/?users=1"
PRODUCTS_HTTP_REDIRECT = "/tables/?page=1"

@login_required
def update_product(request, pk):
    queryset = Product.objects.get(id=pk)
    form = ProductsForm(instance=queryset)
    if request.method == "POST":
        form = ProductsForm(request.POST, request.FILES, instance=queryset)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle":"Products", "title": "Update Product "+queryset.name}
    )

@login_required
def update_user(request, pk):
    queryset = User.objects.get(id=pk)
    form = UserUpdateForm(instance=queryset)
    if request.method == "POST":
        form = UserUpdateForm(request.POST, request.FILES, instance=queryset)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(USERS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Users", "title":"Update User "+ queryset.username}
    )

@login_required
def add_users(request):
    if request.user.is_staff:
        queryset = User.objects.all()
        form = UserUpdateForm
        if request.method == "POST":
            form = UserUpdateForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(USERS_HTTP_REDIRECT)
        return render(
            request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Users", "title":"User Registration"}
        )
    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def add_products(request):
    if request.user.is_staff:
        queryset = Product.objects.all()
        form = ProductsForm
        if request.method == "POST":
            form = ProductsForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
        return render(
            request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Product", "title":"Product registration"}
        )

    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def add_promo(request):
    if request.user.is_staff:
        queryset = Promotion.objects.all()
        form = PromoForm
        if request.method == "POST":
            form = PromoForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
        return render(
            request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Promo", "title":"Product Promotion And registration"}
        )

    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def add_categories(request):
    if request.user.is_staff:
        queryset = Category.objects.all()
        form = CategoryForm
        if request.method == "POST":
            form = CategoryForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
        return render(
            request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Category", "title":"Category Registration"}
        )
    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def update_category(request, pk):
    queryset = Category.objects.get(id=pk)
    form = CategoryForm(instance=queryset)
    if request.method == "POST":
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Category", "title":"Category Update"}
    )

@login_required
def add_products_bought(request):
    if request.user.is_staff:
        queryset = ProductsBought.objects.all()
        form = ProductsBoughtForm
        if request.method == "POST":
            form = ProductsForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(USERS_HTTP_REDIRECT)
        return render(
            request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Products' Ordered", "title":"Product Ordered Registration"}
        )

    
    else:
        return HttpResponse("<h1><b style='margin: auto; color: red;'>You are not authenticated to access this page!!</b></h1>")


@login_required
def update_products_bought(request, pk):
    queryset = ProductsBought.objects.get(id=pk)
    form = ProductsBoughtForm(instance=queryset)
    if request.method == "POST":
        form = ProductsBoughtForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(USERS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Products' Ordered", "title":"Product Ordered Registration"}
    )

@login_required
def receive_products(request, pk):
    queryset = Product.objects.get(id=pk)
    form = ReceiveProductsForm(instance=queryset)
    if request.method == "POST":
        form = ReceiveProductsForm(request.POST,instance=queryset)
        if form.is_valid():
            quantity_received = request.POST.get("quantity_received")
            queryset.quantity_in_stock += int(quantity_received)
            queryset.save()
            form.save()
            return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Receive Product", "title":"Products' To Received Registration"}
    )

@login_required
def issue_products(request, pk):
    queryset = ProductsBought.objects.get(id=pk)
    form = IssueProductsForm(instance=queryset)
    if request.method == "POST":
        form = IssueProductsForm(request.POST,instance=queryset)
        if form.is_valid():
            quantity_issued = request.POST.get("quantity_issued")

            product_queryset = Product.objects.all()
            for item in product_queryset:
                if str(queryset.product) ==str(item.name):
                    item.quantity_in_stock -= int(quantity_issued)
                    print(item.quantity_in_stock)
                    queryset.issued = True
                    queryset.save()
                    product_queryset.update()

            form.save()
            return HttpResponseRedirect(USERS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/update_data.html", {"queryset": queryset, "form":form, "subtitle": "Issue Product", "title":"Products' To Issue Registration"}
    )

@login_required
def del_products(request, pk):
    queryset = Product.objects.get(id=pk)
    if request.method == "POST":
        queryset.delete()
        return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/delete_data.html", {
            "subtitle": "Delete "+ str(queryset.name), 
            "title": "Product To Delete "+ str(queryset.name), 
        }
    )

@login_required
def del_promo(request, pk):
    queryset = Promotion.objects.get(id=pk)
    if request.method == "POST":
        queryset.delete()
        return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/delete_data.html", {
            "subtitle": "Delete "+ str(queryset.product), 
            "title": "Product To Delete "+ str(queryset.product), 
        }
    )

@login_required
def del_categories(request, pk):
    queryset = Category.objects.get(id=pk)
    if request.method == "POST":
        queryset.delete()
        return HttpResponseRedirect(PRODUCTS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/delete_data.html", {
            "subtitle": "Delete "+ str(queryset.category), 
            "title": "Category To Delete "+ str(queryset.category), 
        }
    )

@login_required
def del_users(request, pk):
    queryset = User.objects.get(id=pk)
    if request.method == "POST":
        queryset.delete()
        return HttpResponseRedirect(USERS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/delete_data.html", {
            "subtitle": "Delete "+ str(queryset.username), 
            "title": "User To Delete "+ str(queryset.username), 
        }
    )

@login_required
def del_product_bought(request, pk):
    queryset = ProductsBought.objects.get(id=pk)
    if request.method == "POST":
        queryset.delete()
        return HttpResponseRedirect(USERS_HTTP_REDIRECT)
    return render(
        request, "admin_templates/ui_ux/tables/delete_data.html", {
            "subtitle": "Delete "+ str(queryset.product), 
            "title": "Product bought To Delete "+ str(queryset.product), 
        }
    )

