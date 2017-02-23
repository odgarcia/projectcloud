from django.conf.urls import url

from api.resources.pieces_resource import pieces_list
from api.resources.collection_resource import *

from api.resources.pieces_resource import pieces_list, piece_by_id, update_piece, add_piece, piece_by_category
from api.resources.category_resource import category_list, category_by_name_list
from api.resources.awsS3_resource import getCredentials

from api.resources.artist_resource import create_artist

from api.resources.artist_resource import *

from api.resources.awsS3_resource import getCredentials
from api.resources.category_resource import category_list
from api.resources.collection_resource import *
from api.resources.pieces_resource import *
from api.resources.profile_resource import *
from api.resources.user_resource import login_view, logout_view, is_logged

urlpatterns = [
    url(r'^createArtist/$', create_artist, name='create_artist'),
    url(r'^artist/(?P<id>\d+)/$', artist_by_id, name='artist_by_id'),
    url(r'^logout$', logout_view, name="logout"),
    url(r'^login/$', login_view, name="login"),
    url(r'^islogged$', is_logged, name="is_logged"),
    url(r'^category/$', category_list, name='category_list'),
    url(r'^credentials/$', getCredentials, name='getCredentials'),
    url(r'^category/(?P<category_name>\d+)/$', category_by_name_list, name='category_by_name_list'),

    # pieces
    url(r'^pieces/$', pieces_list, name='pieces_list'),
    url(r'^pieces/(?P<piece_id>\d+)/$', piece_by_id, name='piece_by_id'),
    url(r'^pieces/(?P<piece_id>\d+)/comments$', comments_piece, name='comments_piece'),
    url(r'^pieces/add_comment/(?P<piece_id>\d+)$', add_comment, name='add_comment'),
    url(r'^pieces/update$', update_piece, name='update_piece'),
    url(r'^pieces/add_piece/$', add_piece, name='add_piece'),

    # profile
    url(r'^profile/(?P<user_id>\d+)$', view_profile, name='view_profile'),
    url(r'^profile/update$', update_profile, name='update_profile'),

    # collections
    url(r'^collections/create$', create_collection, name='create_collection'),
    url(r'^collections/$', collections_list, name='collections_list'),
    url(r'^collections/delete$', collections_delete, name='collections_delete'),
    url(r'^collections/add$', collections_add, name='collections_add'),
    url(r'^collections/(?P<collection_id>\d+)/pieces$', collections_pieces, name='collections_pieces'),
    url(r'^collections/(?P<collection_id>\d+)/delete$', collection_delete_by_id, name='collection_delete_by_id'),
    url(r'^collections/(?P<collection_id>\d+)/update$', update_collection, name='update_collection'),

    # likes
    url(r'^pieces/(?P<piece_id>\d+)/like$', like_piece, name='like_piece'),
    url(r'^pieces/(?P<piece_id>\d+)/unlike$', unlike_piece, name='unlike_piece'),
    url(r'^pieces/(?P<piece_id>\d+)/liked$', is_liked_piece_by_username, name='is_liked_piece_by_username'),
    url(r'^pieces/(?P<piece_id>\d+)/likes$', likes_by_piece, name='likes_by_piece'),
    url(r'^pieces/rank$', get_most_voted, name='get_most_voted'),

    # search
    url(r'^search_artist/$', view_artists, name='view_artists'),
    url(r'^search_artist/(?P<user_id>\d+)/pieces$', pieces_by_artist, name='pieces_by_artist'),

    # newsfeedlikes
    url(r'^newsfeed/(?P<newsfeed_id>\d+)/like$', like_newsfeed, name='like_newsfeed'),
    url(r'^newsfeed/(?P<newsfeed_id>\d+)/unlike$', unlike_newsfeed, name='unlike_newsfeed'),
    url(r'^newsfeed/(?P<newsfeed_id>\d+)/liked$', is_liked_newsfeed_by_username, name='is_liked_newsfeed_by_username'),
    url(r'^newsfeed/(?P<newsfeed_id>\d+)/likes$', likes_by_newsfeed, name='likes_by_newsfeed'),
    # newsfeed
    url(r'^newsfeed/add_newsfeed/$', add_newsfeed, name='add_newsfeed'),
    url(r'^newsfeed/$', newsfeed_list, name='newsfeed_list'),

    url(r'^search_category/$', category_list, name='category_list'),
    url(r'^search_category/(?P<category_id>\d+)/$', piece_by_category, name='piece_by_category')
]
