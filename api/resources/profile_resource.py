import json

from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_list_or_404
from django.http import JsonResponse


from ..models import Artist

@csrf_exempt
def view_profile(request,user_id):
    artista = get_list_or_404(Artist.objects.filter(userId=user_id))
    if len(artista) == 0:
        return JsonResponse({"mensaje": "There are no artist with id" + user_id})
    return HttpResponse(serializers.serialize("json", artista))

@csrf_exempt
def update_profile(request):
    if request.method == "POST":
        jsonPiece = json.loads(request.body)
        userId = jsonPiece['body']['userId']
        profile = get_list_or_404(Artist.objects.filter(userId=userId))
        if len(profile) == 0:
            return JsonResponse({"mensaje": "There are no profile with id" + userId})
        else:
            name = jsonPiece['body']['fields']['name']
            last_name = jsonPiece['body']['fields']['last_name']
            name_artistic = jsonPiece['body']['fields']['name_artistic']
            email = jsonPiece['body']['fields']['email']
            city = jsonPiece['body']['fields']['city']
            country = jsonPiece['body']['fields']['country']
            birth_date = jsonPiece['body']['fields']['birth_date']

            owner_profile = profile[0]

            if name is not None:
                owner_profile.name = name
            if last_name is not None:
                owner_profile.last_name = last_name
            if name_artistic is not None:
                owner_profile.name_artistic = name_artistic
            if email is not None:
                owner_profile.email = email
            if country is not None:
                owner_profile.country = country
            if city is not None:
                owner_profile.city = city
            if birth_date is not None:
                owner_profile.birth_date = birth_date

            owner_profile.save()

            return JsonResponse({"mensaje": "successfully updated"})