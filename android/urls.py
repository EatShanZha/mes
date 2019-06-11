from django.conf.urls import url
from android import views
app_name='android'
urlpatterns = [
    #login url
    url(r'^login/$', views.login, name="login"),
    #get image url
    url(r'^select/$', views.select, name="select"),
    url(r'^workmessage/$', views.workmessage, name="workmessage"),
    url(r'^recoverTime/$', views.recoverTime, name="recoverTime"),
    url(r'^offwork/$', views.offwork, name="offwork"),
    url(r'^stopTime/$', views.stopTime, name="stopTime"),
    url(r'^gbkc/(.*)/$', views.gbkc, name="gbkc"),
    url(r'^workdetail/(.*)/(.*)/$', views.workdetail, name="workdetail"),
    url(r'^echo/$', views.echo, name="echo"),
        ]