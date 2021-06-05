from django.db import models
from django.contrib.auth.models import AbstractUser
import string, random
from products import models as product_models

def item_code():
    while True:
        code = "".join(random.choices([string.printable], k=5)) 
        if code != User.objects.filter(api_key=code):
            break        
    return code

class User(AbstractUser):
    city = models.CharField(max_length=100, null=True)
    address1 = models.CharField(max_length=100, null=True)     
    address2 = models.CharField(max_length=100, null=True)     
    mobile_no = models.CharField(null=True, max_length=40)
    date_joined = models.DateTimeField(auto_now_add=True, auto_now=False, null=True)
    date_last_modified = models.DateTimeField(auto_now_add=False, auto_now=True, null=True)

    @property
    def products_bought(self):
        return product_models.ProductsBought.objects.filter(buyer=self.id).values()

    @property
    def products_receiver(self):
        return product_models.Product.objects.filter(received_by=self.id).values()

    @property
    def products_issuewer(self):
        return product_models.ProductsBought.objects.filter(issued_by=self.id).values()
        
    @property
    def users_carts(self):
        return product_models.Cart.objects.filter(user=self.id).values()


    def __str__(self):
        return self.username

    class Meta:
        ordering = ["date_joined"]
        db_table = "users_table"