import json

from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from api.models import *


@csrf_exempt
def create_collection(request):
    if request.method == 'POST':
        json_collection = json.loads(request.body)
        pname = json_collection['body']['name']
        new_collection = Collection(name=pname)
        new_collection.save()
        return JsonResponse({"mensaje": "ok", "data": serializers.serialize("json", [new_collection])})


@csrf_exempt
def collections_list(request):
    collection_list = Collection.objects.all()
    return HttpResponse(serializers.serialize("json", collection_list))


@csrf_exempt
def collections_delete(request):
    if request.method == 'DELETE':
        Collection.objects.all().delete()
        return JsonResponse({"mensaje": "All collections deleted"})


@csrf_exempt
def collections_add(request):
    if request.method == 'PUT':
        json_object = json.loads(request.body)
        piece_id = json_object['body']['piece_id']
        collection_id = json_object['body']['collection_id']

        piece = Piece.objects.get(pk=piece_id)
        collection = Collection.objects.get(pk=collection_id)

        new_piece_collection = PieceCollection(piece=piece, collection=collection)
        new_piece_collection.save()
        return JsonResponse({"mensaje": "ok", "data": serializers.serialize("json", [new_piece_collection])})


@csrf_exempt
def collections_pieces(request, collection_id):
    collection = Collection.objects.get(pk=collection_id)
    try:
        collection_pieces = PieceCollection.objects.filter(collection=collection)
        answer = []
        for cp in collection_pieces:
            answer.append(Piece.objects.get(pk=cp.piece.pk))

    except PieceCollection.DoesNotExist:
        answer = []
    return HttpResponse(serializers.serialize("json", answer))

@csrf_exempt
def collection_delete_by_id(request, collection_id):
    if request.method == 'DELETE':
        collection = Collection.objects.get(pk=collection_id)
        collection.delete()
        return JsonResponse({"mensaje": "ok"})

@csrf_exempt
def update_collection(request, collection_id):
    if request.method == "PUT":
        json_colection = json.loads(request.body)
        collection_name = json_colection['name']
        collection = get_object_or_404(Collection, pk=collection_id)
        collection.name = collection_name
        collection.save()
        return JsonResponse({"mensaje": "successfully updated"})