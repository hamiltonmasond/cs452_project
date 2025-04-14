import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest

# Create your views here.
def create_new_entry(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid data provided.")
        
        personId = data.get('personId')
        title = data.get('title')
        lastPlayed = data.get('lastPlayed', "")
        rating = data.get('rating', 5) 
        description = data.get('description', "")
        
        if not personId or not title:
            return HttpResponseBadRequest("Required fields'personId' and 'title' must be provided.")
        
        

        