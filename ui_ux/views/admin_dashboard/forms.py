from products.models import Product, Category, ProductsBought, Promotion
from django import forms
from django.forms import ValidationError
from users.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class ProductsForm(forms.ModelForm):
    name = forms.CharField(label="Name:", widget=forms.TextInput(
        attrs={
            "placeholder" : "product name",
            "class" : "form-control form-group form",
        }
    ))

    image = forms.ImageField(label="Image:", widget=forms.FileInput(
        attrs={
            "placeholder" : "image",
            "class" : "form-control form-group form",
        }
    ))

    price = forms.DecimalField(label="Price:", widget=forms.NumberInput(
        attrs={
            "placeholder" : "price",
            "class" : "form-control form-group form",
        }
    ))

    quantity_in_stock = forms.IntegerField(label="Stock:", widget=forms.NumberInput(
        attrs={
            "placeholder" : "quantity in stock",
            "class" : "form-control form-group form",
        }
    ))

    reorder_level = forms.IntegerField(label="Reorder Level:", widget=forms.NumberInput(
        attrs={
            "placeholder" : "reorder level",
            "class" : "form-control form-group form",
        }
    ))

    def clean_price(self):
        price = self.cleaned_data.get("price")
        if "-" in str(price):
            raise ValidationError(f"{price} is not a valid value for field price. Please remove the `negative` symbol")
        return price

    def clean_quantity_in_stock(self):
        quantity_in_stock = self.cleaned_data.get("quantity_in_stock")
        if "-" in str(quantity_in_stock):
            raise ValidationError(f"{quantity_in_stock} is not a valid value for field quantity in stock. Please remove the `negative` symbol")
        return quantity_in_stock

    def clean_reorder_level(self):
        reorder_level = self.cleaned_data.get("reorder_level")
        if "-" in str(reorder_level):
            raise ValidationError(f"{reorder_level} is not a valid value for field reorder level. Please remove the `negative` symbol")
        return reorder_level

    class Meta:
        model = Product
        fields =  [
            "category", "price", "image", "name", "quantity_in_stock", "reorder_level", "is_active", "received_by"
        ]

class PromoForm(forms.ModelForm):
    discount =  forms.IntegerField(label="Discount: ", widget = forms.NumberInput(
        attrs=({
        "class": "form-control",
        "placeholder": "Discount in Ksh"
        })
    ))

    duration = forms.DurationField(label="Promo Duration: ",  help_text = "Enter your value in seconds. It will be automatically converted for you" ,widget = forms.NumberInput(
        attrs = ({
            "class" : "form-control promo-duration",
            "placeholder" : "Please Enter Your Time In Seconds",
        })
    ))


    def clean_discount(self):
        discount = self.cleaned_data.get("discount")
        if "-" in  str(discount):
            raise ValidationError(f"{discount} is not a valid value for field discount. Please remove the `negative` symbol")
        
        product = Product.objects.get(name = self.cleaned_data.get("product"))
        if discount >= product.price:
            raise ValidationError(f"Discount value `{discount}` is greator than the {product} price. Please enter a value less than {product.price}")
            
        return discount

    def clean_duration(self):
        duration = self.cleaned_data.get("duration")
        if "-" in  str(duration):
            raise ValidationError(f"{duration} is not a valid value for field duration. Please remove the `negative` symbol")
        return duration

    class Meta:
        model = Promotion
        fields = ["product", "discount", "duration"]

