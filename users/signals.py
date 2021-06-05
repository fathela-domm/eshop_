from django.contrib.auth.models import User
from . models import User as MyUser
from django.dispatch import receiver 
from django.db.models.signals import post_save

@receiver(post_save, sender=User)
def create_user_profile(sender,instance, created, **kwargs):
    if created:
        MyUser.objects.create(
            User = instance
        )