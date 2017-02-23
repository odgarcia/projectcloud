import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        username = jsonUser['body']['username']
        password = jsonUser['body']['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            mensaje = "ok"
        else:
            mensaje = "Invalid login or password. Please try again."
    return JsonResponse({"mensaje": mensaje})

@csrf_exempt
def is_logged(request):
    if request.user.is_authenticated():
        mensaje = "ok"
    else:
        mensaje = "no"
    return JsonResponse({"mensaje": mensaje})

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"mensaje": "ok"})