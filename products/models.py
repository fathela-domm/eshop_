from django.db import models
from django.contrib.auth import get_user_model
from PIL import Image
import string, random

def item_code():
    while True:
        code = "".join(
           random.choices(string.printable, k=50)
        ).strip(string.whitespace).strip("\n")
        if code != Promotion.objects.filter(promo_code=code):
            break        
    return code


class Category(models.Model):
    category = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "categories"

User=get_user_model()
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to="products/images", default="default.png", null=True)
    name = models.CharField(max_length=100, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    quantity_in_stock = models.IntegerField(null=True)
    quantity_received = models.IntegerField(null=True, default=0, blank=True)
    reorder_level = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True, null=True, blank=False)

    received_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver", null=True)
    
    last_updated = models.DateTimeField(auto_now=True, null=True)
    date_added_to_stock = models.DateTimeField(auto_now_add=True, null=True)
    
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super().save()

    @property
    def image_url(self):
        return self.image.url

    @property
    def product_promo(self):
        return Promotion.objects.filter(product = self.id).values()

    @property
    def products_bought(self):
        return Product.objects.filter(product=self.id).values()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["last_updated"]

class Promotion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    promo_code = models.CharField(max_length=70, default=item_code, unique=True, null=True) 
    discount = models.IntegerField(null=True)
    duration = models.DurationField(null=True)

class ProductsBought(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="product_buyer", null=True)
    issued_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="product_issuer", null=True)
    quantity_to_purchase = models.IntegerField(null=True)
    quantity_issued = models.IntegerField(null=True, default=0, blank=True)
    date_ordered = models.DateTimeField(auto_now=True, null=True)
    date_issued = models.DateTimeField(auto_now=True, null=True)
    issued = models.BooleanField(default=False, null=True)

    @property
    def total_for_product(self):
        for product in Product.objects.all():
            if str(product.name) == str(self.product):
                return (product.price * self.quantity_to_purchase)

    @property
    def quantity_in_stock(self):
        for product in Product.objects.all():
            if product.name != self.product:
                return product.quantity_in_stock
                
    class Meta:
        ordering = ["date_ordered", "date_issued"]
        db_table = "another_product"

class TrendingProducts(models.Model):
    product = models.ForeignKey(ProductsBought, related_name="trending_product", on_delete=models.CASCADE, null=True)
   
    @property
    def trendingProductInfo(self):
        return ProductsBought.objects.filter().values()


class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity_to_purchase = models.IntegerField(null=True, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    @property
    def product_info(self):
        return Product.objects.filter(name=self.product).values()

    @property
    def unit_price(self):
        for product in Product.objects.all():
            if str(product.name) == str(self.product):
                return product.price
            pass

    @property
    def total_price(self):
        for product in Product.objects.all():
            if str(product.name) == str(self.product):
                return (float(product.price) * float(self.quantity_to_purchase)) 
            pass
    
    @property
    def cart_image(self):
        for product in Product.objects.all():
              if str(product.name) == str(self.product):
                return str(product.image.url)
              pass 
