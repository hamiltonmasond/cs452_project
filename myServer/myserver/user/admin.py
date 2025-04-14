from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['personId']}),
        (None, {'fields': ['firstName']}),
        (None, {'fields': ['lastName']}),
        (None, {'fields': ['username']}),
        (None, {'fields': ['password']})
    ]
    list_display = ('personId', 'firstName', 'lastName', 'username', 'password')

admin.site.register(User, UserAdmin)
