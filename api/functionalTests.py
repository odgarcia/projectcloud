from unittest import TestCase
from django.test import Client
from selenium import webdriver
from freeSounds import settings

import json

#clase para pruebas funcionales con selenium
class FunctionalTest(TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_login(self):
        c = Client()
        artist = {'body': {'nombre': 'john', 'apellido': 'test', 'email': 'johntest@gmail.com', 'username': 'johntest',
                           'password': 'test1234'}}
        response = c.post('/api/createArtist/', json.dumps(artist), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        self.browser.get('http://localhost:8000')
        linkLogin = self.browser.find_element_by_id('link_login')
        linkLogin.click()

        username = self.browser.find_element_by_id('username-login')
        username.send_keys('johntest')

        password = self.browser.find_element_by_id('password-login')
        password.send_keys('test1234')

        botonLogin = self.browser.find_element_by_id('submit-login')
        botonLogin.click()