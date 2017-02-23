import json

from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import get_list_or_404,get_object_or_404

from api.models import Artist,Piece,NewsFeed,NewsFeedLike

#Resource del artista que posee las funciones relacionadas a este

#Funcion que recibe la info de un artista y lo crea en BD
@csrf_exempt
def create_artist(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        nombre = jsonUser['body']['nombre']
        apellido = jsonUser['body']['apellido']
        email = jsonUser['body']['email']
        username = jsonUser['body']['username']
        password = jsonUser['body']['password']

        if User.objects.filter(username=username).exists():
           return JsonResponse({"mensaje": "el usuario ya existe"})

        try:
            usuario = User.objects.create(first_name=nombre, last_name=apellido, email=email, username=username)
            usuario.set_password(password)
            usuario.save()

            artist = Artist.objects.create(userId=usuario)
            if usuario is not None:
                mensaje = "ok"
            else:
                mensaje = "El usuario no fue creado"
            return JsonResponse({"mensaje": mensaje})
        except ValueError, error:
            return JsonResponse({"mensaje": "fallo la creacion"})


@csrf_exempt
def view_artists(request):
    artists_list = Artist.objects.all()
    return HttpResponse(serializers.serialize("json", artists_list))

@csrf_exempt
def pieces_by_artist(request, user_id):
    artista = Artist.objects.get(userId=user_id)
    pieces = get_list_or_404(Piece.objects.filter(artist=artista))
    return HttpResponse(serializers.serialize("json", pieces))

@csrf_exempt
def artist_by_id(request, id):
    artista = Artist.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("json", artista))

def add_newsfeed(request):
    if request.method == 'POST':
        jsonnewsfeed = json.loads(request.body)
        new_newsfeed = NewsFeed(
            title=jsonnewsfeed['body']['title'],
            content=jsonnewsfeed['body']['content'],
            artist = Artist.objects.get(userId__username=jsonnewsfeed['body']['artist']),
            image = jsonnewsfeed['body']['url']
        );
        new_newsfeed.save();
        return HttpResponse(serializers.serialize("json", [new_newsfeed]))

@csrf_exempt
def like_newsfeed(request,newsfeed_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        newsfeed =get_object_or_404(NewsFeed, pk=newsfeed_id)
        new_like = NewsFeedLike(newsfeed=newsfeed, username=username)
        new_like.save()
        return JsonResponse({"mensaje": "successfully liked"})

@csrf_exempt
def unlike_newsfeed(request, newsfeed_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        newsfeed = get_object_or_404(NewsFeed, pk=newsfeed_id)
        like = NewsFeedLike.objects.filter(newsfeed=newsfeed, username=username)
        like.delete()
        return JsonResponse({"mensaje": "successfully unliked"})


@csrf_exempt
def is_liked_newsfeed_by_username(request, newsfeed_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        newsfeed = get_object_or_404(NewsFeed, pk=newsfeed_id)
        like = NewsFeedLike.objects.filter(newsfeed=newsfeed_id, username=username)
        if len(like) > 0:
            return JsonResponse({"liked": True})
        else:
            return JsonResponse({"liked": False})


@csrf_exempt
def likes_by_newsfeed(request, newsfeed_id):
    if request.method == 'GET':
        newsfeed = get_object_or_404(NewsFeed, pk=newsfeed_id)
        likes = NewsFeedLike.objects.filter(newsfeed=newsfeed)
        if likes is not None:
            return JsonResponse({"likes": len(likes)})
        else:
            return JsonResponse({"likes": 0})
@csrf_exempt
def newsfeed_list(request):
    newsfeed_list = NewsFeed.objects.all()
    return HttpResponse(serializers.serialize("json", newsfeed_list))


