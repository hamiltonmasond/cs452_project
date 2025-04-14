from django.db import models

# Create your models here.
class Media(models.Model):
    personId = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    lastPlayed = models.CharField(max_length=15)
    rating = models.IntegerField(default=5)
    description = models.TextField(max_length=250)

    def __str__(self):
        return self.title