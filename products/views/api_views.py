from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes
)
from .serializers import (
    PromotionSerializer, 
    UserSerializer,
    CategorySerializer,
    ProductSerializerGet,
    AdminProductSerializer,
    ProductsBoughtSerializerGet,
    ProductsBoughtSerializer,
    UserSerializerGet,
    TrendingProductsSerialier,
    CartSerializer,
    CartSerializerReadOnly,
)
from products.models import (
    Product,
    Promotion,
    Category,
    ProductsBought,
    TrendingProducts,
    Cart,
)
from users.models import User

class CreateViewCart(viewsets.generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer
    queryset = Cart.objects.all()

class CreateProduct(viewsets.generics.ListCreateAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = AdminProductSerializer

class CreateProductBought(viewsets.generics.ListCreateAPIView):
    queryset = ProductsBought.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductsBoughtSerializer

class CreatePromo(viewsets.generics.ListCreateAPIView):
    queryset = Promotion.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = PromotionSerializer

class CreateCategory(viewsets.generics.ListCreateAPIView):
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = CategorySerializer

class CreateUser(viewsets.generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = UserSerializer


""" Deleting data from the api """

@api_view(["GET"])
def wholeApi(request):
    user = User.objects.all()
    user_serializer = UserSerializerGet(user, many=True)

    product = Product.objects.all()
    product_serializer = ProductSerializerGet(product, many=True)

    promo = Promotion.objects.all()
    promo_serializer = PromotionSerializer(promo, many=True)

    category = Category.objects.all()
    category_serializer = CategorySerializer(category, many=True)

    product_bought = ProductsBought.objects.all()
    product_bought_serializer = ProductsBoughtSerializerGet(product_bought, many=True)

    cart = Cart.objects.all()
    cart_serializer = CartSerializerReadOnly(cart, many=True)

    context = {
        "users" : user_serializer.data,
        "products": product_serializer.data,
        "products_bought": product_bought_serializer.data,
        "promo" : promo_serializer.data,
        "carts": cart_serializer.data,
        "categories" : category_serializer.data,
    }

    return Response(
        context
    )

@api_view(["DELETE"])
def del_users(request, pk):
    if request.user.is_staff:
        user = User.objects.get(id=pk)
        if request.method == "DELETE":
            user.delete()

        serializer = UserSerializerGet(
                user, many=False
                )
        if serializer.data:
            return Response(
               serializer.data
            )
        else:
            return Response(
                "successfully deleted"
                )
    
    else:
        context = {
            "details": "AUTH details not provided.",            
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["DELETE"])
def del_product(request, pk):
    if request.user.is_staff:
        product = Product.objects.get(id=pk)
        if request.method == "DELETE":
            product.delete()

        serializer = AdminProductSerializer(
                product, many=False
                )
        if serializer.data:
            return Response(
               serializer.data
            )
        else:
            return Response(
                "successfully deleted"
                )
    
    else:
        context = {
            "details": "AUTH details not provided.",            
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["DELETE"])
def del_cart(request, pk):
    cart = Cart.objects.get(id=pk)
    if request.method == "DELETE":
        cart.delete()

    serializer = CartSerializer(
            cart, many=False
            )
    if serializer.data:
        return Response(
            serializer.data
        )
    else:
        return Response(
            "successfully deleted"
            )


@api_view(["DELETE"])
def del_promo(request, pk):
    if request.user.is_staff:
        promo = Promotion.objects.get(id=pk)
        if request.method == "DELETE":
            promo.delete()

        serializer = PromotionSerializer(
                promo, many=False
                )
        if serializer.data:
            return Response(
               serializer.data
            )
        else:
            return Response(
                "successfully deleted"
                )
    
    else:
        context = {
            "details": "AUTH details not provided.",            
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["DELETE"])
def del_category(request, pk):
    if request.user.is_staff:
        category = Category.objects.get(id=pk)
        if request.method == "DELETE":
            category.delete()

        serializer = CategorySerializer(
                category, many=False
                )
        if serializer.data:
            return Response(
               serializer.data
            )
        else:
            return Response(
                "successfully deleted"
                )
    
    else:
        context = {
            "details": "AUTH details not provided.",            
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )


@api_view(["DELETE"])
def del_product_bought(request, pk):
    if request.user.is_staff:
        product = ProductsBought.objects.get(id=pk)
        if request.method == "DELETE":
            product.delete()

        serializer = ProductsBoughtSerializer(
                product, many=False
                )
        if serializer.data:
            return Response(
               serializer.data
            )
        else:
            return Response(
                "successfully deleted"
                )
    
    else:
        context = {
            "details": "AUTH details not provided.",            
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )



""" Updating data """
@api_view(["PUT", "POST", "PATCH", "GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def updateACategory(request, pk):
    if request.user.is_staff:
        category = Category.objects.get(id=pk)
        serializer = CategorySerializer
        if request.method == "PUT":
            serializer = CategorySerializer(
                    instance=category, data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = CategorySerializer(
                    category, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["POST", "POST", "PUT" ,"GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def updateAProduct(request, pk):
    if request.user.is_staff:
        product = get_object_or_404(Product, id=pk)
        if request.method == "POST":
            serializer = AdminProductSerializer(
                product, data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = AdminProductSerializer(
                product, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["POST", "POST", "PUT" ,"GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def adminDataUpdate(request, pk):
    if request.user.is_staff:
        product = get_object_or_404(Product, id=pk)
        serializer = AdminProductSerializer
        if request.method == "POST":
            serializer = AdminProductSerializer(
               product,data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = ProductSerializerGet(
                product, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["POST", "PATCH", "PUT" ,"GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def adminDataUpdateQuantity(request, pk):
    if request.user.is_staff:
        product = get_object_or_404(Product, id=pk)
        serializer = AdminProductSerializer
        if request.method != "GET":
            serializer = AdminProductSerializer(
                instance=product, data=request.data, 
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = AdminProductSerializer(
                product, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["PUT", "POST", "PATCH", "GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def updateAPromotion(request, pk):
    if request.user.is_staff:
        promotion = Promotion.objects.get(id=pk)
        serializer = PromotionSerializer
        if request.method == "PUT":
            serializer = PromotionSerializer(
                    instance=promotion, data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = PromotionSerializer(
                    promotion, many=False
            )  
        return Response(
            serializer.data
        )


    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )

@api_view(["PUT", "POST", "PATCH", "GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def updateAUser(request, pk):
    if request.user.is_staff:
        user = User.objects.get(id=pk)
        serializer = UserSerializer
        if request.method != "GET":
            serializer = UserSerializer(
                user, data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = UserSerializer(
                    user, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )


@api_view(["POST", "PATCH", "PUT" ,"GET"])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def updateAProductBought(request, pk):
    if request.user.is_staff:
        product = get_object_or_404(ProductsBought, id=pk)
        if request.method == "POST":
            serializer = ProductsBoughtSerializer(
                product, data=request.data
            )    
            if serializer.is_valid():
                serializer.save()
           
        elif request.method == "GET":
            serializer = ProductsBoughtSerializerGet(
                product, many=False
            )  
        return Response(
            serializer.data
        )

    else:
        context = {
            "details": "AUTH details not provided",        
            "help text": "Please login as superuser to access the api.",
        }
        return Response(
            context
        )


@api_view(["PATCH","GET"])
def updateACart(request, pk):
    cart = get_object_or_404(Cart, id=pk)
    if request.method == "PATCH":
        serializer = CartSerializer(
            cart, data=request.data
        )    
        if serializer.is_valid():
            serializer.save()
        
    elif request.method == "GET":
        serializer = CartSerializerReadOnly(
            cart, many=False
        )  
    return Response(
        serializer.data
    )