class UserUpdateForm(UserCreationForm):
    username = forms.CharField(label="Username: ", widget = forms.TextInput(
        attrs=({
        "class": "form-control",
        "placeholder": "Username"
        })
    ))
    first_name = forms.CharField(label="First Name: ", widget = forms.TextInput(
        attrs=({
        "class": "form-control",
        "placeholder": "First name"
        })
    ))
    last_name = forms.CharField(label="Last Name: ", widget = forms.TextInput(
        attrs=({
        "class": "form-control",
        "placeholder": "Last name"
        })
    ))
    email = forms.CharField(label="Email: ", widget = forms.EmailInput(attrs=({
        "class": "form-control",
        "placeholder": "Email"
    })))
    mobile_no = forms.CharField(label="Mobile No: ", widget = forms.TextInput(attrs=({
        "class": "form-control",
        "placeholder": "Mobile No"
    })))
    address1 = forms.CharField(label="Address1: ", widget = forms.TextInput(attrs=({
        "class": "form-control",
        "placeholder": "Address1"
    })))
    address2 = forms.CharField(label="Address2: ", widget = forms.TextInput(attrs=({
        "class": "form-control",
        "placeholder": "address2"
    })))
    username = forms.CharField(label="Username: ", widget = forms.TextInput(attrs=({
        "class": "form-control",
        "placeholder": "Username"
    })))
    city = forms.CharField(label="City: ", widget = forms.TextInput(attrs=({
        "class": "form-control",
        "placeholder": "City/State/County"
    })))
    image = forms.ImageField(label="Image: ", widget=forms.FileInput(
        attrs ={
            "class":"form-control"
        }
    ))
    class Meta:
        model = User
        fields = [
            "username", "first_name", "last_name", "email", "mobile_no", "image", "is_staff", "is_active","city", "address1", "address2"
        ]

class CategoryForm(forms.ModelForm):
    category = forms.CharField(label="Category:", widget=forms.TextInput(
        attrs={
            "placeholder" : "category",
            "class" : "form-control form-group form",
        }
    ))
    class Meta:
        model = Category
        fields = ["category"]

class ProductsBoughtForm(forms.ModelForm):
    quantity_issued = forms.IntegerField(label="Quantity Issued:",widget=forms.NumberInput(
        attrs={
            "class": "form-control",
            "placeholder" : "Quantity Issued"
        }
    ))

    quantity_to_purchase = forms.IntegerField(label="Quantity Purchased:", widget=forms.NumberInput(
        attrs={
            "class": "form-control",
            "placeholder" : "Quantity Purchased"
        }
    ))

    def clean_quantity_issued(self):
        quantity_issued = self.cleaned_data.get("quantity_issued")
        if "-" in str(quantity_issued):
            raise ValidationError(f"{quantity_issued} is not a valid value for field quantity issued. Please remove the `negative` symbol")
        return quantity_issued

    def clean_quantity_to_purchase(self):
        quantity_to_purchase = self.cleaned_data.get("quantity_to_purchase")
        if "-" in str(quantity_to_purchase):
            raise ValidationError(f"{quantity_issued} is not a valid value for field quantity to purchase. Please remove the `negative` symbol")
        return quantity_to_purchase

    class Meta:
        model = ProductsBought
        fields = '__all__'

class IssueProductsForm(forms.ModelForm):
    quantity_issued = forms.IntegerField(label="Quantity To Issue:", widget=forms.NumberInput(
        attrs={
            "placeholder" : "quantity_issued",
            "class" : "form-control form-group form",
        }
    ))

    def clean_quantity_issued(self):
        quantity_issued = self.cleaned_data.get("quantity_issued")
        if "-" in str(quantity_issued):
            raise ValidationError(f"{quantity_issued} is not a valid value for field quantity issued. Please remove the `negative` symbol")
        return quantity_issued

    class Meta:
        model = ProductsBought
        fields = '__all__'

class ReceiveProductsForm(forms.ModelForm):
    quantity_received = forms.IntegerField(label="Quantity To Receive:", widget=forms.NumberInput(
        attrs={
            "placeholder" : "quantity received",
            "class" : "form-control form-group form",
        }
    ))

    def clean_quantity_received(self):
        quantity_received = self.cleaned_data.get("quantity_received")
        if "-" in str(quantity_received):
            raise ValidationError(f"{quantity_received} is not a valid value for field quantity received. Please remove the `negative` symbol")
        return quantity_received

    class Meta:
        model = Product
        fields = [
            "quantity_received", 
        ]