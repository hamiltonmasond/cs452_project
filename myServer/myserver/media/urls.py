from django.urls import path
from . import views
urlpatterns = [
    path('media/new/', views.create_new_entry, name='create_new_entry'),
    path('media/', views.get_all_entries, name='get_all_entries'),
    path('media/delete', views.delete_entry, name='delete_entry')
]