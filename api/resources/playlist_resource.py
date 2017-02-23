import json

from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from api.models import *

#Resource par ael manejo de playlists

@csrf_exempt
def create_playlist(request, artist_id):
    if request.method == 'POST':
        json_playlist = json.loads(request.body)
        pname = json_playlist['body']['name']

        artist = get_object_or_404(Artist, pk=artist_id)

        new_playlist = PlayList(name = pname, artist = artist )
        new_playlist.save()
        return JsonResponse({"mensaje": "ok", "data": serializers.serialize("json", [new_playlist])})


@csrf_exempt
def playlist_list(request):
    playlist_list = PlayList.objects.all()
    return HttpResponse(serializers.serialize("json", playlist_list))


@csrf_exempt
def playlist_delete(request):
    if request.method == 'DELETE':
        Collection.objects.all().delete()
        return JsonResponse({"mensaje": "All collections deleted"})


@csrf_exempt
def playlist_add(request):
    if request.method == 'PUT':
        json_object = json.loads(request.body)
        piece_id = json_object['body']['piece_id']
        playlist_id = json_object['body']['playlist_id']

        piece = Piece.objects.get(pk=piece_id)
        playlist = PlayList.objects.get(pk=playlist_id)

        new_piece_playlist = PiecePlayList(piece=piece, playlist=playlist)
        new_piece_playlist.save()
        return JsonResponse({"mensaje": "ok", "data": serializers.serialize("json", [new_piece_playlist])})


@csrf_exempt
def playlist_pieces(request, playlist_id):
    playlist = PlayList.objects.get(pk=playlist_id)
    try:
        playlist_pieces = PiecePlayList.objects.filter(playlist=playlist)
        answer = []
        for cp in playlist_pieces:
            answer.append(Piece.objects.get(pk=cp.piece.pk))

    except PieceCollection.DoesNotExist:
        answer = []
    return HttpResponse(serializers.serialize("json", answer))

@csrf_exempt
def playlist_delete_by_id(request, playlist_id):
    if request.method == 'DELETE':
        playlist = PlayList.objects.get(pk=playlist_id)
        playlist.delete()
        return JsonResponse({"mensaje": "ok"})

@csrf_exempt
def update_playlist(request, playlist_id):
    if request.method == "PUT":
        json_playlist = json.loads(request.body)
        playlist_name = json_playlist['name']
        playlist = get_object_or_404(PlayList, pk=playlist_id)
        playlist.name = playlist_name
        playlist.save()
        return JsonResponse({"mensaje": "successfully updated"})