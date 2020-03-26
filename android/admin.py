# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .views import odoo_webservice
from django.contrib import admin
from .models import *
# Register your models here.
admin.site.site_header = "MES后台管理"
admin.site.site_title = "后台管理页面"


class Status_recordAdmin(admin.ModelAdmin):
    list_per_page = 15
    actions_on_top = True
    actions_on_bottom = True
    list_filter = ['userName', 'userAccount', 'process', 'station','status','createTime']
    search_fields = ['userName', 'userAccount', 'process','station','status', 'createTime']
    list_display = ('userName', 'userAccount', 'process', 'station','status','createTime')

class Code_recordAdmin(admin.ModelAdmin):
    list_per_page = 15
    actions_on_top = True
    actions_on_bottom = True
    list_filter = ['process', 'userName','station','createTime']
    search_fields = ['userName', 'userAccount', 'process', 'station','code','num','So','serial_number']
    list_display = ('userName', 'userAccount', 'process', 'station','code','num','So','serial_number','createTime')

class MachineAdmin(admin.ModelAdmin):
    list_per_page = 15
    actions_on_top = True
    actions_on_bottom = True
    list_filter = ['machine_code']
    search_fields = ['machine_code','department','station','workshop','path']
    list_display =('machine_code','department','station','workshop','path')
    def save_model(self, request, obj, form, change):
        """
        Given a model instance save it to the database.
        """
        odoo_con = str({"machine_code": obj.machine_code,
                   "department": obj.department,
                   "station": obj.station,
                   "workshop": obj.workshop,
                   "path": obj.path})
        result = odoo_webservice("bxd.process.overall.detailed", "modify_machine", odoo_con)
        print(result)
        if result["status"] == "success":
            obj.save()

    def delete_model(self, request, obj):
        """
        Given a model instance delete it from the database.
        """
        odoo_con = str({"machine_code": obj.machine_code})
        result = odoo_webservice("bxd.process.overall.detailed", "delete_machine", odoo_con)
        print(result)
        if result["status"] == "success":
            obj.delete()

class Video_bxdAdmin(admin.ModelAdmin):
    list_per_page = 15



# admin.site.register(User)
admin.site.register(Code_record,Code_recordAdmin)
admin.site.register(Status_record,Status_recordAdmin)
admin.site.register(Machine,MachineAdmin)
admin.site.register(Video_bxd,Video_bxdAdmin)