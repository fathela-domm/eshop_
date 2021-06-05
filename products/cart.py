from django.conf import settings 
from products.models import Product

class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID]={}
        
        self.cart = cart

    def add_product(self, product):
        product_id = str(product.id)
        if  not product_id in self.cart:
            self.cart[product_id] = {
                "name" : str(product.name),
                "image" : str(product.image),
                "quantity": 0,
                "price": str(product.price),
            }

        self.cart[product_id]["quantity"] += 1
        self.save()


    def save(self):
        self.session.modified = True


    def remove(self, product):
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()


    def __iter__(self):
        product_ids = self.cart.keys()
        product = Product.objects.filter(id_in=product_ids)