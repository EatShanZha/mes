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
    url(r'^trouble/$', views.trouble, name="trouble"),
    url(r'^gbkc/(.*)/$', views.gbkc, name="gbkc"),
    url(r'^register/$', views.register, name="register"),
    url(r'^history/$', views.history, name="history"),
    url(r'^sample_clothes/(.*)/(.*)/$', views.sample_clothes, name="sample_clothes"),
    url(r'^cdm_clothes/(.*)/(.*)/$', views.cdm_clothes, name="cdm_clothes"),
    url(r'^cdm_trousers/(.*)/(.*)/$', views.cdm_trousers, name="cdm_trousers"),
    url(r'^cdl_clothes/(.*)/(.*)/$', views.cdl_clothes, name="cdl_clothes"),
    url(r'^cdl_trousers/(.*)/(.*)/$', views.cdl_trousers, name="cdl_trousers"),
    url(r'^serial_number/(.*)/(.*)/$', views.serial_number, name="serial_number"),
    url(r'^cdf_clothes/(.*)/(.*)/$', views.cdf_clothes, name="cdf_clothes"),
    url(r'^cdf_trousers/(.*)/(.*)/$', views.cdf_trousers, name="cdf_trousers"),
    url(r'^person_message/(.*)/(.*)/$', views.person_message, name="person_message"),
    url(r'^echo/$', views.echo, name="echo"),
    url(r'^video/$', views.video, name="video"),
    url(r'^yachen/(.*)/(.*)/$', views.yachen, name="yachen"),
    url(r'^lb_number/(.*)/(.*)/$', views.lb_number, name="lb_number"),

]