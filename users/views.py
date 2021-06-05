from django.shortcuts import render, get_object_or_404, redirect
from . models import User
from django import forms
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.conf import settings
from django.core.exceptions import ValidationError

class RegistrationForm(UserCreationForm):
    mobile_no = forms.CharField(label="Phone No", widget=forms.TextInput(
        attrs = {
            "class":"form-control border-secondary rounded",
            "placeholder" : "Phone #..."
        }
    ))

    email = forms.EmailField(label="Email", widget=forms.EmailInput(
        attrs = {
            "class":"form-control border-secondary rounded",
            "placeholder" : "Email..."
        }
    ))
   
    username = forms.CharField(label="Username", widget=forms.TextInput(
        attrs={
            "placeholder" : "Username...",
            "class" : "form-control border-secondary rounded",
        }
    ))
    class Meta:
        model = User
        fields = ["username", "email", "mobile_no", "city", "address1", "address2"]

class UserProfileUpdateForm(UserChangeForm):
    username = forms.CharField(label="Username", widget=forms.TextInput(
        attrs={
            "placeholder" : "Username...",
            "class" : "form-control border-secondary rounded",
        }
    ))

    mobile_no = forms.CharField( widget=forms.TextInput(
        attrs={
            "placeholder" : "Phone #...",
            "class" : "form-control border-secondary rounded",
        }
    ))

    email = forms.EmailField(widget=forms.EmailInput(
        attrs={
            "placeholder" : "Email...",
            "class" : "form-control border-secondary rounded",
        }
    ))

    class Meta:
        model = User
        fields = ["username", "email", "mobile_no", "city", "address1", "address2"]

def register(request):
    form = RegistrationForm
    if request.method == "POST":
        form = RegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(str(settings.LOGIN_REDIRECT_URL))
    id_ = ""
    for item in User.objects.all():
        if item.username == request.user.username:
            id_ = item.id

    return render(request, "user/register.html", {"form":form, "id":id_})

def update_user_profile(request, pk):
    queryset = get_object_or_404(User, id=pk)
    form = RegistrationForm(instance=queryset)
    if request.method == "POST":
        form = RegistrationForm(request.POST, request.FILES,instance=queryset)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(str(settings.LOGIN_REDIRECT_URL))
    context = {
        "form" : form,
        "id": queryset.id,
    }
    return render(request, "user/register.html", context)
