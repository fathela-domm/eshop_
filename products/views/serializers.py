from rest_framework import serializers
from products.models import *
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name", "last_name", "username", "email", "mobile_no", "city","address1", "address2", "is_active"
        ]

class UserSerializerGet(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "id","first_name", "last_name","username","email", "mobile_no", "city", "address1", "address2", "is_staff",
          "is_authenticated", "is_active","products_bought", "products_receiver", "products_issuewer","users_carts" 
        ]


class PromotionSerializer(serializers.ModelSerializer):
    promo_code = serializers.CharField(read_only=True)
    product = serializers.CharField(read_only=True)

    class Meta:
        model = Promotion
        fields = "__all__"

class AdminProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id","product", "user","quantity_to_purchase","unit_price", "total_price"]


class CartSerializerReadOnly(serializers.ModelSerializer):
    product = serializers.CharField(read_only=True)
    class Meta:
        model = Cart
        fields = ["id","product", "quantity_to_purchase","unit_price", "user","total_price", "cart_image","product_info"]


class TrendingProductsSerialier(serializers.ModelSerializer):
    class Meta:
        model = TrendingProducts
        fields = ["id", "product", "trendingProductInfo"]      

class ProductSerializerGet(serializers.ModelSerializer):
    image_url = serializers.CharField()
    last_updated = serializers.DateTimeField(read_only=True)
    date_added_to_stock = serializers.DateTimeField(read_only=True)
    date_ordered = serializers.DateTimeField(read_only=True)
    category = serializers.CharField(read_only=True)
    received_by = serializers.CharField(read_only=True)
    issued_by = serializers.CharField(read_only=True)
    buyer = serializers.CharField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductsBoughtSerializer(serializers.ModelSerializer):
    date_ordered = serializers.DateTimeField(read_only=True)
    date_issued = serializers.DateTimeField(read_only=True)
    total_for_product = serializers.IntegerField(read_only=True)
    quantity_in_stock = serializers.IntegerField(read_only=True)
    class Meta:
        model = ProductsBought
        fields = "__all__"

class ProductsBoughtSerializerGet(serializers.ModelSerializer):
    buyer = serializers.CharField(read_only=True)
    issued_by = serializers.CharField(read_only=True)
    product = serializers.CharField(read_only=True)
    date_ordered = serializers.DateTimeField(read_only=True)
    date_issued = serializers.DateTimeField(read_only=True)
    total_for_product = serializers.IntegerField(read_only=True)
    quantity_in_stock = serializers.IntegerField(read_only=True)
    class Meta:
        model = ProductsBought
        fields = "__all__"