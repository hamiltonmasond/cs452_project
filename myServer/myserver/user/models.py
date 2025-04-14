from django.db import models

# Create your models here.
class User(models.Model):
    personId = models.CharField(max_length=30)
    firstName = models.CharField(max_length=15)
    lastName = models.CharField(max_length=25)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.personId