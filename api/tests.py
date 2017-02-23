from django.test import TestCase
from django.test import Client
from models import Artist, Category

from django.contrib.auth.models import User
import json

urlpatterns = __import__('api.urls').urls.urlpatterns


# Create your tests here.
class TestCreate_artist(TestCase):
    def test_create_artist(self):
        c = Client()

        artist = {'body': {'nombre': 'john', 'apellido' : 'test', 'email' : 'johntest@gmail.com','username' : 'johntest', 'password': 'test1234'}}
        response = c.post('/api/createArtist/', json.dumps(artist), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(data['mensaje'], "ok", "No coinciden")

        qs = Artist.objects.filter(userId__username='johntest')
        createdArtist = qs[0]
        self.assertIsNotNone(createdArtist, "No se creo el artista de forma correcta")

    def test_login_artist_success(self):
        c = Client()

        artist = {'body': {'nombre': 'john', 'apellido': 'test', 'email': 'johntest@gmail.com', 'username': 'johntest',
                           'password': 'test1234'}}
        response = c.post('/api/createArtist/', json.dumps(artist), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        login = {'body': {'username': 'johntest', 'password': 'test1234'}}
        response = c.post('/api/login/', json.dumps(login), content_type="application/json")

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(data['mensaje'], "ok", "No coinciden")

    def test_login_artist_fail(self):
        c = Client()

        artist = {'body': {'nombre': 'john', 'apellido': 'test', 'email': 'johntest@gmail.com', 'username': 'johntest',
                           'password': 'test1234'}}
        response = c.post('/api/createArtist/', json.dumps(artist), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        login = {'body': {'username': 'qwerty', 'password': 'test1234'}}
        response = c.post('/api/login/', json.dumps(login), content_type="application/json")

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(data['mensaje'], "Invalid login or password. Please try again.", "No coinciden")

class TestCreateCategory(TestCase):
    def test_add_category(self):
        c = Client()

        category = {'body': {'name': 'test_category'}}
        response = c.post('/api/category/add_category/', json.dumps(category), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(data['mensaje'], "ok", "No coinciden")